import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        secondary: [
          '"Cormorant Garamond"',
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
      },

      colors: {
        primary: {
          50: '#F4E7E2',
          100: '#EBD5C8',
          200: '#DBB8A7',
          300: '#CD9A83',
          400: '#BF7D60',
          500: '#C57D5D',
          600: '#B16F55',
          700: '#9E634E',
          800: '#804D3D',
          900: '#5C362A',
        },
        secondary: '#FBBF24',
        black: '#1D1D1D',
        accent: '#F97316',
        paragraph: '#444444',
        neutral: {
          light: '#FBFBFB',
          DEFAULT: '#E5E7EB',
          dark: '#4B5563',
        },
      },
      screens: {
        xs: '450px',
        xxs: '392px',
      },
      backgroundImage: {
        'auth-pic': "url('/images/auth-page.jpg')",
        'hero-background': "url('/images/hero-image.png')",
        'categories-background': "url('/images/categories-bg.jpg')",
        'indian': "url('/images/categories/indian.jpg')",
        'italian': "url('/images/categories/italian.jpg')",
        'british': "url('/images/categories/british.jpg')",
        'chinese': "url('/images/categories/chinese.jpg')",
        'japanese': "url('/images/categories/japanese.jpg')",
        'mexican': "url('/images/categories/mexican.jpg')",
        'mideast': "url('/images/categories/mideast.jpg')",
        'search-bg': "url('/images/search-bg.jpg')",
        'orange-gradient-100':
          'linear-gradient(to right, #f7971e10, #ffd20010)',
        'orange-gradient-300':
          'linear-gradient(to right, #f7971e20, #ffd20020)',
        'orange-gradient-500':
          'linear-gradient(to right, #f7971e34, #ffd20034)',
      },
    },
  },
  plugins: [],
} satisfies Config;
