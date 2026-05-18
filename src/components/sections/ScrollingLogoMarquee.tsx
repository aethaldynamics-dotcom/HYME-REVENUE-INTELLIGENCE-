import React from 'react';
import { motion } from 'motion/react';

const logos = [
  { name: "Shopify Plus" },
  { name: "AWS" },
  { name: "Stripe" },
  { name: "NetSuite" },
  { name: "Salesforce" },
  { name: "Google Cloud" },
  { name: "Meta" },
];

export const ScrollingLogoMarquee = () => {
    return (
        <div className="w-full py-16 border-y border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-px bg-white/10" />
                    <span className="text-[10px] font-mono text-white/20 font-bold uppercase tracking-[0.6em] text-center">Seamless_Ecosystem_Integrations</span>
                </div>
                
                <div className="relative flex overflow-hidden w-full max-w-[1200px]">
                    <motion.div
                        className="flex gap-16 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...logos, ...logos].map((logo, i) => (
                            <div key={i} className="text-xl sm:text-2xl font-display font-black tracking-tighter text-white opacity-40 hover:opacity-100 transition-opacity">
                                {logo.name}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
