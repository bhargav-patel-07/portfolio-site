import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  orientation = 'horizontal',
}: FloatingDockProps) => {
  const location = useLocation();

  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} orientation={orientation} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  return (
    <div className="block md:hidden">
      <div className="absolute inset-x-0 bottom-full mb-2 flex flex-row gap-0 justify-between liquid-glass-effect p-1 rounded-2xl shadow-lg w-full">
        {items.map((item, idx) => {
          const isActive = location.pathname === item.href;
          return (
            <div
              key={item.title}
              className="animate-fade-in flex-grow flex justify-center"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <Link
                to={item.href}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  border transition-all duration-200
                  ${isActive ? 'border-yellow-400 bg-yellow-900/20 shadow-lg' : 'border-transparent bg-black'}
                  hover:border-yellow-400
                  group
                `}
              >
                <span className="text-yellow-400 transition-transform duration-200 group-hover:scale-125">
                  {item.icon}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  orientation = 'horizontal',
}: {
  items: DockItem[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}) => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col items-center z-50">
      <div
        className={cn(
          orientation === 'vertical'
            ? 'mx-0 my-auto flex-col h-auto w-16 items-center gap-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-3 py-4 md:flex'
            : 'mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 md:flex',
          className
        )}
      >
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <IconContainer key={item.title} {...item} isActive={isActive} />
          );
        })}
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
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link to={href}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          relative flex h-12 w-12 items-center justify-center rounded-full bg-black hover:bg-neutral-800 transition-all duration-200
          ${isActive ? "border-yellow-400 bg-yellow-900/20 shadow-lg" : "border-transparent"}
          hover:border-yellow-400
        `}
      >
        {hovered && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white">
            {title}
          </div>
        )}
        <div className="flex h-6 w-6 items-center justify-center text-yellow-500">
          {icon}
        </div>
      </div>
    </Link>
  );
}
