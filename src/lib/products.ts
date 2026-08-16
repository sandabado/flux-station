export type Product = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  tag: string;
  includes: string[];
  color: string;
  popular?: boolean;
};

export type TileType = {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
};

export const TILES: TileType[] = [
  { id: 'pencil', name: 'Pencil Holder', color: '#FF6B6B', icon: '✏️', description: 'Pencils + markers' },
  { id: 'phone', name: 'Phone Dock', color: '#4ECDC4', icon: '📱', description: 'Charge + display' },
  { id: 'lego', name: 'LEGO Bin', color: '#FFE66D', icon: '🧱', description: 'Sort the small stuff' },
  { id: 'snack', name: 'Snack Cup', color: '#95E1D3', icon: '🍬', description: 'Removable cup' },
  { id: 'trophy', name: 'Trophy Stand', color: '#C44569', icon: '🏆', description: 'Show it off' },
  { id: 'mystery', name: 'Mystery Tile', color: '#6C5CE7', icon: '❓', description: 'Monthly surprise' },
];

export const PRODUCTS: Product[] = [
  { id: 'diy-kit', name: 'DIY Kit', price: 19.99, tagline: 'Print your own', description: 'STL files and neodymium magnets for makers ready to print at home.', tag: 'Maker', color: '#6C5CE7', includes: ['All 6 STL files', 'Magnet set', 'Print guide'] },
  { id: 'starter-kit', name: 'Starter Kit', price: 59, tagline: 'Ready to build', description: 'Six hero tiles, a magnetic base, and everything needed to start building.', tag: 'Best Value', color: '#4ECDC4', popular: true, includes: ['6 ready-made tiles', 'Magnetic base plate', 'Sticker pack'] },
  { id: 'galaxy', name: 'Galaxy Explorer', price: 29.99, tagline: 'Three themed tiles', description: 'Stars, rockets, and planet designs with UV-reactive details.', tag: 'New', color: '#48DBFB', includes: ['3 galaxy tiles', 'UV details', 'Collector card'] },
  { id: 'animals', name: 'Animal Kingdom', price: 29.99, tagline: 'Three wild tiles', description: 'Tiger, panda, and chameleon textures for a wilder workspace.', tag: 'Popular', color: '#95E1D3', includes: ['3 animal tiles', 'Emoji stickers', 'Collector card'] },
  { id: 'sports', name: 'Sports Zone', price: 29.99, tagline: 'Three game-day tiles', description: 'Basketball, soccer, and baseball textures for young athletes.', tag: 'New', color: '#FFE66D', includes: ['3 sports tiles', 'Mini sticker set', 'Collector card'] },
  { id: 'ultimate', name: 'Ultimate Builder', price: 159, tagline: 'The whole shebang', description: 'Eighteen tiles across every theme in a premium collector case.', tag: 'Ultimate', color: '#C44569', includes: ['18 tiles', 'Collector case', '2 mystery tiles', 'Lifetime STL access'] },
];

export function calculateBundlePrice(tileCount: number): number {
  if (tileCount >= 18) return 159;
  if (tileCount >= 12) return 109;
  if (tileCount >= 6) return 59;
  return tileCount * 9.99;
}

export function getDiscount(original: number, bundle: number): number {
  return Math.max(0, original - bundle);
}
