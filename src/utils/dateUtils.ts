import { toZonedTime, format } from "date-fns-tz";

/**
 * Formatea una fecha UTC a la zona local del usuario.
 */
export function formatLocalDate(
  dateString: string,
  dateFormat = "yyyy-MM-dd HH:mm"
) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return format(toZonedTime(new Date(dateString), timeZone), dateFormat);
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

  if (mins < 10) return "text-red-500"; 
  if (mins < 60) return "text-yellow-400";
  return "text-green-300"; 
}

// ✅ AGREGAR NUEVA FUNCIÓN PARA VALORES HEX
export function getEndInColorValue(endDateTime: string, now: Date) {
  if (!endDateTime) return "#ffffff";

  const end = new Date(endDateTime);
  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return "#ffffff";

  const mins = Math.floor(diffMs / 60000);

  if (mins < 10) return "#ef4444"; // red-500
  if (mins < 60) return "#fbbf24"; // yellow-400
  return "#86efac"; // green-300
}

// ✅ FUNCIÓN COMBINADA PARA OBTENER ESTADO
export function getTimeStatus(endDateTime: string, now: Date) {
  if (!endDateTime) return { 
    colorClass: "text-white", 
    colorValue: "#ffffff", 
    status: "unknown" 
  };

  const end = new Date(endDateTime);
  const diffMs = end.getTime() - now.getTime();
  
  if (diffMs <= 0) return { 
    colorClass: "text-white", 
    colorValue: "#ffffff", 
    status: "ended" 
  };

  const mins = Math.floor(diffMs / 60000);

  if (mins < 10) return {
    colorClass: "text-red-500",
    colorValue: "#ef4444",
    status: "critical"
  };
  
  if (mins < 60) return {
    colorClass: "text-yellow-400",
    colorValue: "#fbbf24",
    status: "warning"
  };
  
  return {
    colorClass: "text-green-300",
    colorValue: "#86efac",
    status: "safe"
  };
}