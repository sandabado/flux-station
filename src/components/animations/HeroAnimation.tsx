'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { HEX_POINTS } from '@/lib/hex';

const HERO_TILES = [
  { color: '#FF6B6B', label: 'Pencil', x: 0, y: -50 },
  { color: '#4ECDC4', label: 'Phone', x: 43, y: -25 },
  { color: '#FFE66D', label: 'LEGO', x: 43, y: 25 },
  { color: '#95E1D3', label: 'Snack', x: 0, y: 50 },
  { color: '#C44569', label: 'Trophy', x: -43, y: 25 },
  { color: '#6C5CE7', label: 'Build', x: -43, y: -25 },
];

export function HeroAnimation() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mx-auto h-[230px] w-[200px]" aria-label="Six FluxStation tiles snapping into a ring">
      <motion.div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flux-purple/20 blur-xl" animate={reduceMotion ? undefined : { scale: [1, 1.25, 1], opacity: [.3, .6, .3] }} transition={{ duration: 3, repeat: Infinity }} />
      {HERO_TILES.map((tile, index) => {
        const angle = (index / HERO_TILES.length) * Math.PI * 2;
        return (
          <motion.svg
            key={tile.label}
            viewBox="0 0 100 115.47"
            className="absolute left-1/2 top-1/2 -ml-9 -mt-[42px] h-[83px] w-[72px] drop-shadow-lg"
            initial={reduceMotion ? false : { x: Math.cos(angle) * 280, y: Math.sin(angle) * 280, scale: 0, rotate: 160, opacity: 0 }}
            animate={{ x: tile.x, y: tile.y, scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 190, damping: 18, delay: reduceMotion ? 0 : .18 + index * .1 }}
          >
            <polygon points={HEX_POINTS} fill={tile.color} stroke="rgba(255,255,255,.6)" strokeWidth="2" />
            <text x="50" y="63" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">{tile.label}</text>
          </motion.svg>
        );
      })}
    </div>
  );
}
