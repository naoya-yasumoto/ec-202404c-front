/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


export default withMT({
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
      },
      fontSize: {
        '3xl': '2.2rem', // カスタムフォントサイズ
      },
      fontWeight: {
        'extra-bold': '600', // 太いフォントの重さを追加
      },
    },
  },
  plugins: [require('daisyui'),],
})
