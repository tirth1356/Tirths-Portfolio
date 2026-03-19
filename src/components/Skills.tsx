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
      title: 'Programming Languages',
      icon: <Code className="h-5 w-5" />,
      skills: ['Python', 'C++', 'JavaScript', 'TypeScript', 'Java', 'C', 'SQL']
    },
    {
      title: 'Web & Backend',
      icon: <Globe className="h-5 w-5" />,
      skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'REST APIs', 'Socket.io']
    },
    {
      title: 'Blockchain & Web3',
      icon: <Sparkles className="h-5 w-5" />,
      skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'Metamask', 'Remix IDE']
    },
    {
      title: 'AI & Machine Learning',
      icon: <Brain className="h-5 w-5" />,
      skills: ['TensorFlow', 'Machine Learning', 'AI Systems', 'Data Analysis']
    },
    {
      title: 'Databases',
      icon: <Database className="h-5 w-5" />,
      skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'Database Design']
    },
    {
      title: 'Tools & DevOps',
      icon: <Terminal className="h-5 w-5" />,
      skills: ['Git', 'Docker', 'Vercel', 'Postman', 'Linux', 'VS Code', 'CI/CD']
    }
  ];

  const coreSkills = [
    { 
      name: 'Full-Stack Development', 
      experience: 'Advanced',
      years: '2+ years',
      projects: '6+ projects',
      description: 'React, Next.js, Node.js, Express.js - End-to-end web applications',
      icon: <Globe className="h-6 w-6 text-blue-500" />
    },
    { 
      name: 'Blockchain & Web3', 
      experience: 'Learning',
      years: '1+ years',
      projects: '3+ projects',
      description: 'Solidity smart contracts, decentralized systems, SSI platforms',
      icon: <Hexagon className="h-6 w-6 text-purple-500" />
    },
    { 
      name: 'DevOps & Tools', 
      experience: 'Proficient',
      years: '2+ years',
      projects: '8+ projects',
      description: 'Docker, Git, CI/CD, Linux, Vercel, Postman — build, ship, automate',
      icon: <Cpu className="h-6 w-6 text-green-500" />
    },
    { 
      name: 'AI & Machine Learning', 
      experience: 'Proficient',
      years: '1+ years',
      projects: '4+ projects',
      description: 'TensorFlow, AI-powered systems, intelligent applications',
      icon: <Brain className="h-6 w-6 text-red-500" />
    },
    { 
      name: 'Competitive Programming', 
      experience: 'Learning',
      years: '1+ years',
      problems: '500+ problems',
      description: 'DSA - CodeChef 2★, LeetCode 1676, Codeforces Pupil',
      icon: <Trophy className="h-6 w-6 text-yellow-500" />
    },
    { 
      name: 'Database Systems', 
      experience: 'Proficient',
      years: '2+ years',
      projects: '5+ projects',
      description: 'MySQL, MongoDB, PostgreSQL - Scalable data architecture',
      icon: <Database className="h-6 w-6 text-cyan-500" />
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
            A comprehensive overview of my technical skills and areas of expertise, 
            developed through academic study and hands-on project experience.
          </p>
        </motion.div>

        {/* Core Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl mb-8 text-center">Core Technologies</h3>
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
                <SpotlightCard className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">{skill.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium mb-2">{skill.name}</h4>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge 
                            variant="outline" 
                            className={`text-xs px-2 py-1 ${getExperienceColor(skill.experience)}`}
                          >
                            {getExperienceIcon(skill.experience)}
                            <span className="ml-1">{skill.experience}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
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

        {/* Skill Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl mb-8 text-center">Technical Stack</h3>
          <MagicBento
            items={skillCategories.map(cat => ({
              title: cat.title,
              description: cat.skills.join(' · '),
              icon: cat.icon,
            }))}
          />
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
                    2nd Year
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
          transition={{ duration: 0.6, delay: 0.8 }}
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