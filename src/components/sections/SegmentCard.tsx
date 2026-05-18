import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, ChevronRight } from "lucide-react";

const SegmentCard = ({
  title,
  description,
  features,
  details,
  accentColor,
}: any) => {
  const [expanded, setExpanded] = useState(false);
  const shadowClass =
    accentColor === "rose"
      ? "shadow-[0_0_30px_rgba(225,29,72,0.05)]"
      : "shadow-[0_0_30px_rgba(16,185,129,0.05)]";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className={`p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] border bg-gradient-to-b from-white/[0.04] to-white/[0.01] flex flex-col gap-8 relative overflow-hidden group backdrop-blur-sm ${accentColor === "rose" ? "border-rose-red/10 hover:border-rose-red/40 hover:shadow-[0_40px_80px_rgba(225,29,72,0.1)]" : "border-dpdp-emerald/10 hover:border-dpdp-emerald/40 hover:shadow-[0_40px_80px_rgba(16,185,129,0.1)]"} ${shadowClass}`}
    >
      <div className="flex flex-col gap-3 relative z-10">
        <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-tight uppercase leading-none">
          {title}
        </h3>
        <p className="text-white/70 text-[14px] leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex flex-col gap-3">
          {features.map((f: string, i: number) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="flex items-center gap-3 text-[11px] font-mono text-white/60 uppercase tracking-widest font-bold group-hover:text-white/80 transition-colors"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${accentColor === "rose" ? "bg-rose-red" : "bg-dpdp-emerald"} shadow-[0_0_10px_currentColor]`}
                aria-hidden="true"
              />
              {f}
            </motion.div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/5">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="flex items-center gap-2 text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1"
          >
            {expanded ? (
              <Cpu
                className={`w-3 h-3 ${accentColor === "rose" ? "text-rose-red" : "text-dpdp-emerald"}`}
                aria-hidden="true"
              />
            ) : (
              <ChevronRight
                className={`w-3 h-3 ${accentColor === "rose" ? "text-rose-red" : "text-dpdp-emerald"}`}
                aria-hidden="true"
              />
            )}
            {expanded ? "Collapse Specs" : "Expand Architectural Specs"}
          </motion.button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 flex flex-col gap-4">
                  {details.map((d: any, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">
                        {d.label}
                      </span>
                      <span className="text-[11px] text-white/80 leading-relaxed">
                        {d.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className={`absolute -top-10 -right-10 w-24 h-24 blur-[80px] rounded-full opacity-20 pointer-events-none ${accentColor === "rose" ? "bg-rose-red" : "bg-dpdp-emerald"}`}
      />
    </motion.div>
  );
};

export default SegmentCard;
