'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C44569', '#6C5CE7', '#48DBFB'];

function seeded(index: number, trigger: number) {
  const value = Math.sin(index * 91.73 + trigger * 17.31) * 10000;
  return value - Math.floor(value);
}

export function Confetti({ trigger, origin = { x: 50, y: 50 } }: { trigger: number; origin?: { x: number; y: number } }) {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => Array.from({ length: 24 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 24 + seeded(index, trigger) * 0.4;
    const velocity = 70 + seeded(index + 40, trigger) * 100;
    return {
      id: `${trigger}-${index}`,
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity + 90,
      rotate: seeded(index + 80, trigger) * 720 - 360,
      size: 5 + seeded(index + 120, trigger) * 8,
      color: COLORS[index % COLORS.length],
    };
  }), [trigger]);

  if (reduceMotion || trigger === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            initial={{ left: `${origin.x}%`, top: `${origin.y}%`, scale: 0, opacity: 1 }}
            animate={{ x: particle.x, y: particle.y, rotate: particle.rotate, scale: [0, 1.2, 0.7], opacity: [1, 1, 0] }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute rounded-sm"
            style={{ width: particle.size, height: particle.size, backgroundColor: particle.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
