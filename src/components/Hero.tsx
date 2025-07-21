import { Github, Linkedin, MessageCircle, Slack, Twitter } from 'lucide-react';
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust path if needed
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const Hero = ({ profile }: { profile: any }) => {
  const [profileState, setProfileState] = useState({ name: "", bio: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, bio")
        .single();
      if (data) setProfileState({ name: data.name, bio: data.bio });
      if (error) console.error("Error fetching profile:", error);
    };
    fetchProfile();
  }, []);

  const socialLinks = [
    { icon: Linkedin, href: profile.socialLinks?.linkedin || "#", label: "LinkedIn" },
    { icon: Github, href: profile.socialLinks?.github || "#", label: "GitHub" },
    { icon: MessageCircle, href: profile.socialLinks?.discord || "#", label: "Discord" },
    { icon: Twitter, href: profile.socialLinks?.twitter || "https://x.com/Bhargav_0710", label: "x" },
    { icon: Slack, href: profile.socialLinks?.slack || "#", label: "Slack" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="text-center mt-10">
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-2">
            Hi, I'm <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500 mb-7 bg-clip-text text-transparent">{profileState.name}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-5 text-gray-300 mt-2">
            {profileState.bio}
          </p>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/50 backdrop-blur-md border border-gray-700/50 hover:border-purple-400/50 transition-all duration-200 hover:scale-110"
                aria-label={social.label}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/70 border border-yellow-400">
                  <Icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </div>
              </a>
            );
          })}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/projects" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
            View My Work
          </a>
          <a href={profile.socialLinks?.twitter || "https://x.com/Bhargav_0710"} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200">
            Get In Touch
          </a>
          <a href={profile.cvLink || "#"} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-200 flex items-center justify-center">
            CV
          </a>
        </div>
        
        {/* Profile Timeline Sections: Education, Experience, Certificates */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[
            {key: 'education', label: 'Education'}, 
            {key: 'experience', label: 'Experience'}, 
            {key: 'certificates', label: 'Certificates'}
          ].map((section, idx) => (
            <div
              key={section.key}
              className={
                section.key === 'certificates'
                  ? 'bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-[72px] md:mb-0'
                  : 'bg-gray-800/50 border border-gray-700 rounded-lg p-6'
              }
            >
              <h3 className="text-xl font-bold text-white mb-4">{section.label}</h3>
              <ul className="relative z-10">
                {profile[section.key]?.slice().reverse().map((item: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-4 mb-6 relative">
                    <div className="w-28 h-16 flex items-center justify-center mx-auto">
                      <img
                        src={item.icon_url}
                        alt="icon"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 pl-4">
                      <div className="font-semibold text-white text-base whitespace-nowrap truncate overflow-hidden">
                        {section.key === 'education' ? item.course : 
                         section.key === 'experience' ? item.position : 
                         item.title}
                      </div>
                      <div className="text-sm text-purple-300">
                        {section.key === 'education' ? item.institution_name : 
                         section.key === 'experience' ? item.company_name : 
                         item.institution_name}
                      </div>
                      <div className="text-xs text-gray-300">{item.description}</div>
                      <div className="text-xs text-gray-400 mb-1">
                        {item.start_date} - {item.end_date}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
