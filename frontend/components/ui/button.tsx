import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-baho-navy focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-baho-navy text-white hover:bg-[#16355E] shadow-sm",
        secondary: "bg-baho-navy-dark text-white hover:bg-slate-900 shadow-sm",
        gold: "bg-baho-gold text-white hover:bg-baho-gold-hover shadow-sm",
        outline: "border-2 border-baho-navy text-baho-navy hover:bg-baho-navy hover:text-white",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-baho-navy",
        link: "text-baho-navy underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-md",
        md: "h-11 px-5 text-sm rounded-lg",
        lg: "h-13 px-7 text-base rounded-xl font-bold",
        icon: "h-10 w-10 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
