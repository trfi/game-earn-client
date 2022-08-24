module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-1': '#06c8b5',
        'red-1': '#fd5966'
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
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          // 'base-100': '#f5faff',
          // 'base-200': '#529baa',
          // 'base-300': '#eefcff',
          primary: '#008aa6',
          secondary: '#e1b400',
          neutral: '#2a4561',
          'accent-content': '#ebfffd',
          'warning-content': '#ffffff',
          'error-content': '#ffffff',
        },
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
