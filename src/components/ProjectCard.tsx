import React from 'react';
import { Folder } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
}

interface Technology {
  id: string;
  name: string;
  icon_url: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  technologies?: string[];
  techDetails?: Technology[];
}

export function TechnologyBadgeList({ names, techDetails }: { names: string[]; techDetails: Technology[] }) {
  if (!names || !techDetails) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2 mb-2">
      {names.map((name) => {
        const tech = techDetails.find((t) => t.name === name);
        if (!tech) return (
          <span key={name} className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">{name}</span>
        );
        return (
          <span
            key={tech.id}
            className="flex items-center px-2 py-1 text-xs font-medium rounded-full shadow"
            style={{ background: tech.color, color: '#222' }}
          >
            <img
              src={tech.icon_url}
              alt={tech.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/default-icon.png';
              }}
              className="w-4 h-4 mr-1"
            />
            {tech.name}
          </span>
        );
      })}
    </div>
  );
}

const ProjectCard = ({ project, technologies, techDetails }: ProjectCardProps) => {
  return (
    <div className="flex flex-col justify-between bg-white/10 border border-transparent rounded-xl p-6 shadow transition-all duration-200 hover:scale-105 hover:border-purple-500 cursor-pointer w-full max-w-xs min-h-[350px] max-h-[350px] mx-auto">
      {/* Logo and Title side by side */}
      <div className="flex items-center justify-center mb-4 gap-3">
        {project.image_url ? (
          <img src={project.image_url} alt="logo" className="w-10 h-10 object-contain rounded-full bg-black p-1" />
        ) : (
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-black">
            <Folder className="w-6 h-6 text-purple-400" />
          </span>
        )}
        <h2 className="text-2xl font-bold text-white truncate text-left">{project.title}</h2>
      </div>
      {/* Description */}
      <p className="text-gray-300 text-left flex-1 overflow-hidden text-ellipsis mb-2">{project.description}</p>
      {/* Technologies */}
      {technologies && techDetails && (
        <TechnologyBadgeList names={technologies} techDetails={techDetails} />
      )}
      {/* Buttons row at the bottom, always inside the card */}
      <div className="flex justify-between w-full gap-2">
        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="w-1/2">
          <button className="w-full bg-purple-500 text-white px-2 py-2 rounded-lg hover:bg-purple-600 transition text-sm whitespace-nowrap border border-white/30">
            Live
          </button>
        </a>
        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="w-1/2">
          <button className="w-full bg-gray-800 text-white px-2 py-2 rounded-lg hover:bg-gray-700 transition text-sm whitespace-nowrap border border-white/30">
            GitHub
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
