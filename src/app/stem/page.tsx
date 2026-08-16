'use client';

import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/animations/MagneticButton';

const PROGRAMS = [
  { icon: '🧪', title: 'Classroom Kit', copy: 'Twelve DIY kits, lesson plans, and a teacher guide for a class of 24.', price: '$249', color: '#4ECDC4' },
  { icon: '🎓', title: 'Makerspace License', copy: 'Unlimited STL files for school makerspaces and iterative student designs.', price: '$99/yr', color: '#6C5CE7' },
  { icon: '🏫', title: 'District Program', copy: 'Multi-school licensing, custom branding, and educator workshops.', price: 'Custom', color: '#FF6B6B' },
];

export default function StemPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="text-center"><span className="rounded-full bg-flux-teal/10 px-4 py-2 text-sm font-black text-flux-teal">📚 Education program</span><h1 className="mt-7 text-5xl font-black md:text-6xl">FluxStation for <span className="text-flux-teal">Schools</span></h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-flux-ink/50">Students design, print, test, and build their own organizers while learning geometry, engineering, and problem-solving.</p></header>
      <section className="mt-14 grid gap-6 md:grid-cols-3">{PROGRAMS.map((program, index) => <motion.article key={program.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} whileHover={{ y: -6 }} className="rounded-3xl border border-flux-ink/5 bg-white p-7 shadow-tile"><span className="text-5xl">{program.icon}</span><h2 className="mt-5 text-2xl font-black">{program.title}</h2><p className="mt-2 min-h-24 text-sm leading-6 text-flux-ink/50">{program.copy}</p><strong className="text-3xl" style={{ color: program.color }}>{program.price}</strong></motion.article>)}</section>
      <section className="mt-20"><h2 className="text-center text-3xl font-black">Sample lessons 📝</h2><div className="mt-8 space-y-4">{[['Grades 2–3','Hexagonal Geometry','Explore why hexagons tile perfectly and map neighbors on a grid.'],['Grades 4–5','3D Printing + Design','Model a tile in Tinkercad, slice it, and study material choices.'],['Grades 6–7','Engineering + Load Tests','Test magnetic adhesion and weight capacity, then graph the results.']].map(([grade,title,copy], index) => <motion.article key={title} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="grid gap-3 rounded-2xl bg-flux-paper p-6 sm:grid-cols-[110px_1fr]"><strong className="text-sm text-flux-purple">{grade}</strong><div><h3 className="text-lg font-black">{title}</h3><p className="mt-1 text-sm text-flux-ink/50">{copy}</p></div></motion.article>)}</div></section>
      <section className="mt-16 rounded-3xl bg-gradient-to-br from-flux-teal to-flux-sky p-10 text-center text-flux-ink md:p-14"><h2 className="text-3xl font-black">Bring FluxStation to your school 🏫</h2><p className="mx-auto mt-3 max-w-xl text-flux-ink/60">Ask for the educator preview and help shape the pilot program.</p><MagneticButton className="mt-7"><a href="mailto:schools@fluxstation.com?subject=FluxStation%20school%20pilot" className="rounded-full bg-white px-8 py-4 font-black text-flux-teal shadow-lg">Request a Sample Kit →</a></MagneticButton></section>
    </div>
  );
}
