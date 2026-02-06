import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, TrendingUp, Mic, FileText, Target, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleCard } from '@/components/RoleCard';
import { TARGET_ROLES } from '@/lib/constants';
import { Header } from '@/components/Header';
import { useState } from 'react';
import { TargetRole } from '@/types/assessment';

const features = [
  {
    icon: Mic,
    title: 'Voice Analysis',
    description: 'Real-time speech pattern analysis detects filler words, pace, and confidence',
  },
  {
    icon: TrendingUp,
    title: '4D Scoring',
    description: 'Evaluate Clarity, Confidence, Content, and Structure on a 100-point scale',
  },
  {
    icon: Target,
    title: 'Gap Detection',
    description: 'Identify missing skills and STAR method components instantly',
  },
  {
    icon: Sparkles,
    title: 'AI Feedback',
    description: 'Get personalized improvement roadmap powered by GPT-4',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<TargetRole | null>(null);

  const handleRoleSelect = (roleId: TargetRole) => {
    setSelectedRole(roleId);
    // Store in localStorage for now, will use context/backend later
    localStorage.setItem('targetRole', roleId);
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="container py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Interview Coach</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Know Your Interview
              <span className="text-gradient"> Readiness Score</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get instant feedback on your interview responses. Identify gaps, improve clarity, 
              and build confidence before facing recruiters.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="btn-gradient px-8 h-12 text-base"
                onClick={() => document.getElementById('role-select')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Assessment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 h-12 text-base"
                onClick={() => navigate('/resume')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Analyze Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section id="role-select" className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Select Your Target Role
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the role you're preparing for. We'll customize questions and evaluation 
              criteria based on industry standards.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {TARGET_ROLES.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                index={index}
                onClick={() => handleRoleSelect(role.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 text-center"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Ready to ace your next interview?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                Join thousands of candidates who improved their interview scores with PrepPulse.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="px-8"
                onClick={() => document.getElementById('role-select')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Free
              </Button>
            </div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 PrepPulse. Built for interview success.</p>
        </div>
      </footer>
    </div>
  );
}
