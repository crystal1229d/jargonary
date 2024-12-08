import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        white: 'var(--white)',
        pink: 'var(--pink)',
        green: 'var(--green)',
        yellow: 'var(--yellow)',
        blue: 'var(--blue)',
        purple: 'var(--purple)',
        black: 'var(--black)',
        crange: 'var(--crange)',
        red: 'var(--red)',

        'white-shadow': 'var(--white-shadow)',
        'pink-shadow': 'var(--pink-shadow)',
        'green-shadow': 'var(--green-shadow)',
        'yellow-shadow': 'var(--yellow-shadow)',
        'blue-shadow': 'var(--blue-shadow)',
        'purple-shadow': 'var(--purple-shadow)',
        'black-shadow': 'var(--black-shadow)',
        'crange-shadow': 'var(--crange-shadow)',
        'red-shadow': 'var(--red-shadow)',
      },
    },
  },
  plugins: [],
} satisfies Config
