import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ShieldCheck } from "lucide-react";

const RevenueLeakageCalculator = () => {
  const [gmv, setGmv] = useState(5000000); // 5M defaulting higher for enterprise
  const [leakage, setLeakage] = useState(12); // Standard leakage %
  const [isExporting, setIsExporting] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const recoveredMonthly = (gmv * (leakage / 100)) * 0.8; // 80% recovery efficiency
  const annualRoi = recoveredMonthly * 12;

  useEffect(() => {
    if (showCertificate) {
      const timer = setTimeout(() => setShowCertificate(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showCertificate]);

  return (
    <div className="w-full p-6 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0c0c0e] border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-sys-blue/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Formal Diagnostic Header */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sys-blue/40 to-transparent" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 relative z-10">
        <div className="space-y-10 sm:space-y-12">
            <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-sys-blue/50" />
              <span className="text-[10px] font-mono text-sys-blue font-black tracking-[0.4em] uppercase">Diagnostic_Analyzer_V4</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-display font-black text-white uppercase italic tracking-tighter leading-none">
              Calculate Your <br/><span className="text-sys-blue">Lost Capital.</span>
            </h3>
            <p className="text-white/80 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest max-w-sm leading-relaxed">
              Stop losing profit at the checkout. Outdated infrastructure drains 10%–25% of your net yield. Define your recovery potential below.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/80">
                <label htmlFor="gmv-slider">Monthly Store Revenue (₹)</label>
                <span className="text-white">₹{(gmv / 100000).toFixed(1)}L+</span>
              </div>
              <input
                id="gmv-slider"
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={gmv}
                onChange={(e) => setGmv(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sys-blue"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/80">
                <label htmlFor="leakage-slider">Current Checkout Leakage (%)</label>
                <span className="text-sys-blue font-black">{leakage}%</span>
              </div>
              <input
                id="leakage-slider"
                type="range"
                min="5"
                max="30"
                step="1"
                value={leakage}
                onChange={(e) => setLeakage(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sys-blue"
              />
              <p className="text-[9px] font-mono text-white/30 uppercase">Industry Avg: 15.4% for D2C Brands</p>
            </div>
          </div>
        </div>

        <div className="bg-black/80 rounded-3xl sm:rounded-[2rem] border border-white/20 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden group/audit shadow-inner shadow-black">
          <div className="absolute inset-0 bg-sys-blue/[0.01] pointer-events-none" />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sys-blue/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-sys-blue" />
                </div>
                <div>
                   <h4 className="text-[10px] font-mono text-white uppercase font-black tracking-widest">Protocol_Yield_Report</h4>
                   <p className="text-[8px] font-mono text-white/30 uppercase">ID: HYM-AUDIT-{Math.floor(Math.random() * 9000 + 1000)}</p>
                </div>
              </div>
              <div className="hidden sm:block">
                 <ShieldCheck className="w-6 h-6 text-white/10" />
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10" aria-live="polite">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-[0.2em] font-black italic">Monthly_Recapture_Potential</span>
                <div className="text-4xl xs:text-5xl sm:text-7xl font-display font-black text-sys-blue tracking-tighter drop-shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
                  ₹{Math.round(recoveredMonthly).toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-[0.2em] font-black italic">Annual_Protocol_Yield</span>
                <div className="text-3xl sm:text-5xl font-display font-black text-white/90 tracking-tighter transition-colors">
                  ₹{Math.round(annualRoi).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setIsExporting(true);
              setTimeout(() => {
                setIsExporting(false);
                setShowCertificate(true);
              }, 1500);
            }}
            disabled={isExporting}
            className="w-full mt-10 py-5 bg-white text-black rounded-xl font-display font-black text-xs uppercase tracking-[0.3em] hover:bg-sys-blue hover:text-white transition-all shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            {isExporting ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                />
                GENERATING_REPORT...
              </>
            ) : (
                <>
                GET_DETAILED_STRATEGY
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-1 bg-sys-blue"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                />
                </>
            )}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-12"
          >
            <div className="max-w-md w-full bg-[#111] border-2 border-sys-blue p-8 rounded-3xl text-center space-y-6 shadow-[0_0_100px_rgba(0,122,255,0.4)]">
              <div className="w-20 h-20 bg-sys-blue/20 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10 text-sys-blue" />
              </div>
              <div className="space-y-2">
                <h5 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Strategic Audit Locked.</h5>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">A private session has been reserved for your entity based on these parameters.</p>
              </div>
              <button 
                onClick={() => setShowCertificate(false)}
                className="w-full py-4 bg-sys-blue text-white rounded-xl font-mono text-[10px] font-black uppercase tracking-widest"
              >
                Close_Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RevenueLeakageCalculator;
