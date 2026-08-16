'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from '@/components/animations/MagneticButton';

const STORY = [
  { phase: 'The problem', icon: '🤔', color: '#FF6B6B', copy: 'The desk was chaos: pencils everywhere, LEGO bricks mixed with snacks. “Organize it” sounded boring. Building something better did not.' },
  { phase: 'The idea', icon: '💡', color: '#FFE66D', copy: 'What if organizing felt like building with LEGO? What if every piece snapped together and the whole setup could change whenever you wanted?' },
  { phase: 'The first tile', icon: '🖨️', color: '#4ECDC4', copy: 'We modeled a hex tile in Tinkercad, loaded the Bambu Lab P1S with PETG, and watched the first FluxStation tile take shape.' },
  { phase: 'Today', icon: '🚀', color: '#6C5CE7', copy: 'Six tile types, themed packs, and a digital builder later, a 9-year-old and his dad are turning one messy desk into a modular world.' },
];

export default function FoundersPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <motion.header initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center"><span className="rounded-full bg-flux-purple/10 px-4 py-2 text-sm font-black text-flux-purple">👨‍👦 Day one</span><h1 className="mt-7 text-5xl font-black leading-tight md:text-6xl">A kid had a messy desk.<br /><span className="bg-gradient-to-r from-flux-purple to-flux-coral bg-clip-text text-transparent">So he built a company.</span></h1></motion.header>
      <div className="relative before:absolute before:bottom-4 before:left-8 before:top-4 before:w-px before:bg-flux-ink/10">
        {STORY.map((item, index) => <motion.article key={item.phase} initial={{ opacity: 0, x: index % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} className="relative mb-12 flex gap-6"><motion.div whileHover={{ rotate: 360 }} className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl" style={{ backgroundColor: `${item.color}22` }}>{item.icon}</motion.div><div><h2 className="text-2xl font-black" style={{ color: item.color }}>{item.phase}</h2><p className="mt-2 text-lg leading-8 text-flux-ink/55">{item.copy}</p></div></motion.article>)}
      </div>
      <section className="mt-16 rounded-3xl bg-flux-paper p-7 md:p-10"><h2 className="text-center text-3xl font-black">How we make them 🔧</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[['📐','Design','Tinkercad sketches become printable tile geometry.'],['🖨️','Print','Bambu Lab P1S with durable PETG and PLA+.'],['📦','Snap + ship','Magnets installed, every fit checked, then packed.']].map(([icon,title,copy], index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * .1 }} viewport={{ once: true }} className="rounded-2xl bg-white p-6 text-center"><span className="text-4xl">{icon}</span><p className="mt-3 text-3xl font-black text-flux-purple">{index + 1}</p><h3 className="text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-flux-ink/50">{copy}</p></motion.article>)}</div></section>
      <div className="py-16 text-center"><MagneticButton><Link href="/shop" className="rounded-full bg-flux-purple px-9 py-5 text-lg font-black text-white shadow-glow">Build Your Own →</Link></MagneticButton></div>
    </div>
  );
}
