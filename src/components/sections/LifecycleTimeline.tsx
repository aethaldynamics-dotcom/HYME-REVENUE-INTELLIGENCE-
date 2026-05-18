import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const colorMap: Record<string, { border: string, bg: string, text: string, shadow: string, rgb: string }> = {
  "rose-red": {
    border: "border-rose-red",
    bg: "bg-rose-red",
    text: "text-rose-red",
    shadow: "shadow-[0_0_30px_rgba(225,29,72,0.1)]",
    rgb: "225, 29, 72"
  },
  "sys-blue": {
    border: "border-sys-blue",
    bg: "bg-sys-blue",
    text: "text-sys-blue",
    shadow: "shadow-[0_0_30px_rgba(0,122,255,0.1)]",
    rgb: "0, 122, 255"
  },
  "dpdp-emerald": {
    border: "border-dpdp-emerald",
    bg: "bg-dpdp-emerald",
    text: "text-dpdp-emerald",
    shadow: "shadow-[0_0_30px_rgba(16,185,129,0.1)]",
    rgb: "16, 185, 129"
  }
};

const LifecycleTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      phase: "01",
      title: "Revenue_Audit",
      desc: "We identify exactly where your brand is losing revenue and map out every profit recovery point in your checkout.",
      color: "rose-red",
      details: [
        "Leakage Mapping",
        "Profit Gap Analysis",
        "Checkout Friction Sync",
        "ROI Forecasting",
      ],
    },
    {
      phase: "02",
      title: "Swift_Connect",
      desc: "Our AI engine connects to your store in minutes, establishing a secure link to your revenue infrastructure.",
      color: "sys-blue",
      details: [
        "Store Integration",
        "API Authorization",
        "Real-time Monitoring",
        "Zero-Downtime Sync",
      ],
    },
    {
      phase: "03",
      title: "Growth_Launch",
      desc: "Custom recovery workflows are deployed instantly to capture abandoned carts and solve payment failures.",
      color: "rose-red",
      details: [
        "Cart Recapture",
        "Payment Failover",
        "AI Recovery Nudges",
        "Logic Validation",
      ],
    },
    {
      phase: "04",
      title: "Autonomous_ROI",
      desc: "Hyme monitors your store 24/7, autonomously recovering profit while you scale without interruption.",
      color: "dpdp-emerald",
      details: [
        "24/7 Supervision",
        "Daily Yield Reports",
        "Autonomous Recovery",
        "Success Verification",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col gap-12 mt-12 relative"
    >
      <div className="flex md:flex-row flex-col justify-between items-center relative z-10 w-full gap-4">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 hidden md:block z-0" />

        {steps.map((step, i) => {
          const isActive = activeIndex === i;
          const isPassed = i < activeIndex;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative z-10 w-full md:w-auto px-6 py-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 ${
                isActive
                  ? `bg-black/60 ${colorMap[step.color].border}/40 ${colorMap[step.color].shadow} backdrop-blur-xl`
                  : isPassed
                    ? `bg-black/40 border-white/20 text-white/50 hover:bg-white/5`
                    : `bg-[#0a0c10] border-white/5 hover:border-white/20 text-white/30`
              }`}
            >
              {isActive && (
                <div
                  className={`absolute inset-0 ${colorMap[step.color].bg}/5 rounded-2xl pointer-events-none`}
                />
              )}

              <span
                className={`text-2xl font-display font-bold italic transition-colors ${isActive ? `${colorMap[step.color].text} drop-shadow-[0_0_10px_currentcolor]` : ""}`}
              >
                {step.phase}
              </span>
              <div className="flex flex-col text-left">
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-widest ${isActive ? "text-white" : ""}`}
                >
                  {step.title}
                </span>
                <div
                  className={`text-[9px] font-mono tracking-[0.2em] uppercase mt-0.5 ${isActive ? `${colorMap[step.color].text}/60` : "opacity-0 h-0 hidden"}`}
                >
                  Active_State
                </div>
              </div>

              <div
                className={`absolute -bottom-2 md:-bottom-auto md:top-1/2 md:-right-6 md:-translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#0a0c10] z-20 transition-colors ${
                  isActive
                    ? `${colorMap[step.color].bg} shadow-[0_0_10px_currentColor]`
                    : isPassed
                      ? "bg-white/40"
                      : "bg-white/10"
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      <div className="w-full relative mt-8 h-auto min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-full p-10 md:p-14 rounded-[3rem] border ${colorMap[steps[activeIndex].color].border}/20 bg-gradient-to-br from-${steps[activeIndex].color === 'rose-red' ? 'rose-red' : steps[activeIndex].color === 'sys-blue' ? 'sys-blue' : 'dpdp-emerald'}/[0.05] to-[#0a0c10] flex flex-col md:flex-row gap-12 relative overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.1)]`}
          >
            <div
              className={`absolute -inset-20 ${colorMap[steps[activeIndex].color].bg}/5 blur-[120px] rounded-full pointer-events-none`}
            />

            <div className="flex-1 flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${colorMap[steps[activeIndex].color].bg} animate-pulse shadow-[0_0_10px_currentColor]`}
                />
                <span
                  className={`text-[10px] font-mono ${colorMap[steps[activeIndex].color].text} uppercase tracking-[0.4em] font-bold`}
                >
                  Phase_{steps[activeIndex].phase} Execute
                </span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter text-white drop-shadow-lg">
                {steps[activeIndex].title.replace("_", " ")}
              </h3>
              <p className="text-lg text-white/50 leading-relaxed max-w-3xl font-medium">
                {steps[activeIndex].desc}
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 content-start">
              {steps[activeIndex].details.map((detail, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col gap-2"
                >
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">
                    Process_{idx + 1}
                  </span>
                  <span className="text-sm font-mono text-white/80 uppercase tracking-tight">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LifecycleTimeline;
