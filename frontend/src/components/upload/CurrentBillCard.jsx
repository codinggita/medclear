import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, AlertTriangle, ArrowDown } from 'lucide-react';

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

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
}

export default function CurrentBillCard({ totalBill = 45800, expectedCost = 31200, overcharge = 14600 }) {
  const savingsPercent = Math.round((overcharge / totalBill) * 100);

  const cardData = [
    {
      label: 'Total Bill',
      value: totalBill,
      prefix: '₹',
      icon: DollarSign,
      color: '#1a1a1a',
      bgColor: 'rgba(141, 123, 104, 0.1)'
    },
    {
      label: 'Expected Cost',
      value: expectedCost,
      prefix: '₹',
      icon: TrendingDown,
      color: '#2563eb',
      bgColor: 'rgba(37, 99, 235, 0.1)'
    },
    {
      label: 'Overcharge',
      value: overcharge,
      prefix: '₹',
      icon: AlertTriangle,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(200,182,166,0.3))' }}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#8D7B68]/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ef4444]/5 rounded-full blur-xl" />

        <div className="relative p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold" style={{ color: '#1a1a1a' }}>
                Current Analysis
              </h3>
              <p className="text-xs text-[#8D7B68]/70 mt-0.5">Apollo Hospital - Bill #48291</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#ef4444]/10 text-xs font-semibold" style={{ color: '#ef4444' }}>
              {savingsPercent}% Overcharged
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {cardData.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: card.bgColor }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon size={14} style={{ color: card.color }} />
                    <span className="text-xs font-medium" style={{ color: card.color }}>
                      {card.label}
                    </span>
                  </div>
                  <div className="text-xl font-bold" style={{ color: card.color }}>
                    <AnimatedNumber value={card.value} prefix={card.prefix} duration={1500} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-[#8D7B68]/15"
          >
            <div className="flex items-center gap-2 text-[#22c55e]">
              <span className="text-lg font-bold"><AnimatedNumber value={savingsPercent} suffix="%" duration={1200} /></span>
              <span className="text-xs">Potential Savings</span>
            </div>
            <ArrowDown size={14} className="text-[#8D7B68]" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-full bg-[#22c55e]/10 text-xs font-semibold"
              style={{ color: '#22c55e' }}
            >
              Save ₹{overcharge.toLocaleString()}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
