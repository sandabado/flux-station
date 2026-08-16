'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

export function MagneticButton({ children, className = '', strength = 0.28 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left - rect.width / 2) * strength);
    mouseY.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function reset() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={reset} whileTap={reduceMotion ? undefined : { scale: 0.94 }} style={{ x, y }} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  );
}
