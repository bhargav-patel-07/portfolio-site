import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Hero from '@/components/Hero';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const defaultProfile = {
  education: [],
  experience: [],
  certificates: []
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockBlogPosts.find(p => p.id === id);
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem('profile');
    if (stored) {
      try {
        setProfile({ ...defaultProfile, ...JSON.parse(stored) });
      } catch {
        setProfile(defaultProfile);
      }
    }
  }, []);

  console.log('Profile:', profile);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button>
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div style={{ color: 'red', fontSize: 32 }}>DEBUG: Index page is rendering</div>
      <div style={{ color: 'red' }}>Profile: {JSON.stringify(profile)}</div>
      <div className="relative z-10">
        <Hero profile={profile} />
      </div>
      <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-8 text-purple-600 hover:text-purple-700">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
          
          {post.image && (
            <div className="relative mb-8 rounded-xl overflow-hidden">
              <img 
                src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=1200&q=80`}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}
          
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags || []).map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
            
            <time className="text-purple-600 font-medium">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </header>
          
          <div className="prose prose-lg prose-purple max-w-none">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('```')) {
                  return null; // Handle code blocks separately if needed
                }
                if (paragraph.trim() === '') {
                  return <br key={index} />;
                }
                if (paragraph.match(/^\d+\./)) {
                  return <li key={index} className="ml-4">{paragraph.replace(/^\d+\.\s*/, '')}</li>;
                }
                return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>;
              })}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
