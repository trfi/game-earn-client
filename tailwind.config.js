module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#19232a',
        darken: '#161f26',
        'pink-1': '#FBEAEB',
        'blue-1': '#2F3C7E',
        'yellow-1': '#FFB800',
        'yellow-2': '#F9D342',
        'black-1': '#292826',
      },
      fontFamily: {
        airstrike: ['Airstrike Academy'],
        alata: ['Alata', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: [
      {
        light: {
          'base-100': '#f5faff',
          'primary': '#008aa6',
          'secondary': '#ff7a1f',
        }
      },
      {
        pro: {
          primary: '#245076',
          secondary: '#D926A9',
          accent: '#1FB2A6',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#245076',
          'primary-focus': '#184062',
          success: '#008887',
          'base-content': '#ccd0de',
        },
      },
    ],
  },
}
