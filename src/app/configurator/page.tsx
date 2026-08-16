import type { Metadata } from 'next';
import HexGridV2 from '@/components/configurator/HexGridV2';

export const metadata: Metadata = {
  title: 'Interactive Hex Tile Builder',
  description: 'Drag or tap modular hex tiles onto a virtual grid and price your custom FluxStation live.',
};

export default function ConfiguratorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-7 text-center">
        <p className="text-sm font-black uppercase tracking-[.2em] text-flux-purple">The killer feature</p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl">🧩 Hex Tile Builder</h1>
        <p className="mx-auto mt-3 max-w-2xl text-flux-ink/55">Choose a tile, snap it onto the grid, and watch your price update. Click any placed tile to remove it.</p>
      </header>
      <HexGridV2 />
    </div>
  );
}
