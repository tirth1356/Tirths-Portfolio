import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SpotlightCard } from './ui/SpotlightCard';
import { MagicBento } from './ui/MagicBento';
import { Code, Database, Sparkles, Brain, Globe, Terminal, Star, Award, BookOpen, Clock, Cpu, Hexagon, GraduationCap, Trophy } from 'lucide-react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code className="h-5 w-5" />,
      skills: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL']
    },
    {
      title: 'Web & Backend',
      icon: <Globe className="h-5 w-5" />,
      skills: ['FastAPI', 'Flask', 'Django', 'Next.js', 'React.js', 'Node.js', 'Express.js', 'REST APIs']
    },
    {
      title: 'Databases & Cloud',
      icon: <Database className="h-5 w-5" />,
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'AWS']
    },
    {
      title: 'DevOps & Tools',
      icon: <Terminal className="h-5 w-5" />,
      skills: ['Docker', 'Kubernetes', 'Git', 'Linux', 'GitHub Actions', 'CI/CD', 'Postman', 'Cursor', 'Claude Code', 'Windsurf']
    },
    {
      title: 'Machine Learning & AI',
      icon: <Brain className="h-5 w-5" />,
      skills: ['Scikit-Learn', 'TensorFlow', 'PyTorch', 'LangChain', 'Hugging Face', 'RAG Systems', 'Agentic AI']
    },
    {
      title: 'Core CS',
      icon: <Sparkles className="h-5 w-5" />,
      skills: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems']
    }
  ];

  const coreSkills = [
    { 
      name: 'Machine Learning & AI', 
      experience: 'Proficient',
      years: '1+ years',
      projects: '5+ projects',
      description: 'Scikit-Learn, TensorFlow, PyTorch, LangChain, Hugging Face, RAG Systems, Agentic AI',
      icon: <Brain className="h-6 w-6 text-red-500" />
    },
    { 
      name: 'Web & Backend', 
      experience: 'Advanced',
      years: '2+ years',
      projects: '8+ projects',
      description: 'FastAPI, Flask, Django, Next.js, React.js, Node.js, Express.js, REST APIs',
      icon: <Globe className="h-6 w-6 text-blue-500" />
    },
    { 
      name: 'DevOps & Tools', 
      experience: 'Proficient',
      years: '2+ years',
      projects: '8+ projects',
      description: 'Docker, Kubernetes, Git, Linux, GitHub Actions, CI/CD, Cursor, Windsurf',
      icon: <Cpu className="h-6 w-6 text-green-500" />
    },
    { 
      name: 'Databases & Cloud', 
      experience: 'Proficient',
      years: '2+ years',
      projects: '6+ projects',
      description: 'PostgreSQL, MySQL, MongoDB, Firebase, AWS - Scalable data architecture',
      icon: <Database className="h-6 w-6 text-cyan-500" />
    },
    { 
      name: 'Languages & Core CS', 
      experience: 'Advanced',
      years: '3+ years',
      problems: '500+ problems',
      description: 'Python, Java, C++, JS, TS, SQL | DSA, OOP, DBMS, Operating Systems',
      icon: <Trophy className="h-6 w-6 text-yellow-500" />
    },
    { 
      name: 'Blockchain & Web3', 
      experience: 'Learning',
      years: '1+ years',
      projects: '3+ projects',
      description: 'Solidity smart contracts, decentralized systems, SSI platforms',
      icon: <Hexagon className="h-6 w-6 text-purple-500" />
    }
  ];

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Expert': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Advanced': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Proficient': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'Learning': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getExperienceIcon = (experience: string) => {
    switch (experience) {
      case 'Expert': return <Star className="h-4 w-4" />;
      case 'Advanced': return <Award className="h-4 w-4" />;
      case 'Proficient': return <BookOpen className="h-4 w-4" />;
      case 'Learning': return <GraduationCap className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A unified view of my technology stack, expertise levels, and hands-on experience.
          </p>
        </motion.div>

        {/* Unified Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <SpotlightCard className="h-full flex flex-col justify-between">
                  <CardContent className="p-6 flex flex-col h-full justify-between gap-4">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">{skill.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium mb-1">{skill.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs px-2 py-0.5 ${getExperienceColor(skill.experience)}`}
                          >
                            {getExperienceIcon(skill.experience)}
                            <span className="ml-1">{skill.experience}</span>
                          </Badge>
                        </div>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {skill.description.split(/,|\s*\|\s*/).map((tech) => {
                          const cleanTech = tech.trim();
                          if (!cleanTech) return null;
                          return (
                            <span 
                              key={cleanTech} 
                              className="text-[11px] px-2 py-0.5 rounded-md bg-muted/60 border border-border/50 text-muted-foreground font-medium"
                            >
                              {cleanTech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground border-t border-border/30 pt-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {skill.years}
                      </span>
                      <span className="flex items-center gap-1">
                        <Code className="h-3 w-3" />
                        {skill.problems || skill.projects}
                      </span>
                    </div>
                  </CardContent>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <SpotlightCard className="max-w-3xl mx-auto">
            <Card className="max-w-3xl mx-auto relative overflow-hidden bg-transparent border-0 shadow-none">
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <BookOpen className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <h3 className="text-xl">B.Tech in Computer Science and Engineering</h3>
                  <p className="text-muted-foreground">Nirma University, Ahmedabad, Gujarat</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      3rd Year
                    </span>
                    <span>•</span>
                    <span>Expected 2028</span>
                  </div>
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming, 
                      Database Management Systems, Operating Systems, Full Stack Development, Artificial Intelligence, Machine Learning
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SpotlightCard>
        </motion.div>

        {/* Skills Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Expert (4+ years)</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Advanced (2-3 years)</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span className="text-muted-foreground">Proficient (1-2 years)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}