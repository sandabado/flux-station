'use client';

import { useMemo, useRef, useState, type DragEvent, type PointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { calculateBundlePrice, getDiscount, TILES, type TileType } from '@/lib/products';
import { HEX_SIZE, hexPath, hexToPixel, isInGrid, pixelToHex, type HexCoord } from '@/lib/hex';
import { useCart } from '@/lib/cart';
import { Confetti } from '@/components/animations/Confetti';
import { MagneticButton } from '@/components/animations/MagneticButton';

type PlacedTile = TileType & { instanceId: string; coord: HexCoord };
const GRID_RADIUS = 4;
const VIEWBOX_SIZE = 600;

export default function HexGridV2() {
  const [tiles, setTiles] = useState<PlacedTile[]>([]);
  const [activeTile, setActiveTile] = useState<TileType | null>(TILES[0]);
  const [hoverHex, setHoverHex] = useState<HexCoord | null>(null);
  const [confetti, setConfetti] = useState({ trigger: 0, origin: { x: 50, y: 50 } });
  const [message, setMessage] = useState('Pencil Holder selected — tap or drag it onto the grid.');
  const svgRef = useRef<SVGSVGElement>(null);
  const { addItem } = useCart();

  const gridCoords = useMemo(() => {
    const coords: HexCoord[] = [];
    for (let q = -GRID_RADIUS; q <= GRID_RADIUS; q += 1) {
      for (let r = -GRID_RADIUS; r <= GRID_RADIUS; r += 1) {
        const coord = { q, r };
        if (isInGrid(coord, GRID_RADIUS)) coords.push(coord);
      }
    }
    return coords;
  }, []);

  function eventToCoord(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scale = Math.min(rect.width / VIEWBOX_SIZE, rect.height / VIEWBOX_SIZE);
    const x = (clientX - rect.left - rect.width / 2) / scale;
    const y = (clientY - rect.top - rect.height / 2) / scale;
    const coord = pixelToHex(x, y);
    return { coord, origin: { x: ((clientX - rect.left) / rect.width) * 100, y: ((clientY - rect.top) / rect.height) * 100 } };
  }

  function placeTile(tile: TileType, coord: HexCoord, origin: { x: number; y: number }) {
    if (!isInGrid(coord, GRID_RADIUS)) {
      setMessage('That spot is outside the build zone. Try a hex inside the grid.');
      return;
    }
    if (tiles.some((placed) => placed.coord.q === coord.q && placed.coord.r === coord.r)) {
      setMessage('That hex is already occupied — choose another spot.');
      return;
    }
    setTiles((current) => [...current, { ...tile, instanceId: crypto.randomUUID(), coord }]);
    setConfetti((current) => ({ trigger: current.trigger + 1, origin }));
    setMessage(`${tile.name} snapped in! ${tiles.length + 1} tile${tiles.length === 0 ? '' : 's'} placed.`);
    setHoverHex(null);
  }

  function handleDrop(event: DragEvent<SVGSVGElement>) {
    event.preventDefault();
    const tile = TILES.find((item) => item.id === event.dataTransfer.getData('tileId')) ?? activeTile;
    const point = eventToCoord(event.clientX, event.clientY);
    if (tile && point) placeTile(tile, point.coord, point.origin);
  }

  function handleGridPointer(event: PointerEvent<SVGSVGElement>) {
    if (!activeTile || event.pointerType === 'mouse' || (event.target as Element).closest('[data-placed-tile]')) return;
    const point = eventToCoord(event.clientX, event.clientY);
    if (point) placeTile(activeTile, point.coord, point.origin);
  }

  const totalPrice = calculateBundlePrice(tiles.length);
  const savings = getDiscount(tiles.length * 9.99, totalPrice);
  const nextBundle = tiles.length < 6 ? 6 : tiles.length < 12 ? 12 : tiles.length < 18 ? 18 : null;

  function addBuildToCart() {
    if (!tiles.length) return;
    addItem({
      id: `custom-${tiles.map((tile) => `${tile.id}:${tile.coord.q}:${tile.coord.r}`).sort().join('|')}`,
      name: `Custom Build (${tiles.length} tiles)`,
      price: totalPrice,
      color: tiles[0].color,
      tiles: tiles.map(({ name, color }) => ({ name, color })),
    });
  }

  function saveDesign() {
    localStorage.setItem('fluxstation-design', JSON.stringify({ version: 1, tiles }));
    setMessage('Design saved on this device. You can keep building!');
  }

  async function shareDesign() {
    const text = `I built a ${tiles.length}-tile FluxStation for $${totalPrice.toFixed(2)}!`;
    const canShare = typeof navigator.share === 'function';
    if (canShare) await navigator.share({ title: 'My FluxStation Build', text });
    else await navigator.clipboard.writeText(text);
    setMessage(canShare ? 'Share sheet opened.' : 'Build summary copied to your clipboard.');
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)_220px]">
      <section aria-labelledby="tile-palette-title">
        <div className="flex items-center justify-between lg:block">
          <h2 id="tile-palette-title" className="text-lg font-black"><span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-flux-purple" />Pick a tile</h2>
          <span className="text-xs font-bold text-flux-ink/40 lg:hidden">Tap, then tap grid</span>
        </div>
        <div className="no-scrollbar mt-3 flex snap-x gap-3 overflow-x-auto pb-3 lg:flex-col lg:overflow-visible">
          {TILES.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * .05 }}
            >
              <button
                type="button"
                draggable
                onDragStart={(event) => { event.dataTransfer.setData('tileId', tile.id); setActiveTile(tile); document.body.classList.add('dragging-active'); }}
                onDragEnd={() => { document.body.classList.remove('dragging-active'); setHoverHex(null); }}
                onClick={() => { setActiveTile(tile); setMessage(`${tile.name} selected — tap or drag it onto the grid.`); }}
                className={`flex min-w-[190px] snap-start items-center gap-3 rounded-2xl border bg-white p-3 text-left shadow-tile transition-all hover:-translate-y-1 hover:shadow-tile-hover lg:min-w-0 ${activeTile?.id === tile.id ? 'border-flux-purple ring-2 ring-flux-purple/15' : 'border-flux-ink/5'}`}
                aria-pressed={activeTile?.id === tile.id}
              >
                <svg width="38" height="44" viewBox="0 0 100 115.47" className="shrink-0"><polygon points="50,0 93.3,28.87 93.3,86.6 50,115.47 6.7,86.6 6.7,28.87" fill={tile.color} /><text x="50" y="66" textAnchor="middle" fontSize="34">{tile.icon}</text></svg>
                <span><strong className="block text-sm">{tile.name}</strong><span className="text-xs text-flux-ink/45">{tile.description}</span></span>
              </button>
            </motion.div>
          ))}
        </div>
        {tiles.length > 0 && <button type="button" onClick={() => { setTiles([]); setMessage('Grid cleared. Pick a tile to start again.'); }} className="mt-2 w-full py-2 text-sm font-bold text-flux-coral">Clear all tiles</button>}
      </section>

      <section className="relative min-h-[470px] overflow-hidden rounded-3xl border-2 border-dashed border-flux-purple/20 bg-flux-paper bg-hex-pattern" aria-label="Interactive hex build grid">
        <svg
          ref={svgRef}
          viewBox="-300 -300 600 600"
          className="h-[500px] w-full touch-manipulation"
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
            const point = eventToCoord(event.clientX, event.clientY);
            if (point) setHoverHex(point.coord);
          }}
          onDragLeave={() => setHoverHex(null)}
          onPointerUp={handleGridPointer}
        >
          {gridCoords.map((coord) => {
            const { x, y } = hexToPixel(coord);
            const occupied = tiles.some((tile) => tile.coord.q === coord.q && tile.coord.r === coord.r);
            const hovered = hoverHex?.q === coord.q && hoverHex?.r === coord.r;
            return <path key={`${coord.q}:${coord.r}`} d={hexPath(x, y, HEX_SIZE - 3)} fill={hovered && !occupied ? `${activeTile?.color ?? '#6C5CE7'}24` : 'transparent'} stroke={hovered && !occupied ? activeTile?.color : '#DCDDEA'} strokeWidth={hovered ? 2 : 1} strokeDasharray={hovered ? '7 5' : undefined} />;
          })}
          <AnimatePresence>
            {tiles.map((tile) => {
              const { x, y } = hexToPixel(tile.coord);
              return (
                <motion.g data-placed-tile key={tile.instanceId} initial={{ scale: 0, rotate: -180, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} exit={{ scale: 0, rotate: 180, opacity: 0 }} transition={{ type: 'spring', stiffness: 620, damping: 17 }} style={{ transformOrigin: `${x}px ${y}px` }} role="button" tabIndex={0} aria-label={`Remove ${tile.name}`} onClick={() => { setTiles((current) => current.filter((item) => item.instanceId !== tile.instanceId)); setMessage(`${tile.name} removed.`); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setTiles((current) => current.filter((item) => item.instanceId !== tile.instanceId)); } }} className="cursor-pointer">
                  <path d={hexPath(x, y, HEX_SIZE - 4)} fill={tile.color} stroke="rgba(26,26,46,.18)" strokeWidth="1.5" />
                  <text x={x} y={y - 3} textAnchor="middle" fontSize="20" className="pointer-events-none">{tile.icon}</text>
                  <text x={x} y={y + 15} textAnchor="middle" fill="white" fontSize="8" fontWeight="900" className="pointer-events-none">{tile.name.split(' ')[0]}</text>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
        <Confetti trigger={confetti.trigger} origin={confetti.origin} />
        {tiles.length === 0 && <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-flux-ink/35"><motion.span className="text-6xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>🧲</motion.span><strong className="mt-3 text-lg">Snap your first tile into place</strong><span className="mt-1 text-sm">Drag on desktop • tap on mobile</span></div>}
        {tiles.length > 0 && <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-black shadow-lg">{tiles.length} placed</div>}
        <p className="absolute inset-x-4 bottom-3 rounded-xl bg-white/85 px-3 py-2 text-center text-xs font-bold text-flux-ink/55 backdrop-blur" aria-live="polite">{message}</p>
      </section>

      <aside className="space-y-4">
        <motion.div layout className="rounded-3xl bg-gradient-to-br from-flux-purple to-[#5849C4] p-5 text-center text-white shadow-glow">
          <p className="text-sm font-bold text-white/70">Your Build</p>
          <motion.p key={totalPrice} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="mt-1 text-4xl font-black tabular-nums">${totalPrice.toFixed(2)}</motion.p>
          <p className="text-xs text-white/60">{tiles.length} tiles</p>
          {savings > 0 && <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-3 rounded-full bg-flux-yellow px-3 py-1 text-xs font-black text-flux-ink">You saved ${savings.toFixed(2)} 🎉</motion.p>}
        </motion.div>
        {nextBundle && tiles.length > 0 && <div className="rounded-2xl border border-flux-purple/10 bg-flux-purple/5 p-4"><p className="text-xs font-black text-flux-purple">Add {nextBundle - tiles.length} for the next bundle price</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-flux-purple/10"><motion.div className="h-full rounded-full bg-flux-purple" animate={{ width: `${(tiles.length / nextBundle) * 100}%` }} /></div></div>}
        <MagneticButton className="w-full"><button type="button" onClick={addBuildToCart} disabled={!tiles.length} className="w-full rounded-2xl bg-flux-teal px-4 py-4 font-black text-flux-ink shadow-lg disabled:cursor-not-allowed disabled:opacity-35">Add to Cart →</button></MagneticButton>
        <MagneticButton className="w-full"><button type="button" onClick={saveDesign} disabled={!tiles.length} className="w-full rounded-2xl border-2 border-flux-purple px-4 py-3 font-black text-flux-purple disabled:opacity-35">💾 Save Design</button></MagneticButton>
        <MagneticButton className="w-full"><button type="button" onClick={shareDesign} disabled={!tiles.length} className="w-full rounded-2xl border-2 border-flux-ink/10 px-4 py-3 font-black text-flux-ink/60 disabled:opacity-35">📸 Share Build</button></MagneticButton>
      </aside>
    </div>
  );
}
