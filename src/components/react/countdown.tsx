import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string | Date;
  title?: string;
  className?: string;
}

const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  title = "Tiempo restante para el sorteo",
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const target =
      typeof targetDate === "string"
        ? new Date(targetDate).getTime()
        : targetDate.getTime();

    function updateCountdown() {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setFinished(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (finished) {
    return (
      <div
        className={`bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl px-6 py-4 text-center ${className}`}
      >
        <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-xl font-bold mt-2">
          🎉 ¡Sorteo en curso o ya realizado!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`inline-block rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] px-8 py-4 text-center ${className}`}
    >
      <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wide mb-3">
        {title}
      </h3>

      <div className="flex justify-evenly gap-5 font-bold">
        {/* Bloque DÍAS */}
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">
            {timeLeft.days}
          </span>
          <span className="text-xs md:text-base">días</span>
        </div>
        {/* Bloque HORAS */}
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-base">horas</span>
        </div>
        {/* Bloque MINUTOS */}
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-base">minutos</span>
        </div>
        {/* Bloque SEGUNDOS */}
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-base">segundos</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
