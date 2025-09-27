import React, { useEffect, useState } from "react";

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
  const [timeLeft, setTimeLeft] = useState<string>("Cargando...");

  useEffect(() => {
    const target =
      typeof targetDate === "string" ? new Date(targetDate).getTime() : targetDate.getTime();

    function updateCountdown() {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft("🎉 ¡Sorteo en curso o ya realizado!");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className={`bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl px-6 py-4 text-center ${className}`}
    >
      <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wide">{title}</h3>
      <p className="text-lg font-extrabold mt-2">{timeLeft}</p>
    </div>
  );
};

export default Countdown;
