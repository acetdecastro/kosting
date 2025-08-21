import { env } from "@src/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeTrailingPeriod(str: string): string {
  return str.endsWith(".") ? str.slice(0, -1) : str;
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function withEllipsis(text: string): string {
  return text.endsWith("...") ? text : `${text}...`;
}
