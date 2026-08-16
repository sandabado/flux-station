import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fluxstation.com';
  return [
    ['/', 1, 'weekly'], ['/shop', .9, 'weekly'], ['/configurator', .9, 'monthly'], ['/founders', .7, 'monthly'], ['/community', .6, 'weekly'], ['/stem', .6, 'monthly'],
  ].map(([path, priority, changeFrequency]) => ({ url: `${base}${path}`, priority: priority as number, changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'] }));
}
