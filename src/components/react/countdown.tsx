import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string;
  variant?: "big" | "compact";
  className?: string;
}

const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  variant = "big",
  className = "",
}) => {
  const getInitialTime = () => {
    let finalTargetDateStr = targetDate;
    let target = new Date(finalTargetDateStr).getTime();
    const now = Date.now();

    if (target - now < 0) {
      const currentYear = new Date().getFullYear();
      finalTargetDateStr = targetDate.replace(/\d{4}/, (currentYear + 1).toString());
      target = new Date(finalTargetDateStr).getTime();
    }

    const distance = target - now;
    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / 1000 / 60) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getInitialTime());

  useEffect(() => {
    let finalTargetDateStr = targetDate;
    let target = new Date(finalTargetDateStr).getTime();
    const now = Date.now();

    if (target - now < 0) {
      const currentYear = new Date().getFullYear();
      finalTargetDateStr = targetDate.replace(/\d{4}/, (currentYear + 1).toString());
      target = new Date(finalTargetDateStr).getTime();
    }

    function updateCountdown() {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between gap-2 max-w-sm mx-auto ${className}`}>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-3xl font-syne font-bold text-gray-800 tracking-tight">
            {pad(timeLeft.days)}
          </span>
          <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Días</span>
        </div>
        <span className="text-gray-300 font-light text-xl sm:text-2xl mb-1">:</span>
        
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-3xl font-syne font-bold text-gray-800 tracking-tight">
            {pad(timeLeft.hours)}
          </span>
          <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Hrs</span>
        </div>
        <span className="text-gray-300 font-light text-xl sm:text-2xl mb-1">:</span>

        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-3xl font-syne font-bold text-gray-800 tracking-tight">
            {pad(timeLeft.minutes)}
          </span>
          <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Min</span>
        </div>
        <span className="text-gray-300 font-light text-xl sm:text-2xl mb-1">:</span>

        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-3xl font-syne font-bold text-pink-500 tracking-tight">
            {pad(timeLeft.seconds)}
          </span>
          <span className="text-[9px] text-pink-400 font-bold uppercase mt-1 tracking-widest">Seg</span>
        </div>
      </div>
    );
  }

  // Default: BIG variant (from nextRaffle.astro)
  return (
    <div className={`grid grid-cols-4 gap-3 py-6 border-y border-gray-200 ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-work-sans font-bold text-gray-900">
          {pad(timeLeft.days)}
        </span>
        <span className="text-[10px] md:text-xs font-work-sans text-gray-500 uppercase mt-2">Días</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-work-sans font-bold text-gray-900">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-[10px] md:text-xs font-work-sans text-gray-500 uppercase mt-2">Horas</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-work-sans font-bold text-gray-900">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-[10px] md:text-xs font-work-sans text-gray-500 uppercase mt-2">Minutos</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-work-sans font-bold text-pink-500">
          {pad(timeLeft.seconds)}
        </span>
        <span className="text-[10px] md:text-xs font-work-sans text-pink-600 uppercase mt-2">Segundos</span>
      </div>
    </div>
  );
};

export default Countdown;

