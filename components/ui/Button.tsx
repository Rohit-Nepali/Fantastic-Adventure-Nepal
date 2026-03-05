"use client";

import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "glass";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",

    glass: `
      backdrop-blur-md
      bg-white/10
      border border-white/20
      text-white
      hover:bg-white/20
      shadow-sm
      rounded-full
    `,
  };

  const baseStyles = `
    btn
    ${variantStyles[variant]}
    ${fullWidth ? "w-full" : ""}
    ${isActive ? "scale-95" : ""}
    transition-all duration-200
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      className={baseStyles}
    >
      {children}
    </button>
  );
}