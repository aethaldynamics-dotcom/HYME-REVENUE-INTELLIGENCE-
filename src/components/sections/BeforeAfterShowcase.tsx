import React from "react";
import { motion } from "motion/react";
import { BarChart3, Calendar } from "lucide-react";

export const BeforeAfterShowcase = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-32 mt-16 relative flex flex-col items-center px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />

      {/* BEFORE / AFTER CARDS CONTAINER */}
      <div className="flex flex-col md:flex-row items-stretch justify-center w-full relative z-10">
        {/* Before Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 bg-[#0d0e12] border border-rose-red/30 rounded-t-[2rem] md:rounded-l-[2.5rem] md:rounded-tr-none p-8 sm:p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(225,29,72,0.08)]"
        >
          {/* Subtle red tint */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-red/[0.03] blur-[60px] pointer-events-none rounded-full" />

          {/* 'Before' Badge */}
          <div className="absolute top-0 left-1/2 md:left-auto md:right-10 -translate-x-1/2 md:translate-x-0">
            <div className="bg-rose-red/[0.15] border border-rose-red/40 text-rose-red px-8 py-2 rounded-b-[1.2rem] font-display font-medium tracking-widest text-sm shadow-[0_10px_20px_rgba(225,29,72,0.2)]">
              BEFORE
            </div>
          </div>

          <div className="flex justify-between items-center mt-12 mb-8 text-white/50 text-sm font-sans border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-white/10 rounded-lg bg-white/5">
                <BarChart3 className="w-4 h-4 text-white/70" />
              </div>
              <span className="font-medium text-white/80 tracking-wide">
                Store Metrics
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#13151a] px-3 py-1.5 rounded-lg text-white/70 border border-white/10 shadow-inner">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Today
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-4">
            <div className="flex flex-col gap-2">
              <span className="text-white/40 font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/20" /> Sales
                Revenue
              </span>
              <span className="font-display text-5xl sm:text-[3.5rem] font-medium text-white tracking-tighter leading-none mt-1">
                ₹0<span className="text-2xl text-white/40">.00</span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-red/50" /> WITHOUT
                HYME
              </span>
              <span className="font-display text-5xl sm:text-[3.5rem] font-medium text-rose-red tracking-tighter leading-none mt-1">
                ₹250<span className="text-2xl opacity-60">.12</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Center Divider Line (Desktop) */}
        <div className="hidden md:flex w-0 relative z-30 items-center justify-center">
          <div className="w-px h-[90%] bg-gradient-to-b from-transparent via-white/20 to-transparent absolute z-40 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
        </div>

        {/* After Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 bg-[#0d0e12] border border-dpdp-emerald/30 rounded-b-[2rem] md:rounded-r-[2.5rem] md:rounded-bl-none p-8 sm:p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.08)]"
        >
          {/* Subtle green tint */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-dpdp-emerald/[0.03] blur-[60px] pointer-events-none rounded-full" />

          {/* 'After' Badge */}
          <div className="absolute top-0 left-1/2 md:left-10 -translate-x-1/2 md:translate-x-0">
            <div className="bg-dpdp-emerald/[0.15] border border-dpdp-emerald/40 text-dpdp-emerald px-8 py-2 rounded-b-[1.2rem] font-display font-medium tracking-widest text-sm shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
              AFTER
            </div>
          </div>

          <div className="flex justify-between items-center mt-12 mb-8 text-white/50 text-sm font-sans border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-white/10 rounded-lg bg-white/5">
                <BarChart3 className="w-4 h-4 text-dpdp-emerald/80" />
              </div>
              <span className="font-medium text-white/80 tracking-wide">
                Store Metrics
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#13151a] px-3 py-1.5 rounded-lg text-white/70 border border-white/10 shadow-inner">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Today
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-4">
            <div className="flex flex-col gap-2">
              <span className="text-white/40 font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-dpdp-emerald/50" />{" "}
                Sales Revenue
              </span>
              <span className="font-display text-5xl sm:text-[3.5rem] font-medium text-dpdp-emerald tracking-tighter leading-none mt-1">
                ₹4,654<span className="text-2xl opacity-60">.00</span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-dpdp-emerald/50" /> WITH
                HYME
              </span>
              <span className="font-display text-5xl sm:text-[3.5rem] font-medium text-dpdp-emerald tracking-tighter leading-none mt-1">
                ₹1,150<span className="text-2xl opacity-60">.55</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
