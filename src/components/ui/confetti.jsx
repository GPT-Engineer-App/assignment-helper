import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const Confetti = ({ duration = 3000 }) => {
  useEffect(() => {
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [duration]);

  return null;
};