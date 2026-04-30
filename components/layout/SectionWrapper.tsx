import { forwardRef, HTMLAttributes, ReactNode } from "react";

type SizeVariant = "compact" | "default" | "spacious";
type PaddingVariant = "narrow" | "default" | "wide";
type BgVariant = "white" | "light" | "none";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: SizeVariant;
  padding?: PaddingVariant;
  bg?: BgVariant;
  overflow?: boolean;
}

// Variant mappings
const sizeClasses: Record<SizeVariant, string> = {
  compact: "py-12 md:py-16",
  default: "py-20 md:py-32",
  spacious: "py-28 md:py-40",
};

const paddingClasses: Record<PaddingVariant, string> = {
  narrow: "px-4 md:px-6",
  default: "px-6 md:px-10",
  wide: "px-8 md:px-14",
};

const bgClasses: Record<BgVariant, string> = {
  white: "bg-white",
  light: "bg-[#F9F9F9]",
  none: "bg-transparent",
};

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      children,
      size = "default",
      padding = "default",
      bg = "white",
      overflow = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "relative";
    const sizeClass = sizeClasses[size];
    const paddingClass = paddingClasses[padding];
    const bgClass = bgClasses[bg];
    const overflowClass = overflow ? "overflow-hidden" : "";

    const combinedClasses = `${baseClasses} ${sizeClass} ${paddingClass} ${bgClass} ${overflowClass} ${className}`.trim();

    return (
      <section ref={ref} className={combinedClasses} {...props}>
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
