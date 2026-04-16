import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  PiggyBank, 
  AlertTriangle, 
  TrendingDown, 
  Pill, 
  Building2,
  ArrowRight,
  Sparkles,
  Shield
} from 'lucide-react';

const insightsData = [
  {
    id: 1,
    type: 'savings',
    icon: PiggyBank,
    title: 'You saved ₹12,400 this year',
    description: 'Based on 47 bills analyzed, you\'ve avoided ₹12,400 in overcharges.',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.1)'
  },
  {
    id: 2,
    type: 'alert',
    icon: AlertTriangle,
    title: 'Hospital charges 30% higher',
    description: 'Apollo Hospital charges 30% more than government-mandated rates.',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)'
  },
  {
    id: 3,
    type: 'recommendation',
    icon: Pill,
    title: 'Switch to generic medicines',
    description: '8 branded medicines have generic equivalents at 60% lower cost.',
    color: '#2563eb',
    bgColor: 'rgba(37, 99, 235, 0.1)'
  },
  {
    id: 4,
    type: 'trend',
    icon: TrendingDown,
    title: 'Lab test costs trending down',
    description: 'Your lab test expenses decreased by 18% compared to last year.',
    color: '#8D7B68',
    bgColor: 'rgba(141, 123, 104, 0.1)'
  },
  {
    id: 5,
    type: 'hospital',
    icon: Building2,
    title: 'Better option nearby',
    description: 'Max Hospital is 2km away with same MRI at 40% lower cost.',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)'
  },
  {
    id: 6,
    type: 'tip',
    icon: Sparkles,
    title: 'Insurance claim tip',
    description: 'You can claim ₹8,500 more by including rejected line items.',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)'
  }
];

export default function InsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold" style={{ color: '#1a1a1a' }}>
            Smart Insights
          </h3>
          <div className="px-2 py-0.5 rounded-full bg-[#8D7B68]/10 text-xs font-medium" style={{ color: '#8D7B68' }}>
            AI
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          className="flex items-center gap-1 text-xs font-medium" style={{ color: '#8D7B68' }}
        >
          View All
          <ArrowRight size={12} />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {insightsData.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + index * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="group relative p-4 rounded-xl cursor-pointer"
              style={{ 
                background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(200,182,166,0.25))',
                border: '1px solid rgba(141, 123, 104, 0.12)'
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: insight.bgColor }}>
                  <Icon size={16} style={{ color: insight.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold mb-1" style={{ color: '#1a1a1a' }}>
                    {insight.title}
                  </h4>
                  <p className="text-xs text-[#8D7B68]/80 leading-relaxed line-clamp-2">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-4 flex items-center justify-center gap-2 p-3 rounded-lg"
        style={{ 
          background: 'linear-gradient(145deg, rgba(255,255,255,0.6), rgba(200,182,166,0.2))',
          border: '1px solid rgba(141, 123, 104, 0.12)'
        }}
      >
        <Shield size={14} className="text-[#22c55e]" />
        <span className="text-xs" style={{ color: '#6b6b6b' }}>
          <span className="font-semibold">Privacy First:</span> Your data is encrypted
        </span>
      </motion.div>
    </motion.div>
  );
}
