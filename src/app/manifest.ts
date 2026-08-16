import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FluxStation Kids', short_name: 'FluxStation', description: 'Build Your Space. Build Your World.', start_url: '/', display: 'standalone', background_color: '#F8F9FD', theme_color: '#6C5CE7', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
