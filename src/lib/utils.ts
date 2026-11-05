import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind class merge helper — shadcn/ui components এটা ব্যবহার করে */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}