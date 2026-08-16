import Link from 'next/link';
import { MagneticButton } from '@/components/animations/MagneticButton';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <svg width="130" height="150" viewBox="0 0 100 115.47" className="animate-pulse"><polygon points="50,0 93.3,28.87 93.3,86.6 50,115.47 6.7,86.6 6.7,28.87" fill="#6C5CE7" opacity=".15" /><text x="50" y="70" textAnchor="middle" fill="#6C5CE7" fontSize="30" fontWeight="900">404</text></svg>
      <h1 className="mt-7 text-4xl font-black">This tile doesn’t fit anywhere!</h1>
      <p className="mt-3 text-flux-ink/50">The page you were looking for snapped out of existence.</p>
      <MagneticButton className="mt-8"><Link href="/" className="rounded-full bg-flux-purple px-8 py-4 font-black text-white">Back Home →</Link></MagneticButton>
    </div>
  );
}
