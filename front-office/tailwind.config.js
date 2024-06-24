const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poiret: ['Poiret One', 'sans-serif'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
      },
      fontSize: {
        '3xl': '2.2rem', // カスタムフォントサイズ
      },
      fontWeight: {
        'extrabold': '600', // 太いフォントの重さを追加
        'normal': 400, // Regular
        'bold': 700,   // Bold
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeOutDown: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-20px)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
        fadeOutDown: 'fadeOutDown 0.5s ease-out',
      },
    },
  },
  plugins: [require('daisyui')],
});
