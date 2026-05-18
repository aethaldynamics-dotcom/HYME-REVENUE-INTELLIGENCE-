import React from 'react';
import { motion } from 'motion/react';

// Abstract Data Flow pattern for Hero and technical sections
export const DataFlowBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen" aria-hidden="true">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-gradient-to-b from-transparent via-sys-blue/30 to-transparent"
        style={{
          left: `${(i / 20) * 100}%`,
          width: Math.random() > 0.5 ? '1px' : '2px',
          height: `${20 + Math.random() * 50}%`,
          top: `-${Math.random() * 100}%`
        }}
        animate={{
          top: ['-100%', '200%']
        }}
        transition={{
          duration: 10 + Math.random() * 15,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

// Slow-moving Geometric Pattern for content sections
export const GeometricBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30" aria-hidden="true">
    <motion.div 
      className="absolute inset-0"
      animate={{ 
        backgroundPosition: ['0px 0px', '120px 120px']
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px'
      }}
    />
  </div>
);

// Subtle Glowing Orbs for the main Hero and Call to Action
export const GlowingOrbsBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <motion.div 
      className="absolute w-[600px] h-[600px] rounded-full bg-sys-blue/10 blur-[150px]"
      animate={{
        x: [0, 100, -100, 0],
        y: [0, -100, 100, 0],
        scale: [1, 1.2, 0.8, 1]
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ top: '10%', left: '20%' }}
    />
    <motion.div 
      className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
      animate={{
        x: [0, -150, 100, 0],
        y: [0, 150, -50, 0],
        scale: [1, 0.9, 1.3, 1]
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
        delay: 5
      }}
      style={{ bottom: '20%', right: '10%' }}
    />
  </div>
);

// Abstract Binary Rain for terminal/code sections
export const BinaryRainBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 font-mono text-[8px] text-sys-blue leading-none select-none" aria-hidden="true">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute whitespace-pre text-sys-blue/40"
        style={{
          left: `${(i / 30) * 100}%`,
          top: `-${Math.random() * 50}%`,
          writingMode: 'vertical-rl',
          textOrientation: 'upright'
        }}
        animate={{
          top: ['-50%', '150%']
        }}
        transition={{
          duration: 15 + Math.random() * 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10
        }}
      >
        {Array.from({length: 40}, () => Math.random() > 0.5 ? '1' : '0').join('')}
      </motion.div>
    ))}
  </div>
);
