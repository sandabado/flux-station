'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Blocks, CupSoda, Dices, Pencil, Smartphone, Sparkles, Trophy, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useState, type FormEvent, type PointerEvent } from 'react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Confetti } from '@/components/animations/Confetti';

const DETAILS = [
  { number: '01', title: 'A system, not a container.', copy: 'Six purpose-built modules lock into one precise footprint. Reconfigure the layout without replacing the product.' },
  { number: '02', title: 'Made layer by layer.', copy: 'Every chamfer and print line is intentional—engineered for a clean fit, tactile grip, and everyday durability.' },
  { number: '03', title: 'Magnetic by design.', copy: 'Embedded magnets make each change immediate. No tools. No permanent layout. Just a quiet, satisfying click.' },
];

type ModuleSpot = {
  label: string;
  reaction: string;
  color: string;
  x: number;
  y: number;
  Icon: LucideIcon;
};

const MODULES: ModuleSpot[] = [
  { label: 'Pencil station', reaction: 'Sketch mode: ON', color: '#FF6B6B', x: 27, y: 38, Icon: Pencil },
  { label: 'Phone dock', reaction: 'Powered up', color: '#4ECDC4', x: 50, y: 37, Icon: Smartphone },
  { label: 'Trophy stand', reaction: 'Show-off mode', color: '#C44569', x: 75, y: 42, Icon: Trophy },
  { label: 'Brick bin', reaction: 'Build mode: READY', color: '#FFE66D', x: 29, y: 68, Icon: Blocks },
  { label: 'Snack cup', reaction: 'Fuel unlocked', color: '#95E1D3', x: 52, y: 69, Icon: CupSoda },
  { label: 'Mystery tile', reaction: 'Secret slot found', color: '#6C5CE7', x: 75, y: 69, Icon: Sparkles },
];

function ProductPlayground() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const [burst, setBurst] = useState({ trigger: 0, origin: { x: 50, y: 50 } });
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 22 });
  const activeModule = MODULES[activeIndex];

  function activate(index: number) {
    const selectedModule = MODULES[index];
    setActiveIndex(index);
    setBurst((current) => ({ trigger: current.trigger + 1, origin: { x: selectedModule.x, y: selectedModule.y } }));
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawRotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
    rawRotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
  }

  function resetTilt() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <section className="relative overflow-hidden bg-[#eeebff] px-4 pb-10 pt-8 text-flux-ink sm:px-6 md:pb-14 md:pt-10">
      <motion.div key={activeModule.color} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full blur-3xl" style={{ backgroundColor: `${activeModule.color}42` }} />
      <motion.div key={`${activeModule.color}-right`} initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: `${activeModule.color}32` }} />

      <div className="relative mx-auto max-w-7xl">
        <header className="relative z-40 mx-auto max-w-4xl text-center">
          <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-black uppercase tracking-[0.25em] text-flux-purple">Tap it. Remix it. Make it yours.</motion.p>
          <h1 className="mt-3 text-4xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl md:text-7xl">Your desk just got<br /><span className="bg-gradient-to-r from-flux-purple via-flux-coral to-flux-teal bg-clip-text text-transparent">an upgrade.</span></h1>
          <div className="mx-auto mt-7 inline-flex w-full max-w-sm flex-col gap-1.5 rounded-[2rem] border border-white/70 bg-white/50 p-1.5 shadow-[0_18px_50px_rgba(73,59,154,.12)] backdrop-blur-md sm:w-auto sm:max-w-none sm:flex-row">
            <MagneticButton className="w-full sm:w-auto"><Link href="/configurator" className="flex min-h-14 w-full min-w-52 items-center justify-center rounded-full bg-flux-purple px-8 font-black text-white shadow-[0_10px_30px_rgba(108,92,231,.3)] transition-colors hover:bg-flux-purple-dark">Build now →</Link></MagneticButton>
            <Link href="/shop" className="flex min-h-14 min-w-48 items-center justify-center rounded-full px-7 font-black text-flux-ink/60 transition-colors hover:bg-white/70 hover:text-flux-ink">See every kit</Link>
          </div>
        </header>

        <div onPointerMove={handlePointerMove} onPointerLeave={resetTilt} className="relative z-10 mx-auto mt-6 aspect-[3/2] w-full max-w-6xl [perspective:1200px] sm:mt-8 md:mt-10">
          <motion.div style={reduceMotion ? undefined : { rotateX, rotateY }} className="absolute inset-0 [transform-style:preserve-3d]">
            <motion.div key={activeIndex} animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }} transition={{ duration: 0.42 }} className="soft-image-blend soft-image-blend-lavender absolute inset-0">
              <Image src="/products/fluxstation-hero-bright.webp" alt="Interactive FluxStation magnetic hex desk organizer" fill priority sizes="(min-width: 1280px) 1152px, 100vw" className="select-none object-contain" draggable={false} />
            </motion.div>

            {MODULES.map((spot, index) => {
              const selected = index === activeIndex;
              const Icon = spot.Icon;
              return (
                <motion.button
                  key={spot.label}
                  type="button"
                  onClick={() => activate(index)}
                  initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.22 + index * 0.07, type: 'spring', stiffness: 420, damping: 18 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.18, rotate: 8 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.84 }}
                  className="absolute z-20 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-flux-ink shadow-[0_5px_20px_rgba(26,26,46,.28)] sm:h-12 sm:w-12"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%`, backgroundColor: spot.color, boxShadow: selected ? `0 0 0 7px ${spot.color}42, 0 8px 28px ${spot.color}88` : undefined }}
                  aria-label={`Activate ${spot.label}`}
                  aria-pressed={selected}
                >
                  <Icon size={20} strokeWidth={2.5} />
                  {selected && <motion.span aria-hidden="true" className="absolute inset-0 rounded-full border-2" style={{ borderColor: spot.color }} animate={reduceMotion ? undefined : { scale: [1, 1.65], opacity: [0.8, 0] }} transition={{ duration: 1.1, repeat: Infinity }} />}
                </motion.button>
              );
            })}

            <AnimatePresence mode="wait">
              <motion.div key={activeModule.label} initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.94 }} className="absolute left-1/2 top-[86%] z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-flux-ink px-5 py-2.5 text-sm font-black text-white shadow-xl sm:top-[84%]">
                {activeModule.reaction}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <Confetti trigger={burst.trigger} origin={burst.origin} />
        </div>

        <div className="relative z-30 -mt-2 flex flex-wrap items-center justify-center gap-2 sm:-mt-5">
          {MODULES.map((spot, index) => {
            const Icon = spot.Icon;
            return <button key={spot.label} type="button" onClick={() => activate(index)} className={`grid h-11 w-11 place-items-center rounded-2xl border transition-all hover:-translate-y-1 ${index === activeIndex ? 'border-flux-ink bg-white shadow-lg' : 'border-white/70 bg-white/[.55]'}`} aria-label={spot.label}><Icon size={19} /></button>;
          })}
          <button type="button" onClick={() => activate((activeIndex + 1) % MODULES.length)} className="ml-1 flex h-11 items-center gap-2 rounded-2xl bg-flux-ink px-4 text-sm font-black text-white shadow-lg transition-transform hover:-translate-y-1"><Dices size={18} /> Remix</button>
        </div>

      </div>
    </section>
  );
}

export function HomePage() {
  const [joined, setJoined] = useState(false);
  function join(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setJoined(true); }

  return (
    <div className="overflow-hidden bg-[#050507]">
      <ProductPlayground />

      <section className="bg-[#f4f4f1] px-6 py-28 text-flux-ink md:py-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-flux-ink/[.38]">The architecture</p>
          <h2 className="mt-5 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.05em] md:text-8xl">Designed to change.<br />Built to stay.</h2>
          <div className="mt-20 grid gap-px overflow-hidden rounded-[2rem] bg-flux-ink/10 md:grid-cols-3">
            {DETAILS.map((detail) => <article key={detail.number} className="bg-[#f4f4f1] p-8 md:min-h-[360px] md:p-10"><span className="font-mono text-xs text-flux-ink/[.32]">{detail.number}</span><h3 className="mt-24 text-3xl font-black tracking-[-0.035em]">{detail.title}</h3><p className="mt-4 max-w-sm leading-7 text-flux-ink/[.52]">{detail.copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="grid bg-[#08090b] text-white lg:grid-cols-2">
        <div className="soft-image-blend soft-image-blend-detail relative min-h-[62svh] overflow-hidden lg:min-h-[86svh]">
          <Image src="/products/fluxstation-magnet-detail.webp" alt="Macro view of the printed surface and embedded magnet joining two FluxStation modules" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-1000 hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </div>
        <div className="flex items-center px-7 py-20 md:px-16 lg:py-0"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-flux-teal">The click</p><h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-7xl">Small detail.<br />Big difference.</h2><p className="mt-7 text-lg leading-8 text-white/[.52]">The magnet is not an accessory. It is the interaction—the thing that turns organization from a chore into a system you want to keep using.</p></div></div>
      </section>

      <section className="relative min-h-[92svh] overflow-hidden bg-flux-ink text-white">
        <div className="soft-image-blend soft-image-blend-desk absolute inset-0">
          <Image src="/products/fluxstation-desk.webp" alt="FluxStation modular organizer on a warm walnut study desk" fill sizes="100vw" className="object-cover object-[68%_center]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/32 to-transparent" />
        <div className="relative z-10 flex min-h-[92svh] items-center px-7 md:px-[8vw]"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-white/[.48]">At home in the real world</p><h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-7xl">Calm desk.<br />Clear mind.</h2><p className="mt-6 max-w-md text-base leading-8 text-white/[.58] md:text-lg">A place for the tools, collections, and small objects that make a workspace personal.</p></div></div>
      </section>

      <section className="bg-white px-6 py-28 text-center text-flux-ink md:py-40">
        <div className="mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-flux-purple">Designed by a father and son</p><h2 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.05em] md:text-7xl">A better answer to a messy desk.</h2><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-flux-ink/[.52]">What started as one Tinkercad model became a modular system—printed, tested, and refined together at home.</p><MagneticButton className="mt-9"><Link href="/founders" className="rounded-full border border-flux-ink/20 px-8 py-4 font-bold text-flux-ink transition-colors hover:border-flux-ink">Read the design story</Link></MagneticButton></div>
      </section>

      <section className="relative bg-[#ecece8] px-6 py-24 text-center text-flux-ink md:py-32">
        <div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-flux-ink/[.38]">Launch access</p><h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">Be first to build.</h2><p className="mx-auto mt-4 max-w-xl text-flux-ink/50">Launch timing, early configurations, and production notes. Only the useful stuff.</p>
          {joined ? <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-8 w-fit rounded-full bg-flux-ink px-6 py-3 font-bold text-white">You’re on the list.</motion.p> : <form onSubmit={join} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="early-email">Email address</label><input required id="early-email" type="email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-full border border-flux-ink/10 bg-white px-6 py-4 text-flux-ink placeholder:text-flux-ink/30" /><MagneticButton><button type="submit" className="w-full whitespace-nowrap rounded-full bg-flux-ink px-7 py-4 font-bold text-white sm:w-auto">Get launch access</button></MagneticButton></form>}
        </div>
      </section>
    </div>
  );
}
