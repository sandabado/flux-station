'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { HEX_POINTS } from '@/lib/hex';

const TILES = [
  { color: '#FF6B6B', size: 60, x: '8%', y: '20%' },
  { color: '#4ECDC4', size: 78, x: '86%', y: '14%' },
  { color: '#FFE66D', size: 50, x: '77%', y: '73%' },
  { color: '#95E1D3', size: 66, x: '14%', y: '77%' },
  { color: '#6C5CE7', size: 44, x: '49%', y: '8%' },
  { color: '#C44569', size: 54, x: '91%', y: '49%' },
  { color: '#48DBFB', size: 64, x: '3%', y: '49%' },
];

export function TileCloud() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {TILES.map((tile, index) => (
        <motion.svg
          key={tile.color}
          className="absolute"
          style={{ left: tile.x, top: tile.y, width: tile.size, height: tile.size * 1.1547 }}
          viewBox="0 0 100 115.47"
          animate={reduceMotion ? undefined : { y: [0, -(18 + index * 2), 0], x: [0, 8 + index, 0], rotate: [0, 7, -5, 0] }}
          transition={{ duration: 6 + index * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polygon points={HEX_POINTS} fill={tile.color} opacity=".16" />
        </motion.svg>
      ))}
    </div>
  );
}
