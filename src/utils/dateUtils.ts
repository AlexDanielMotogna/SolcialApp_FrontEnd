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

// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\utils\dateUtils.ts

export const toUTCISOString = (date: string, time: string): string => {
  if (!date || !time) {
    throw new Error('Date and time are required');
  }
  
  // ✅ FIX: Crear fecha en timezone local del usuario
  const localDateTime = new Date(`${date}T${time}:00`);
  
  // Verificar que la fecha sea válida
  if (isNaN(localDateTime.getTime())) {
    throw new Error('Invalid date or time format');
  }
  
  // ✅ LOG PARA DEBUG
  console.log('🌍 [DateUtils] Local time:', localDateTime.toLocaleString());
  console.log('🌍 [DateUtils] UTC time:', localDateTime.toISOString());
  
  // Convertir a UTC y retornar en formato ISO
  return localDateTime.toISOString();
};

// ✅ FUNCIÓN PARA OBTENER TIEMPO MÍNIMO ACTUAL EN TIMEZONE LOCAL
export const getMinimumDateTime = (): { date: string; time: string } => {
  const now = new Date();
  
  // Añadir 15 minutos como margen
  now.setMinutes(now.getMinutes() + 15);
  
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().slice(0, 5);  // HH:MM
  
  console.log('⏰ [DateUtils] Minimum time (local):', { date, time });
  
  return { date, time };
};