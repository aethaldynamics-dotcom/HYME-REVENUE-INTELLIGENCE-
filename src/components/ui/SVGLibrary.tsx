import React from 'react';
import { motion } from 'motion/react';

/**
 * High-Performance Tiled Grid Pattern
 * Replaces heavy CSS gradients with a lightweight repeating SVG path.
 */
export const GridPattern: React.FC<{ 
  size?: number; 
  className?: string;
  opacity?: number;
}> = ({ size = 24, className = "", opacity = 0.05 }) => {
  const patternId = React.useId();
  return (
    <svg 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

/**
 * Optimized Signal Bars (Frequency/Equalizer)
 * Uses a single SVG with minimal nodes for high-performance animation.
 */
export const SignalBars: React.FC<{ 
  count?: number; 
  height?: number;
  className?: string;
  color?: string;
}> = ({ count = 6, height = 12, className = "", color = "currentColor" }) => (
  <svg 
    viewBox={`0 0 ${count * 8} ${height + 6}`} 
    className={`h-full ${className}`}
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    {[...Array(count)].map((_, i) => (
      <motion.rect
        key={i}
        x={i * 8}
        width={4}
        rx={2}
        fill={color}
        initial={{ height: 4, y: height + 2 }}
        animate={{ 
          height: [4, Math.random() * height + 6, 4],
          y: [height + 2, height + 2 - (Math.random() * height + 2), height + 2]
        }}
        transition={{ 
          duration: 0.8 + Math.random() * 0.4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: i * 0.1 
        }}
      />
    ))}
  </svg>
);

/**
 * High-Performance Scanning Radar HUD
 * Replaces heavy div-based rotation with an optimized SVG.
 */
export const ScanningRadar: React.FC<{ 
  className?: string;
  color?: string;
}> = ({ className = "", color = "currentColor" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`w-full h-full ${className}`}
    aria-hidden="true"
  >
    <circle 
      cx="50" 
      cy="50" 
      r="48" 
      fill="none" 
      stroke={color} 
      strokeWidth="0.5" 
      strokeOpacity="0.1" 
    />
    <circle 
      cx="50" 
      cy="50" 
      r="30" 
      fill="none" 
      stroke={color} 
      strokeWidth="0.5" 
      strokeOpacity="0.05" 
    />
    <motion.path
      d="M 50 50 L 50 2 A 48 48 0 0 1 98 50 Z"
      fill={`url(#radar-gradient-${color.replace('#', '')})`}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ originX: "50px", originY: "50px" }}
    />
    <defs>
      <linearGradient id={`radar-gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
