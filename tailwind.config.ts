import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lp-green':     '#00A175',
        'lp-green-dark':'#006145',
        'lp-blue':      '#acf2f9',
        'lp-yellow':    '#FFCA66',
        'lp-purple':    '#7E6AAE',
        'lp-lavender':  '#B49CCA',
        'lp-black':     '#0a0a0a',
        'lp-white':     '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-sharp-grotesk)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'hero':    ['clamp(72px, 9vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display': ['clamp(56px, 6vw, 80px)',  { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'h1':      ['clamp(40px, 5vw, 64px)',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h2':      ['clamp(28px, 4vw, 48px)',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'h3':      ['clamp(20px, 2.5vw, 32px)',{ lineHeight: '1.2' }],
        'body-lg': ['clamp(17px, 1.5vw, 20px)',{ lineHeight: '1.6' }],
        'body':    ['16px',                    { lineHeight: '1.7' }],
        'small':   ['14px',                    { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'xs':      ['12px',                    { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        'card':   '12px',
        'button': '9999px',
        'input':  '8px',
        'modal':  '16px',
        'badge':  '9999px',
      },
      boxShadow: {
        'card':        '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover':  '0 8px 32px rgba(0,0,0,0.14)',
        'nav':         '0 4px 24px rgba(0,0,0,0.06)',
        'modal':       '0 24px 80px rgba(0,0,0,0.2)',
        'green-glow':  '0 0 40px rgba(0,161,117,0.25)',
        'input-focus': '0 0 0 3px rgba(0,161,117,0.15)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.15)' },
        },
      },
      animation: {
        'marquee':      'marquee 30s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'fade-up':      'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'hero-pulse':   'hero-pulse 6s ease-in-out infinite',
      },
      backgroundImage: {
        'lp-gradient-hero':   'linear-gradient(135deg, #00A175 0%, #006145 100%)',
        'lp-gradient-blue':   'linear-gradient(135deg, #acf2f9 0%, #00A175 100%)',
        'lp-gradient-radial': 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config
