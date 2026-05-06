"use client";

import Image from 'next/image';
import { RomanticCard } from './RomanticCard';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function LetterContent({ letterId, title, sender, contentUrl, contentText, videoUrl }: { letterId: number; title: string; sender: string; contentUrl: string | null; contentText?: string; videoUrl?: string }) {
  const textBlocks = contentText?.split(/\r?\n\r?\n<<<NEXT_LETTER>>>\r?\n\r?\n/).filter((block) => block.trim().length > 0) ?? [];

  useEffect(() => {
    const duration = letterId === 30 ? 3500 : 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: letterId === 30 ? 12 : 5,
        angle: 60,
        spread: letterId === 30 ? 90 : 55,
        origin: { x: 0 },
        colors: ['#b56576', '#dca5a5', '#d58996', '#f5e6e8']
      });
      confetti({
        particleCount: letterId === 30 ? 12 : 5,
        angle: 120,
        spread: letterId === 30 ? 90 : 55,
        origin: { x: 1 },
        colors: ['#b56576', '#dca5a5', '#d58996', '#f5e6e8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, [letterId]);

  if (!contentUrl && !contentText && !videoUrl) {
    return (
      <RomanticCard className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto min-h-[300px]">
        <div className="text-6xl animate-pulse text-[#b56576]">💌</div>
        <h2 className="text-3xl font-handwriting font-semibold text-[#1a1a1a]">המכתב עדיין בהכנה 💌</h2>
      </RomanticCard>
    );
  }

  if (letterId === 30) {
    return (
      <div className="relative max-w-5xl mx-auto min-h-[72vh] md:min-h-[78vh] flex items-center justify-center overflow-hidden rounded-[2rem] border-2 border-white/40 shadow-[0_25px_70px_rgba(181,101,118,0.35)]">
        <Image
          src="/images/letter30.jpg"
          alt="רקע מכתב 30"
          fill
          priority
          className="object-cover opacity-35"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-[#f5e6e8]/35" />
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-8 left-8 text-5xl md:text-7xl animate-pulse">🎆</span>
          <span className="absolute top-10 right-8 text-5xl md:text-7xl animate-pulse [animation-delay:260ms]">🎇</span>
          <span className="absolute top-24 left-1/4 text-4xl md:text-6xl animate-pulse [animation-delay:500ms]">✨</span>
          <span className="absolute top-24 right-1/4 text-4xl md:text-6xl animate-pulse [animation-delay:760ms]">✨</span>
          <span className="absolute bottom-10 left-10 text-5xl md:text-7xl animate-pulse [animation-delay:350ms]">🎇</span>
          <span className="absolute bottom-10 right-10 text-5xl md:text-7xl animate-pulse [animation-delay:650ms]">🎆</span>
        </div>
        <div className="relative z-10 px-6 py-12 md:px-10 text-center text-[#5f1433]">
          <h1 className="font-letter30 text-7xl md:text-9xl leading-[0.95] drop-shadow-[0_4px_18px_rgba(255,255,255,0.85)]">מחר זה קורה</h1>
        </div>
      </div>
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
      
      {textBlocks.length > 0 && (
        <div className="space-y-6">
          {textBlocks.map((block, index) => (
            <div key={index} className="w-full bg-white/60 rounded-xl p-6 md:p-10 shadow-inner border border-[#b56576]/20 text-right">
              <p className="text-2xl md:text-3xl font-handwriting text-[#1a1a1a] leading-relaxed whitespace-pre-wrap">
                {block}
              </p>
            </div>
          ))}
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
