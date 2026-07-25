import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional CSS classes and resolves Tailwind CSS class conflicts safely.
 * 
 * @param inputs - Array of class names, conditionals, or objects
 * @returns Merged string of Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
