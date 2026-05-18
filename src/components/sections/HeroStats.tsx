import React from "react";
import { motion } from "motion/react";

interface StatProps {
  label: string;
  val: string;
}

const StatItem = ({ label, val }: StatProps) => (
  <div className="flex flex-col gap-1.5 sm:gap-2 items-center text-center relative group cursor-default">
    <span className="text-[8px] sm:text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">
      {label}
    </span>
    <div className="flex items-end gap-1.5 sm:gap-2">
      <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-widest">
        {val}
      </span>
      <motion.div
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-1 h-1 sm:w-1.5 sm:h-1.5 mb-1.5 sm:mb-2 rounded-full bg-dpdp-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"
      />
    </div>
    <div className="absolute -inset-2 sm:-inset-4 bg-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
  </div>
);

interface HeroStatsProps {
  variants: any;
  stats?: StatProps[];
}

const Stats = ({ variants, stats }: HeroStatsProps) => {
  const defaultStats = [
    { label: "PEAK_ORDERS_ROUTED", val: "1.2 Cr+" },
    { label: "FAILED_PAYMENTS_RECOVERED", val: "₹350 Cr+" },
    { label: "CHECKOUT_LATENCY", val: "0.12ms" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <motion.div
      variants={variants}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 pt-10 border-t border-white/5 relative w-full"
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {displayStats.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </motion.div>
  );
};

export default Stats;
