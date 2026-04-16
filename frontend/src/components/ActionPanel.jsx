import { motion } from 'framer-motion';
import { Download, MessageSquare, Pill, Share2, Mail, Plus, Upload } from 'lucide-react';

const actions = [
  { 
    icon: Upload, 
    label: 'Upload New Bill', 
    description: 'Analyze your medical bill',
    color: '#2563eb',
    bg: 'bg-[#2563eb]',
  },
  { 
    icon: Download, 
    label: 'Download Report', 
    description: 'Get PDF with full analysis',
    color: '#8D7B68',
    bg: 'bg-[#8D7B68]',
  },
  { 
    icon: MessageSquare, 
    label: 'Raise Complaint', 
    description: 'File grievance with hospital',
    color: '#ef4444',
    bg: 'bg-[#ef4444]',
  },
  { 
    icon: Pill, 
    label: 'Find Generic Medicine', 
    description: 'Search cost-effective alternatives',
    color: '#22c55e',
    bg: 'bg-[#22c55e]',
  },
];

export default function ActionPanel({ onNavigateToUpload }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative lg:sticky lg:top-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#8D7B68]/10 to-[#A4907C]/10 rounded-3xl" />
      
      <div className="relative premium-card rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl text-[#1a1a1a]">
            Quick Actions
          </h3>
          <div className="w-8 h-8 rounded-full bg-[#8D7B68]/10 flex items-center justify-center">
            <Plus size={16} className="text-[#8D7B68]" />
          </div>
        </div>

        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-300 group"
              >
                <div className={`${action.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <span className="block font-medium text-[#1a1a1a]">
                    {action.label}
                  </span>
                  <span className="block text-xs text-[#8D7B68]">
                    {action.description}
                  </span>
                </div>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Share2 size={16} className="text-[#8D7B68]" />
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 pt-6 border-t border-[#C8B6A6]/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
              <Mail size={18} className="text-[#2563eb]" />
            </div>
            <div>
              <span className="block font-medium text-[#1a1a1a] text-sm">
                Need Help?
              </span>
              <span className="block text-xs text-[#8D7B68]">
                Contact our support team
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            Contact Support
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-[#8D7B68]">
            Last updated: Today, 10:30 AM
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}