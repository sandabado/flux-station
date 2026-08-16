'use client';

import { motion } from 'framer-motion';
import { HEX_POINTS } from '@/lib/hex';

export function SnapTile({ color, label, icon, size = 80, onRemove }: { color: string; label: string; icon?: string; size?: number; onRemove?: () => void }) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, rotate: 180, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 650, damping: 17 }}
      whileHover={{ scale: 1.08, rotate: 4 }}
      whileTap={{ scale: .88 }}
      onClick={onRemove}
      aria-label={`Remove ${label}`}
      style={{ width: size, height: size * 1.1547 }}
      className="relative"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 115.47" className="drop-shadow-lg">
        <polygon points={HEX_POINTS} fill={color} stroke="rgba(255,255,255,.55)" strokeWidth="2" />
        {icon && <text x="50" y="50" textAnchor="middle" fontSize="27">{icon}</text>}
        <text x="50" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="800">{label.split(' ')[0]}</text>
      </svg>
    </motion.button>
  );
}
