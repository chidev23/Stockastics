/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stockastics: {
          green: '#16A34A',
          blue: '#2563EB',
          red: '#DC2626',
          ink: '#0F172A',
          muted: '#64748B',
          surface: '#F8FAFC'
        }
      }
    }
  },
  plugins: []
};
