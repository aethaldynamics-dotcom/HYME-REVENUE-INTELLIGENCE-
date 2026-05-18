import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { SignalBars } from '../ui/SVGLibrary';

const possibleLogs = [
  { tag: "ROI", msg: "PROFIT_RECOVERY:: ABANDONED_CART_RECAPTURED_(₹4,250)", type: "fin" },
  { tag: "NET", msg: "CHECKOUT_STATUS:: GATEWAY_FAILOVER_SOLVED_SILENTLY", type: "os" },
  { tag: "SEC", msg: "LOSS_PREVENTION:: RTO_FRAUD_DETECTED_&_BLOCKED_S4", type: "auto" },
  { tag: "DPDP", msg: "PRIVACY_GUARD:: DPDP_PII_MASKING_COMPLETE_MUMBAI-1", type: "dpdp" },
  { tag: "SYS", msg: "SPEED_SYNC:: CHECKOUT_LOADING_REDUCED_TO_0.12s", type: "os" },
  { tag: "FIN", msg: "REVENUE_SYNC:: LEAKAGE_DETECTED_&_AUTOMATICALLY_SEALED", type: "fin" },
  { tag: "AUTO", msg: "SCALE_MODE:: HIGH_TRAFFIC_STRESS_NEUTRALIZED", type: "auto" },
  { tag: "ROI", msg: "YIELD_MAX:: CONVERSION_RECOVERY_ENGAGED", type: "fin" },
  { tag: "DPDP", msg: "GOVERNANCE:: COMPLIANCE_ENFORCED_GLOBAL_L3", type: "dpdp" },
  { tag: "NET", msg: "PERFORMANCE:: 0ms_LATENCY_REDIRECT_AUTHENTICATED", type: "os" },
];

const HyperTerminal = () => {
  const [logs, setLogs] = useState<{msg: string, type: string, tag: string, timestamp: string}[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 50 });
  const opacity = useMotionValue(0);
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });
  
  useEffect(() => {
    // Initial static logs for immediate load
    const initialLogs = Array.from({ length: 4 }).map((_, i) => {
      const now = new Date();
      now.setSeconds(now.getSeconds() - (10 - i) * 5);
      return {
        ...possibleLogs[i % possibleLogs.length],
        timestamp: now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    });
    setLogs(initialLogs);

    // Simulate instant connection to prevent websocket errors
    setIsConnected(true);
    const connLog = {
      tag: "IO",
      msg: "WS_ESTABLISHED:: REAL-TIME_RIO_STREAM_ACTIVE",
      type: "dpdp",
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [...prev.slice(-11), connLog]);

    // Local simulated logs
    const fallbackInterval = setInterval(() => {
      const log = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
      setLogs(prev => {
        const nextLogs = [...prev, {
          ...log,
          timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }];
        return nextLogs.slice(-11);
      });
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(fallbackInterval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!terminalRef.current) return;
    const rect = terminalRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div 
      ref={terminalRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(0.4)}
      onMouseLeave={() => opacity.set(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      role="region"
      aria-label="RIO Core System Terminal Console"
      className="w-full bg-[#0a0a0c] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9),inset_0_0_80px_rgba(0,0,0,0.5)] relative group font-mono hover:border-sys-blue/30 transition-colors duration-500"
    >
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sys-blue/20 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      <motion.div 
        style={{ 
          x: smoothX, 
          y: smoothY,
          opacity: smoothOpacity,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="absolute top-0 left-0 w-32 h-32 bg-sys-blue blur-[40px] rounded-full pointer-events-none z-20"
        aria-hidden="true"
      />

      <div className="bg-white/[0.03] px-8 py-5 flex justify-between items-center border-b border-white/5 relative z-30" aria-hidden="true">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[9px] font-mono font-bold ${isConnected ? 'text-dpdp-emerald/80 animate-pulse bg-dpdp-emerald/10' : 'text-rose-red/80 bg-rose-red/10'} tracking-widest px-2 py-0.5 rounded-sm transition-colors duration-500 uppercase`}>
            {isConnected ? 'NODE_SYNCED' : 'NODE_OFFLINE'}
          </span>
          <div className="text-[10px] font-mono font-bold text-white/40 tracking-[0.4em] uppercase">RIO_CORE_01</div>
        </div>
      </div>

      <div className="p-8 h-[380px] font-mono text-[10px] sm:text-xs overflow-hidden flex flex-col justify-end gap-3 relative z-20" role="log" aria-live="polite" aria-label="Live System Event Logs">
        {logs.map((log, i) => (
          <div key={`${log.timestamp}-${i}`} className="animate-[typing_0.5s_forwards] opacity-0 flex items-start sm:items-center gap-3 sm:gap-4 group/log transition-all" role="status">
            <span className="text-white/20 whitespace-nowrap group-hover/log:text-white/40 transition-colors">[{log.timestamp}]</span>
            <span className="text-white/10 hidden sm:inline">::</span>
            
            <span className={`px-2 py-0.5 rounded text-[8px] sm:text-[9px] uppercase tracking-widest font-bold whitespace-nowrap ${
              log.type === 'os' ? 'bg-white/5 text-white/60' :
              log.type === 'auto' ? 'bg-rose-red/10 text-rose-red/80' : 
              log.type === 'dpdp' ? 'bg-dpdp-emerald/10 text-dpdp-emerald/80' : 
              'bg-sys-blue/10 text-sys-blue/80'
            }`}>
              {log.tag}
            </span>

            <span className={`tracking-wide truncate ${
              log.type === 'os' || log.type === 'auto' ? 'text-white/80' : 
              log.type === 'dpdp' ? 'text-dpdp-emerald' : 'text-sys-blue'
            } transition-colors group-hover/log:text-white`}>
              {log.msg}
            </span>
          </div>
        ))}

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4" aria-hidden="true">
           <div className="flex items-center gap-4 h-6">
               <SignalBars count={8} height={14} color="#007aff" className="w-16" />
               <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Awaiting_Input</span>
           </div>
           
           <div className="flex items-center gap-1">
               <span className="text-white bg-white/20 px-1 py-0.5 text-[10px] rounded animate-pulse">▐</span>
           </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" aria-hidden="true" />
    </motion.div>
  );
};

export default HyperTerminal;
