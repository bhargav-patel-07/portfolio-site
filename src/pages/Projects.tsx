import ProjectCard, { TechnologyBadgeList } from '@/components/ProjectCard';
import { GridPattern } from '@/components/ui/grid-pattern';
import { FloatingDock } from '@/components/FloatingDock';
import { House, Info, Monitor, User, Package } from 'lucide-react';
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust path if needed
import { Link } from '@radix-ui/react-navigation-menu';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [techDetails, setTechDetails] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*, technologies");
      if (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } else {
        setProjects(data || []);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTechDetails = async () => {
      const { data, error } = await supabase.from('technologies').select('*');
      if (!error) setTechDetails(data || []);
    };
    fetchTechDetails();
  }, []);

  const dockItems = [
    { title: 'Home', icon: <House className="h-4 w-4" />, href: '/' },
    { title: 'Projects', icon: <Monitor className="h-4 w-4" />, href: '/projects' },
    { title: 'Products', icon: <Package className="h-4 w-4" />, href: '/products' },
    { title: 'Blog', icon: <Info className="h-4 w-4" />, href: '/blog' },
    { title: 'Hire Me', icon: <User className="h-4 w-4" />, href: '/hire' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pb-32">
      {/* Grid Pattern Background - Full coverage */}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="absolute inset-0 h-full w-full stroke-white/10"
      />
      
      <div className="projects-page-container md:ml-32">
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Some Cool Stuff I've <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Built</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                A collection of projects I've worked on, ranging from web applications to mobile apps and everything in between.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  technologies={project.technologies}
                  techDetails={techDetails}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dock - Vertical, 24px from left side, only on desktop */}
      <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col items-center">

        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="vertical"
        />
        </div>
      
      {/* Floating Dock - Horizontal, bottom center, only on mobile */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex md:hidden   justify-center w-full px-4">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

function IconContainer({
  title,
  icon,
  href,
  isActive,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}) {
  return (
    <Link to={href}>
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-black hover:bg-neutral-800 transition-all  ml-10pxduration-200 hover:scale-110
          ${isActive ? 'border-4 border-yellow-400' : ''}`}
      >
        {icon}
      </div>
    </Link>
  );
}

export default Projects;
