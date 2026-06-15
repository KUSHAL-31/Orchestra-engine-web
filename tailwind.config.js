/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101418',
        muted: '#5b6470',
        line: '#d9e0e8',
        panel: '#f7f9fb',
        brand: '#176b87',
        accent: '#c96b32',
        success: '#1f7a4d',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(16, 20, 24, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
