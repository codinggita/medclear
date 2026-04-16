import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2000 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    const startValue = 0;
    const endValue = value;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeOut);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function HeroPanel() {
  const totalBill = 42300;
  const expectedCost = 28400;
  const overcharge = 13900;
  const savings = Math.round((overcharge / totalBill) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#8D7B68]/10 to-[#A4907C]/10 rounded-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8D7B68]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ef4444]/5 rounded-full blur-3xl" />

      <div className="relative premium-card rounded-3xl p-6 md:p-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ef4444]/10 text-[#ef4444] text-sm font-medium mb-4"
            >
              <AlertTriangle size={16} />
              Overcharge Detected
            </motion.div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] mb-6">
              Your Medical Bill Analysis
            </h2>

            <p className="text-[#8D7B68] text-lg max-w-xl">
              We analyzed your hospital bill and found significant discrepancies. 
              Here's what you should actually pay.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="glass-card rounded-2xl p-6 min-w-[180px]"
            >
              <div className="flex items-center gap-2 text-[#8D7B68] mb-2">
                <DollarSign size={18} />
                <span className="text-sm font-medium">Total Bill</span>
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                <AnimatedNumber value={totalBill} prefix="₹" />
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="glass-card rounded-2xl p-6 min-w-[180px] glow-blue"
              >
                <div className="flex items-center gap-2 text-[#2563eb] mb-2">
                  <TrendingDown size={18} />
                  <span className="text-sm font-medium">Expected Cost</span>
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-[#2563eb]">
                  <AnimatedNumber value={expectedCost} prefix="₹" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="glass-card rounded-2xl p-6 min-w-[180px] glow-red"
              >
                <div className="flex items-center gap-2 text-[#ef4444] mb-2">
                  <AlertTriangle size={18} />
                  <span className="text-sm font-medium">You Were Overcharged</span>
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-[#ef4444]">
                  <AnimatedNumber value={overcharge} prefix="₹" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <div className="flex items-center gap-2 text-[#22c55e]">
            <span className="text-4xl font-bold"><AnimatedNumber value={savings} suffix="%" /></span>
            <span className="text-sm">Potential Savings</span>
          </div>
          <ArrowDown size={20} className="text-[#8D7B68]" />
          <div className="px-4 py-2 rounded-full bg-[#22c55e]/10 text-[#22c55e] font-medium">
            Save ₹{overcharge.toLocaleString()} Now
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}