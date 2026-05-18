import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const SystemLogHeader = () => {
  const [log, setLog] = useState("L3_KERNEL_NOMINAL");
  
  useEffect(() => {
    const logs = [
      "NODE_S1_VERIFIED",
      "LATENCY_0.12MS",
      "AES_512_SYNC",
      "DPDP_COMPLIANT",
      "RIO_OS_ACTIVE",
      "TX_SECURE"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLog(logs[i]);
      i = (i + 1) % logs.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="hidden xl:flex items-center gap-3 px-4 py-1.5 bg-sys-blue/5 border border-sys-blue/10 rounded-full overflow-hidden min-w-[200px]"
      role="status"
      aria-live="polite"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-sys-blue animate-pulse shrink-0" aria-hidden="true" />
      <motion.span 
        key={log}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[9px] font-mono text-sys-blue font-bold tracking-[0.3em] uppercase whitespace-nowrap"
      >
        STATUS: {log}
      </motion.span>
    </div>
  );
};

export default SystemLogHeader;
