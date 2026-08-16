'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { HEX_POINTS } from '@/lib/hex';
import { useCart } from '@/lib/cart';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, count, clearCart } = useCart();
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button type="button" aria-label="Close cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-[60] bg-flux-ink/45 backdrop-blur-sm" />
          <motion.aside role="dialog" aria-modal="true" aria-labelledby="cart-title" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 310, damping: 30 }} className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b p-6">
              <h2 id="cart-title" className="text-2xl font-black">Your Cart <span className="text-flux-purple">({count})</span></h2>
              <button type="button" onClick={() => setIsOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-flux-paper text-xl" aria-label="Close cart">✕</button>
            </header>
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {items.length === 0 ? <div className="py-20 text-center"><div className="text-6xl">🧲</div><p className="mt-4 font-bold text-flux-ink/55">Your cart is ready for a first build.</p></div> : items.map((item) => (
                <motion.div layout key={item.id} className="flex gap-4 rounded-2xl border border-flux-ink/10 p-4">
                  <svg width="44" height="51" viewBox="0 0 100 115.47" className="shrink-0"><polygon points={HEX_POINTS} fill={item.color} /></svg>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-black">{item.name}</h3>
                    <p className="font-bold text-flux-purple">${item.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-flux-paper" aria-label={`Decrease ${item.name} quantity`}>−</button>
                      <span className="w-6 text-center font-bold">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-flux-paper" aria-label={`Increase ${item.name} quantity`}>+</button>
                      <button type="button" onClick={() => removeItem(item.id)} className="ml-auto text-xs font-bold text-flux-coral">Remove</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {items.length > 0 && <div className="space-y-4 border-t bg-flux-paper p-6"><div className="flex justify-between text-lg"><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><button type="button" disabled className="w-full rounded-2xl bg-flux-purple px-5 py-4 font-black text-white opacity-70">Checkout wiring is next</button><p className="text-center text-xs text-flux-ink/45">Cart is functional; no payment is submitted in this prototype.</p><button type="button" onClick={clearCart} className="w-full text-sm font-bold text-flux-ink/45 hover:text-flux-coral">Clear cart</button></div>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
