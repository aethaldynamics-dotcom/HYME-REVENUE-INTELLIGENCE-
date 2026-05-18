import React from 'react';
import { motion } from 'motion/react';
import { Target, Lock, BarChart3, Settings, ShieldCheck, Zap, Server, Globe, Mail, Box, Cpu, RefreshCcw, Handshake, Database, ChevronRight } from 'lucide-react';

const services = [
  { name: "Global Checkout Leak Mapper", desc: "Our primary service for identifying structural weaknesses in the checkout funnel across US and EU markets. It pinpoints exactly where users drop off, optimizing the path to purchase.", icon: Target },
  { name: "Neural Fraud Sentinel", desc: "Utilizes advanced pattern-matching algorithms to distinguish between legitimate revenue spikes and fraudulent activity, solving chargeback leakage.", icon: Lock },
  { name: "AU/NZ Stock Predictor AI", desc: "Optimizes cross-border stock synchronization to prevent revenue loss from out-of-stock scenarios by predicting demand shifts.", icon: BarChart3 },
  { name: "Revenue Leakage Auto-Patch", desc: "A specialized 'friction eradicator' that autonomously implements fixes in the EU region during latency spikes.", icon: Settings },
  { name: "Multi-Region Compliance Guard", desc: "Provides real-time synchronization with GDPR, CCPA, and DPDP standards, shielding you from data mismanagement.", icon: ShieldCheck },
  { name: "Dynamic Pricing Matrix", desc: "Utilizes quantum-inspired algorithms to optimize product margins in real-time.", icon: Zap },
  { name: "UX Friction Probe", desc: "Performs advanced heatmap sequencing and behavioral analysis to pinpoint physiological resistance in user journeys.", icon: Server },
  { name: "Cart Re-animation Hub", desc: "Optimizes recovery emails and SMS triggers by predicting the exact micro-moment a user is most likely to purchase.", icon: Globe },
  { name: "Supply Chain Synapse AI", desc: "Optimizes logistics and fulfillment paths to reduce leakage caused by shipping delays and high transit costs.", icon: Mail },
  { name: "Forex Hedging Node", desc: "Provides real-time currency synchronization to solve exchange rate volatility leakage.", icon: Box },
  { name: "LTV Escalation Engine", desc: "Identifies churn patterns before they manifest, optimizing the post-purchase experience.", icon: Cpu },
  { name: "Quantum A/B Orchestrator", desc: "Optimizes front-end variants by dispatching dozens of tests simultaneously.", icon: RefreshCcw },
  { name: "Sentiment Analysis Core", desc: "Utilizes deep NLP listening to optimize social and feedback loops to solve reputation-driven leakage.", icon: Handshake },
  { name: "Ad Spend Optimizer", desc: "High-performance service for bidding automation, optimizing ad delivery by cross-referencing conversions.", icon: Database },
  { name: "Yield Harvesting Oracle", desc: "Optimizes treasury management to extract extra revenue from idle settlement pools.", icon: ChevronRight },
];

export const DigitalServices = () => {
  return (
    <section className="py-24 px-6 bg-[#050505] text-white relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,122,255,0.08),transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-6xl font-display font-medium text-center mb-6 tracking-tight"
        >
          Digital <span className="text-white/30">World</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
        >
          These 15 SERVICE are designed to optimize your sales performance without requiring additional financial investment.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 hover:border-sys-blue/30 transition-all duration-300 hover:bg-[#0d0d10] hover:shadow-[0_0_40px_rgba(0,122,255,0.05)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-sys-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-sys-blue group-hover:text-white group-hover:bg-sys-blue transition-all duration-300"
                >
                  <service.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-display font-bold mb-3 tracking-tight">{service.name}</h3>
                <p className="text-white/50 text-sm font-sans leading-relaxed group-hover:text-white/70 transition-colors">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
