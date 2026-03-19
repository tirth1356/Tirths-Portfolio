import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const getThumbnail = (categories: string[], icon: ReactNode) => {
    const gradients: Record<string, string> = {
      'Blockchain': 'from-violet-600/30 via-purple-500/20 to-indigo-600/30',
      'AI/ML': 'from-cyan-600/30 via-blue-500/20 to-teal-600/30',
      'Full-Stack': 'from-emerald-600/30 via-green-500/20 to-lime-600/30',
      'Enterprise': 'from-orange-600/30 via-amber-500/20 to-yellow-600/30',
      'Urban-AI': 'from-sky-600/30 via-blue-500/20 to-cyan-600/30',
      'Data Science': 'from-pink-600/30 via-rose-500/20 to-red-600/30',
    };
    const gradient = gradients[categories[0]] || 'from-slate-600/30 via-gray-500/20 to-zinc-600/30';
    return (
      <div className={`relative h-32 w-full rounded-t-lg bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden mb-0`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 scale-150">
          {icon}
        </div>
      </div>
    );
  };

  const projects = [
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
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hackathon-winning blockchain systems, AI-powered platforms, and full-stack applications
            showcasing technical depth and real-world impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="group"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-full cursor-pointer">
                    <SpotlightCard className="h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden flex flex-col">
                      {getThumbnail(project.categories, project.icon)}
                      <CardHeader>
                        <div className="flex flex-col items-end gap-1 mb-2">
                          <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className="text-xs">{project.status}</Badge>
                          {'achievement' in project && project.achievement && <Badge variant="outline" className="text-xs bg-yellow-500/10 border-yellow-500/20">{project.achievement}</Badge>}
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3 mt-auto">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((tech) => <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>)}
                          {project.tech.length > 3 && <Badge variant="outline" className="text-xs">+{project.tech.length - 3} more</Badge>}
                        </div>
                        <Button variant="default" size="sm" className="w-full">
                          View Details
                        </Button>
                      </CardContent>
                    </SpotlightCard>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      {project.icon}
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{project.longDescription}</p>
                    <div>
                      <h4 className="mb-2">Key Features:</h4>
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
                      <h4 className="mb-2">Technologies Used:</h4>
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
                        <Button disabled className="flex-1"><Github className="mr-2 h-4 w-4" />Code Private</Button>
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
