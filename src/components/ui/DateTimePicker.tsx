// MODIFICAR COMPLETO: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\ui\DateTimePicker.tsx

"use client";
import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// TYPES
// ============================================================================
interface DateTimePickerProps {
  label: string;
  dateValue: string;
  timeValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  minDate?: string;
  required?: boolean;
  className?: string;
}

// ============================================================================
// UTILITY FUNCTIONS CON FIX COMPLETO DE TIMEZONE
// ============================================================================
const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  // ✅ Parse date correctly without timezone issues
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed
  
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const formatTime = (timeStr: string): string => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

// ✅ GENERAR OPCIONES DE TIEMPO DESDE LA HORA ACTUAL
const generateTimeOptions = (isToday: boolean = false, selectedDate?: string): string[] => {
  const times: string[] = [];
  const now = new Date();
  const today = new Date().toISOString().split('T')[0];
  
  // Si es hoy, empezar desde la hora actual + 15 minutos
  let startHour = 0;
  let startMinute = 0;
  
  if (isToday && selectedDate === today) {
    startHour = now.getHours();
    startMinute = now.getMinutes() + 15; // 15 minutos de margen
    
    // Ajustar si los minutos pasan de 60
    if (startMinute >= 60) {
      startHour += 1;
      startMinute = 0;
    }
    
    // Redondear a los próximos 15 minutos
    startMinute = Math.ceil(startMinute / 15) * 15;
    if (startMinute >= 60) {
      startHour += 1;
      startMinute = 0;
    }
  }
  
  // Generar opciones de tiempo
  for (let hour = startHour; hour < 24; hour++) {
    const minuteStart = (hour === startHour) ? startMinute : 0;
    
    for (let minute = minuteStart; minute < 60; minute += 15) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      times.push(timeStr);
    }
  }
  
  // Si no hay opciones para hoy, empezar desde el día siguiente
  if (times.length === 0 && isToday) {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeStr);
      }
    }
  }
  
  console.log(`⏰ [DateTimePicker] Generated ${times.length} time options starting from ${times[0]}`);
  return times;
};

const generateDateOptions = (minDate?: string): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  // ✅ Empezar desde hoy o desde la fecha mínima
  let startDate = today;
  if (minDate) {
    const [year, month, day] = minDate.split('-').map(Number);
    startDate = new Date(year, month - 1, day);
  }
  
  // Generate next 90 days
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // Format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
  }
  
  return dates;
};

// ============================================================================
// DROPDOWN COMPONENTS
// ============================================================================
const DateDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  onSelect: (date: string) => void;
  minDate?: string;
}> = ({ isOpen, onClose, selectedDate, onSelect, minDate }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dates = generateDateOptions(minDate);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#2C2C30] border border-[#44444A] rounded-lg shadow-xl max-h-48 overflow-y-auto"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#6C7278 transparent' }}
    >
      {dates.map((date) => {
        const isSelected = date === selectedDate;
        const today = new Date().toISOString().split('T')[0];
        const isToday = date === today;
        
        return (
          <div
            key={date}
            onClick={() => {
              onSelect(date);
              onClose();
            }}
            className={`
              px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between
              ${isSelected 
                ? 'bg-[#9945FF] text-white' 
                : 'hover:bg-[#44444A] text-[#ACB5BB]'
              }
            `}
          >
            <span className="font-medium">
              {formatDate(date)}
            </span>
            
            {isToday && (
              <span className="px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded font-medium">
                Today
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const TimeDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  onSelect: (time: string) => void;
  selectedDate?: string;
}> = ({ isOpen, onClose, selectedTime, onSelect, selectedDate }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === today;
  const timeOptions = generateTimeOptions(isToday, selectedDate);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ✅ REMOVE AUTO SCROLL - Era lo que molestaba
  // useEffect(() => {
  //   if (isOpen && selectedTime) {
  //     const selectedIndex = timeOptions.findIndex(time => time === selectedTime);
  //     if (selectedIndex !== -1) {
  //       setTimeout(() => {
  //         const dropdown = dropdownRef.current;
  //         if (dropdown) {
  //           const selectedElement = dropdown.children[selectedIndex] as HTMLElement;
  //           selectedElement.scrollIntoView({ block: 'center' });
  //         }
  //       }, 50);
  //     }
  //   }
  // }, [isOpen, selectedTime, timeOptions]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#2C2C30] border border-[#44444A] rounded-lg shadow-xl max-h-48 overflow-y-auto"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#6C7278 transparent' }}
    >
      {timeOptions.length === 0 ? (
        <div className="px-3 py-2 text-[#6C7278] text-center">
          No available times for today
        </div>
      ) : (
        timeOptions.map((time) => {
          const isSelected = time === selectedTime;
          const formattedTime = formatTime(time);
          
          return (
            <div
              key={time}
              onClick={() => {
                onSelect(time);
                onClose();
              }}
              className={`
                px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between
                ${isSelected 
                  ? 'bg-[#9945FF] text-white' 
                  : 'hover:bg-[#44444A] text-[#ACB5BB]'
                }
              `}
            >
              <span className="font-medium">{formattedTime}</span>
              <span className="text-xs opacity-60">{time}</span>
            </div>
          );
        })
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  minDate,
  required = false,
  className = ""
}) => {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // ✅ LOG PARA DEBUG
  useEffect(() => {
    const now = new Date();
    console.log('🌍 [DateTimePicker] Current local time:', now.toLocaleString());
    console.log('🌍 [DateTimePicker] Current UTC time:', now.toISOString());
    console.log('🌍 [DateTimePicker] Timezone offset:', now.getTimezoneOffset(), 'minutes');
  }, []);

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {/* ✅ HEADER SIMPLE */}
      <h6 className="text-[1.2rem] text-[#ACB5BB] font-medium flex items-center gap-2">
        📅 {label} {required && <span className="text-red-400">*</span>}
      </h6>

      {/* ✅ DATE & TIME SELECTORS */}
      <div className="grid grid-cols-2 gap-3">
        {/* DATE SELECTOR */}
        <div className="relative">
          <div
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className={`
              w-full px-4 py-3 bg-[#2C2C30] border border-[#44444A] rounded-lg cursor-pointer
              transition-all duration-200 hover:border-[#6C7278]
              ${showDateDropdown ? 'border-[#9945FF]' : ''}
              ${dateValue ? 'border-green-400/50' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                {dateValue ? formatDate(dateValue) : 'Select Date'}
              </span>
              <svg 
                className={`w-4 h-4 text-[#ACB5BB] transition-transform duration-200 ${showDateDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <DateDropdown
            isOpen={showDateDropdown}
            onClose={() => setShowDateDropdown(false)}
            selectedDate={dateValue}
            onSelect={onDateChange}
            minDate={minDate}
          />
        </div>

        {/* TIME SELECTOR */}
        <div className="relative">
          <div
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className={`
              w-full px-4 py-3 bg-[#2C2C30] border border-[#44444A] rounded-lg cursor-pointer
              transition-all duration-200 hover:border-[#6C7278]
              ${showTimeDropdown ? 'border-[#14F195]' : ''}
              ${timeValue ? 'border-blue-400/50' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                {timeValue ? formatTime(timeValue) : 'Select Time'}
              </span>
              <svg 
                className={`w-4 h-4 text-[#ACB5BB] transition-transform duration-200 ${showTimeDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <TimeDropdown
            isOpen={showTimeDropdown}
            onClose={() => setShowTimeDropdown(false)}
            selectedTime={timeValue}
            onSelect={onTimeChange}
            selectedDate={dateValue}
          />
        </div>
      </div>

      {/* ✅ PREVIEW SIMPLE */}
      {dateValue && timeValue && (
        <div className="mt-1 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">
              {formatDate(dateValue)} at {formatTime(timeValue)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;