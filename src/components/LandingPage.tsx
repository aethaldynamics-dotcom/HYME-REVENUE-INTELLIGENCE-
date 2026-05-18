/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  CheckCircle2,
  Lock,
  TrendingUp,
  FileText,
  Workflow,
  Shield,
  Activity,
  Cpu,
  RefreshCcw,
  MousePointer2,
  X,
  UserCheck,
  Server,
  Handshake,
  Globe,
  Settings,
  Hexagon,
  Box,
  Triangle,
  Circle,
  Command,
  Database,
  Target,
  Mail,
  Phone,
  ChevronDown,
  ChevronLeft,
  Link2,
  Star,
  Play,
  Image as ImageIcon,
  Quote,
  XCircle,
  Clock,
} from "lucide-react";

import { SignalBars, ScanningRadar, GridPattern } from "./ui/SVGLibrary";
import { DataFlowBackground, GeometricBackground, GlowingOrbsBackground, BinaryRainBackground } from "./ui/AnimatedBackground";
import { DigitalServices } from "./sections/DigitalServices";
import { ScrollingLogoMarquee } from "./sections/ScrollingLogoMarquee";


import LazyImage from "./ui/LazyImage";

import FAQItem from "./sections/FAQItem";
import Navbar from "./layout/Navbar";
import HeroStats from "./sections/HeroStats";
import RevenueLeakageCalculator from "./sections/RevenueLeakageCalculator";

// --- Shared Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.5,
      duration: 0.8
    },
  },
} as const;

const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 150, 
      damping: 25,
      mass: 0.5
    },
  },
} as const;

const hoverScale = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 400, damping: 10 }
} as const;

const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-sys-blue focus:text-black focus:font-bold focus:rounded-xl focus:shadow-[0_0_40px_rgba(0,122,255,0.5)] focus:outline-none"
  >
    Skip to main content
  </a>
);

// --- Components ---

// --- Lazy Loaded Sections ---
const GlobalTicker = lazy(() => import("./sections/GlobalTicker"));

const HyperTerminal = lazy(() => import("./sections/HyperTerminal"));
const LifecycleTimeline = lazy(() => import("./sections/LifecycleTimeline"));
const SegmentCard = lazy(() => import("./sections/SegmentCard"));

// --- Fallback Components ---
const SectionFallback = ({ height = "h-48" }: { height?: string }) => (
  <div className={`w-full ${height} bg-[#0a0a0c] rounded-[3rem] border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group`}>
    {/* Scanning Beam */}
    <motion.div 
      style={{ willChange: "transform" }}
      animate={{ y: ['-10%', '600%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-sys-blue/10 to-transparent pointer-events-none z-0"
    />
    
    <div className="relative z-10 flex flex-col items-center gap-6">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-sys-blue/30"
        />
        {/* Middle Pulse */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full bg-sys-blue/20 blur-sm"
        />
        {/* Inner Spinner */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-sys-blue shadow-[0_0_15px_rgba(0,122,255,0.4)]"
        />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono font-bold text-sys-blue animate-pulse tracking-[0.4em] uppercase">
          Initializing_Node
        </span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 rounded-full bg-sys-blue"
            />
          ))}
        </div>
      </div>
    </div>
    
    {/* Decorative Grid */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,122,255,0.2)_1px,transparent_1px)] bg-[size:24px_24px]" />
  </div>
);

const TickerFallback = () => (
  <div className="h-20 bg-[#0a0a0c] border-y border-white/5 relative overflow-hidden flex items-center px-8">
    <div className="flex gap-12 w-full opacity-10">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 w-32 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
    <motion.div 
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-sys-blue/10 to-transparent skew-x-12 pointer-events-none"
    />
  </div>
);

const LEGAL_DOCUMENTS = {
  dpdp: {
    title: "Data_Privacy_&_Compliance",
    content: (
      <div className="flex flex-col gap-6 text-[11px] font-mono leading-relaxed">
        <p className="text-dpdp-emerald font-bold tracking-widest uppercase">DPDP_COMPLIANT // ENTERPRISE_GRADE</p>
        <p className="text-white/70">
          We ensure absolute compliance with global data protection standards (including DPDP 2026). Our system uses advanced edge-masking to ensure no sensitive customer data ever leaves your control.
        </p>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase">I. Secure Data Isolation</h4>
          <p className="text-white/60">
            Customer identifiers are encrypted at the point of origin. Our HYME Intelligence analyzes behavioural patterns to recover revenue without ever storing raw personal information.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase">II. Governance & Trust</h4>
          <p className="text-white/60">
            The platform acts as a secure intermediary between your brand's infrastructure and the global internet, providing an immutable audit trail for every transaction we protect.
          </p>
        </div>
      </div>
    )
  },
  terms: {
    title: "Revenue_Partnership_Terms",
    content: (
      <div className="flex flex-col gap-6 text-[11px] font-mono leading-relaxed">
        <p className="text-sys-blue font-bold tracking-widest uppercase">PERFORMANCE-BASED PARTNERSHIP</p>
        <p className="text-white/70">
          Our commercial model is built on full alignment with your growth. We only succeed when you recapture lost revenue.
        </p>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase">I. Zero-Risk Onboarding</h4>
          <p className="text-white/60">
            All initial engineering, infrastructure setup, and recovery automation is provided at no upfront cost to the partner. We prove value before any invoice is generated.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase">II. Success-Based Commission</h4>
          <p className="text-white/60">
            Hyme retains a 20% commission exclusively on revenue that we successfully recapture (e.g., recovered abandoned carts, solved payment failures, conversion lifts).
          </p>
        </div>
      </div>
    )
  },
  sla: {
    title: "Operational_Uptime_SLA",
    content: (
      <div className="flex flex-col gap-6 text-[11px] font-mono leading-relaxed">
        <p className="text-white font-bold tracking-widest uppercase">99.999% AVAILABILITY GUARANTEE</p>
        <p className="text-white/70">
          Your revenue never sleeps, and neither does Hyme. We provide an uncompromising commitment to your infrastructure's health and uptime.
        </p>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase">I. Global Redundancy</h4>
          <p className="text-white/60">
            With multi-region failover and real-time monitoring, we guarantee that your checkout processes remain active even during peak viral traffic or technical outages.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase">II. Priority Technical Support</h4>
          <p className="text-white/60">
            Strategic partners receive dedicated 24/7 access to our core engineering team with a guaranteed response time of under 15 minutes for critical issues.
          </p>
        </div>
      </div>
    )
  }
};

const GovernanceSchematic = () => (
  <div 
    role="img"
    aria-label="HYME Governance Schematic showing a secure central core node connected to distributed Mumbai-1 satellite nodes, demonstrating AES-512-GCM encryption architecture."
    className="relative w-full aspect-video bg-black/40 rounded-[3rem] border border-dpdp-emerald/20 overflow-hidden group shadow-2xl backdrop-blur-sm"
  >
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px]`} aria-hidden="true" />
    
    {/* Central Core */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32" aria-hidden="true">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-dpdp-emerald/30 scale-125 sm:scale-150"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-dpdp-emerald/10 blur-lg sm:blur-xl"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <ShieldCheck className="w-8 h-8 sm:w-12 sm:h-12 text-dpdp-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
      </div>
    </div>

    {/* Satellite Nodes */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, rotate: angle }}
        animate={{ 
          opacity: 1,
          rotate: [angle, angle + 360],
        }}
        transition={{ 
          opacity: { delay: i * 0.2 },
          rotate: { duration: 40 + i * 5, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[500px]"
        style={{ transformOrigin: "center center" }}
      >
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black border border-dpdp-emerald/50 flex items-center justify-center"
          style={{ transform: `rotate(-${angle}deg)` }}
        >
          <div className="w-1 h-1 rounded-full bg-dpdp-emerald animate-pulse" />
        </div>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-16 sm:w-32 h-px pointer-events-none">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(16,185,129,0.2)" strokeDasharray="4 4" />
        </svg>
      </motion.div>
    ))}

    {/* Data Flow Particles */}
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "0%", y: "50%", opacity: 0 }}
          animate={{ 
            x: ["0%", "100%"],
            opacity: [0, 1, 0],
            y: ["50%", `${40 + Math.random() * 20}%`]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-dpdp-emerald rounded-full blur-[1px]"
        />
      ))}
    </div>

    {/* Overlay Labels */}
    <div className="absolute top-8 left-8 font-mono text-[9px] text-dpdp-emerald/60 tracking-[0.2em] uppercase">
      Topology: Mumbai-1_Isolated_Core
    </div>
    <div className="absolute bottom-8 right-8 font-mono text-[9px] text-dpdp-emerald/40 tracking-[0.2em] uppercase text-right">
      Encryption: AES-512-GCM<br/>
      Latency: 0.002ms
    </div>
  </div>
);

const OperationsDashboard = () => (
  <div 
    role="img"
    aria-label="Real-time ROI Telemetry Dashboard showing live revenue recapture feeds and gateway load balancing metrics at 99.999% optimization."
    className="relative w-full aspect-video bg-[#0a0a0c] rounded-[3rem] border border-sys-blue/20 overflow-hidden group shadow-2xl p-6 flex flex-col gap-6"
  >
    {/* Header */}
    <div className="flex justify-between items-center border-b border-white/5 pb-4" aria-hidden="true">
      <div className="flex gap-4">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
      </div>
      <div className="font-mono text-[10px] text-sys-blue font-bold tracking-[0.3em] uppercase">
        Live_ROI_Telemetry // Node_S4
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Real-time Ticker */}
      <div className="bg-black/60 rounded-2xl border border-white/5 p-4 flex flex-col gap-4 overflow-hidden relative">
        <div className="text-[8px] font-mono text-white/30 tracking-[0.2em] uppercase">Recapture_Feed</div>
        <div className="flex flex-col gap-3">
          {[
            { id: "A-24", val: "$1,450", status: "VERIFIED" },
            { id: "B-81", val: "$2,100", status: "RESCUED" },
            { id: "C-12", val: "$890", status: "VERIFIED" },
          ].map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.4 }}
              className="flex justify-between items-center text-[10px] font-mono"
            >
              <span className="text-white/50">TXID_{item.id}</span>
              <span className="text-sys-blue font-bold">{item.val}</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-sys-blue/10 text-sys-blue border border-sys-blue/20">
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Visual Analytics */}
      <div className="bg-black/60 rounded-2xl border border-white/5 p-4 flex flex-col gap-4 overflow-hidden">
        <div className="text-[8px] font-mono text-white/30 tracking-[0.2em] uppercase">Gateway_Load</div>
        <div className="flex-1 flex items-end gap-1 px-2">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: "10%" }}
              animate={{ height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.1 }}
              className="flex-1 bg-sys-blue/20 border-t border-sys-blue/40 rounded-t-sm"
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-sys-blue animate-pulse" />
            <span className="text-[8px] font-mono text-sys-blue">System_Optimized</span>
          </div>
          <span className="text-[14px] font-mono text-white font-bold tracking-tighter">99.999%</span>
        </div>
      </div>
    </div>
  </div>
);

const SystemBlueprint = () => (
  <div 
    role="img"
    aria-label="HYME RIO Core V2 Hyper-Logic Architecture diagram showing Edge Node, RIO Kernel, and Settle Hub integration points."
    className="relative w-full aspect-square sm:aspect-video bg-[#0a0a0c] rounded-[3rem] border border-white/10 overflow-hidden group p-8 sm:p-12"
  >
    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true" />
    
    <div className="relative h-full flex flex-col justify-between" aria-hidden="true">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-sys-blue/50" />
            <span className="text-[10px] font-mono text-sys-blue tracking-[0.4em] uppercase font-bold">HYME_RIO_CORE_V2</span>
          </div>
          <h4 className="text-4xl sm:text-5xl font-display font-black text-white italic tracking-tighter max-w-sm leading-none uppercase">
            Hyper-Logic <br/> <span className="text-sys-blue">Architecture.</span>
          </h4>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 rounded-full border border-transparent border-t-sys-blue"
              />
              <Cpu className="w-6 h-6 text-white/40" />
           </div>
           <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Model: Enterprise_L3</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        {/* Schematic Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            d="M 100,50 L 200,150 L 400,150 L 500,250" 
            stroke="white" 
            fill="none" 
            strokeWidth="0.5" 
          />
        </svg>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-24 relative z-10">
          {[
            { label: "EDGE_NODE", icon: Globe, status: "READY" },
            { label: "RIO_KERNEL", icon: Zap, status: "ACTIVE" },
            { label: "SETTLE_HUB", icon: Database, status: "SYNC" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "rgba(0,122,255,0.5)" }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-white/5 bg-black/80 flex items-center justify-center text-sys-blue relative"
              >
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sys-blue blur-sm animate-pulse" />
              </motion.div>
              <div className="text-center">
                <div className="text-[9px] font-mono text-white uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-[7px] font-mono text-sys-blue/60 uppercase tracking-[0.2em]">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex justify-between items-end">
        <div className="flex gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono text-white/30 uppercase">Uptime_Metric</span>
            <span className="text-xs font-mono text-sys-blue">99.999%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono text-white/30 uppercase">Sync_Status</span>
            <span className="text-xs font-mono text-sys-blue">NOMINAL</span>
          </div>
        </div>
        <div className="text-[8px] font-mono text-white/10 uppercase tracking-[1em]">STRATEGIC_DEPLOYMENT</div>
      </div>
    </div>
  </div>
);

const SectionHeader = ({
  tag,
  title,
  subline,
}: {
  tag: string;
  title: React.ReactNode;
  subline: string;
}) => (
  <div className="flex flex-col gap-6 items-center text-center mb-20">
    <div className="flex items-center gap-3">
      <div className="w-12 h-px bg-sys-blue/50" />
      <span className="text-[11px] font-mono text-sys-blue font-black tracking-[0.5em] uppercase">
        {tag}
      </span>
      <div className="w-12 h-px bg-sys-blue/50" />
    </div>
    <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tighter leading-[0.85] uppercase italic">
      {title}
    </h2>
    <p className="text-xs sm:text-sm font-mono text-white/30 uppercase tracking-widest max-w-xl">
      {subline}
    </p>
  </div>
);

const LiveOperationsGrid = () => {
  const cases = [
    {
      id: "OP_ALPHA_001",
      brand: "Enterprise Pharma Case",
      method: "PAYMENT_RECOVERY_AI",
      metric: "₹3.8 Cr",
      label: "MONTHLY_RECAPTURE",
      velocity: "RECOVERY_TIME: 4.2H",
      uptime: "99.998%",
      region: "Mumbai-1",
      desc: "Automatically intercepted a 12% drop-off in high-value checkouts caused by silent payment gateway failures.",
      insight: "Zero-Latency Failover",
      color: "sys-blue"
    },
    {
      id: "OP_SIGMA_024",
      brand: "Premium Luxury Brand",
      method: "CHECKOUT_PERSISTENCE",
      metric: "₹12.4 Cr",
      label: "ANNUAL_PROFIT_RESCUE",
      velocity: "RECOVERY_TIME: 2.1H",
      uptime: "99.999%",
      region: "London-EC",
      desc: "Recovered lost revenue by sustaining checkout session state across edge nodes during massive traffic surges.",
      insight: "100% Session Continuity",
      color: "dpdp-emerald"
    },
    {
      id: "OP_OMEGA_102",
      brand: "Global FMCG Giant",
      method: "LOAD_SPEED_MAXIMIZER",
      metric: "+14.2%",
      label: "CONVERSION_RATE_LIFT",
      velocity: "OPTIMIZATION_TIME: 0.5H",
      uptime: "99.995%",
      region: "Singapore-X",
      desc: "Eliminated the 1.2s loading gap during payment redirects, instantly recapturing frustrated customers and converting them.",
      insight: "Zero-Friction Checkout",
      color: "white"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cases.map((c) => (
        <motion.div
          key={c.id}
          variants={fadeUpVariant}
          whileHover={{ y: -10 }}
          className="group relative p-0 rounded-[2.5rem] bg-[#0c0c0e] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-2xl"
        >
          {/* Document Header */}
          <div className="px-8 py-5 border-b border-white/5 bg-white/[0.01] flex justify-between items-center relative overflow-hidden">
            <div className="flex flex-col gap-0.5 relative z-10">
              <span className="text-[8px] font-mono text-white/70 uppercase tracking-[0.4em] font-black">Report_ID</span>
              <span className="text-[10px] font-mono text-white/90 font-bold">{c.id}</span>
            </div>
            <div className="flex items-center gap-3 relative z-10">
               <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[7px] font-mono text-white/60 uppercase tracking-widest">Node_Region</span>
                  <span className="text-[9px] font-mono text-sys-blue font-black tracking-widest">{c.region}</span>
               </div>
               <div className={`w-8 h-8 rounded-lg border border-${c.color === 'white' ? 'white/20' : c.color + '/20'} flex items-center justify-center bg-black/40`}>
                  <Zap className={`w-3.5 h-3.5 text-${c.color === 'white' ? 'white' : c.color}`} />
               </div>
            </div>
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -skew-x-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          <div className="p-8 flex-1 space-y-10 relative">
            {/* Background Data Stream */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none font-mono text-[6px] leading-none overflow-hidden select-none whitespace-pre">
               {Array(30).fill("0101110001010101101111\n").join("")}
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-mono text-${c.color === 'white' ? 'white/40' : c.color} font-bold uppercase tracking-[0.4em]`}>
                  {c.method}
                </span>
                <h4 className="text-white text-xl font-display font-black tracking-tighter uppercase italic leading-tight">{c.brand}</h4>
              </div>

              <div className="flex flex-col gap-1">
                <div className={`text-4xl xs:text-5xl sm:text-7xl font-display font-black tracking-tighter transition-all duration-700 group-hover:scale-[1.02] origin-left ${c.color === 'white' ? 'text-white' : 'text-' + c.color} drop-shadow-[0_0_25px_rgba(255,255,255,0.05)]`}>
                  {c.metric}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] font-black">{c.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono text-white/60 uppercase font-bold">Uptime:</span>
                    <span className="text-[9px] font-mono text-dpdp-emerald font-black tracking-tighter">{c.uptime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-white/50 text-[11px] font-mono leading-relaxed uppercase tracking-widest italic group-hover:text-white/70 transition-colors bg-white/[0.02] p-4 rounded-xl border border-white/5 border-dashed">
                "{c.desc}"
              </p>
            </div>
          </div>

          {/* Document Footer / Telemetry Bar */}
          <div className="px-8 py-6 border-t border-white/5 bg-black/40 flex items-center justify-between relative group-hover:bg-black/60 transition-colors">
            <div className="flex flex-col gap-1 relative z-10">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${c.color === 'white' ? 'bg-white' : 'bg-' + c.color} animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                <span className="text-[9px] font-mono text-white/60 tracking-widest font-black uppercase">STATUS: VERIFIED</span>
              </div>
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">{c.velocity}</span>
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
               <div className="hidden sm:flex flex-col items-end gap-0.5 opacity-40">
                  <span className="text-[6px] font-mono text-white">SHA-256_AUTH</span>
                  <span className="text-[6px] font-mono text-white">L3_SYNC_ENBALED</span>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all cursor-pointer shadow-inner">
                  <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
               </div>
            </div>
            
            {/* Tech detail on hover */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileHover={{ opacity: 1, x: 0 }}
               className="absolute right-20 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-4 px-4 py-2 bg-black border border-white/10 rounded-lg pointer-events-none"
            >
               <span className="text-[8px] font-mono text-sys-blue uppercase tracking-widest font-black">LOGS_RECOVERED_TX: {Math.floor(Math.random() * 900) + 100}</span>
            </motion.div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -bottom-10 -right-10 p-4 opacity-[0.02] rotate-12 transition-transform duration-700 group-hover:rotate-0">
            <Hexagon className="w-48 h-48" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const LandingPage = () => {
  const heroRef = React.useRef(null);
  const dpdpRef = React.useRef(null);

  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: dpdpScrollY } = useScroll({
    target: dpdpRef,
    offset: ["start end", "end start"],
  });

  const heroParallaxY = useTransform(heroScrollY, [0, 1], [0, 150]);
  const heroParallaxReverseY = useTransform(heroScrollY, [0, 1], [0, -100]);
  const dpdpParallaxY = useTransform(dpdpScrollY, [0, 1], [-100, 100]);

  // Bespoke Diagnostic Follower
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springCursorX = useSpring(cursorX, { stiffness: 400, damping: 40 });
  const springCursorY = useSpring(cursorY, { stiffness: 400, damping: 40 });
  const cursorOpacity = useMotionValue(0);

  const [activeDocument, setActiveDocument] = useState<keyof typeof LEGAL_DOCUMENTS | null>(null);
  const [diagActive, setDiagActive] = useState(false);
  const [networkAlert, setNetworkAlert] = useState(false);

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({ brandName: "", whatsapp: "", email: "", requirement: "" });
  const [errors, setErrors] = useState({ brandName: "", whatsapp: "", email: "", requirement: "" });
  const [isShake, setIsShake] = useState(false);
  const [tier, setTier] = useState<"Standard" | "Enterprise" | "Platinum">(
    "Enterprise",
  );
  const [scope, setScope] = useState<string[]>(["Revenue Recovery"]);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHandshaking, setIsHandshaking] = useState(false);
  const [handshakeStep, setHandshakeStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync Body Scroll Lock for Legal Modals
  useEffect(() => {
    if (activeDocument) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeDocument]);

  const toggleScope = (s: string) => {
    setScope((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "brandName") {
      if (!value) error = "Brand Identity label is required";
      else if (value.length < 2) error = "Brand name too short for indexing";
    } else if (name === "whatsapp") {
      if (!value) {
        error = "Whatsapp Number is required";
      } else if (!/^\+?[\d\s-]{10,}$/.test(value)) {
        error = "Invalid Whatsapp format (e.g. +91 9876543210)";
      }
    } else if (name === "email") {
      if (!value) error = "Personnel Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email address";
    } else if (name === "requirement") {
      if (!value) error = "Partnership Requirement is required";
      else if (value.length < 10) error = "Please provide more detail for audit";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validate = () => {
    const isBrandValid = validateField("brandName", formData.brandName);
    const isWhatsappValid = validateField("whatsapp", formData.whatsapp);
    const isEmailValid = validateField("email", formData.email);
    const isReqValid = validateField("requirement", formData.requirement);
    const isValid = isBrandValid && isWhatsappValid && isEmailValid && isReqValid;

    if (!isValid) {
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("loading");
      setTransmissionLogs(["Initializing_Secure_Handshake..."]);
      
      const logs = [
        "Verifying_Brand_Domain_Integrity...",
        "Analyzing_Commercial_Objective_via_Intelligence_V4...",
        "Architecture_Audit_Results: OPTIMIZATION_IDENTIFIED",
        "Encrypting_Partner_Payload_AES-512...",
        "Routing_to_Mumbai_S1_Vault...",
        "Syncing_Governance_Firewall...",
        "Transmission_Complete_ACK_0.12ms"
      ];

      // Prepare data for real transmission
      const submitToCommandCenter = async () => {
        try {
          // Transmission Handshake Simulation for UX
          for (let i = 0; i < logs.length; i++) {
            await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
            setTransmissionLogs(prev => [...prev, logs[i]]);
          }

          // Real Backend Call
          let success = false;
          try {
            const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "a9e02c70-a623-417e-a2e1-31a520707194";
            
            const web3Response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                access_key: web3Key,
                from_name: "HYME Enquiry Lead",
                name: formData.brandName,
                email: formData.email,
                subject: `New Enquiry: ${formData.brandName} (${tier})`,
                message: `Brand: ${formData.brandName}\nWhatsapp: ${formData.whatsapp}\nEmail: ${formData.email}\nSelected Tier: ${tier}\nRequirement: ${formData.requirement}\nPartnership Scope: ${scope.join(", ")}\n\nMetadata Attachment:\nSource: Enquiry_Form_Interactive`
              })
            });
            
            if (web3Response.ok) success = true;
          } catch (err) {
            console.warn("Transmission error:", err);
          }

          if (success) {
            setTransmissionLogs(prev => [...prev, "SYSTEM_INSIGHT: Prioritize Node S1 Edge-Caching for maximum recapture."]);
            setStatus("success");
            setFormData({ brandName: "", whatsapp: "", email: "", requirement: "" });
          } else {
            throw new Error("SECURE_RELAY_TIMEOUT");
          }
        } catch (err) {
          console.error("TRANSMISSION_FAILURE:", err);
          setTransmissionLogs(prev => [...prev, "ERROR: SECURE_RELAY_TIMEOUT"]);
          setStatus("idle");
        }
      };

      submitToCommandCenter();
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-[#0a0c10] font-sans selection:bg-rose-red/30"
      onMouseMove={(e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }}
      onMouseEnter={() => cursorOpacity.set(0.1)}
      onMouseLeave={() => cursorOpacity.set(0)}
    >
      {/* Bespoke Interactive Follower */}
      <motion.div 
        style={{ 
          x: springCursorX, 
          y: springCursorY, 
          opacity: cursorOpacity,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="fixed top-0 left-0 w-64 h-64 bg-sys-blue blur-[100px] rounded-full pointer-events-none z-[999]"
        aria-hidden="true"
      />
      
      <SkipLink />
      {/* Bespoke Interactive Follower */}

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <GridPattern opacity={0.03} size={48} className="text-white/20" />
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-sys-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-rose-red/5 blur-[120px] rounded-full" />
      </div>

      {/* Diagnostic Overlay */}
      <AnimatePresence>
        {diagActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none border-[20px] border-sys-blue/10 flex items-center justify-center"
          >
            <div className="absolute top-10 left-10 font-mono text-[10px] text-sys-blue uppercase tracking-[0.5em] flex flex-col gap-2">
              <span>System_HUD_Active</span>
              <span className="opacity-50">Tracing_Nodes...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Network Alert */}
      <AnimatePresence>
        {networkAlert && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-dpdp-emerald text-black font-mono text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_0_50px_rgba(16,185,129,0.4)]"
          >
            Global_Network_Synchronized // Node_S1_Stable
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main id="main-content">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 sm:pt-48 lg:pt-64 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden">
          {/* Animated Backgrounds */}
          <DataFlowBackground />
          <GlowingOrbsBackground />

          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-12 sm:gap-16 items-center text-center"
            >
              <div className="max-w-7xl w-full flex flex-col items-center">
                {/* Hero Section Content from Screenshot - Enhanced for Premium Look */}
                <div className="w-full text-center md:text-left mb-16 sm:mb-24 lg:mb-32">
                  <motion.div variants={fadeUpVariant} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0">
                      <span className="text-[9px] sm:text-[12px] font-mono text-sys-blue/60 uppercase tracking-[0.4em] sm:tracking-[0.6em] font-black mb-3 sm:mb-4 block md:text-left text-center">
                        Strategic_Capital_Recovery_Protocol
                      </span>
                      <h1 className="text-[13vw] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black tracking-tighter leading-[0.82] text-white">
                        <span className="text-[#FF1F00] drop-shadow-[0_0_30px_rgba(255,31,0,0.2)]">ZERO UPFRONT.</span>
                        <br />
                        <span className="relative">
                          CART RECOVERY.
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute -bottom-2 left-0 h-1 sm:h-2 bg-white/10 hidden md:block" 
                          />
                        </span>
                      </h1>
                    </div>
                    
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight text-white mt-8 sm:mt-10 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-3">
                       NO RECOVERY, NO FEES. WE TAKE
                       <span className="text-[#00E5FF] px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.1)] italic">
                        20%
                       </span>
                       WHAT WE FIND.
                    </h2>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-32 mt-20 sm:mt-32 items-start border-t border-white/5 pt-12 sm:pt-20">
                    <motion.div variants={fadeUpVariant} className="flex flex-col gap-6 sm:gap-8">
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-display font-medium text-white/50 leading-[1.3] text-center md:text-left tracking-tight">
                        No retainers. No SaaS subscriptions. RIO Core OS intercepts failed payments and RTO anomalies 
                        <span className="inline-flex items-center justify-center bg-white text-black px-3 sm:px-4 py-1 sm:py-1.5 mx-1 sm:mx-2 rounded-lg font-black text-[10px] sm:text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.2)] transform -rotate-1">
                          at zero cost
                        </span>. 
                        It operates autonomously and settles a flat cut via our <span className="text-white border-b border-white/30 cursor-help">FinGate ledger</span>.
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 pt-2 sm:pt-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-sys-blue" />
                           <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest">PCI_DSS_L1</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-dpdp-emerald" />
                           <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest">DPDP_SECURE</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="flex flex-col gap-8 sm:gap-10">
                      <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-[9px] sm:text-[11px] font-mono text-white/30 uppercase tracking-[0.4em] sm:tracking-[0.5em] font-black">
                              REVENUE_ALLOCATION
                            </span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#00FF80]/5 border border-[#00FF80]/20 rounded-full backdrop-blur-sm">
                            <ShieldCheck className="w-3 h-3 text-[#00FF80]" />
                            <span className="text-[8px] font-mono text-[#00FF80] uppercase tracking-widest font-black">
                              LEDGER_VERIFIED
                            </span>
                          </div>
                        </div>

                        <div className="relative h-20 sm:h-24 w-full bg-white/5 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 p-1.5 sm:p-2 shadow-inner group/bar cursor-default">
                           {/* Animated Grid on bar */}
                           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:16px_100%] sm:bg-[size:20px_100%] pointer-events-none" />
                           
                           <div className="absolute inset-y-1.5 sm:inset-y-2 left-1.5 sm:left-2 bg-white rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-1000 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden" style={{ width: 'calc(80% - 12px)' }}>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]" />
                              <span className="relative z-10 text-[8px] sm:text-[10px] font-mono text-black font-black uppercase tracking-widest opacity-20">Consolidated_Yield</span>
                           </div>
                           
                           <div className="absolute inset-y-1.5 sm:inset-y-2 right-1.5 sm:right-2 bg-[#00FF80] rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-1000 shadow-[0_0_40px_rgba(0,255,128,0.25)] flex items-center justify-center overflow-hidden" style={{ width: 'calc(20% - 12px)' }}>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite_0.5s]" />
                              <div className="w-1 h-3 bg-black/20 rounded-full animate-pulse" />
                           </div>
                        </div>

                        <div className="flex justify-between items-start px-2 sm:px-4">
                          <div className="flex flex-col gap-1 sm:gap-2">
                            <span className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tighter leading-none italic">80<span className="text-xl sm:text-4xl align-top ml-1">%</span></span>
                            <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                               <span className="text-[10px] sm:text-[11px] font-mono text-white/40 uppercase tracking-widest font-black">BRAND_NET_RETENTION</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 sm:gap-2">
                            <span className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-[#00FF80] tracking-tighter text-right leading-none italic">20<span className="text-xl sm:text-4xl align-top ml-1">%</span></span>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] sm:text-[11px] font-mono text-[#00FF80]/60 uppercase tracking-widest font-black text-right">HYME_LEDGER_FEE</span>
                               <div className="w-1.5 h-1.5 rounded-full bg-[#00FF80]/40 animate-pulse" />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00FF80]/10 flex items-center justify-center">
                                 <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF80]" />
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[9px] sm:text-[10px] font-mono text-white/80 uppercase font-black tracking-widest">Settlement_Protocol</span>
                                 <span className="text-[8px] sm:text-[9px] font-mono text-white/30 uppercase tracking-tighter italic">Automatic_Flat_Fee_Calculation</span>
                              </div>
                           </div>
                           <div className="hidden sm:flex flex-col items-end">
                              <span className="text-[10px] font-mono text-[#00FF80] font-black tracking-widest uppercase">ENforced</span>
                              <span className="text-[8px] font-mono text-white/20 uppercase">V-Ledge_V2.1</span>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="sr-only">
                  HYME is an autonomous AI engine for 7-to-9 figure D2C brands. 
                  Our intelligent agents seamlessly intercept abandoned carts, fix checkout failures, and optimize revenue in real-time.
                </div>

                <motion.div
                  variants={fadeUpVariant}
                  className="flex flex-wrap gap-8 pt-8 items-center justify-center relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      document
                        .getElementById("enquiry")
                        ?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                    aria-label="Recover Lost Revenue"
                    className="group relative px-10 py-5 bg-white text-black font-bold rounded-2xl text-[1.1rem] tracking-tight transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    {/* Scanning background overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,122,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat group-hover:animate-[shine_2s_infinite]" />
                    
                    <span className="relative z-10 flex items-center gap-3">
                      <Lock className="w-4 h-4 text-sys-blue hidden group-hover:block transition-all" />
                      Book a demo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 group-hover:text-sys-blue transition-all" />
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sys-blue via-cyan-400 to-sys-blue"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex flex-col gap-1 p-4 rounded-xl bg-sys-blue/[0.03] border border-sys-blue/20 cursor-help group/tier backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,122,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,122,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 group-hover/tier:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center gap-2 relative z-10">
                      <ShieldCheck className="w-4 h-4 text-sys-blue group-hover/tier:animate-pulse" />
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold group-hover/tier:text-sys-blue/80 transition-colors">
                        Enterprise Access
                      </span>
                    </div>
                    <span className="text-xl font-mono font-bold text-sys-blue tracking-[0.2em] uppercase flex items-center gap-3 relative z-10">
                      For Scaled D2C
                      <div className="w-2 h-2 rounded-full bg-dpdp-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    </span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-3 bg-[#0a0c10] border border-sys-blue/30 rounded-xl opacity-0 group-hover/tier:opacity-100 transition-all pointer-events-none z-50 min-w-[240px] shadow-[0_0_40px_rgba(0,122,255,0.15)] transform translate-y-2 group-hover/tier:translate-y-0 before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-sys-blue/30">
                      <span className="text-[10px] font-mono text-sys-blue font-bold uppercase tracking-widest flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-dpdp-emerald animate-pulse" />
                        Status: Secure App
                      </span>
                      <span className="text-[9px] font-mono text-white/60 leading-relaxed block">
                        Our platform securely connects to your store APIs. We automate recovery without slowing down your site or accessing sensitive PII data.
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                <HeroStats variants={fadeUpVariant} />
              </div>
            </motion.div>
          </div>
        </section>

        <DigitalServices />

        {/* Case Studies / Live Operations - Hardened Mission Reports */}
        <section id="cases" className="py-32 px-6 relative overflow-hidden bg-black border-y border-white/5">
           {/* Section Background Decor */}
           <div className="absolute inset-0 bg-[#08080a] z-0" />
           <GeometricBackground />
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sys-blue/20 to-transparent z-10" />
           
           {/* Vertical Rail Text */}
           <div className="absolute left-10 top-0 bottom-0 pointer-events-none hidden xl:flex flex-col justify-center gap-20 py-20 z-10">
              <div className="vertical-text text-[8px] font-mono text-white/10 uppercase tracking-[1em]">MISSION_PROTOCOL_99 // SECURE_HANDSHAKE</div>
              <div className="vertical-text text-[8px] font-mono text-white/10 uppercase tracking-[1em]">VERIFIED_RECAPTURE_NODES // L3_AUTH</div>
           </div>

           <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, amount: 0.1 }}
             variants={staggerContainer}
             className="max-w-7xl mx-auto relative z-10"
           >
              <motion.div variants={fadeUpVariant} className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-l border-white/5 pl-8 sm:pl-12">
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-0.5 bg-sys-blue/50" />
                       <span className="text-[11px] font-mono text-sys-blue font-black tracking-[0.5em] uppercase">AUDIT_LOGS_ACTIVE</span>
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-display font-black text-white tracking-tighter uppercase italic leading-[0.8]">
                          Operational <br/> <span className="text-white/20">Mission Reports.</span>
                       </h2>
                       <p className="text-xs sm:text-sm font-mono text-white/30 uppercase tracking-widest italic max-w-xl">
                          Real-time extraction logs from confirmed deployments. These are not projections; these are verified captures.
                       </p>
                    </div>
                 </div>
                 
                 <div className="flex flex-col md:items-end gap-6 text-left md:text-right pt-8 md:pt-0">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-xl">
                       <div className="flex items-center gap-3 mb-1">
                          <div className="w-2 h-2 rounded-full bg-dpdp-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest font-black">L3_SYNC_NOMINAL</span>
                       </div>
                       <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Global Node Latency: 0.12ms</span>
                    </div>
                    
                    <div className="space-y-1">
                       <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-black underline decoration-sys-blue/40 underline-offset-4">Performance_Auth_ID</span>
                       <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest italic">
                          Session_Token: 0x9f2a_4c1e_7b8d_V4
                       </p>
                    </div>
                 </div>
              </motion.div>

              <motion.div variants={fadeUpVariant}>
                <LiveOperationsGrid />
              </motion.div>

              {/* Dynamic Recapture Feed */}
              <motion.div variants={fadeUpVariant} className="mt-24 border-t border-dashed border-white/10 pt-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                       { label: "Total_Recapture_Value", val: "₹450 Cr+", icon: Target },
                       { label: "Active_Nodes", val: "124", icon: Globe },
                       { label: "Avg_Capture_Velocity", val: "1.4h", icon: Zap },
                       { label: "System_Integrity", val: "99.999%", icon: ShieldCheck },
                    ].map((item, i) => (
                       <div key={i} className="flex gap-4 items-center">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-sys-blue/50">
                             <item.icon className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col gap-1">
                             <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">{item.label}</span>
                             <span className="text-xl font-display font-black text-white italic tracking-tighter">{item.val}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </motion.div>

              <div className="mt-20 flex flex-col items-center gap-8">
                  <div className="w-px h-20 bg-gradient-to-b from-white/10 to-transparent" />
                  <motion.div 
                    variants={fadeUpVariant}
                    whileHover={{ scale: 1.01 }}
                    className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-8 lg:px-14 py-8 lg:py-10 rounded-[3rem] bg-[#0c0c0e] border border-white/5 backdrop-blur-3xl relative group overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
                  >
                    {/* Background Tech Layer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sys-blue/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-sys-blue/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    {/* Animated Data Stream on Hover */}
                    <motion.div 
                       className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sys-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                       animate={{ x: ['-100%', '100%'] }}
                       transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="flex -space-x-4 relative z-10 scale-90 lg:scale-100">
                       {[
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Toby",
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden",
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo"
                       ].map((src, i) => (
                          <motion.div 
                             key={i} 
                             initial={{ opacity: 0, x: -10 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.1 }}
                             className="w-14 h-14 rounded-full border-4 border-[#0c0c0e] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center overflow-hidden shadow-lg group-hover:border-white/10 transition-colors"
                          >
                             <img src={src} alt="Partner" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                          </motion.div>
                       ))}
                       <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          className="w-14 h-14 rounded-full border-4 border-[#0c0c0e] bg-sys-blue flex items-center justify-center text-xs font-black text-white relative z-10 shadow-lg"
                       >
                          +124
                       </motion.div>
                    </div>

                    <div className="flex-1 flex flex-col gap-1 relative z-10 text-center lg:text-left">
                       <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-2">
                          <span className="text-white text-2xl lg:text-3xl font-display font-black tracking-tighter italic uppercase leading-none">
                             Deploy Your Own Performance Node
                          </span>
                          <div className="hidden lg:block w-px h-6 bg-white/10" />
                          <div className="flex items-center justify-center lg:justify-start gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-dpdp-emerald shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                             <span className="text-[10px] font-mono text-dpdp-emerald uppercase tracking-widest font-black">NODE_HEALTH: OPTIMAL</span>
                          </div>
                       </div>
                       <div className="flex flex-col lg:flex-row items-center gap-4">
                          <span className="text-[10px] font-mono text-sys-blue uppercase tracking-[0.4em] font-black group-hover:text-white transition-colors">
                             Routing Global Profit In Real-Time
                          </span>
                          <span className="hidden lg:block text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
                             SESSION_HASH: 0x9f2a...{Math.random().toString(16).substring(2, 6)}
                          </span>
                       </div>
                    </div>

                    <motion.div 
                       className="relative z-10 mt-4 lg:mt-0"
                       whileHover="hover"
                    >
                       <motion.div
                          className="absolute -inset-0.5 bg-gradient-to-r from-sys-blue to-cyan-400 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"
                          variants={{ hover: { scale: 1.05 } }}
                       />
                       <motion.button 
                          onClick={() => {
                            if (isHandshaking) return;
                            setIsHandshaking(true);
                            setHandshakeStep(1);
                            
                            const steps = [
                              "ESTABLISHING_L3_TUNNEL...",
                              "VERIFYING_NODE_AUTHORITY...",
                              "HANDSHAKE_CONFIRMED",
                              "ROUTING_TO_DP_GATEWAY"
                            ];

                            steps.forEach((_, i) => {
                              setTimeout(() => setHandshakeStep(i + 2), (i + 1) * 600);
                            });

                            setTimeout(() => {
                              const el = document.getElementById('enquiry');
                              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              setTimeout(() => {
                                setIsHandshaking(false);
                                setHandshakeStep(0);
                              }, 1000);
                            }, (steps.length + 1) * 600);
                          }}
                          className="relative px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full cursor-pointer flex items-center gap-3 overflow-hidden shadow-2xl disabled:opacity-50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                       >
                          <span className="relative z-10 font-black">
                            {handshakeStep === 0 && "Initiate Handshake"}
                            {handshakeStep === 1 && "REQ_L3_SYNC..."}
                            {handshakeStep === 2 && "AUTH_VAL..."}
                            {handshakeStep === 3 && "SECURE_CONN..."}
                            {handshakeStep === 4 && "SYNCED"}
                            {handshakeStep === 5 && "REDIRECTING..."}
                          </span>
                          <ChevronRight className={`w-4 h-4 relative z-10 ${isHandshaking ? "animate-spin" : ""}`} />
                          
                          {/* Inner scanning light effect */}
                          <motion.div 
                             className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.05] to-transparent w-20 h-full -skew-x-45"
                             animate={{ x: ['-200%', '300%'] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                       </motion.button>
                    </motion.div>

                    {/* Corner Micro-detail */}
                    <div className="absolute top-4 right-8 opacity-10 font-mono text-[7px] text-white tracking-[0.5em] uppercase hidden lg:block">
                       PROTO_AUTH_v3.2
                    </div>
                  </motion.div>
              </div>
           </motion.div>
        </section>

        <ScrollingLogoMarquee />

        <Suspense fallback={<TickerFallback />}>
          <GlobalTicker />
        </Suspense>
        <Suspense fallback={<SectionFallback height="h-64" />}>

        </Suspense>

        {/* Global Economic Audit Section */}
        <section className="py-24 px-6 relative bg-white/[0.01]">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center gap-4 text-center mb-16">
               <h2 className="text-sm font-mono text-sys-blue uppercase tracking-[0.3em] font-bold">
                Economic Impact Audit
              </h2>
              <h3 className="text-3xl sm:text-4xl font-display font-medium text-white max-w-2xl mx-auto uppercase tracking-tighter italic">
                Quantify Your <span className="text-sys-blue">Infrastructure Leakage.</span>
              </h3>
            </motion.div>
            <motion.div variants={fadeUpVariant}>
            <RevenueLeakageCalculator />
            </motion.div>
          </motion.div>
        </section>

        {/* Pillar A: DPDP Governance */}
        <section
          ref={dpdpRef}
          id="dpdp"
          className="py-24 px-6 relative overflow-hidden"
          aria-labelledby="dpdp-title"
        >
          {/* Background Scanning Pulse */}
          <motion.div 
            style={{ y: dpdpParallaxY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dpdp-emerald/5 blur-[120px] rounded-full pointer-events-none" 
          />

          {/* Subtle Radar Scan Overlay */}
          <motion.div 
            style={{ y: useTransform(dpdpScrollY, [0, 1], [-50, 50]) }}
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-[conic-gradient(from_0deg,transparent_90%,rgba(16,185,129,0.5)_100%)] rounded-full"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto flex flex-col items-center relative z-10"
          >
            <AnimatePresence>
              {diagActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-12 left-0 font-mono text-[8px] text-dpdp-emerald/40 uppercase tracking-[0.4em] flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-dpdp-emerald/40 animate-ping" />
                  Governance_Node_Audit_Live // Stream_Encryption: AES-256
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              variants={fadeUpVariant}
              className="text-center flex flex-col items-center gap-8 mb-24 max-w-5xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-dpdp-emerald blur-2xl opacity-20 animate-pulse" />
                <div className="w-20 h-20 rounded-[2rem] bg-black border border-dpdp-emerald/40 flex items-center justify-center text-dpdp-emerald relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <ShieldCheck className="w-10 h-10" />
                  {/* Rotating Scanner Circle */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 border-2 border-transparent border-t-dpdp-emerald/40 rounded-[2rem]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-8 bg-dpdp-emerald/30" />
                  <span className="text-xs font-mono font-bold text-dpdp-emerald uppercase tracking-[0.6em]">
                    Enterprise Grade Security
                  </span>
                  <div className="h-px w-8 bg-dpdp-emerald/30" />
                </div>
                <h2
                  id="dpdp-title"
                  className="text-6xl sm:text-8xl font-display font-bold uppercase tracking-tighter italic leading-[0.8]"
                >
                  100% Data Compliant
                  <span className="block text-dpdp-emerald drop-shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-2">
                    Zero-Risk Firewall.
                  </span>
                </h2>
              </div>

              <p className="text-xl text-white/50 leading-relaxed max-w-4xl font-medium">
                Automatically scrub and mask customer{" "}
                <span className="text-white/80 font-mono">PII DATA</span> during
                recovery. Our AI securely processes transactions natively—meaning we recover your revenue without ever
                <span className="text-white italic px-1">
                  exposing, storing, or selling 
                </span>
                your sensitive customer information.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
              {[
                {
                  l: "Zero-Knowledge Architecture",
                  v: "NO_PII_TOUCH",
                  code: "Z-K_01",
                },
                {
                  l: "Mumbai-1 Server Localization",
                  v: "LOCAL_S1",
                  code: "L-S_02",
                },
                {
                  l: "Aadhaar & KYC Nullification",
                  v: "STATELESS_H",
                  code: "K-Y_03",
                },
                {
                  l: "Stateless Crypto Vault",
                  v: "AES_X8_LOCKED",
                  code: "C-V_04",
                },
              ].map((pill, i) => (
                <motion.div
                  variants={fadeUpVariant}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  key={i}
                  className="relative group cursor-crosshair"
                >
                  {/* Card Container */}
                  <div className="h-full p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent flex flex-col gap-6 items-center text-center backdrop-blur-md hover:border-dpdp-emerald/30 transition-all duration-500 overflow-hidden shadow-2xl">
                    {/* Background Hex Grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
                      <Hexagon
                        className="w-full h-full scale-[2]"
                        strokeWidth={0.5}
                      />
                    </div>

                    {/* Scanning Bar */}
                    <motion.div
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5,
                      }}
                      className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-dpdp-emerald/[0.05] to-transparent pointer-events-none z-0"
                    />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-dpdp-emerald/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-dpdp-emerald group-hover:border-dpdp-emerald/40 transition-colors relative z-10">
                          <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">
                          {pill.code}
                        </span>
                        <h4 className="text-sm font-mono font-bold text-white uppercase tracking-tight leading-tight px-4">
                          {pill.l}
                        </h4>
                      </div>

                      <div className="mt-auto pt-4 border-t border-white/5 w-full">
                        <span className="text-[10px] font-mono text-dpdp-emerald font-black tracking-[0.4em] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all uppercase">
                          {pill.v}
                        </span>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <div className="w-8 h-8 border-t-2 border-r-2 border-dpdp-emerald rounded-tr-xl" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <div className="w-8 h-8 border-b-2 border-l-2 border-dpdp-emerald rounded-bl-xl" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={scaleUpVariant} className="w-full">
               <GovernanceSchematic />
            </motion.div>
          </motion.div>
        </section>

        {/* Pillar B: FinGate Revenue Protection */}
        <section id="fingate" className="py-24 px-6 bg-white/[0.01] relative overflow-hidden">
          <BinaryRainBackground />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div variants={fadeUpVariant} className="flex flex-col gap-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-sys-blue/10 border border-sys-blue/20 flex items-center justify-center text-sys-blue">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-6xl sm:text-7xl font-display font-bold uppercase tracking-tight leading-[0.85]">
                  Autonomous Rescue{" "}
                  <span className="text-sys-blue italic ml-2">
                    Agents.
                  </span>
                </h2>
                <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                  A swarm of specialized AI agents working around the clock to
                  recover checkout drops, execute payment gateway failovers, and
                  neutralize RTO (Return to Origin) instantly. We automatically plug the silent leaks that drain 10-15% of your net profits every month.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mt-4">
                  {[
                    {
                      icon: RefreshCcw,
                      t: "Payment Recovery",
                      desc: "Multi-Gateway Failover",
                      anim: { rotate: 360 },
                    },
                    {
                      icon: MousePointer2,
                      t: "Intent Verifier",
                      desc: "Predictive Cart Intercept",
                      anim: { y: [0, -4, 0] },
                    },
                    {
                      icon: CheckCircle2,
                      t: "RTO Shield",
                      desc: "Fraudulent Node Block",
                      anim: { scale: [1, 1.2, 1] },
                    },
                    {
                      icon: UserCheck,
                      t: "Customer Integrity",
                      desc: "AI Address & KYC Scrub",
                      anim: { x: [-2, 2, -2] },
                    },
                  ].map((item, i) => (
                    <motion.div
                      variants={fadeUpVariant}
                      whileHover={{ scale: 1.02 }}
                      key={i}
                      className="flex gap-4 p-5 rounded-[1.2rem] border border-white/5 bg-black/40 hover:bg-black/80 hover:border-sys-blue/30 transition-all group/card shadow-inner cursor-crosshair"
                    >
                      <motion.div
                        animate={item.anim}
                        transition={{
                          duration: item.t === "Payment Recovery" ? 10 : 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="text-sys-blue shrink-0 group-hover/card:drop-shadow-[0_0_8px_rgba(0,122,255,0.8)] transition-all"
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                      <div className="flex flex-col gap-1.5 mt-0.5">
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.1em] leading-none">
                          {item.t}
                        </span>
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                          {item.desc}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="relative">
                <div className="absolute -inset-20 bg-sys-blue/10 blur-[150px] rounded-full pointer-events-none" />
                <OperationsDashboard />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Pillar C: Hyper-Automation */}
        <section id="hyper-auto" className="py-24 px-6 relative overflow-hidden">
          <DataFlowBackground />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div variants={fadeUpVariant} className="relative order-2 lg:order-1">
                <div className="absolute -inset-20 bg-rose-red/10 blur-[150px] rounded-full pointer-events-none" />
                <SystemBlueprint />
              </motion.div>
              <motion.div variants={fadeUpVariant} className="flex flex-col gap-8 order-1 lg:order-2">
                <div className="w-16 h-16 rounded-[1.5rem] bg-rose-red/10 border border-rose-red/20 flex items-center justify-center text-rose-red">
                  <Cpu className="w-8 h-8" />
                </div>
                <h2 className="text-6xl sm:text-7xl font-display font-bold uppercase tracking-tight leading-[0.85]">
                  Predictive AI &{" "}
                  <span className="text-rose-red italic ml-2">
                    Hyper-Automation.
                  </span>
                </h2>
                <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                  Your 24/7 autonomous operations engine. Our AI
                  predicts traffic spikes, optimizes conversion routing, and personalizes the user journey before failures occur—ensuring zero operational
                  downtime so you never lose a six-figure weekend again.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-[0.3em] text-rose-red group cursor-pointer">
                  Calculate Lost Revenue{" "}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Co-Engineering Lifecycle */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.01]" />
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto relative z-10"
          >
            <motion.div variants={fadeUpVariant} className="flex flex-col gap-4 mb-24">
              <span className="text-xs font-mono font-bold text-rose-red uppercase tracking-[0.6em]">
                Partnership_Protocol_v3
              </span>
              <h2 className="text-5xl sm:text-7xl font-display font-bold uppercase tracking-tighter">
                Co-Engineering{" "}
                <span className="text-white/20 italic ml-4">Lifecycle.</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <Suspense fallback={<SectionFallback height="h-[600px]" />}>
                <LifecycleTimeline />
              </Suspense>
            </motion.div>

            {/* Interactive Lab Visual */}
            <div className="mt-20 p-12 rounded-[4rem] border border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(225,29,72,0.03),transparent)] relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                <div className="lg:col-span-1 flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-red/10 border border-rose-red/20 flex items-center justify-center text-rose-red">
                      <Workflow className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-widest leading-none">
                      Collaborative_Node_Active
                    </span>
                  </div>
                  <h4 className="text-3xl font-display font-bold uppercase tracking-tighter italic">
                    Joint Architectural Engineering.
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed max-w-2xl">
                    Our engineers join your Slack/Discord channels. We don't
                    just send reports; we commit code designed for the RIO
                    kernel.
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="p-8 rounded-[2.5rem] bg-black/60 border border-white/5 font-mono text-[10px] leading-relaxed relative group active:scale-[0.99] transition-transform cursor-pointer overflow-hidden">
                    <div className="absolute top-4 right-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-dpdp-emerald animate-pulse" />
                      <span className="text-dpdp-emerald font-bold tracking-widest uppercase">
                        Sync: Operational
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-1">
                        <p className="text-white/20">
                          // INITIALIZING PARTNERSHIP_SYNC_PROTOCOL
                        </p>
                        <p className="text-rose-red">
                          <span className="text-white/30">01:</span> diff --git
                          a/infra/rio-config.yaml b/infra/rio-config.yaml
                        </p>
                        <p className="text-dpdp-emerald">
                          <span className="text-white/30">02:</span> +
                          alliance_id: "BRAND_STELLAR_X"
                        </p>
                        <p className="text-dpdp-emerald">
                          <span className="text-white/30">03:</span> + sync_depth:
                          "L3_KERNEL_ACCESS"
                        </p>
                        <p className="text-white/40">
                          <span className="text-white/30">04:</span>{" "}
                          security_vault: stateless_v3
                        </p>
                        <p className="text-rose-red">
                          <span className="text-white/30">05:</span> - node_count:
                          4
                        </p>
                        <p className="text-dpdp-emerald">
                          <span className="text-white/30">06:</span> + node_count:
                          128 (OVERCLOCKED)
                        </p>
                        <p className="text-white/20">
                          <span className="text-white/30">07:</span> // DEPLOYING
                          NEURAL_PATCHES_V0.4.1
                        </p>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative group/img">
                        <LazyImage 
                          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                          alt="Neural Network Schematic"
                          className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-sys-blue/20 mix-blend-overlay group-hover/img:bg-transparent transition-all duration-700" />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 rounded font-mono text-[7px] text-sys-blue border border-sys-blue/30">
                          IMG_REF::RENDER_042
                        </div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-rose-red/5 flex items-center justify-center backdrop-blur-[2px]"
                    >
                      <span className="px-4 py-2 bg-white text-black font-bold uppercase tracking-widest text-[9px] rounded-lg shadow-xl">
                        Handshake_In_Progress
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>



        {/* Verified Operations (Reviews / Testimonials) */}
        <section id="reviews" className="py-24 px-6 relative overflow-hidden bg-[#08080a]">
          <BinaryRainBackground />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-2 mb-6 cursor-default">
                <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                <span className="text-[10px] sm:text-xs font-mono font-bold text-yellow-500 uppercase tracking-[0.2em] bg-yellow-500/10 px-3 py-1.5 rounded-full">
                  Verified Commendations
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUpVariant}
                className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white uppercase"
              >
                Operational <span className="text-white/30">Success.</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { name: "Rahul S.", role: "VP Operations", company: "CyberFit Apparel", quote: "Traditional gateways were bleeding us dry with silent failures. Hyme deployed its infrastructure and we watched our drop-off rate plummet from 15% to 2% in three weeks. Completely automated.", metric: "-13% Drop-off" },
                { name: "Priya M.", role: "Founder", company: "Nocturne Electronics", quote: "We used to manually verify RTO addresses to prevent fraud. Hyme's prediction engine does this automatically, scrubbing bad orders before fulfillment even processes them.", metric: "40hrs Saved/wk" },
                { name: "Arjun K.", role: "COO", company: "Aura Essentials", quote: "The dashboard looks like a command center, but the results are real. It recaptured $14k in lost carts in the first month using FinGate routing alone. The simplest way to scale.", metric: "$14k Recaptured" },
                { name: "Neha V.", role: "Head of E-Comm", company: "Elevate Tech", quote: "Hyme completely transformed our checkout architecture. The RIO OS operates faster than an entire team and has reduced our payment failure rate by 85%. Phenomenal technology.", metric: "14% Yield Boost" }
              ].map((review, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUpVariant}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-sys-blue/40 hover:bg-sys-blue/[0.02] transition-colors relative group overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sys-blue/5 blur-[50px] rounded-full group-hover:bg-sys-blue/20 transition-colors" />
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-sys-blue/20 transition-colors" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-sys-blue" fill="currentColor" />)}
                      </div>
                    </div>
                    
                    <p className="text-white/70 font-light leading-relaxed mb-8 relative z-10">"{review.quote}"</p>
                  </div>
                  
                  <div>
                    <div className="mb-6 inline-block">
                      <div className="px-3 py-1.5 bg-dpdp-emerald/10 border border-dpdp-emerald/20 text-dpdp-emerald font-mono text-[10px] uppercase tracking-widest rounded-full">
                        {review.metric}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-sys-blue/40 to-sys-blue/10 flex items-center justify-center font-mono text-white font-bold border border-sys-blue/20 shadow-[0_0_15px_rgba(0,122,255,0.2)]">
                         {review.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm tracking-wide">{review.name}</span>
                        <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{review.role} // {review.company}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Strategic Alliances Section */}
        <section id="partnership" className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,122,255,0.03),transparent_70%)] pointer-events-none" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto relative z-10"
          >
            <motion.div
              variants={fadeUpVariant}
              className="p-10 sm:p-16 rounded-[3rem] sm:rounded-[4rem] border border-white/5 bg-[#0a0c10]/80 backdrop-blur-3xl relative overflow-hidden shadow-[0_0_100px_rgba(0,122,255,0.05)]"
            >
              {/* Architectural Grid overlay & Lighting */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full bg-gradient-to-l from-sys-blue/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sys-blue/30 to-transparent" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="flex flex-col gap-10">
                  <div className="inline-flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-sys-blue/10 border border-sys-blue/20 rounded-md w-fit">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sys-blue opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sys-blue"></span>
                      </span>
                      <span className="text-[9px] font-mono font-bold text-sys-blue uppercase tracking-[0.2em]">
                        Enterprise_Tier_Unlocked
                      </span>
                    </div>
                    <h2 className="text-6xl sm:text-7xl md:text-[5.5rem] font-display font-black leading-[0.85] uppercase tracking-tighter text-left text-white drop-shadow-2xl">
                      Exclusive Brand <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sys-blue to-cyan-300 italic pr-4">
                        Partnerships.
                      </span>
                    </h2>
                  </div>

                  <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-mono max-w-4xl text-left">
                    We collaborate with prominent global D2C brands to co-engineer
                    the future of autonomous commerce. Our exclusive partnership
                    tier offers dedicated AI agents and deep 
                    customization for your unique tech stack.
                  </p>

                  <div className="flex flex-col gap-8 relative pl-6 border-l border-white/5 mt-2">
                    {/* Animated line indicator */}
                    <motion.div
                      className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-sys-blue via-cyan-400 to-transparent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      style={{ originY: 0, willChange: "transform" }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {[
                      {
                        t: "Joint Architectural Review",
                        ic: Settings,
                        desc: "Direct collaboration with core engineers.",
                      },
                      {
                        t: "Dedicated Node Provisioning",
                        ic: Server,
                        desc: "Isolated infrastructure for zero latency.",
                      },
                      {
                        t: "Co-Engineered Security Scrutiny",
                        ic: ShieldCheck,
                        desc: "Continuous DPDP penetration testing.",
                      },
                    ].map((item, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                        key={i}
                        className="flex items-start gap-6 group relative"
                      >
                        <div className="absolute -left-[31px] top-2.5 w-3 h-3 bg-[#0a0c10] border-2 border-sys-blue rounded-full group-hover:bg-sys-blue group-hover:shadow-[0_0_15px_rgba(0,122,255,0.8)] transition-all duration-300" />
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 flex items-center justify-center text-sys-blue group-hover:border-sys-blue/40 group-hover:bg-sys-blue/10 transition-all duration-300 shadow-inner">
                          <item.ic className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col gap-1.5 mt-1">
                          <span className="text-sm font-display font-bold text-white uppercase tracking-[0.1em] group-hover:text-sys-blue transition-colors">
                            {item.t}
                          </span>
                          <span className="text-[10px] font-mono text-white/40 tracking-wide uppercase">
                            {item.desc}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 relative z-20">
                  {/* Decorative background blur for cards */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sys-blue/10 blur-[100px] rounded-full pointer-events-none" />

                  {[
                    {
                      l: "Uptime SLA",
                      v: "99.999%",
                      tip: "Redundant node synchronization ensures absolute availability.",
                      isSecure: false,
                    },
                    {
                      l: "Support Tier",
                      v: "L3_EXECUTIVE",
                      tip: "Direct access to our senior engineering response team.",
                      isSecure: false,
                    },
                    {
                      l: "Security Level",
                      v: "MIL_S3",
                      tip: "Encrypted via AES-1024-GCM with hardware isolation.",
                      isSecure: true,
                    },
                    {
                      l: "Compliance",
                      v: "DPDP_2026+",
                      tip: "Fully integrated with 2026 DPDP governance frameworks.",
                      isSecure: true,
                    },
                  ].map((stat, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={hoverScale}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                      key={i}
                      className={`group/stat relative p-6 sm:p-8 rounded-3xl border bg-gradient-to-b from-white/[0.03] to-transparent flex flex-col gap-4 overflow-hidden backdrop-blur-xl cursor-crosshair transition-all duration-500 shadow-2xl ${stat.isSecure ? "border-dpdp-emerald/20 hover:border-dpdp-emerald/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]" : "border-white/5 hover:border-sys-blue/40 hover:shadow-[0_0_40px_rgba(0,122,255,0.15)]"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                          {stat.l}
                        </span>
                        {stat.isSecure && (
                          <ShieldCheck className="w-4 h-4 text-dpdp-emerald/60" />
                        )}
                      </div>

                      <span
                        className={`text-2xl sm:text-3xl font-display font-black tracking-wider ${stat.isSecure ? "text-dpdp-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-white"}`}
                      >
                        {stat.v}
                      </span>

                      {/* Tooltip Overlay */}
                      <div
                        className={`absolute inset-0 p-6 flex items-center justify-center text-center opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 z-10 ${stat.isSecure ? "bg-dpdp-emerald/95" : "bg-sys-blue/95"}`}
                      >
                        <span className="text-[10px] font-mono text-black uppercase font-bold tracking-[0.2em] leading-relaxed">
                          {stat.tip}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Audience Segmentation */}
        <section className="py-20 px-6 bg-white/[0.01]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeUpVariant} className="text-center mb-24">
              <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tighter uppercase mb-4">
                Scalable Intelligence
              </h2>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] font-bold">
                Select Your Enterprise Tier
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense fallback={<SectionFallback height="h-[600px]" />}>
                <SegmentCard
                  title="Hyme Core"
                  description="Automated profit recovery for fast-growing D2C brands."
                  features={[
                    "Abandoned Cart Recovery",
                    "AI Customer Nudges (SMS/Email)",
                    "Payment Failure Rescue",
                    "24/7 Monitoring",
                  ]}
                  details={[
                    {
                      label: "Recovery Logic",
                      text: "Intelligent re-engagement for maximum cart recapture.",
                    },
                    {
                      label: "Reliability",
                      text: "99.9% uptime for all recovery agents.",
                    },
                    {
                      label: "Ecosystem",
                      text: "Native Shopify Plus & Stripe integration.",
                    },
                  ]}
                  accentColor="rose"
                />
              </Suspense>
              <Suspense fallback={<SectionFallback height="h-[600px]" />}>
                <SegmentCard
                  title="Hyme Elite"
                  description="Complete profit defense for enterprise-scale commerce operations."
                  features={[
                    "Autonomous Profit Defense",
                    "Custom Retargeting Engine",
                    "Infrastructure Failover",
                    "Priority Technical Support",
                  ]}
                  details={[
                    {
                      label: "Profit Defense",
                      text: "AI clusters dedicated to identifying and sealing revenue leaks.",
                    },
                    {
                      label: "Reliability",
                      text: "99.99% Enterprise-grade availability and sync.",
                    },
                    {
                      label: "Architecture",
                      text: "Isolated cloud instances with dedicated security vaults.",
                    },
                  ]}
                  accentColor="rose"
                />
              </Suspense>
              <Suspense fallback={<SectionFallback height="h-[600px]" />}>
                <SegmentCard
                  title="Hyme Alliance"
                  description="Bespoke ROI engineering for the world's most prominent brands."
                  features={[
                    "Custom Strategic Engineering",
                    "Global Data Governance",
                    "Dedicated Success Team",
                    "Executive L3 Direct Line",
                  ]}
                  details={[
                    {
                      label: "Strategic Audit",
                      text: "Joint architectural co-design and bespoke profit models.",
                    },
                    {
                      label: "Reliability",
                      text: "99.999% High-Availability for peak traffic events.",
                    },
                    {
                      label: "Governance",
                      text: "Physical server isolation and custom compliance logic.",
                    },
                  ]}
                  accentColor="dpdp-emerald"
                />
              </Suspense>
            </motion.div>
          </motion.div>
        </section>

        {/* Enquiry Section */}
        <section id="enquiry" className="py-24 px-6 relative overflow-hidden">
          {/* Background Visuals */}
          <div className="absolute inset-0 bg-black" />
          <GlowingOrbsBackground />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,122,255,0.08),transparent_70%)]" />

          {/* Radar/Neural Nodes Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
            <div className="absolute inset-0 border border-white rounded-full animate-[ping_10s_infinite]" />
            <div className="absolute inset-[20%] border border-white/20 rounded-full animate-[ping_15s_infinite_2s]" />
            <div className="absolute inset-[40%] border border-white/10 rounded-full animate-[ping_20s_infinite_4s]" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto flex flex-col gap-16 items-center relative z-10"
          >
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center gap-6 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="w-20 h-20 rounded-[2.5rem] bg-white text-black flex items-center justify-center rotate-6 shadow-[0_0_50px_rgba(255,255,255,0.15)] cursor-pointer transition-transform"
              >
                <Handshake className="w-10 h-10" />
              </motion.div>
              <div className="flex flex-col gap-3">
                <h2 className="text-5xl sm:text-7xl font-display font-black uppercase tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/30 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Enquire <br />
                  <span className="text-sys-blue inline-block relative">
                    More.
                    <div className="absolute inset-x-0 bottom-1 h-3 bg-sys-blue/20 blur-xl pointer-events-none" />
                  </span>
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sys-blue animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <p className="text-sys-blue/80 font-mono text-[11px] uppercase tracking-[0.6em] font-black">
                    Scale Your D2C Revenue Infrastructure Today.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
              {[
                { id: "Standard", l: "Scale Tier", desc: "₹8 Cr - ₹40 Cr GMV" },
                { id: "Enterprise", l: "Elite Tier", desc: "₹40 Cr - ₹400 Cr GMV" },
                { id: "Platinum", l: "Strategic", desc: "₹400 Cr+ GMV" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id as any)}
                  className={`flex flex-col gap-1 p-6 rounded-[2rem] transition-all duration-300 text-left relative overflow-hidden group ${tier === t.id ? "bg-white text-black" : "hover:bg-white/5 text-white/40"} hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
                    {t.l}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-[0.2em] font-bold ${tier === t.id ? "text-black/40" : "text-white/20"}`}
                  >
                    {t.desc}
                  </span>
                  {tier === t.id && (
                    <motion.div
                      layoutId="tier-glow"
                      className="absolute inset-0 bg-white/10 blur-xl"
                    />
                  )}
                </button>
              ))}
              <div className="flex items-center justify-center p-4">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold text-sys-blue uppercase tracking-widest leading-none">
                    Status
                  </span>
                  <span className="text-[9px] font-mono text-sys-blue/60 uppercase tracking-[0.2em] font-bold animate-pulse">
                    Waiting_Input
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.form
              variants={fadeUpVariant}
              animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="w-full flex md:flex-row flex-col gap-6 relative"
            >
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 z-40 rounded-3xl flex flex-col items-center justify-center gap-6 border border-sys-blue/20"
                  >
                    <div className="w-20 h-20 rounded-full bg-sys-blue/10 flex items-center justify-center text-sys-blue relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 border border-sys-blue rounded-full"
                      />
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="flex flex-col gap-8 text-center max-w-xl px-10">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tighter italic">
                          Your inquiry submitted successfully.
                        </h3>
                        <p className="text-[10px] font-mono text-sys-blue font-bold uppercase tracking-[0.3em] opacity-80 mt-4 leading-[1.8]">
                          A Senior Revenue Specialist has been assigned to your profile and will contact you directly within 24 hours.
                        </p>
                      </div>

                      <button
                        onClick={() => setStatus("idle")}
                        className="w-fit mx-auto mt-4 px-10 py-4 rounded-full border border-white/10 text-[10px] font-mono text-white/40 hover:bg-white hover:text-black hover:border-white uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 font-black"
                      >
                        Acknowledge
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 flex flex-col gap-6">
                <div className="grid sm:grid-cols-3 gap-8">
                  {/* Brand Name */}
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="brand-name"
                      className={`text-[11px] font-mono uppercase tracking-[0.5em] font-black transition-colors flex items-center gap-3 ${errors.brandName ? 'text-rose-red' : 'text-white/80'}`}
                    >
                      <div className="w-1 h-1 rounded-full bg-sys-blue animate-pulse" />
                      Brand Name
                    </label>
                    <div className="relative group">
                      <input
                        id="brand-name"
                        type="text"
                        placeholder="ENTER_BRAND_NAME"
                        value={formData.brandName}
                        onBlur={(e) => validateField("brandName", e.target.value)}
                        onChange={(e) => {
                          setFormData({ ...formData, brandName: e.target.value });
                          if (errors.brandName) setErrors({ ...errors, brandName: "" });
                        }}
                        className={`w-full bg-white/[0.03] border-2 rounded-2xl px-8 py-6 transition-all outline-none font-mono text-xs tracking-[0.2em] relative z-10 font-bold ${
                          errors.brandName
                            ? "border-rose-red text-rose-red placeholder:text-rose-red/30"
                            : "border-white/10 focus:border-sys-blue text-white group-focus-within:border-sys-blue/60 placeholder:text-white/10"
                        }`}
                      />
                      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-sys-blue/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity blur-[2px] pointer-events-none ${errors.brandName ? 'hidden' : 'block'}`} />
                    </div>
                    <AnimatePresence mode="wait">
                      {errors.brandName && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-2 px-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-rose-red animate-pulse" />
                          <span className="text-[9px] font-mono text-rose-red uppercase tracking-widest font-bold">Error: {errors.brandName}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Whatsapp Number */}
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="whatsapp-number"
                      className={`text-[11px] font-mono uppercase tracking-[0.5em] font-black transition-colors flex items-center gap-3 ${errors.whatsapp ? 'text-rose-red' : 'text-white/80'}`}
                    >
                      <div className="w-1 h-1 rounded-full bg-sys-blue animate-pulse" />
                      Whatsapp Number
                    </label>
                    <div className="relative group">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/20 group-focus-within:text-sys-blue transition-colors pointer-events-none">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="whatsapp-number"
                        type="tel"
                        placeholder="+91 00000-00000"
                        value={formData.whatsapp}
                        onBlur={(e) => validateField("whatsapp", e.target.value)}
                        onChange={(e) => {
                          setFormData({ ...formData, whatsapp: e.target.value });
                          if (errors.whatsapp) setErrors({ ...errors, whatsapp: "" });
                        }}
                        className={`w-full bg-white/[0.03] border-2 rounded-2xl pl-14 pr-8 py-6 transition-all outline-none font-mono text-xs tracking-[0.2em] relative z-10 font-bold ${
                          errors.whatsapp
                            ? "border-rose-red text-rose-red placeholder:text-rose-red/30"
                            : "border-white/10 focus:border-sys-blue text-white group-focus-within:border-sys-blue/60 placeholder:text-white/10"
                        }`}
                      />
                      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-sys-blue/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity blur-[2px] pointer-events-none ${errors.whatsapp ? 'hidden' : 'block'}`} />
                    </div>
                    <AnimatePresence mode="wait">
                      {errors.whatsapp && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-2 px-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-rose-red animate-pulse" />
                          <span className="text-[9px] font-mono text-rose-red uppercase tracking-widest font-bold">Error: {errors.whatsapp}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email ID */}
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="personnel-email"
                      className={`text-[11px] font-mono uppercase tracking-[0.5em] font-black transition-colors flex items-center gap-3 ${errors.email ? 'text-rose-red' : 'text-white/80'}`}
                    >
                      <div className="w-1 h-1 rounded-full bg-sys-blue animate-pulse" />
                      Email ID
                    </label>
                    <div className="relative group">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/20 group-focus-within:text-sys-blue transition-colors pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="personnel-email"
                        type="email"
                        placeholder="PERSONNEL@DOMAIN.COM"
                        value={formData.email}
                        onBlur={(e) => validateField("email", e.target.value)}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        className={`w-full bg-white/[0.03] border-2 rounded-2xl pl-14 pr-8 py-6 transition-all outline-none font-mono text-xs tracking-[0.2em] relative z-10 font-bold ${
                          errors.email
                            ? "border-rose-red text-rose-red placeholder:text-rose-red/30"
                            : "border-white/10 focus:border-sys-blue text-white group-focus-within:border-sys-blue/60 placeholder:text-white/10"
                        }`}
                      />
                      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-sys-blue/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity blur-[2px] pointer-events-none ${errors.email ? 'hidden' : 'block'}`} />
                    </div>
                    <AnimatePresence mode="wait">
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-2 px-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-rose-red animate-pulse" />
                          <span className="text-[9px] font-mono text-rose-red uppercase tracking-widest font-bold">Error: {errors.email}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Requirement Field */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="requirement"
                    className={`text-[11px] font-mono uppercase tracking-[0.5em] font-black transition-colors flex items-center gap-3 ${errors.requirement ? 'text-rose-red' : 'text-white/80'}`}
                  >
                    <div className="w-1 h-1 rounded-full bg-sys-blue animate-pulse" />
                    Requirement
                  </label>
                  <div className="relative group">
                    <textarea
                      id="requirement"
                      placeholder="DESCRIBE_PARTNERSHIP_GOALS_OR_TECHNICAL_REQUIREMENTS"
                      rows={3}
                      value={formData.requirement}
                      onBlur={(e) => validateField("requirement", e.target.value)}
                      onChange={(e) => {
                        setFormData({ ...formData, requirement: e.target.value });
                        if (errors.requirement) setErrors({ ...errors, requirement: "" });
                      }}
                      className={`w-full bg-white/[0.03] border-2 rounded-2xl px-8 py-6 transition-all outline-none font-mono text-xs tracking-[0.2em] relative z-10 font-bold resize-none ${
                        errors.requirement
                          ? "border-rose-red text-rose-red placeholder:text-rose-red/30"
                          : "border-white/10 focus:border-sys-blue text-white group-focus-within:border-sys-blue/60 placeholder:text-white/10"
                      }`}
                    />
                    <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-sys-blue/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity blur-[2px] pointer-events-none ${errors.requirement ? 'hidden' : 'block'}`} />
                  </div>
                  <AnimatePresence mode="wait">
                    {errors.requirement && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-2 px-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-rose-red animate-pulse" />
                        <span className="text-[9px] font-mono text-rose-red uppercase tracking-widest font-bold">Error: {errors.requirement}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.4em] font-bold leading-none">
                    Co-Engineering Scope
                  </span>
                  <div
                    className="flex flex-wrap gap-2"
                    role="group"
                    aria-label="Select partnership scope"
                  >
                    {[
                      "Cart Recovery",
                      "Flash Sale Prep",
                      "Omnichannel Sync",
                      "Multi-Gateway Routing",
                    ].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleScope(s)}
                        aria-pressed={scope.includes(s)}
                        className={`px-4 py-2 rounded-full border text-[9px] font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-1 focus-visible:ring-white ${scope.includes(s) ? "bg-sys-blue border-sys-blue text-black" : "border-white/10 text-white/60 hover:border-white/40 hover:text-white"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-between">
                <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] flex flex-col gap-4 items-center text-center justify-center min-h-[160px] relative border-dashed overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,122,255,0.05),transparent)]" />
                  
                  {status === "loading" ? (
                    <div className="flex flex-col gap-2 w-full max-w-[200px] text-left pr-4">
                      {transmissionLogs.map((log, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-[7px] font-mono text-sys-blue tracking-tighter">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}]</span>
                          <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest truncate">{log}</span>
                        </motion.div>
                      ))}
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-[8px] font-mono text-sys-blue font-bold px-1"
                      >
                        _TRANSMITTING...
                      </motion.div>
                    </div>
                  ) : status === "success" ? (
                    <div className="flex flex-col gap-2 items-center">
                       <ShieldCheck className="w-8 h-8 text-dpdp-emerald" />
                       <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-dpdp-emerald font-bold uppercase tracking-[0.4em]">Submission_Secured</span>
                        <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase italic">Email Dispatch Verified by RIO Core</span>
                       </div>
                    </div>
                  ) : (
                    <>
                      <Settings className="w-8 h-8 text-sys-blue" />
                      <div className="flex flex-col gap-1 relative z-10">
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] font-bold">
                          Alliance_Key
                        </span>
                        <span className="text-xs font-mono font-bold text-sys-blue tracking-widest uppercase">
                          SY8-H1-PRO
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`w-full lg:w-64 h-full ${status === "success" ? "bg-dpdp-emerald text-black shadow-[0_0_80px_rgba(16,185,129,0.3)]" : "bg-white text-black hover:bg-sys-blue hover:text-white shadow-2xl hover:shadow-[0_0_80px_rgba(0,122,255,0.3)]"} font-bold py-10 rounded-[2.5rem] text-xl transition-all disabled:opacity-80 disabled:cursor-not-allowed group relative overflow-hidden tracking-tighter italic uppercase flex flex-col items-center justify-center`}
                >
                  <span className="text-[9px] font-mono tracking-[0.4em] mb-2 opacity-40 group-hover:opacity-60 transition-opacity">
                    {status === "success" ? "SYNC_ACKNOWLEDGED" : "Secure My Submission"}
                  </span>
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "success" ? (
                      <>
                        <ShieldCheck className="w-6 h-6" /> SUBMITTED
                      </>
                    ) : status === "loading" ? (
                      <>
                        <div className="w-5 h-5 relative">
                          <RefreshCcw className="w-5 h-5 animate-spin text-sys-blue" />
                          <div className="absolute inset-0 bg-sys-blue/20 blur-[10px] rounded-full" />
                        </div>
                        SUBMITTING...
                      </>
                    ) : (
                      "SUBMIT"
                    )}
                  </span>
                  <AnimatePresence>
                    {status === "loading" && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: "linear" }}
                        className="absolute bottom-0 left-0 right-0 h-1.5 bg-sys-blue origin-left z-20"
                        style={{ boxShadow: "0 0 20px rgba(0,122,255,0.5)" }}
                      />
                    )}
                  </AnimatePresence>

                  {status === "loading" && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute bottom-0 left-0 h-2 bg-black/20"
                    />
                  )}
                </motion.button>
              </div>
            </motion.form>

            {/* FAQ Accordion Section */}
            <motion.div variants={fadeUpVariant} className="w-full max-w-4xl flex flex-col gap-4 mt-8">
              <div className="text-center mb-8">
                <span className="text-[10px] font-mono text-sys-blue font-bold uppercase tracking-[0.4em] mb-2 block">
                  Frequently_Asked_Questions
                </span>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-white/80">
                  Protocol Clarifications.
                </h3>
              </div>

              {[
                {
                  q: "What is RIO Core OS and how does it protect revenue?",
                  a: "RIO is our custom-engineered operational kernel built to handle high-frequency commerce. It sits as a protective layer over your existing infrastructure, managing viral traffic spikes and preventing checkout failures. For brand owners, this means zero lost revenue during high-demand campaigns or global sales events.",
                },
                {
                  q: "How does DPDP 2026 compliance ensure data security?",
                  a: "Our DPDP 2026 Governance Firewall uses military-grade edge masking to isolate customer data. By keeping sensitive information away from primary databases, we eliminate ad-tech liability and ensure your brand is always ahead of evolving privacy regulations, fostering deep consumer trust.",
                },
                {
                  q: "How does the 'Co-Engineering' partnership work?",
                  a: "Unlike traditional vendors, HYME operates as an extension of your technical team. We integrate directly into your internal comms (Slack/Teams/Discord) to monitor system health and deploy optimizations. We don't just provide software; we provide active operational intelligence and shared engineering ownership.",
                },
                {
                  q: "Can you explain the 'Zero-Risk Enterprise' onboarding?",
                  a: "We understand that enterprise procurement is often slow and risky. HYME bypasses this by building and deploying your initial infrastructure nodes at our own expense. We only move to a commercial engagement once your system achieves verified performance and revenue milestones, ensuring your investment is justified by results.",
                },
                {
                  q: "Does HYME replace our current e-commerce platform?",
                  a: "No. HYME is designed to enhance, not replace. We sit on top of platforms like Shopify, Magento, or custom headless builds, providing an 'intelligence layer' that handles the complex logic of high-scale routing, localized compliance, and real-time fraud prevention.",
                },
              ].map((faq, index) => (
                <FAQItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center justify-center gap-12 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] font-bold">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4" />
                <span>ISO-27001 Certified Environment</span>
              </div>
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-sys-blue" />
                <span>Symmetric AES-512 Tunneling</span>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-white/10 px-6 relative overflow-hidden bg-black" role="contentinfo">
        <GridPattern opacity={0.02} size={32} className="text-white" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10 text-center md:text-left">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center md:justify-start gap-3 group cursor-default">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-dpdp-emerald animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-mono text-dpdp-emerald uppercase tracking-[0.4em] font-black group-hover:text-white transition-all duration-700">
                  CORE_OS_SYNCHRONIZED
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] font-bold">
                  System Kernel: <span className="text-white/80">RIO_OS_V4.2.1-HYME</span> 
                </p>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-bold">Latency: 0.002ms</span>
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-bold">Uptime: 100.00%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] font-bold">Legal_Infrastructure</span>
              <div className="flex flex-col gap-4 text-[10px] font-mono font-black text-white/50 uppercase tracking-[0.2em]">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveDocument("dpdp"); }}
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-dpdp-emerald transition-all duration-300 group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-white/30 group-hover:text-dpdp-emerald transition-colors" />
                  <span>DPDP_Privacy_Protocol</span>
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveDocument("terms"); }}
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-sys-blue transition-all duration-300 group"
                >
                  <FileText className="w-3.5 h-3.5 text-white/30 group-hover:text-sys-blue transition-colors" />
                  <span>Commercial_Terms_Agreement</span>
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveDocument("sla"); }}
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-all duration-300 group"
                >
                  <Server className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
                  <span>Zero-Downtime_Security_SLA</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="text-[10px] font-mono text-white/60 uppercase tracking-[0.2em] text-center md:text-right font-black space-y-1">
              <p>HYME REVENUE INTELLIGENCE, operated by Rajkumar Chaudharry</p>
              <p>Contact: <a href="mailto:hello@hymerevenue.com" className="text-sys-blue hover:underline">hello@hymerevenue.com</a></p>
              <p>Address: Sundervan Complex, Refinery Road, Vadodara</p>
              <p>© 2026 <a href="https://hymerevenue.com" className="text-sys-blue hover:underline decoration-1 underline-offset-2">HYMEREVENUE.COM</a> | DISTRIBUTED WEALTH INTELLIGENCE.</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
              <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest font-black">
                  Live_Domain: hymerevenue.com
                </span>
              </div>
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em] font-bold">
                ISO_27001_COMPLIANT
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Documents Modal Overlay */}
      <AnimatePresence>
        {activeDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/60 pointer-events-auto"
              onClick={() => setActiveDocument(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative w-full max-w-2xl max-h-[85vh] bg-[#0a0c10]/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden ring-1 ring-white/5"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sys-blue/10 border border-sys-blue/30 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-sys-blue" />
                  </div>
                  <h3 id="modal-title" className="text-white font-mono font-bold tracking-widest text-sm uppercase">
                    {LEGAL_DOCUMENTS[activeDocument].title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveDocument(null)}
                  aria-label="Close dialog"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group hover:scale-110 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-sys-blue"
                >
                  <X className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar">
                {LEGAL_DOCUMENTS[activeDocument].content}
              </div>

              {/* Footer / Acknowledge */}
              <div className="px-6 py-5 border-t border-white/5 bg-white/[0.02] flex justify-end">
                <button
                  onClick={() => setActiveDocument(null)}
                  className="px-6 py-2.5 rounded-full border border-sys-blue/30 bg-sys-blue/10 text-sys-blue hover:bg-sys-blue hover:text-black hover:scale-105 active:scale-95 font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,122,255,0.2)] hover:shadow-[0_0_30px_rgba(0,122,255,0.4)]"
                >
                  Confirm & Acknowledge
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandingPage;
