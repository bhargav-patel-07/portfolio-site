import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-0 shadow-lg liquid-glass-effect">
        {post.image && (
          <div className="relative overflow-hidden rounded-t-lg flex justify-center items-center">
            <img 
              src={post.image}
              alt={post.title}
              className="max-w-full max-h-80 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-purple-600 font-medium">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <CardTitle className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-200 josefin-sans-font">
            {post.title}
          </CardTitle>
          <CardDescription className="text-gray-600 line-clamp-2 josefin-sans-font">
            {post.excerpt}
          </CardDescription>
          <div className="text-gray-300 mt-2 text-sm line-clamp-3 josefin-sans-font">
            {post.content}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(post.tags || []).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
