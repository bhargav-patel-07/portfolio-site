import { GridPattern } from '@/components/ui/grid-pattern';
import Hero from '@/components/Hero';
import { FloatingDock } from '@/components/FloatingDock';
import { House, Info, Monitor, User, Package, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TechStack } from '../components/TechStack';
import { supabase } from '../lib/supabaseClient';

import Loader from "@/components/ui/loader";

const defaultProfile = {
  name: '',
  bio: '',
  profileImage: '',
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: '',
    slack: '',
    discord: '',
    gmail: '',
  },
  cvLink: '',
  education: [],
  experience: [],
  certificates: []
};


const Index = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  // Fetch all data from database
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name, bio, profile_image_url')
          .single();

        // Fetch education data
        const { data: educationData, error: educationError } = await supabase
          .from('education')
          .select('*')
          .order('start_date', { ascending: false });

        // Fetch experience data
        const { data: experienceData, error: experienceError } = await supabase
          .from('experience')
          .select('*')
          .order('start_date', { ascending: false });

        // Fetch certifications data
        const { data: certificationsData, error: certificationsError } = await supabase
          .from('certifications')
          .select('*')
          .order('start_date', { ascending: false });

        // Fetch social links
        const { data: socialLinksData, error: socialLinksError } = await supabase
          .from('social_links')
          .select('*');

        // Fetch CV link
        const { data: cvData, error: cvError } = await supabase
          .from('cv')
          .select('cv_link')
          .single();

        // Fetch profile image
        const { data: profileImageData, error: profileImageError } = await supabase
          .from("profile_pictures")
          .select("image_url")
          .limit(1)
          .single();

        // Handle errors
        if (profileError) console.error('Error fetching profile:', profileError);
        if (educationError) console.error('Error fetching education:', educationError);
        if (experienceError) console.error('Error fetching experience:', experienceError);
        if (certificationsError) console.error('Error fetching certifications:', certificationsError);
        if (socialLinksError) console.error('Error fetching social links:', socialLinksError);
        if (cvError) console.error('Error fetching CV:', cvError);
        if (profileImageError) console.error('Error fetching profile image:', profileImageError);

        // Process social links into the expected format
        const socialLinks = {
          linkedin: '',
          github: '',
          twitter: '',
          slack: '',
          discord: '',
          gmail: '',
        };

        if (socialLinksData) {
          socialLinksData.forEach(link => {
            const platform = link.platform.toLowerCase();
            if (platform in socialLinks) {
              socialLinks[platform] = link.url;
            }
          });
        }

        // Update profile state with fetched data
        setProfile({
          name: profileData?.name || '',
          bio: profileData?.bio || '',
          profileImage: profileData?.profile_image_url || '',
          socialLinks,
          cvLink: cvData?.cv_link || '',
          education: educationData || [],
          experience: experienceData || [],
          certificates: certificationsData || []
        });

        if (profileImageData && profileImageData.image_url) {
          setProfileImage(profileImageData.image_url);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to localStorage if database fails
        const stored = localStorage.getItem('profile');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setProfile({
              name: parsed.name || '',
              bio: parsed.bio || '',
              education: parsed.education || [],
              experience: parsed.experience || [],
              certificates: parsed.certificates || [],
              profileImage: parsed.profileImage || '',
              socialLinks: parsed.socialLinks || {
                linkedin: '',
                github: '',
                twitter: '',
                slack: '',
                discord: '',
                gmail: '',
              },
              cvLink: parsed.cvLink || ''
            });
          } catch {
            setProfile(defaultProfile);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Visitor counter: POST to /api/visit on load, then fetch count
  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        await fetch('/api/visit', { method: 'POST' });
        const res = await fetch('/api/visit');
        const data = await res.json();
        if (typeof data.count === 'number') setVisitorCount(data.count);
      } catch (e) {
        // fallback: do nothing
      }
    };
    updateVisitorCount();
  }, []);

  const dockItems = [
    { title: 'Home', icon: <House className="h-4 w-4" />, href: '/' },
    { title: 'Projects', icon: <Monitor className="h-4 w-4" />, href: '/projects' },
    { title: 'Products', icon: <Package className="h-4 w-4" />, href: '/products' },
    { title: 'Blog', icon: <Info className="h-4 w-4" />, href: '/blog' },
    { title: 'Hire Me', icon: <User className="h-4 w-4" />, href: '/hire' },
  ];

  // Remove Loader usage in the loading state, and instead show a modern welcome section
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Visitor Counter - Top Left */}
      <div className="fixed top-4 left-4 z-50 flex items-center bg-black/60 px-3 py-1 rounded-full shadow-lg">
        <Eye className="w-5 h-5 text-yellow-400 mr-2" />
        <span className="font-bold text-lg">{visitorCount}</span>
      </div>
      {/* Grid Pattern Background - Full coverage */}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="absolute inset-0 h-full w-full stroke-white/10"
      />
      {/* Centered Welcome + TechStack Section */}
      <div className="relative z-20 flex flex-col items-center justify-center mx-auto mt-8 mb-4 max-w-4xl min-h-[260px] w-full bg-transparent">
        <div className="bg-white/10 rounded-2xl p-8 shadow-xl max-w-xl mx-auto mt-10">
          {profileImage && (
            <div className="flex justify-center mb-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-40 h-40 border-4 border-white shadow-lg object-cover bg-white/20 rounded-lg"
              />
            </div>
          )}
         
        </div>
        <div className="mt-0 w-full">
          <TechStack />
        </div>
      </div>
      {/* Main Content - Only Hero for Home */}
      <div className="relative z-10 md:ml-32">
        <Hero profile={profile} />
        {/* Social Links and CV Button */}
        
    
      
      {/* Floating Dock - Vertical, 24px from left side, only on desktop */}
      <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col items-center">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="vertical"
        />
      </div>
      {/* Floating Dock - Horizontal, bottom center, only on mobile */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex md:hidden justify-center w-full px-4">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="horizontal"
        />
      </div>
    </div>
    </div>
  );
};

export default Index;
