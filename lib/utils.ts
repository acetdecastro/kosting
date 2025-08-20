import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeTrailingPeriod(str: string): string {
  return str.endsWith(".") ? str.slice(0, -1) : str;
}
