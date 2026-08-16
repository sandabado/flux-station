'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { HEX_POINTS } from '@/lib/hex';
import { useCart } from '@/lib/cart';
import { MagneticButton } from '@/components/animations/MagneticButton';

const LINKS = [
  ['/shop', 'Shop'], ['/configurator', 'Builder'], ['/founders', 'Our Story'], ['/community', 'Community'], ['/stem', 'STEM'],
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { count, setIsOpen } = useCart();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-flux-ink/5 bg-white/85 backdrop-blur-xl" aria-label="Main navigation">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="FluxStation home">
            <motion.svg width="34" height="39" viewBox="0 0 100 115.47" whileHover={{ rotate: 180 }}>
              <polygon points={HEX_POINTS} fill="#6C5CE7" />
              <text x="50" y="70" textAnchor="middle" fill="white" fontSize="42" fontWeight="900">F</text>
            </motion.svg>
            <span className="font-display text-lg font-black">FluxStation</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${pathname === href ? 'bg-flux-purple/10 text-flux-purple' : 'text-flux-ink/65 hover:bg-flux-paper hover:text-flux-purple'}`}>{label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setIsOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-flux-paper" aria-label={`Open cart with ${count} items`}>
              <span aria-hidden="true" className="text-xl">🛒</span>
              {count > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-flux-coral px-1 text-xs font-black text-white">{count}</motion.span>}
            </button>
            <MagneticButton className="hidden sm:inline-flex">
              <Link href="/configurator" className="rounded-full bg-flux-purple px-5 py-2.5 text-sm font-black text-white hover:bg-flux-purple-dark">Build Now →</Link>
            </MagneticButton>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-flux-paper md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label="Toggle navigation menu">
              <span className="text-xl" aria-hidden="true">{mobileOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="fixed inset-x-0 top-16 z-40 border-b bg-white p-4 shadow-xl md:hidden">
            {LINKS.map(([href, label]) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 font-bold hover:bg-flux-purple/5 hover:text-flux-purple">{label}</Link>)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
