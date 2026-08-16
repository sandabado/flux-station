import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        flux: {
          purple: '#6C5CE7',
          'purple-dark': '#5849C4',
          'purple-light': '#A29BFE',
          coral: '#FF6B6B',
          teal: '#4ECDC4',
          yellow: '#FFE66D',
          mint: '#95E1D3',
          pink: '#C44569',
          sky: '#48DBFB',
          ink: '#1A1A2E',
          paper: '#F8F9FD',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hex-pattern': "url(\"data:image/svg+xml,%3Csvg width='56' height='97' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='28,0 56,16.17 56,48.5 28,64.67 0,48.5 0,16.17' fill='none' stroke='%236C5CE7' stroke-opacity='.07'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        tile: '0 4px 16px rgba(26,26,46,.08)',
        'tile-hover': '0 16px 40px rgba(108,92,231,.2)',
        glow: '0 0 36px rgba(108,92,231,.35)',
      },
    },
  },
  plugins: [],
};

export default config;
