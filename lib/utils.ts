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
  if (
    env.NEXT_PUBLIC_VERCEL_URL &&
    env.NEXT_PUBLIC_VERCEL_URL !== "localhost:3000"
  ) {
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function withEllipsis(text: string): string {
  return text.endsWith("...") ? text : `${text}...`;
}

type RouteObject = {
  [key: string]: string | RouteObject;
};

type GetTabsFunction = (
  routes: RouteObject,
  parentKey: string,
) => string[] | undefined;

export const getTabs: GetTabsFunction = (routes, parentKey) => {
  const parentRouteObject = routes[parentKey];

  if (
    typeof parentRouteObject !== "object" ||
    !parentRouteObject ||
    !Object.keys(parentRouteObject).length
  ) {
    return;
  }

  const tabs: string[] = Object.keys(parentRouteObject)
    .filter((key) => key !== "root")
    .map((key) => key.charAt(0).toUpperCase() + key.slice(1));

  return tabs;
};
