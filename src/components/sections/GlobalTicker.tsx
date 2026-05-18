import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const valueColorMap: Record<string, string> = {
  "text-sys-blue": "bg-sys-blue/10",
  "text-rose-red": "bg-rose-red/10",
  "text-dpdp-emerald": "bg-dpdp-emerald/10",
  "text-white": "bg-white/10"
};

const TickerItem = ({ dotColor, label, value, valueColor }: any) => (
  <div className="flex items-center gap-4 px-8 border-r border-white/5 last:border-0 group">
    <div className={`w-2 h-2 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`} />
    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] font-bold whitespace-nowrap">{label}</span>
    <span className={`text-sm font-mono font-bold ${valueColor} tracking-widest ${valueColorMap[valueColor] || 'bg-white/5'} px-2 py-1 rounded-md`}>{value}</span>
  </div>
);

const GlobalTicker = () => {
  const [bugs, setBugs] = useState(124);
  const [threats, setThreats] = useState(892);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBugs(prev => prev + (Math.random() > 0.8 ? 1 : 0));
      setThreats(prev => prev + (Math.random() > 0.5 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tickerContent = (
    <>
      <TickerItem dotColor="bg-sys-blue text-sys-blue" label="Neural Integrity" value="99.98%" valueColor="text-sys-blue" />
      <TickerItem dotColor="bg-rose-red text-rose-red animate-pulse" label="Bugs Auto-Resolved" value={`${bugs}+`} valueColor="text-rose-red" />
      <TickerItem dotColor="bg-dpdp-emerald text-dpdp-emerald" label="Threats Neutralized" value={`${threats}+`} valueColor="text-dpdp-emerald" />
      <TickerItem dotColor="bg-white/40 text-white" label="Revenue Protected" value="₹67.4 Cr" valueColor="text-white" />
    </>
  );

  return (
    <div className="w-full bg-[#050608] border-y border-white/10 relative overflow-hidden flex items-center h-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050608] to-transparent z-10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="flex items-center"
        >
          {tickerContent}
          {tickerContent}
          {tickerContent}
          {tickerContent}
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalTicker;
