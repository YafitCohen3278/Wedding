"use client";

import Image from 'next/image';
import { RomanticCard } from './RomanticCard';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function LetterContent({ title, sender, contentUrl, contentText, videoUrl }: { title: string; sender: string; contentUrl: string | null; contentText?: string; videoUrl?: string }) {
  useEffect(() => {
    // Fire confetti when the component mounts (letter is opened)
    const duration = 1500; // Changed from 3000 to 1500 (1.5 seconds)
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#b56576', '#dca5a5', '#d58996', '#f5e6e8']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#b56576', '#dca5a5', '#d58996', '#f5e6e8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  if (!contentUrl && !contentText && !videoUrl) {
    return (
      <RomanticCard className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto min-h-[300px]">
        <div className="text-6xl animate-pulse text-[#b56576]">💌</div>
        <h2 className="text-3xl font-handwriting font-semibold text-[#1a1a1a]">המכתב עדיין בהכנה 💌</h2>
      </RomanticCard>
    );
  }

  return (
    <RomanticCard className="max-w-2xl mx-auto p-8 space-y-8 bg-white/40">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-handwriting font-bold text-[#1a1a1a] tracking-wide">{title}</h1>
        <p className="text-3xl font-handwriting text-[#b56576] italic">מאת: {sender}</p>
      </div>
      
      {videoUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-[#b56576]/50">
          <iframe
            src={videoUrl}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      )}
      
      {contentText && (
        <div className="w-full bg-white/60 rounded-xl p-6 md:p-10 shadow-inner border border-[#b56576]/20 text-right">
          <p className="text-2xl md:text-3xl font-handwriting text-[#1a1a1a] leading-relaxed whitespace-pre-wrap">
            {contentText}
          </p>
        </div>
      )}

      {contentUrl && !videoUrl && (
        <div className="relative w-full min-h-[400px] md:min-h-[600px] rounded-xl overflow-hidden shadow-2xl border border-[#b56576]/50 bg-white/50">
          <Image
            src={contentUrl}
            alt={title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}
    </RomanticCard>
  );
}
