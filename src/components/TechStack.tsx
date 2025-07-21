import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function TechStack() {
  const [technologies, setTechnologies] = useState([]);

  // Define the function
  const fetchTechnologies = async () => {
    const { data, error } = await supabase.from('technologies').select('*');
    if (!error) setTechnologies(data);
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('public:technologies')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'technologies' }, fetchTechnologies)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center py-4">
      {technologies.map(tech => (
        <div
          key={tech.id}
          className="flex items-center px-3 py-1 rounded-md shadow-md"
          style={{ background: tech.color, color: '#222' }}
        >
          <img
            src={tech.icon_url}
            alt={tech.name}
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.src = '/default-icon.png';
            }}
            className="w-5 h-5 mr-2"
          />
          <span className="font-semibold text-sm whitespace-nowrap">{tech.name}</span>
        </div>
      ))}
    </div>
  );
} 