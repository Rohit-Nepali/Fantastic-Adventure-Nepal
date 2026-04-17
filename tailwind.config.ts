import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
      },
      colors: {
        // Primary brand color (orange)
        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-foreground': 'hsl(var(--primary-foreground) / <alpha-value>)',

        // Neutral colors
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'hsl(var(--secondary-foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        
        // Accent (for CTAs, highlights)
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-foreground': 'hsl(var(--accent-foreground) / <alpha-value>)',

        // Semantic colors
        'dark-bg': 'hsl(var(--dark-bg) / <alpha-value>)',
      },
      fontSize: {
        // Display sizes
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '600' }],
        'display-md': ['2.75rem', { lineHeight: '1.1', fontWeight: '600' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        
        // Heading sizes
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        
        // Body sizes
        'body-lg': ['1.0625rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        
        // Small/muted sizes
        'label': ['0.75rem', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.125em' }],
        'caption': ['0.6875rem', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.0625em' }],
      },
      spacing: {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '2.5rem', // 40px
        '3xl': '3rem',   // 48px
        '4xl': '4rem',   // 64px
      },
      borderRadius: {
        xs: '0.25rem',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
        'slower': '700ms',
      },
    },
  },
  plugins: [],
}

export default config
