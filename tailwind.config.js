const theme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [    
      "./pages/**/*.{js,ts,jsx,tsx}",    
      "./components/**/*.{js,ts,jsx,tsx}",  
    ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...theme.fontFamily.sans]
      },
      colors: {
        'gray-rgba-50': 'rgba(0, 0, 0, 0.5)',
        'gray-rgba-60': 'rgba(0, 0, 0, 0.6)',
        'gray-rgba-70': 'rgba(0, 0, 0, 0.7)',
        'gray-rgba-80': 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    
  ]
}
