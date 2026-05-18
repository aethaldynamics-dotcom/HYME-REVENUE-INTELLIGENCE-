import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ChevronRight, Menu, X } from "lucide-react";

import SystemLogHeader from "../ui/SystemLogHeader";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "RIO_CORE", href: "#rio-core" },
    { name: "RECOVERY", href: "#recovery" },
    { name: "NETWORK", href: "#network" },
    { name: "GOVERNANCE", href: "#governance" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex items-center justify-between transition-all duration-700 ${
            scrolled
              ? "bg-black/60 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              : "px-2"
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 rounded-full bg-sys-blue shadow-[0_0_10px_rgba(0,122,255,0.8)] shrink-0"
              />
              <span className="font-display font-black text-sm sm:text-base md:text-xl tracking-tighter uppercase leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 group-hover:to-white transition-all whitespace-nowrap">
                <span className="sm:hidden">HYME INTELLIGENCE</span>
                <span className="hidden sm:inline">HYME REVENUE INTELLIGENCE</span>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-dpdp-emerald animate-pulse" />
              <span className="text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase font-bold text-shadow-none">
                RIO_OS_ACTIVE
              </span>
            </div>
          </div>

          <SystemLogHeader />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-mono text-white/50 hover:text-white uppercase tracking-[0.4em] font-black transition-all hover:scale-110 active:scale-95"
              >
                {link.name}
              </a>
            ))}
          </div>



          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 p-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono text-white/70 hover:text-white uppercase tracking-[0.3em] font-black"
                >
                  {link.name}
                </a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
