/**
 * Cradle — لوحة التحكم بعد تسجيل الدخول (مستخرج من التصميم المرجعي).
 * Tailwind v3 — متوافق مع Create React App (يحقن plugin `tailwindcss` تلقائياً عند وجود هذا الملف).
 */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cradle: {
          primary: '#7f56d9',
          'primary-deep': '#6941c6',
          accent: '#f9f5ff',
          'accent-soft': '#f4ebff',
          surface: '#ffffff',
          canvas: '#f9fafb',
          border: '#eaecf0',
          'text-primary': '#101828',
          'text-secondary': '#475467',
          'text-muted': '#667085',
          success: '#12b76a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        'layout': '2rem',
        'card-inner': '1.5rem',
        'sidebar': '280px',
      },
      borderRadius: {
        card: '1rem',
        control: '0.5rem',
      },
      fontSize: {
        'page-title': ['1.875rem', { lineHeight: '2.375rem', fontWeight: '600' }],
        section: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
      },
    },
  },
  plugins: [],
};
