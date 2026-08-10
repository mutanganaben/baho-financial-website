import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable container wrapper that enforces consistent responsive horizontal padding
 * and maximum content width across all website sections.
 */
export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12 xl:px-16", className)}
      {...props}
    >
      {children}
    </div>
  );
};
