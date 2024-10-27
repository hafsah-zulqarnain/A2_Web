/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/TS files in the src directory
    './public/index.html', // Include the public index.html file if needed
  ],
  theme: {
    extend: {
      animation: {
        moveClouds: 'moveClouds 3s ease-in-out infinite alternate',
        glowing: 'glowing 2s ease-in-out infinite',
        fallingRain: 'fallingRain 1s ease-in-out infinite', // New rain animation
      },
      keyframes: {
        moveClouds: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(10px)' },
        },
        glowing: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.1)', filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
        fallingRain: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' }, // Move down
          '100%': { transform: 'translateY(0)' }, // Move back up
        },
      },
    },
  },
  plugins: [],
};
