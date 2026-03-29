"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { letters } from "@/data/letters";
import { QrCode, Lock, Unlock } from "lucide-react";
import { FlipClock } from "@/components/FlipClock";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#f5e6e8] pt-12 flex flex-col items-center relative overflow-hidden font-sans" dir="rtl">
      {/* Background Image Support */}
      <div 
        className="absolute inset-0 z-0 opacity-15 mix-blend-multiply bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#dca5a5]/30 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#d58996]/20 blur-3xl" />
      </div>

      <div className="w-full max-w-6xl mx-auto space-y-20 relative z-10 px-4 sm:px-6 lg:px-8">
        <header className="text-center space-y-12 mt-4 flex flex-col items-center">
          <FlipClock targetDate="2026-05-12T00:00:00" />
          
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-handwriting font-bold text-[#1a1a1a] tracking-wide pb-4 drop-shadow-md">
              המסע שלנו לחופה
            </h1>
            <p className="text-4xl text-[#1a1a1a]/80 font-handwriting max-w-2xl mx-auto drop-shadow-sm">
              מתרגשים וסופרים את הימים...
            </p>
          </div>
        </header>

        <section className="space-y-0 pb-16 mt-8">
          <div className="flex items-center justify-center text-4xl font-handwriting font-bold text-[#1a1a1a] mb-0">
            <h3>המכתבים שלנו</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 pt-0 mt-[-10px]">
            {letters.map((letter, i) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const openDate = new Date(letter.open_date);
              const isLocked = today < openDate;

              return (
                <Link key={letter.id} href={`/letter/${letter.id}`} className="flex flex-col items-center group relative">
                  <div className="relative w-72 h-72 md:w-80 md:h-80 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 z-10">
                    {/* כאן נכנסת התמונה המותאמת אישית מוגדלת */}
                    <Image
                      src="/images/envelope-icon.png"
                      alt={`מכתב ${letter.id}`}
                      fill
                      className={`object-contain transition-all duration-500 ${isLocked ? 'opacity-80' : 'drop-shadow-[0_10px_15px_rgba(181,101,118,0.4)]'}`}
                    />
                  </div>
                  
                  <div className="text-center flex flex-col items-center gap-0 absolute bottom-[-10px] md:bottom-[-15px] z-20">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl md:text-5xl font-handwriting font-bold text-[#1a1a1a]">יום {letter.id}</span>
                      {isLocked ? (
                        <Lock className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                      ) : (
                        <Unlock className="w-5 h-5 md:w-6 md:h-6 text-[#b56576]" />
                      )}
                    </div>
                    
                    {!isLocked ? (
                      <span className="text-2xl md:text-3xl font-handwriting text-[#b56576] font-bold">מאת: {letter.sender}</span>
                    ) : (
                      <span className="text-2xl md:text-3xl font-handwriting text-gray-600 font-bold">
                        {openDate.toLocaleDateString("he-IL").slice(0, 5)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* תמונה בתחתית העמוד */}
        <section className="pb-8 pt-0 flex justify-center w-full mt-[-40px]">
          <div className="relative w-full max-w-3xl aspect-[3/4] md:aspect-[4/3] rounded-3xl overflow-hidden border-8 border-[#dca5a5] shadow-[0_20px_50px_rgba(181,101,118,0.3)] group">
            <Image
              src="/images/bg.jpeg"
              alt="התמונה שלנו"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            
            {/* כיתוב על התמונה */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-8 bg-gradient-to-b from-black/60 to-transparent flex flex-col items-center justify-start text-white">
              <span className="text-3xl md:text-5xl font-handwriting font-bold tracking-widest drop-shadow-md" dir="ltr">
                Moshe & Avital
              </span>
              <span className="text-2xl md:text-4xl font-handwriting tracking-widest mt-1 drop-shadow-md" dir="ltr">
                12.05.2026
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* פס ורוד בתחתית האתר עם פפיון */}
      <div className="relative w-full h-2 md:h-3 bg-[#dca5a5] shadow-[0_-5px_15px_rgba(181,101,118,0.2)] mt-4 flex justify-center items-center">
        {/* פפיון */}
        <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] z-10 drop-shadow-lg translate-y-4 md:translate-y-6">
          <Image
            src="/images/goodPicture-removebg-preview.png"
            alt="פפיון"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* המשך האתר (כ-5 ס"מ) */}
      <div className="w-full h-24 bg-[#f5e6e8]" />
    </main>
  );
}
