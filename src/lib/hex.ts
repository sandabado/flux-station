export type HexCoord = { q: number; r: number };

export const HEX_SIZE = 48;
export const HEX_POINTS = '50,0 93.3,28.87 93.3,86.6 50,115.47 6.7,86.6 6.7,28.87';

export function hexToPixel({ q, r }: HexCoord): { x: number; y: number } {
  return {
    x: HEX_SIZE * Math.sqrt(3) * (q + r / 2),
    y: HEX_SIZE * 1.5 * r,
  };
}

export function pixelToHex(x: number, y: number): HexCoord {
  const q = (Math.sqrt(3) / 3 * x - y / 3) / HEX_SIZE;
  const r = (2 / 3 * y) / HEX_SIZE;
  return hexRound(q, r);
}

function hexRound(q: number, r: number): HexCoord {
  const s = -q - r;
  let roundedQ = Math.round(q);
  let roundedR = Math.round(r);
  const roundedS = Math.round(s);
  const qDiff = Math.abs(roundedQ - q);
  const rDiff = Math.abs(roundedR - r);
  const sDiff = Math.abs(roundedS - s);

  if (qDiff > rDiff && qDiff > sDiff) roundedQ = -roundedR - roundedS;
  else if (rDiff > sDiff) roundedR = -roundedQ - roundedS;

  return { q: roundedQ, r: roundedR };
}

export function hexPath(cx: number, cy: number, size: number): string {
  const points = Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
  });
  return `M ${points.join(' L ')} Z`;
}

export function isInGrid({ q, r }: HexCoord, radius: number): boolean {
  return Math.abs(q) <= radius && Math.abs(r) <= radius && Math.abs(q + r) <= radius;
}
