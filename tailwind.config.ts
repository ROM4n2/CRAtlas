import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rebel: '#DC2626',
        conservative: '#2563EB',
        military: '#CA8A04',
        contested: '#9333EA',
        nodata: '#9CA3AF',
      },
    },
  },
  plugins: [],
};

export default config;
