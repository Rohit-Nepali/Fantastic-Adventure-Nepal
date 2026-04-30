import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

// Comprehensive button variants using your project's design tokens
const buttonVariants = cva(
  // Base styles - using your project's design system
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      // Variant styles matching your design system
      variant: {
        // Primary - Black bg, white text (matches your design)
        primary:
          "bg-[var(--bg-dark)] text-[var(--text-secondary)] hover:bg-[var(--bg-dark)]/90 shadow-sm",

        // Secondary - Light bg, dark text
        secondary:
          "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/80",

        // Outline - Bordered style
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--text-primary)]",

        // Ghost - Transparent with hover
        ghost:
          "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",

        // Glass - Translucent effect (matches your existing)
        glass:
          "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",

        // Link - Text only with underline on hover
        link:
          "text-[var(--text-primary)] underline-offset-4 hover:underline",

        // Destructive - For delete/cancel actions
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",

        // Accent - Using your accent color
        accent:
          "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent)]/90 shadow-sm",
      },

      // Size variants
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11 p-0",
        "icon-sm": "h-9 w-9 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },

      // Width options
      width: {
        default: "",
        full: "w-full",
        auto: "w-auto",
      },

      // Rounded options
      rounded: {
        default: "rounded-lg",
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },

      // Loading state
      loading: {
        true: "opacity-80 cursor-wait",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
      width: "default",
      rounded: "default",
      loading: false,
    },
  }
)

const LoadingSpinner = ({ className }: { className?: string }) => (
  <LoaderCircle className={cn("h-4 w-4 animate-spin", className)} />
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      rounded,
      loading,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // If asChild is true, we cannot inject icons/spinners easily 
    // because we don't know what the child element is.
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            width,
            rounded,
            loading,
            className,
          })
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <LoadingSpinner className={children ? "mr-2" : ""} />}
            {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export default Button
