import { Lock } from 'lucide-react';
import { RomanticCard } from './RomanticCard';

export function LockedMessage({ openDate }: { openDate: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(openDate);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let timeMessage = `המכתב ייפתח בעוד ${diffDays} ימים`;
  if (diffDays === 1) {
    timeMessage = "המכתב ייפתח מחר";
  } else if (diffDays === 2) {
    timeMessage = "המכתב ייפתח מחרתיים";
  }

  return (
    <RomanticCard className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto min-h-[300px]">
      <div className="p-5 bg-[#b56576]/10 rounded-full text-[#b56576] shadow-inner border border-[#b56576]/30">
        <Lock size={48} strokeWidth={1.5} />
      </div>
      <div className="space-y-3">
        <h2 className="text-4xl font-handwriting font-semibold text-[#1a1a1a]">עוד לא הזמן לפתוח 💌</h2>
        <p className="text-[#1a1a1a]/70 text-2xl font-handwriting font-medium">
          {timeMessage}
        </p>
      </div>
    </RomanticCard>
  );
}
