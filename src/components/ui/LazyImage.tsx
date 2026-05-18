import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageOff } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * High-performance Lazy Image component with layout stabilization and fade-in.
 * Includes error handling with fallback states for robust UI.
 */
const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Stop showing the pulse loader
    console.error(`[LazyImage] Failed to load image: ${src}`);
  };

  return (
    <div className={`relative overflow-hidden bg-white/[0.02] ${className}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-transparent z-10"
          />
        )}
      </AnimatePresence>

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/[0.03] text-white/20">
          <ImageOff className="w-8 h-8" />
          <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Load_Error</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

export default LazyImage;
