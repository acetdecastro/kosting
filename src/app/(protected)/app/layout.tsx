import "@src/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@src/trpc/react";
import { headers } from "next/headers";
import { cloakSSROnlySecret } from "ssr-only-secrets";
import { ThemeProvider } from "@src/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Kosting",
  description: "Pricing Calculator for Small Businesses",
  //   icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookie = new Headers(await headers()).get("cookie");
  const encryptedCookie = await cloakSSROnlySecret(
    cookie ?? "",
    "SECRET_CLIENT_COOKIE_VAR",
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TRPCReactProvider ssrOnlySecret={encryptedCookie}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
