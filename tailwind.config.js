/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          100: '#e6f3ff',
          500: '#2563eb',
          600: '#1d4ed8',
        },
        'orange': {
          500: '#f97316',
          600: '#ea580c',
        },
      },
    },
  },
  plugins: [],
}

