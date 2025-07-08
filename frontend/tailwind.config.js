/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb', // Blue-600 (Main CTA)
        primaryHover: '#1d4ed8', // Blue-700
        secondary: '#f59e0b', // Amber-500 (Highlight)
        secondaryHover: '#d97706', // Amber-600
        accent: '#14b8a6', // Teal-500 (Buttons, Tags)
        accentHover: '#0d9488',
        background: '#f9fafb', // Gray-50
        surface: '#ffffff', // Card/Panel BG
        muted: '#9ca3af', // Gray-400
        subtleText: '#6b7280', // Gray-500
        text: '#111827', // Gray-900
        border: '#e5e7eb', // Gray-200
        error: '#ef4444', // Red-500
        success: '#22c55e', // Green-500
      },
      fontSize: {
        display: '2.5rem', // Large banners
        hero: '2rem', // Page title
        title: '1.5rem', // Section titles
        subheading: '1.25rem', // Paragraph headings
        body: '1rem',
        small: '0.875rem',
        tiny: '0.75rem',
      },
      spacing: {
        section: '4rem',
        block: '2rem',
        inline: '1rem',
        tight: '0.5rem',
        tiny: '0.25rem',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        pill: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 20px rgba(0, 0, 0, 0.15)',
        xl: '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
