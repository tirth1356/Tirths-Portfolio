import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SpotlightCard } from './ui/SpotlightCard';
import { GlobeSkills } from './GlobeSkills';
import { Code, Database, Sparkles, Brain, Globe, Terminal, Star, Award, BookOpen, Clock, Cpu, Hexagon, GraduationCap, Trophy } from 'lucide-react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const coreSkills = [
    { 
      name: 'Full-Stack Development', 
      experience: 'Advanced',
      years: '2+ years',
      projects: '10+ projects',
      description: 'Next.js, React.js, Node.js, Express.js, FastAPI, Flask, Django, REST APIs, TailwindCSS, Redux, WebSockets, HTML5, CSS3',
      icon: <Globe className="h-6 w-6 text-blue-500" />
    },
    { 
      name: 'Machine Learning & AI', 
      experience: 'Proficient',
      years: '1+ years',
      projects: '5+ projects',
      description: 'Scikit-Learn, TensorFlow, PyTorch, LangChain, Hugging Face, RAG Systems, Agentic AI',
      icon: <Brain className="h-6 w-6 text-red-500" />
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

  // Map technologies to images/placeholders inside the Dome Gallery
  const galleryItems = coreSkills.flatMap((category, catIdx) => 
    category.description.split(/,|\s*\|\s*/).map(tech => {
      const cleanName = tech.trim();
      const encodedText = encodeURIComponent(cleanName);
      return {
        // Generates a sleek dark gradient card displaying the skill name as text dynamically
        src: `https://dummyimage.com/400x600/030213/ececf0.png&text=${encodedText}`,
        alt: cleanName,
        label: cleanName
      };
    }).filter(t => t.alt.length > 0)
  );

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

  const activeSkill = coreSkills[selectedCategory];

  return (
    <section id="about" className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Drag the interactive globe to spin in any direction. Select categories to highlight specific skills.
          </p>
        </motion.div>

        {/* Side-by-Side Dynamic Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto mb-16">
          {/* Left Side: 3D Interactive Tag Globe */}
          <motion.div 
            className="lg:col-span-7 flex justify-center w-full h-[550px] overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlobeSkills
              skills={galleryItems.map(item => {
                const catIdx = coreSkills.findIndex(c => c.description.toLowerCase().includes(item.label.toLowerCase()));
                return { name: item.label, categoryIndex: catIdx !== -1 ? catIdx : 0 };
              })}
              selectedCategory={selectedCategory}
              radius={240}
            />
          </motion.div>

          {/* Right Side: Category Selection & Dynamic Detail Card */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill, index) => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedCategory(index)}
                  className={`text-xs px-3.5 py-2 rounded-lg border transition-all duration-300 ${
                    selectedCategory === index
                      ? 'bg-primary border-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 scale-105'
                      : 'bg-card/40 border-border/60 hover:bg-card/80 text-muted-foreground'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>

            {/* Dynamic Highlight Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <SpotlightCard className="w-full">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">{activeSkill.icon}</div>
                      <div>
                        <h4 className="text-xl font-medium mb-1.5">{activeSkill.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-2.5 py-0.5 ${getExperienceColor(activeSkill.experience)}`}
                        >
                          {getExperienceIcon(activeSkill.experience)}
                          <span className="ml-1.5">{activeSkill.experience}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Technologies Included:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeSkill.description.split(/,|\s*\|\s*/).map((tech) => {
                          const cleanTech = tech.trim();
                          if (!cleanTech) return null;
                          return (
                            <span 
                              key={cleanTech} 
                              className="text-xs px-2.5 py-1 rounded-md bg-muted border border-border/80 text-foreground font-medium"
                            >
                              {cleanTech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground border-t border-border/30 pt-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <strong>Experience:</strong> {activeSkill.years}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Code className="h-4 w-4" />
                        <strong>Projects:</strong> {activeSkill.problems || activeSkill.projects}
                      </span>
                    </div>
                  </CardContent>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

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