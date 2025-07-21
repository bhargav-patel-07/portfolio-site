
import { Link, useLocation } from 'react-router-dom';
import { House, Info, Monitor, User, Package } from 'lucide-react';

const SidebarNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: House, label: 'Home' },
    { path: '/projects', icon: Monitor, label: 'Projects' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/blog', icon: Info, label: 'Blog' },
    { path: '/hire', icon: User, label: 'Hire Me' },
  ];
  
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 p-4 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-red-500/50 hover:border-yellow-400
">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 m-1
              ${isActive(item.path) ? 'border-4 border-yellow-400 bg-black text-yellow-400 shadow-[0_0_8px_2px_rgba(250,204,21,0.5)]'}          
              hover:border-yellow-400`}
          >
            <Icon className="h-5 w-5" />
            <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
