import type { Metadata, Viewport } from 'next';
import { Inter, Nunito } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fluxstation.com'),
  title: { default: 'FluxStation Kids — Build Your Space. Build Your World.', template: '%s | FluxStation Kids' },
  description: 'Modular magnetic hex tile organizers for kids 6–12. Designed by a father-son team and built to snap, remix, and grow.',
  keywords: ['kids organizer', 'modular tiles', 'magnetic hex tiles', '3D printing', 'STEM'],
  manifest: '/manifest.webmanifest',
  openGraph: { title: 'FluxStation Kids', description: 'Build Your Space. Build Your World.', type: 'website', siteName: 'FluxStation Kids' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#6C5CE7' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
