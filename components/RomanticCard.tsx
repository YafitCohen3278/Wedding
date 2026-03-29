"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function RomanticCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl bg-[#f5e6e8]/70 p-8 shadow-[0_8px_32px_rgba(26,26,26,0.1)] backdrop-blur-xl border border-[#b56576]/30 hover:border-[#b56576]/70 hover:shadow-[0_0_20px_rgba(181,101,118,0.2)] transition-all duration-500 ${className}`}
    >
      <div className="absolute -inset-1 bg-gradient-to-br from-[#dca5a5]/20 to-[#d58996]/10 blur-2xl -z-10" />
      {children}
    </motion.div>
  );
}
