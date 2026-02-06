import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Lightbulb, MessageSquare } from 'lucide-react';

interface FeedbackCardProps {
  type: 'strength' | 'gap' | 'fix' | 'perception';
  items: string[];
  title: string;
  delay?: number;
}

const cardStyles = {
  strength: {
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  gap: {
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  fix: {
    icon: Lightbulb,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  perception: {
    icon: MessageSquare,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
};

export function FeedbackCard({ type, items, title, delay = 0 }: FeedbackCardProps) {
  const style = cardStyles[type];
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`p-5 rounded-xl border ${style.bgColor} ${style.borderColor}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-5 w-5 ${style.iconColor}`} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + index * 0.1 }}
            className="text-sm text-foreground/80 flex items-start gap-2"
          >
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${style.iconColor.replace('text-', 'bg-')}`} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
