/**
 * DESIGN SYSTEM: Typography utilities
 * Centralized typography classes to ensure consistency across the application
 */

/**
 * Typography utility class combinations
 * Use these instead of hardcoding text-* classes
 */
export const typography = {
  // Display sizes - for hero headlines
  displayLarge: 'text-display-lg font-semibold leading-tight tracking-tight',
  displayMedium: 'text-display-md font-semibold leading-tight tracking-tight',
  displaySmall: 'text-display-sm font-semibold leading-tight tracking-tight',

  // Heading sizes - for section headers
  h1: 'text-h1 font-semibold leading-snug tracking-tight',
  h2: 'text-h2 font-semibold leading-snug tracking-tight',
  h3: 'text-h3 font-semibold leading-normal',
  h4: 'text-h4 font-semibold leading-normal',

  // Body text - for main content
  bodyLarge: 'text-body-lg font-normal leading-relaxed',
  body: 'text-body-md font-normal leading-relaxed',
  bodySmall: 'text-body-sm font-normal leading-relaxed',

  // Small/muted text
  label: 'text-label uppercase tracking-[0.15em] font-medium',
  labelLight: 'text-label uppercase tracking-[0.15em] font-light',
  caption: 'text-caption font-normal',
  captionMuted: 'text-caption font-light text-muted-foreground',

  // Font weight combinations
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',

  // Combined utilities for common patterns
  // Use these for specific UI components

  // Navigation link style
  navLink: 'text-sm font-light tracking-wide transition-colors duration-300',

  // Section header pattern
  sectionHeader: 'text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight',

  // Section subheader pattern
  sectionSubheader: 'text-body-lg text-muted-foreground leading-relaxed max-w-md font-light',

  // Hero title (responsive with clamp)
  heroTitle: 'text-display-md md:text-display-lg font-semibold leading-tight tracking-tight text-white',

  // Hero subtitle
  heroSubtitle: 'text-body-md md:text-body-lg font-light text-white/60 leading-relaxed',

  // Card heading
  cardHeading: 'text-h4 font-semibold text-foreground',

  // Card body
  cardBody: 'text-body-sm font-normal text-muted-foreground',

  // Form label
  formLabel: 'block text-label text-muted-foreground mb-sm',

  // Form input text
  formInput: 'text-body-md font-normal',

  // Button text
  buttonText: 'text-label uppercase tracking-wider font-medium',

  // Error/validation text
  error: 'text-body-sm font-normal text-red-500',

  // Success/confirmation text
  success: 'text-body-sm font-normal text-green-500',

  // Badge/tag text
  badge: 'text-caption font-medium uppercase tracking-wide',
} as const;

/**
 * Helper function to combine typography classes
 * @example
 * const customTypo = combineTypography('body', 'text-primary', 'font-semibold')
 */
export function combineTypography(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Responsive typography utilities
 * Use these for responsive text sizing
 */
export const responsiveTypography = {
  // Responsive heading that adapts across breakpoints
  responsiveHeading:
    'text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight',

  // Responsive body text
  responsiveBody: 'text-sm md:text-base lg:text-lg leading-relaxed',

  // Responsive display text
  responsiveDisplay:
    'text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight',
} as const;

/**
 * Predefined text truncation and overflow utilities
 */
export const textOverflow = {
  // Single line ellipsis
  truncate: 'truncate',

  // Multi-line ellipsis (2 lines)
  truncateTwoLines: 'line-clamp-2',

  // Multi-line ellipsis (3 lines)
  truncateThreeLines: 'line-clamp-3',

  // Break words without truncating
  breakWords: 'break-words',

  // Prevent wrapping
  noWrap: 'whitespace-nowrap',
} as const;
