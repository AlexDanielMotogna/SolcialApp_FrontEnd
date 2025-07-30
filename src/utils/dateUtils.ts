import { toZonedTime, format } from "date-fns-tz";

/**
 * Formatea una fecha UTC a la zona local del usuario.
 */
export function formatLocalDate(dateString: string, dateFormat = "yyyy-MM-dd HH:mm") {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return format(
    toZonedTime(new Date(dateString), timeZone),
    dateFormat
  );
}

export function toUTCISOString(date: string, time: string) {
  return new Date(`${date}T${time}`).toISOString();
}

export function getTimeLeft(endDateTime: string, now: Date) {
  const end = new Date(endDateTime);
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) return "Ended";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function parseISOToFormFields(isoString?: string) {
  if (!isoString) return { date: "", time: "" };
  const dateObj = new Date(isoString);
  if (isNaN(dateObj.getTime())) return { date: "", time: "" };
  // Fecha: YYYY-MM-DD
  const date = dateObj.toISOString().slice(0, 10);
  // Hora: HH:mm:ss
  const time = dateObj.toTimeString().slice(0, 8);
  return { date, time };
}

export function getEndInColor(endDateTime: string, now: Date) {
  if (!endDateTime) return "text-white";
  const end = new Date(endDateTime);
  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return "text-white";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 10) return "text-red";
  if (mins < 60) return "text-yellow";
  return "text-green-400";
}
