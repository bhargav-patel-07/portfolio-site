import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Portfolio
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/projects') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/blog') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Blog
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
