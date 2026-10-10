export type StoreClock = {
  open: boolean;
  weekend: boolean;
  label: { en: string; es: string };
};

export function acworthClock(date = new Date()): StoreClock {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const weekend = weekday === "Sat" || weekday === "Sun";
  const openAt = weekend ? 8 : 9;
  const minutes = hour * 60 + minute;
  const open = minutes >= openAt * 60 && minutes < 21 * 60;
  const until = open
    ? { en: "Open until 9:00 PM", es: "Abierto hasta las 9:00 PM" }
    : {
        en: weekend ? "Opens at 8:00 AM" : "Opens at 9:00 AM",
        es: weekend ? "Abre a las 8:00 AM" : "Abre a las 9:00 AM",
      };
  return { open, weekend, label: until };
}

export function slotOptions(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    hourCycle: "h23",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 12);
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const windows = [
    { id: "10-12", start: 10, label: "10:00 AM – 12:00 PM" },
    { id: "12-2", start: 12, label: "12:00 PM – 2:00 PM" },
    { id: "2-4", start: 14, label: "2:00 PM – 4:00 PM" },
    { id: "4-6", start: 16, label: "4:00 PM – 6:00 PM" },
    { id: "6-8", start: 18, label: "6:00 PM – 8:00 PM" },
  ];
  const todayName = `${month} ${day}`;
  const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  const tParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
  }).formatToParts(tomorrow);
  const tomorrowName = `${tParts.find((part) => part.type === "month")?.value} ${tParts.find((part) => part.type === "day")?.value}`;

  const days = [
    {
      id: "today",
      en: `Today, ${todayName}`,
      es: `Hoy, ${todayName}`,
      slots: windows
        .filter((window) => hour < window.start - 1)
        .map((window) => ({ id: `today-${window.id}`, label: window.label })),
    },
    {
      id: "tomorrow",
      en: `Tomorrow, ${tomorrowName}`,
      es: `Mañana, ${tomorrowName}`,
      slots: windows.map((window) => ({
        id: `tomorrow-${window.id}`,
        label: window.label,
      })),
    },
  ];
  return days.filter((dayOption) => dayOption.slots.length > 0);
}
