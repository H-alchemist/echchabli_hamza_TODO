/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/script.js"
  ],
  theme: {
    extend: {
    colors:{
      'lgtBlue1':'#c5f5f0',
      'lgtBlue2':'#40e0d0',
      'darkBLue1':'#33b3a6',
      'darkBLue2':'#26867c',
      'black' : '#000000' ,
    },
    },
  },
  plugins: [],
}

