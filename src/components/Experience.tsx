import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Badge } from './ui/badge';
import { Building, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    title: 'Tech Intern (Winter)',
    company: 'Bharat Space Education Research Center (BSERC)',
    date: 'Dec 2025 – Jan 2026',
    location: 'Remote',
    type: 'Internship',
    color: 'from-blue-500 to-cyan-500',
    dot: 'bg-blue-500',
    description: [
      'Engineered MATLAB models for UAV optimization — lift, drag, thrust, and velocity parameters',
      'Contributed to drone technology, aircraft design, and rocketry systems development',
      'Applied computational methods to aerospace engineering challenges',
    ],
    skills: ['MATLAB', 'Aerospace Engineering', 'UAV Systems', 'Computational Modeling'],
  },
  {
    title: 'Executive Member',
    company: 'Data Science Club, Nirma University',
    date: '2024 – Present',
    location: 'Ahmedabad',
    type: 'Technical Lead',
    color: 'from-purple-500 to-pink-500',
    dot: 'bg-purple-500',
    description: [
      'Built and deployed full-stack platform (dsc-itnu.vercel.app) serving 500+ students',
      'Designed scalable backend architecture with optimized REST APIs',
      'Led technical workshops on data science and web development',
    ],
    skills: ['React.js', 'Node.js', 'REST APIs', 'Full Stack', 'Leadership'],
    link: 'dsc-itnu.vercel.app',
  },
  {
    title: 'Executive Member',
    company: 'NSS SOT, Nirma University',
    date: '2024 – Present',
    location: 'Ahmedabad',
    type: 'Technical Lead',
    color: 'from-emerald-500 to-teal-500',
    dot: 'bg-emerald-500',
    description: [
      'Developed full-stack website with structured database and automated workflows',
      'Implemented efficient data management systems for student activities',
      'Coordinated technical initiatives for 200+ NSS volunteers',
    ],
    skills: ['Web Development', 'Database Design', 'Project Management', 'Communication'],
    link: 'nsssotitnu.vercel.app',
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center justify-center mb-16 last:mb-0">
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`absolute left-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full ${exp.dot} ring-4 ring-background shadow-lg`}
      />

      {/* Card — alternates left/right on md+ */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-[46%] ${isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}
      >
        {/* Connector line on md */}
        <div
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[4%] h-px bg-border ${
            isLeft ? 'left-[46%]' : 'right-[46%]'
          }`}
        />

        <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300 group">
          {/* Top gradient bar */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${exp.color}`} />

          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${exp.color} text-white`}>
              {exp.type}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {exp.date}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
            {exp.title}
          </h3>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Building className="h-3.5 w-3.5 flex-shrink-0" />
              {exp.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              {exp.location}
            </span>
            {exp.link && (
              <a
                href={`https://${exp.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                {exp.link}
              </a>
            )}
          </div>

          <ul className="space-y-2 mb-4">
            {exp.description.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${exp.dot}`} />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Experience & Leadership</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional internships and leadership roles where I've built impactful solutions,
            led technical initiatives, and contributed to organizational growth.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Static track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/40" />
          {/* Animated fill */}
          <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-0 w-px overflow-hidden" style={{ height: '100%' }}>
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500"
              style={{ height: lineHeight }}
            />
          </div>

          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
