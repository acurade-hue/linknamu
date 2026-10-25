import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f9fafb',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
