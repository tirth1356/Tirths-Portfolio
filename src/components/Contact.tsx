import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      href: 'https://github.com/tirth1356',
      color: 'hover:text-gray-800 dark:hover:text-gray-200',
      description: 'Check out my code'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tirth1356/',
      color: 'hover:text-blue-600',
      description: 'Connect professionally'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      href: 'mailto:tirthpatel1356@gmail.com',
      color: 'hover:text-primary',
      description: 'Send me a message'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simple mailto fallback - opens user's email client
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      window.location.href = `mailto:tirthpatel1356@gmail.com?subject=${subject}&body=${body}`;
      
      // Show success message
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 500);

    } catch (err) {
      console.error('Error:', err);
      setError('Please try contacting via email or LinkedIn directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, var(--primary) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl mb-4"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            style={{
              background: 'linear-gradient(90deg, var(--foreground), var(--primary), var(--foreground))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Get In Touch
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities, collaborations, and conversations about technology. 
            Let's connect via email or LinkedIn!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                Whether you're looking for a developer for your next project, want to discuss 
                blockchain or AI, or just want to connect, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">tirthpatel1356@gmail.com</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Best way to reach me for opportunities and collaborations.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="mb-6">Find me online</h4>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={social.href.startsWith('#') ? (e) => { e.preventDefault(); scrollToForm(); } : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border/30 hover:border-border transition-all duration-300 group cursor-pointer"
                  >
                    <motion.div 
                      className="p-3 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors"
                      whileHover={{ rotate: 5 }}
                    >
                      {social.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className={`font-medium transition-colors ${social.color}`}>
                        {social.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {social.description}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 bg-muted/20 rounded-lg border border-border/30"
            >
              <h4 className="mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Open to Opportunities
              </h4>
              <p className="text-sm text-muted-foreground">
                I'm actively seeking internships, full-time positions, and freelance projects in 
                full-stack development, blockchain, and AI/ML. Open to all roles.
              </p>
            </motion.div>
          </motion.div>


        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 max-w-2xl mx-auto p-6 bg-muted/30 rounded-lg border border-border/30 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Based in Ahmedabad, Gujarat · Open to all roles — offline (India) or remote &amp; hybrid (global) · Typically responds within 12 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}