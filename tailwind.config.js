/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

        "primary": "#00afff",

        "secondary": "#00d8ff",

        "accent": "#00aeff",

        "neutral": "#141414",

        "base-100": "#efffff",

        "info": "#00c5ff",

        "success": "#00a369",

        "warning": "#b65400",

        "error": "#ef0044",
                },
              },
            ],
          },
  /*
  theme: {
    extend: {},
  },
  */
  plugins: [
    require('daisyui'),
  ],
}

