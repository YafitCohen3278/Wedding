import { notFound } from 'next/navigation';
import { letters } from '@/data/letters';
import { LockedMessage } from '@/components/LockedMessage';
import { LetterContent } from '@/components/LetterContent';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return letters.map((l) => ({ id: l.id.toString() }));
}

export default async function LetterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const letter = letters.find((l) => l.id === parseInt(id, 10));

  if (!letter) {
    notFound();
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const openDate = new Date(letter.open_date);
  const isLocked = today < openDate;

  return (
    <main className="min-h-screen bg-[#f5e6e8] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image Support */}
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-multiply bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#dca5a5]/30 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#d58996]/20 blur-3xl" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="absolute -top-16 right-0 md:-top-20 md:-right-8">
          <Link
            href="/"
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-[#b56576] hover:text-white bg-white/40 hover:bg-[#b56576] transition-all duration-300 rounded-full backdrop-blur-md shadow-sm border border-[#b56576]/30 hover:shadow-[0_0_15px_rgba(181,101,118,0.4)] group"
            aria-label="חזרה לדף הבית"
          >
            <ArrowRight className="h-6 w-6 md:h-8 md:w-8 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="mt-8">
          {isLocked ? (
            <LockedMessage openDate={letter.open_date} />
          ) : (
            <LetterContent title={letter.title} sender={letter.sender} contentUrl={letter.content_url} />
          )}
        </div>
      </div>
    </main>
  );
}
