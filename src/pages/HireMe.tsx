import { GridPattern } from '@/components/ui/grid-pattern';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import { FloatingDock } from '@/components/FloatingDock';
import { House, Info, Monitor, User, Package } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const HireMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const dockItems = [
    { title: 'Home', icon: <House className="h-4 w-4" />, href: '/' },
    { title: 'Projects', icon: <Monitor className="h-4 w-4" />, href: '/projects' },
    { title: 'Products', icon: <Package className="h-4 w-4" />, href: '/products' },
    { title: 'Blog', icon: <Info className="h-4 w-4" />, href: '/blog' },
    { title: 'Hire Me', icon: <User className="h-4 w-4" />, href: '/hire' },
  ];

  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications using modern technologies",
      
      features: ["React/Next.js", "Node.js/Express", "Database Design", "API Development"]
    },
    
    {
      title: "Ai Engineer",
      description: "Devlopes Ai Agents",
      
      features: ["Python Programming","Numpy, Pandas, Matplotlib","Basic Machine Learning (scikit-learn)","Data Cleaning & Preprocessing","Linear Algebra & Probability Basics","Understanding of Neural Networks","Data Handling","Git & Version Control"]
    }
  ];

  const stats = [
    { icon: Users, value: "10+", label: "Happy Clients" },
    { icon: CheckCircle, value: "15+", label: "Projects Completed" },
    { icon: Clock, value: "5+", label: "Years Experience" },
    { icon: Users, value: "2+", label: "Years Corporate Experience" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.send(
        'service_moyuigx',
        'template_tsxpegx',
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          title: formData.message,
        },
        'WubXtcoBGx7qU8it'
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Hire Me</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's work together to bring your ideas to life. I offer comprehensive development services tailored to your needs.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Services </h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full mx-auto">
                {services.map((service, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-purple-400/50 transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-white">{service.title}</CardTitle>
                      <CardDescription className="text-gray-300">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">Let's Start a Conversation</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  Contact me if you need Skilled Ai Engineer & Web Developer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
                        placeholder="Your name" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
                        placeholder="your@email.com" 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name/website</label>
                    <Input 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400" 
                      placeholder="e.g. www.ai" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Compose Message</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 min-h-[120px]" 
                      placeholder="Tell me about your project, timeline, and requirements..."
                      required
                    />
                  </div>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-600/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                      Failed to send message. Please try again or contact me directly.
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
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
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex md:hidden justify-center w-full px-4">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export default HireMe;
