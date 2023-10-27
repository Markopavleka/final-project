/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: [],
  extend: {},
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        myThemeDark: {
          primary: '#AB48AB',
          secondary: '#EFF0FD',
          accent: '#7B81AF',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          'background-image':
            'linear-gradient( to left top,#b904ac,#8e239a,#672983,#462769,#2c214c,#2c214c,#2c214c,#2c214c,#462769,#672983,#8e239a,#b904ac)',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          color: '#F5F5F5',
        },
      },
      {
        myThemeLight: {
          primary: '#00C9B7',
          secondary: '#E1EEEA',
          accent: '#7B81AF',
          neutral: '#488A7B',
          'base-100': '#ffffff',
          'background-image':
            'linear-gradient(to right top, #e4eef1, #cfe8f0, #b9e2ee, #a1dced, #87d6ec, #80d0e4, #7ac9dd, #73c3d5, #7fbbc6, #8ab3b8, #93aaab, #9aa1a1)',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          color: '#545454',
        },
      },
    ],
  },
};
