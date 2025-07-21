import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for R/W
);

const VISIT_ROW_ID = 1; // Always use row with id=1

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Increment the count atomically
    const { data, error } = await supabase.rpc('increment_visit_count', { row_id: VISIT_ROW_ID });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ count: data });
  }
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('visits')
      .select('count')
      .eq('id', VISIT_ROW_ID)
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ count: data.count });
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 