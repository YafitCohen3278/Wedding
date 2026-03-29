"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FlipUnit({ value, label }: { value: number; label: string }) {
  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center mx-1 md:mx-3">
      <div className="relative w-14 h-16 md:w-20 md:h-24 bg-white/80 backdrop-blur-md rounded-xl border border-[#b56576]/40 shadow-[0_8px_32px_rgba(181,101,118,0.15)] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={formattedValue}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-handwriting font-bold text-[#1a1a1a]"
            style={{ transformOrigin: "top center" }}
          >
            {formattedValue}
          </motion.div>
        </AnimatePresence>
        {/* Decorative middle line for the flip clock look */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#b56576]/30 -translate-y-1/2" />
      </div>
      <span className="mt-3 text-lg md:text-xl font-handwriting font-bold text-[#1a1a1a]/80 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

export function FlipClock({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const weddingDate = new Date(targetDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center" dir="ltr">
      <FlipUnit value={timeLeft.days} label="ימים" />
      <div className="text-3xl md:text-5xl font-handwriting text-[#b56576] pb-8">:</div>
      <FlipUnit value={timeLeft.hours} label="שעות" />
      <div className="text-3xl md:text-5xl font-handwriting text-[#b56576] pb-8">:</div>
      <FlipUnit value={timeLeft.minutes} label="דקות" />
      <div className="text-3xl md:text-5xl font-handwriting text-[#b56576] pb-8">:</div>
      <FlipUnit value={timeLeft.seconds} label="שניות" />
    </div>
  );
}
