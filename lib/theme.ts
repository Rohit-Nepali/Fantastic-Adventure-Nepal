/**
 * DESIGN SYSTEM: Theme utilities and reusable UI patterns
 * This file centralizes button variants, spacing, and common UI patterns
 */

// Button Variants - Replaces scattered button styles across components
export const buttonVariants = {
  // Primary button (brand orange on white background)
  primary: 'bg-primary text-primary-foreground text-label uppercase tracking-wider font-medium px-lg py-md rounded-full transition-colors duration-base hover:bg-primary/90 cursor-pointer',
  
  // Secondary button (dark background with light text)
  secondary: 'bg-secondary text-secondary-foreground text-label uppercase tracking-wider font-medium px-lg py-md rounded-full transition-colors duration-base hover:bg-secondary/90 cursor-pointer',
  
  // Light button (white background for hero sections)
  light: 'bg-white text-secondary text-label uppercase tracking-wider font-medium px-lg py-md rounded-full transition-colors duration-base hover:bg-white/90 cursor-pointer',
  
  // Ghost button (transparent with hover effect)
  ghost: 'bg-transparent text-foreground text-label uppercase tracking-wider font-medium px-lg py-md rounded-full transition-colors duration-base hover:bg-muted/10 cursor-pointer',
} as const;

// Section Container - Standard max-width container for sections
export const sectionContainer = 'max-w-7xl mx-auto';

// Section Padding - Consistent vertical spacing for sections
export const sectionPadding = {
  mobile: 'px-sm md:px-lg py-2xl md:py-4xl',
  compact: 'px-sm md:px-lg py-lg md:py-2xl',
} as const;

// Grid layouts - Standard responsive grid patterns
export const gridLayouts = {
  // 3-column desktop, 1-column mobile
  threeCol: 'grid grid-cols-1 md:grid-cols-3 gap-md',
  
  // 2-column desktop, 1-column mobile
  twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-lg',
  
  // 2-column with left sidebar
  sidebar: 'grid lg:grid-cols-2 gap-2xl',
} as const;

// Card styles - Reusable card components
export const cardStyles = {
  // Light card with subtle border
  light: 'bg-white border border-border rounded-xl p-lg shadow-sm hover:shadow-md transition-shadow duration-base',
  
  // Dark card for contrast sections
  dark: 'bg-secondary text-secondary-foreground rounded-xl p-lg shadow-md',
  
  // Glass morphism effect (semi-transparent with backdrop blur)
  glass: 'bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-lg shadow-sm',
} as const;

// Typography helpers - Text utility classes
export const typographyClasses = {
  // Uppercase labels with letter spacing
  label: 'text-label uppercase tracking-[0.15em]',
  
  // Muted subtext
  muted: 'text-muted-foreground text-body-sm font-light',
  
  // Emphasis text (slightly stronger)
  emphasis: 'font-semibold text-foreground',
} as const;

// Spacing system - Access individual units
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem', // 48px
  '4xl': '4rem', // 64px
} as const;

// Border radius scale
export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  full: '9999px',
} as const;

// Transitions - Reusable animation durations
export const transitions = {
  fast: 'transition-all duration-150 ease-out',
  base: 'transition-all duration-300 ease-out',
  slow: 'transition-all duration-500 ease-out',
  slower: 'transition-all duration-700 ease-out',
} as const;

// Shadow scales
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
} as const;

// Overlays - For gradient overlays on images
export const overlays = {
  // Light overlay for image text visibility
  lightOverlay: 'bg-gradient-to-b from-black/30 via-black/20 to-black/70',
  
  // Medium overlay
  mediumOverlay: 'bg-gradient-to-b from-transparent to-black/50',
  
  // Dark overlay
  darkOverlay: 'bg-gradient-to-b from-transparent to-black/80',
} as const;

// Flex center - Common centering pattern
export const flexCenter = 'flex items-center justify-center';

// Hero section pattern
export const heroPattern = {
  container: 'relative h-screen w-full overflow-hidden',
  content: 'relative z-10 h-full flex flex-col justify-end',
} as const;
