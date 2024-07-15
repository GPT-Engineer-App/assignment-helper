import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

const VisualTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="w-full">
      <Progress value={progress} className="w-full h-8" />
      <p className="text-center mt-2">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
    </div>
  );
};

export default VisualTimer;