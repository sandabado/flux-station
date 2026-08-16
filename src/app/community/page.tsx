'use client';

import { motion } from 'framer-motion';
import { TileCloud } from '@/components/animations/TileCloud';
import { MagneticButton } from '@/components/animations/MagneticButton';

const BUILDS = [
  { creator: 'Max, age 8', title: 'Galaxy Desk Setup', color: '#48DBFB', tiles: 12, likes: 184 },
  { creator: 'Sophie, age 10', title: 'Rainbow Organizer', color: '#FF6B6B', tiles: 8, likes: 132 },
  { creator: 'Leo, age 7', title: 'Sports Corner', color: '#FFE66D', tiles: 6, likes: 91 },
  { creator: 'Maya, age 11', title: 'Ultimate Build', color: '#6C5CE7', tiles: 18, likes: 221 },
  { creator: 'Jax, age 9', title: 'Animal Kingdom Shelf', color: '#95E1D3', tiles: 9, likes: 118 },
  { creator: 'Zoe, age 8', title: 'Secret Agent Station', color: '#C44569', tiles: 10, likes: 156 },
];

export default function CommunityPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-12">
      <TileCloud />
      <header className="relative z-10 mb-12 text-center"><p className="text-sm font-black uppercase tracking-[.22em] text-flux-purple">Built by the crew</p><h1 className="mt-2 text-5xl font-black md:text-6xl">Community Builds 📸</h1><p className="mx-auto mt-4 max-w-2xl text-lg text-flux-ink/50">A gallery preview of the worlds kids are making. Real photo submissions arrive with the launch.</p></header>
      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BUILDS.map((build, index) => <motion.article key={build.title} initial={{ opacity: 0, scale: .92, rotate: index % 2 ? 2 : -2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} whileHover={{ y: -7 }} className="rounded-3xl bg-white p-5 shadow-tile hover:shadow-tile-hover"><div className="flex aspect-video flex-wrap content-center justify-center gap-1 rounded-2xl p-8" style={{ backgroundColor: `${build.color}16` }}>{Array.from({ length: build.tiles }, (_, tile) => <motion.svg key={tile} width="27" height="31" viewBox="0 0 100 115.47" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: tile * .025 }}><polygon points="50,0 93.3,28.87 93.3,86.6 50,115.47 6.7,86.6 6.7,28.87" fill={build.color} opacity={.35 + tile / build.tiles * .65} /></motion.svg>)}</div><h2 className="mt-4 text-xl font-black">{build.title}</h2><p className="text-sm text-flux-ink/40">by {build.creator}</p><div className="mt-3 flex items-center text-sm text-flux-ink/40"><span>❤️ {build.likes}</span><span className="ml-auto rounded-full bg-flux-purple/10 px-3 py-1 text-xs font-black text-flux-purple">{build.tiles} tiles</span></div></motion.article>)}
      </div>
      <section className="relative z-10 mt-16 rounded-3xl border-2 border-dashed border-flux-purple/25 bg-flux-purple/5 p-10 text-center"><span className="text-5xl">📤</span><h2 className="mt-4 text-3xl font-black">Built something cool?</h2><p className="mt-2 text-flux-ink/50">Email your build for a chance to join the launch gallery.</p><MagneticButton className="mt-6"><a href="mailto:community@fluxstation.com?subject=My%20FluxStation%20build" className="rounded-full bg-flux-purple px-8 py-4 font-black text-white">Share Your Build</a></MagneticButton></section>
    </div>
  );
}
