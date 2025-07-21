import { GridPattern } from '@/components/ui/grid-pattern';

import { FloatingDock } from '@/components/FloatingDock';
import { House, Info, Monitor, User, Package, Folder } from 'lucide-react';
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust path as needed
import ProjectCard, { TechnologyBadgeList } from '@/components/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  product_url?: string;
  technologies?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [techDetails, setTechDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id,title,description,image_url,github_url,product_url,technologies");
      if (error) {
        setProducts([]); // fallback to empty array on error
      } else {
        setProducts(data || []); // fallback to empty array if data is null/undefined
      }
      setLoading(false);
    };
    fetchProducts();
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
    <div className="relative min-h-screen w-full bg-gray-900 text-white flex flex-col items-center px-4 py-12 overflow-hidden">
      {/* Grid Pattern Background - Full coverage */}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="absolute inset-0 h-full w-full stroke-white/10 z-0"
      />
      <main className="relative z-10 w-full md:ml-32">
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-5 font-bold">
                Some Stuff Going to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-sans not-italic">Production Level</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto josefin-sans-font">
                Discover the digital products I've built to solve real-world problems and enhance productivity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 ml-4 lg:grid-cols-3 gap-8">
              {Array.isArray(products) && products.map((product) => (
                <ProjectCard
                  key={product.id}
                  project={{ ...product, live_url: product.product_url }}
                  technologies={product.technologies}
                  techDetails={techDetails}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Floating Dock - Vertical, 24px from left side, only on desktop */}
      <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col items-center           hover:border-yellow-400
">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="vertical"
        />
      </div>
      {/* Floating Dock - Horizontal, bottom center, only on mobile */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex md:hidden justify-center w-full px-4 ">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export default Products;
