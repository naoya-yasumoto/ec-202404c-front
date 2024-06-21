/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'extrabold': '600', // 太いフォントの重さを追加
      },
    },
  },
  plugins: [require('daisyui'),],
}
