export interface Letter {
  id: number;
  title: string;
  sender: string;
  content_url: string | null;
  open_date: string;
}

const START_DATE = new Date('2026-04-12T12:00:00'); // הוספתי שעה 12:00 כדי למנוע בעיות של אזורי זמן

const mockSenders = [
  "יוסי", "דנה", "אמא ואבא", "סבתא רחל", "רון", "מיכל", "דניאל", "שיר", "עומר", "נועה",
  "תומר", "יעל", "גיא", "מאיה", "איתי", "רוני", "נדב", "שירה", "עידו", "עדי",
  "אורי", "הילה", "אלון", "טלי", "אסף", "קרן", "אמיר", "לירון", "גל", "החברות הכי טובות"
];

export const letters: Letter[] = Array.from({ length: 30 }).map((_, i) => {
  const id = i + 1;
  const openDate = new Date(START_DATE);
  openDate.setDate(openDate.getDate() + i);

  return {
    id,
    title: `יום ${id} 💌`,
    sender: mockSenders[i],
    content_url: id % 5 === 0 ? null : `https://via.placeholder.com/600x400/dca5a5/ffffff?text=Letter+${id}`,
    open_date: openDate.toISOString().split('T')[0],
  };
});
