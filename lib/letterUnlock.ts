const TZ = "Asia/Jerusalem";

export function getLetterUnlockAt(ymd: string): Date {
  const [y, mo, d] = ymd.split("-").map(Number);
  const prefix = `${String(y).padStart(4, "0")}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const start = Date.UTC(y, mo - 1, d - 1, 0, 0, 0);
  const end = Date.UTC(y, mo - 1, d + 2, 0, 0, 0);
  for (let ms = start; ms < end; ms += 60000) {
    const s = new Date(ms).toLocaleString("sv-SE", { timeZone: TZ });
    if (s.startsWith(prefix) && s.slice(11, 16) === "19:00") {
      return new Date(ms);
    }
  }
  throw new Error(`Could not find 19:00 on ${ymd} in ${TZ}`);
}

export function isLetterUnlocked(openDateYmd: string, now: Date = new Date()): boolean {
  return now.getTime() >= getLetterUnlockAt(openDateYmd).getTime();
}

function ymdInJerusalem(t: number): string {
  return new Date(t).toLocaleString("sv-SE", { timeZone: TZ }).slice(0, 10);
}

function calendarDaysBetween(fromYmd: string, toYmd: string): number {
  const [fy, fm, fd] = fromYmd.split("-").map(Number);
  const [ty, tm, td] = toYmd.split("-").map(Number);
  const a = Date.UTC(fy, fm - 1, fd);
  const b = Date.UTC(ty, tm - 1, td);
  return Math.round((b - a) / 86400000);
}

export function getLockedTimeMessage(openYmd: string, now: Date = new Date()): string {
  const todayYmd = ymdInJerusalem(now.getTime());
  const d = calendarDaysBetween(todayYmd, openYmd);
  if (d === 0) return "המכתב ייפתח היום בשעה 19:00";
  if (d === 1) return "המכתב ייפתח מחר בשעה 19:00";
  if (d === 2) return "המכתב ייפתח מחרתיים בשעה 19:00";
  if (d > 2) return `המכתב ייפתח בעוד ${d} ימים (בשעה 19:00)`;
  return "המכתב ייפתח בקרוב";
}
