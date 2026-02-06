import { motion } from 'framer-motion';
import { RoleInfo } from '@/types/assessment';
import { ArrowRight } from 'lucide-react';

interface RoleCardProps {
  role: RoleInfo;
  onClick: () => void;
  index: number;
}

export function RoleCard({ role, onClick, index }: RoleCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative w-full text-left p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{role.icon}</span>
          <motion.div
            className="p-2 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ x: 4 }}
          >
            <ArrowRight className="h-4 w-4 text-foreground" />
          </motion.div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {role.description}
        </p>
      </div>
    </motion.button>
  );
}
