'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { MagneticButton } from '@/components/animations/MagneticButton';

export default function ShopPage() {
  const { addItem } = useCart();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <p className="text-sm font-black uppercase tracking-[.22em] text-flux-purple">Pick your loadout</p>
        <h1 className="mt-2 text-5xl font-black md:text-6xl">Shop FluxStation</h1>
        <p className="mt-4 text-lg text-flux-ink/50">Snap. Build. Organize. Repeat.</p>
      </motion.header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product, index) => (
          <motion.article key={product.id} initial={{ opacity: 0, y: 40, rotate: -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: index * .06, type: 'spring' }} whileHover={{ y: -7 }} className="relative flex flex-col rounded-3xl border border-flux-ink/5 bg-white p-6 shadow-tile hover:shadow-tile-hover">
            {product.popular && <span className="absolute -right-2 -top-3 rotate-3 rounded-full bg-flux-coral px-4 py-2 text-xs font-black text-white shadow-lg">⭐ MOST POPULAR</span>}
            <motion.svg viewBox="0 0 100 115.47" className="mx-auto h-32 w-28 drop-shadow-xl" whileHover={{ rotate: 24, scale: 1.08 }}><defs><linearGradient id={`product-${product.id}`} x2="1" y2="1"><stop stopColor={product.color} /><stop offset="1" stopColor={product.color} stopOpacity=".55" /></linearGradient></defs><polygon points="50,0 93.3,28.87 93.3,86.6 50,115.47 6.7,86.6 6.7,28.87" fill={`url(#product-${product.id})`} /><text x="50" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="900">{product.name.split(' ')[0]}</text></motion.svg>
            <span className="mt-5 w-fit rounded-full px-3 py-1 text-xs font-black" style={{ color: product.color, backgroundColor: `${product.color}18` }}>{product.tag}</span>
            <h2 className="mt-3 text-2xl font-black">{product.name}</h2>
            <p className="text-sm font-bold text-flux-ink/40">{product.tagline}</p>
            <p className="mt-3 text-sm leading-6 text-flux-ink/55">{product.description}</p>
            <ul className="my-5 space-y-1.5 text-sm text-flux-ink/50">{product.includes.slice(0, 3).map((item) => <li key={item}><span className="mr-2 font-black text-flux-purple">✓</span>{item}</li>)}</ul>
            <div className="mt-auto flex items-center justify-between gap-3"><strong className="text-3xl text-flux-purple">${product.price.toFixed(2)}</strong><MagneticButton><button type="button" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, color: product.color })} className="rounded-2xl px-5 py-3 font-black text-white shadow-lg" style={{ backgroundColor: product.color }}>Add to Cart</button></MagneticButton></div>
          </motion.article>
        ))}
      </div>
      <section className="mt-16 rounded-3xl bg-flux-purple px-7 py-14 text-center text-white md:px-12">
        <h2 className="text-3xl font-black">Want something totally yours?</h2><p className="mx-auto mt-3 max-w-xl text-white/70">Mix every tile type and see bundle pricing update in real time.</p>
        <MagneticButton className="mt-7"><Link href="/configurator" className="rounded-full bg-white px-8 py-4 font-black text-flux-purple">🧩 Open the Builder →</Link></MagneticButton>
      </section>
    </div>
  );
}
