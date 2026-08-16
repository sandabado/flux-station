import Link from 'next/link';
import { HEX_POINTS } from '@/lib/hex';

const COLUMNS = [
  { title: 'Explore', links: [['Shop', '/shop'], ['Builder', '/configurator'], ['Community', '/community']] },
  { title: 'Company', links: [['Our Story', '/founders'], ['STEM Program', '/stem'], ['Email Us', 'mailto:hello@fluxstation.com']] },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 bg-flux-ink pb-8 pt-14 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex justify-center gap-1" aria-hidden="true">
          {['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#6C5CE7'].map((color) => <svg key={color} width="24" height="28" viewBox="0 0 100 115.47"><polygon points={HEX_POINTS} fill={color} opacity=".7" /></svg>)}
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-black">FluxStation</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">Modular magnetic hex tiles built by a kid, for kids. Build your space. Build your world.</p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-black uppercase tracking-[.2em] text-white/40">{column.title}</h2>
              <ul className="mt-4 space-y-2">{column.links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-white/70 hover:text-white">{label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">© 2026 FluxStation Kids. Built by a 9-year-old and his dad. 🚀</p>
      </div>
    </footer>
  );
}
