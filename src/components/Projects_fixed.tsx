import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import type { ReactNode, JSX } from 'react';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { SpotlightCard } from './ui/SpotlightCard';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Bot, 
  Brain, 
  Globe, 
  TrendingUp, 
  ShoppingCart, 
  Github, 
  ExternalLink,
  Code,
  Sparkles
} from 'lucide-react';

export function Projects() {
  const ref = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const getThumbnail = (categories: string[], icon: ReactNode) => {
    type ThemeConfig = {
      gradient: string;
      accent: string;
      pattern: JSX.Element;
      ring: string;
    };
    const themes: Record<string, ThemeConfig> = {
      'Blockchain': {
        gradient: 'from-violet-900/80 via-purple-800/60 to-indigo-900/80',
        accent: 'bg-violet-400/20 border-violet-400/40',
        ring: 'text-violet-300',
        pattern: (
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="bc" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><rect x="8" y="8" width="12" height="12" fill="none" stroke="#a78bfa" strokeWidth="0.8"/><line x1="14" y1="0" x2="14" y2="8" stroke="#a78bfa" strokeWidth="0.5"/><line x1="14" y1="20" x2="14" y2="28" stroke="#a78bfa" strokeWidth="0.5"/><line x1="0" y1="14" x2="8" y2="14" stroke="#a78bfa" strokeWidth="0.5"/><line x1="20" y1="14" x2="28" y2="14" stroke="#a78bfa" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#bc)"/>
          </svg>
        )
      },
      'AI/ML': {
        gradient: 'from-cyan-900/80 via-sky-800/60 to-blue-900/80',
        accent: 'bg-cyan-400/20 border-cyan-400/40',
        ring: 'text-cyan-300',
        pattern: (
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ai" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="#67e8f9"/><circle cx="0" cy="0" r="1" fill="#67e8f9" opacity="0.5"/><circle cx="20" cy="0" r="1" fill="#67e8f9" opacity="0.5"/><circle cx="0" cy="20" r="1" fill="#67e8f9" opacity="0.5"/><circle cx="20" cy="20" r="1" fill="#67e8f9" opacity="0.5"/><line x1="0" y1="0" x2="10" y2="10" stroke="#67e8f9" strokeWidth="0.3" opacity="0.4"/><line x1="20" y1="0" x2="10" y2="10" stroke="#67e8f9" strokeWidth="0.3" opacity="0.4"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#ai)"/>
          </svg>
        )
      },
      'Full-Stack': {
        gradient: 'from-emerald-900/80 via-green-800/60 to-teal-900/80',
        accent: 'bg-emerald-400/20 border-emerald-400/40',
        ring: 'text-emerald-300',
        pattern: (
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="fs" x="0" y="0" width="40" height="10" patternUnits="userSpaceOnUse"><path d="M0 5 Q10 0 20 5 Q30 10 40 5" fill="none" stroke="#6ee7b7" strokeWidth="0.8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#fs)"/>
          </svg>
        )
      },
      'Enterprise': {
        gradient: 'from-amber-900/80 via-orange-800/60 to-yellow-900/80',
        accent: 'bg-amber-400/20 border-amber-400/40',
        ring: 'text-amber-300',
        pattern: (
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="en" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="30" y2="0" stroke="#fcd34d" strokeWidth="0.5"/><line x1="0" y1="10" x2="30" y2="10" stroke="#fcd34d" strokeWidth="0.3"/><line x1="0" y1="20" x2="30" y2="20" stroke="#fcd34d" strokeWidth="0.3"/><line x1="0" y1="0" x2="0" y2="30" stroke="#fcd34d" strokeWidth="0.5"/><line x1="10" y1="0" x2="10" y2="30" stroke="#fcd34d" strokeWidth="0.3"/><line x1="20" y1="0" x2="20" y2="30" stroke="#fcd34d" strokeWidth="0.3"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#en)"/>
          </svg>
        )
      },
      'Urban-AI': {
        gradient: 'from-sky-900/80 via-blue-800/60 to-indigo-900/80',
        accent: 'bg-sky-400/20 border-sky-400/40',
        ring: 'text-sky-300',
        pattern: (
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ua" x="0" y="0" width="34.64" height="20" patternUnits="userSpaceOnUse"><polygon points="17.32,0 34.64,10 34.64,10 17.32,20 0,10" fill="none" stroke="#7dd3fc" strokeWidth="0.6"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#ua)"/>
          </svg>
        )
      },
      'Data Science': {
        gradient: 'from-rose-900/80 via-pink-800/60 to-fuchsia-900/80',
        accent: 'bg-rose-400/20 border-rose-400/40',
        ring: 'text-rose-300',
        pattern: (
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ds" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="3" fill="none" stroke="#fb7185" strokeWidth="0.6"/><circle cx="8" cy="8" r="1" fill="#fb7185" opacity="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#ds)"/>
          </svg>
        )
      },
    };
    const primaryCat = categories.find(c => themes[c]) || categories[0];
    const theme = themes[primaryCat] || {
      gradient: 'from-slate-900/80 via-gray-800/60 to-zinc-900/80',
      accent: 'bg-slate-400/20 border-slate-400/40',
      ring: 'text-slate-300',
      pattern: (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="def" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="#94a3b8"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#def)"/>
        </svg>
      )
    };
    return (
      <div className={`relative h-36 w-full rounded-t-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center overflow-hidden`}>
        {theme.pattern}
        {/* Glowing orb */}
        <div className="absolute top-2 right-3 w-16 h-16 rounded-full blur-2xl opacity-30 bg-white" />
        <div className={`relative p-4 rounded-2xl border backdrop-blur-sm ${theme.accent} shadow-lg`}>
          <div className={theme.ring}>{icon}</div>
        </div>
        {/* Category chip */}
        <div className="absolute bottom-2 right-3 flex gap-1">
          {categories.slice(0, 2).map(c => (
            <span key={c} className={`text-[9px] px-1.5 py-0.5 rounded-full border ${theme.accent} ${theme.ring} font-medium opacity-90`}>{c}</span>
          ))}
        </div>
      </div>
    );
  };

  const projects = [
    {
      title: 'AlertX — Stampede Prevention & Crowd AI',
      description: 'AI-powered crowd intelligence and stampede prevention system for high-density public events',
      longDescription: 'AlertX is an AI-driven crowd monitoring and early warning platform designed to prevent stampedes and crowd disasters in pilgrimage sites, stadiums, and major festivals. Computes Crowd Pressure Index (CPI), forecasts risk zones 45 mins in advance, and provides sub-100ms LLM-powered emergency directives.',
      icon: <Brain className="h-6 w-6 text-amber-500" />,
      tech: ['Python', 'Machine Learning', 'Crowd Analytics', 'LLMs', 'WebSockets', 'FastAPI', 'React'],
      features: [
        'Real-time calculation of Crowd Pressure Index (CPI) and congestion metrics',
        'Machine learning predictive risk forecasting up to 45 minutes in advance',
        'AI-powered tactical emergency coordination & agency-specific directives',
        'Operational Command Center with multi-location centralized dashboard',
        'High-performance architecture with WebSockets & sub-100ms inference pipeline'
      ],
      categories: ['AI/ML', 'Full-Stack'],
      status: 'Active',
      achievement: '🛡️ AI Safety & Crowd Intelligence',
      github: 'https://github.com/tirth1356/stampede-prevention-ai',
      live: 'https://www.youtube.com/watch?v=x0mNapiKdto'
    },
    {
      title: 'Dhruva — Decentralized Credential Verification',
      description: '🏆 Hackathon Winner: Blockchain-based SSI system for secure credentials',
      longDescription: 'Winner of Codeversity Hackathon at IIT Gandhinagar (₹30,000 prize). Built a comprehensive blockchain-based Self-Sovereign Identity (SSI) system enabling secure, decentralized credential verification. Implemented advanced smart contracts with revocation and expiry mechanisms, JWT authentication, and optimized on-chain storage patterns.',
      icon: <Bot className="h-6 w-6" />,
      tech: ['Solidity', 'Blockchain', 'Smart Contracts', 'JWT', 'Web3.js', 'CI/CD', 'SSI'],
      features: [
        'Blockchain-based Self-Sovereign Identity (SSI) architecture',
        'Smart contracts with credential revocation and expiry system',
        'JWT authentication and secure token management',
        'Optimized on-chain storage for gas efficiency',
        'CI/CD pipeline for automated testing and deployment',
        'Won ₹30,000 prize at IIT Gandhinagar hackathon'
      ],
      categories: ['Blockchain', 'AI/ML', 'Full-Stack'],
      status: 'Completed',
      achievement: '🏆 Hackathon Winner',
      github: 'https://github.com/tirth1356/Dhruva/',
      live: undefined
    },
    {
      title: 'Vayu AI — Gujarat AQI Proactive Platform',
      description: 'Urban Air Quality Intelligence Platform for Gujarat with multi-agent AI and predictive analytics',
      longDescription: 'Urban Air Quality Intelligence & Intervention Suite tailored for 32 major urban & industrial nodes across Gujarat. Integrates multi-agent AI (Groq Llama-3.1), hyperlocal 72-hour dispersion forecasting, policy intervention simulator (Odd-Even, Scrubber Audits), automated municipal enforcement directives, and 24/7 multilingual citizen support (English, Gujarati, Hindi).',
      icon: <Globe className="h-6 w-6" />,
      tech: ['Next.js 16', 'FastAPI', 'Groq AI', 'Llama 3.1', 'PostgreSQL', 'TailwindCSS', 'Python'],
      features: [
        'Geospatial Pollution Source Attribution across 15 high-impact Gujarat clusters',
        'Hyperlocal 72-Hour Dispersion Forecasting & Policy Intervention Simulator',
        'Automated Municipal Enforcement Intelligence & Directive Dispatch Generation',
        'Multi-City Benchmarking & Comparative Analytics Matrix across 32 urban nodes',
        '24/7 Multilingual AI Support in English, Gujarati, and Hindi'
      ],
      categories: ['Urban-AI', 'AI/ML', 'Full-Stack'],
      status: 'Active',
      achievement: '🚀 Live Production App',
      github: 'https://github.com/tirth1356/Gujarat-AQI-Proactive-Platform',
      live: 'https://gujarat-aqi-platform.vercel.app/'
    },
    {
      title: 'CityView — Urban Intelligence Platform',
      description: '🏆 Top 10 Ahmedabad University - Integrated Urban Intelligence Orchestrator for Ahmedabad city with real-time analytics and AI insights',
      longDescription: 'Top 10 project at Ahmedabad University Hackathon. CityView is a comprehensive urban management dashboard providing real-time analytics, AI-powered insights for traffic, AQI, infrastructure monitoring, and comprehensive city management tools for Ahmedabad.',
      icon: <Globe className="h-6 w-6" />,
      tech: ['Django', 'React', 'AI/ML', 'PostgreSQL', 'TomTom API', 'Real-time Analytics'],
      features: [
        'Real-time city analytics dashboard for Ahmedabad',
        'AI-powered insights and predictive analytics',
        'Traffic, AQI, and infrastructure monitoring',
        'Comprehensive urban management tools',
        'Interactive geospatial visualizations',
        'Top 10 at Ahmedabad University Hackathon'
      ],
      categories: ['Urban-AI', 'Full-Stack'],
      status: 'Completed',
      achievement: '🏆 Top 10 University Hackathon',
      github: 'https://github.com/tirth1356/Urban-Intelligence-platform'
    },
    {
      title: 'Quizify — AI Quiz Generation Platform',
      description: '🏆 15th out of 700 teams @ GDG Gandhinagar Hackathon - Intelligent quiz system with adaptive testing and weak-point analysis',
      longDescription: '15th position out of 700 teams at GDG Gandhinagar Hackathon. AI-powered quiz generation platform that creates customized quizzes from any concept or topic. Features weak-point analysis to identify knowledge gaps, adaptive testing that adjusts difficulty, and fast response times (1-8 seconds) for seamless user experience.',
      icon: <Brain className="h-6 w-6" />,
      tech: ['AI/ML', 'Python', 'NLP', 'React', 'Fast API', 'Adaptive Algorithms'],
      features: [
        'AI-driven quiz generation from any concept or topic',
        'Weak-point analysis to identify knowledge gaps',
        'Adaptive testing with dynamic difficulty adjustment',
        'Fast response time: 1-8 seconds per quiz generation',
        'Personalized learning recommendations',
        'Progress tracking and analytics dashboard'
      ],
      categories: ['AI/ML', 'Full-Stack'],
      status: 'Active',
      achievement: '🏆 15th/700 - GDG Gandhinagar',
      github: 'https://github.com/tirth1356/Quizify'
    },
    {
      title: 'FormatIX — AI Research Paper Formatter',
      description: '🏆 Top 5 in Track @ Hackathon - Production-grade, privacy-first agentic AI system that automatically converts research papers into correct journal formatting',
      longDescription: 'FormatIX is a production-grade, privacy-first agentic AI system that automatically converts research papers into correct journal formatting. Researchers upload a manuscript (DOCX, PDF, or TXT); the system parses it, detects structure, extracts formatting rules, applies journal formatting, validates citations, and generates a formatted DOCX. All formatting decisions are explainable.',
      icon: <Sparkles className="h-6 w-6" />,
      tech: ['AI/ML', 'Python', 'NLP', 'Agentic AI', 'Document Processing', 'Research'],
      features: [
        'Automatic manuscript parsing (DOCX, PDF, TXT)',
        'Structure detection and formatting rule extraction',
        'Journal-specific formatting application',
        'Citation validation and processing',
        'Explainable formatting decisions',
        'Privacy-first architecture'
      ],
      categories: ['AI/ML', 'Full-Stack'],
      status: 'Completed',
      achievement: '🏆 Top 5 in Track',
      github: 'https://github.com/tirth1356/formatix'
    },
    {
      title: 'CivicFlow — Urban Intelligence Platform',
      description: '🏆 GDG Nirma Finalist - Real-time urban data dashboard with AI forecasting',
      longDescription: 'GDG Nirma Finalist. Comprehensive urban intelligence platform providing real-time monitoring of Air Quality Index (AQI), traffic patterns, and infrastructure data. Integrated TomTom APIs for geospatial analytics, implemented AI-based forecasting models, and built responsive dashboard for city planners and citizens.',
      icon: <Globe className="h-6 w-6" />,
      tech: ['Django', 'PostgreSQL', 'React', 'TomTom API', 'AI Forecasting', 'Geospatial'],
      features: [
        'Real-time AQI monitoring and air quality visualization',
        'Traffic pattern analysis with TomTom API integration',
        'Infrastructure data aggregation and display',
        'AI-powered forecasting for urban planning',
        'Geospatial analytics with interactive maps',
        'Responsive dashboard for multi-device access'
      ],
      categories: ['Urban-AI', 'Full-Stack'],
      status: 'Completed',
      achievement: '🏆 GDG Nirma Finalist',
      github: 'https://github.com/tirth1356/CivicFlow'
    },
    {
      title: 'ESGResolve — AI ESG Intelligence Platform',
      description: '🏆 Pitched to Dean Silver Oak (Top 15) @ GDG Gandhinagar Hackathon - Enterprise AI platform for ESG scoring and sustainability roadmaps',
      longDescription: 'Pitched to Dean Silver Oak and secured Top 15 position at GDG Gandhinagar Hackathon. Built an AI-powered ESG (Environmental, Social, Governance) intelligence platform that provides automated scoring, recommendations, and roadmap generation for businesses. Features intelligent chatbot for ESG queries, scalable enterprise architecture, and secure data handling for sensitive business information.',
      icon: <TrendingUp className="h-6 w-6" />,
      tech: ['AI/ML', 'Python', 'NLP', 'React', 'Node.js', 'Enterprise Architecture'],
      features: [
        'AI-powered ESG scoring system with multi-factor analysis',
        'Intelligent chatbot for ESG compliance queries',
        'Automated sustainability roadmap generator',
        'Scalable and secure enterprise-grade architecture',
        'Real-time recommendations based on industry standards',
        'Data visualization dashboard for ESG metrics'
      ],
      categories: ['AI/ML', 'Urban-AI', 'Full-Stack'],
      status: 'Completed',
      achievement: '🏆 Top 15 - Pitched to Dean',
      github: 'https://github.com/tirth1356/tirth1356-ESGResolve_Platform'
    },
    {
      title: 'Hand Gesture Game Controller',
      description: 'Ultra-responsive zero-latency computer vision controller for 4-directional keyboard games',
      longDescription: 'An ultra-responsive, zero-latency computer vision hand gesture controller built with Python, OpenCV, and MediaPipe. Specifically optimized for games like Subway Surfers, Temple Run, or any 4-directional keyboard-controlled game with real-time hand tracking and key simulation.',
      icon: <Bot className="h-6 w-6" />,
      tech: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'PyAutoGUI'],
      features: [
        'Zero-latency real-time hand gesture detection',
        'Optimized for Subway Surfers, Temple Run, & 4-directional games',
        'Computer vision pipeline powered by OpenCV & MediaPipe landmark tracking',
        'Customizable gesture mapping for keyboard key bindings'
      ],
      categories: ['AI/ML'],
      status: 'Completed',
      achievement: '🎮 Computer Vision Fun Project',
      github: 'https://github.com/tirth1356/hand-gesture-controller'
    },
    {
      title: 'RepoMaster',
      description: '🏆 Finalist - Advanced repository management and collaboration platform',
      longDescription: 'Finalist in hackathon competition. Comprehensive GitHub repository management system with advanced features for developers and teams. Streamlined workflow automation, collaboration tools, and analytics for efficient repository management.',
      icon: <Code className="h-6 w-6" />,
      tech: ['React', 'Node.js', 'Python', 'MongoDB', 'GitHub API', 'Automation'],
      features: [
        'Advanced repository management interface',
        'Workflow automation and CI/CD integration',
        'Team collaboration and access controls',
        'Repository analytics and insights',
        'GitHub API powered real-time sync',
        'Multi-repo management dashboard'
      ],
      categories: ['Full-Stack', 'AI/ML'],
      status: 'Completed',
      achievement: '🏆 Finalist , Unsaid Talks',
      github: 'https://github.com/tirth1356/RepoMaster'
    },
    {
      title: 'GoodStock — Enterprise Inventory Management',
      description: 'Odoo-based enterprise inventory system (odoo_coreinv)',
      longDescription: 'Enterprise-grade inventory management system built on Odoo framework. Comprehensive stock tracking, warehouse management, procurement automation, and reporting for large-scale inventory operations.',
      icon: <ShoppingCart className="h-6 w-6" />,
      tech: ['Odoo', 'Python', 'PostgreSQL', 'ERP', 'Warehouse Management', 'Automation'],
      features: [
        'Enterprise inventory tracking and management',
        'Multi-warehouse stock synchronization',
        'Automated procurement and reorder system',
        'Advanced reporting and analytics',
        'Odoo framework with custom modules',
        'Scalable for large enterprise operations'
      ],
      categories: ['Enterprise', 'Full-Stack'],
      status: 'Completed',
      github: 'https://github.com/tirth1356/odoo_coreinv'
    },
    {
      title: 'Data Science Club Platform',
      description: 'Full-stack platform serving 500+ students with events and resources',
      longDescription: 'Designed and deployed the official Data Science Club platform at Nirma University (dsc-itnu.vercel.app). Built scalable backend with optimized REST APIs, implemented event management system, resource library, and member dashboard. Currently serving 500+ active students.',
      icon: <Code className="h-6 w-6" />,
      tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Vercel'],
      features: [
        'Full-stack platform with modern tech stack',
        'Scalable backend architecture with REST APIs',
        'Event management and registration system',
        'Resource library with categorized content',
        'Member dashboard and profile management',
        'Deployed on Vercel serving 500+ students'
      ],
      categories: ['Full-Stack', 'Data Science'],
      status: 'Active',
      github: 'https://github.com/tirth1356/dsc-website',
      live: 'https://dsc-itnu.vercel.app/'
    }
  ];

  const categories = ['All', 'Blockchain', 'AI/ML', 'Full-Stack', 'Data Science', 'Enterprise', 'Urban-AI'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(activeCategory));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Blockchain': return <Sparkles className="h-4 w-4" />;
      case 'AI/ML': return <Bot className="h-4 w-4" />;
      case 'Full-Stack': return <Globe className="h-4 w-4" />;
      case 'Data Science': return <TrendingUp className="h-4 w-4" />;
      case 'Enterprise': return <ShoppingCart className="h-4 w-4" />;
      case 'Urban-AI': return <Globe className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hackathon-winning AI platforms, full-stack applications, and urban intelligence systems —
            showcasing technical depth and real-world impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="flex items-center gap-2"
            >
              {category !== 'All' && getCategoryIcon(category)}
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group h-full"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-full cursor-pointer">
                    <SpotlightCard className="h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden flex flex-col">
                      {getThumbnail(project.categories, project.icon)}
                      <CardHeader>
                        <div className="flex flex-col items-end gap-1 mb-2">
                          <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className="text-xs">{project.status}</Badge>
                          {'achievement' in project && project.achievement && <Badge variant="outline" className="text-xs bg-yellow-500/10 border-yellow-500/20">{project.achievement}</Badge>}
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors text-lg">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3 mt-auto">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((tech) => <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>)}
                          {project.tech.length > 3 && <Badge variant="outline" className="text-xs">+{project.tech.length - 3} more</Badge>}
                        </div>
                        <Button variant="default" size="sm" className="w-full mt-2">
                          View Details
                        </Button>
                      </CardContent>
                    </SpotlightCard>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto z-50">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                      {project.icon}
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{project.longDescription}</p>
                    <div>
                      <h4 className="mb-2 font-semibold">Key Features:</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      {'github' in project && project.github ? (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full"><Github className="mr-2 h-4 w-4" />View Code</Button>
                        </a>
                      ) : (
                        <button disabled className="flex-1 opacity-50 cursor-not-allowed inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-9 px-4 py-2"><Github className="mr-2 h-4 w-4" />Code Private</button>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" className="w-full"><ExternalLink className="mr-2 h-4 w-4" />Live Demo</Button>
                        </a>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
