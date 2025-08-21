import "@src/styles/globals.css";

import { type Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { TRPCReactProvider } from "@src/trpc/react";
import { headers } from "next/headers";
import { cloakSSROnlySecret } from "ssr-only-secrets";
import { ThemeProvider } from "@src/components/providers/theme-provider";
import { AppSidebar } from "@src/components/app-sidebar";
import { SiteHeader } from "@src/components/site-header";
import { SidebarInset, SidebarProvider } from "@src/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Kosting",
  description: "Pricing Calculator for Small Businesses",
  //   icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const firaSans = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-fira-sans",
  weight: ["200", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookie = new Headers(await headers()).get("cookie");
  const encryptedCookie = await cloakSSROnlySecret(
    cookie ?? "",
    "SECRET_CLIENT_COOKIE_VAR",
  );

  return (
    <html lang="en" className={firaSans.variable} suppressHydrationWarning>
      <body className="antialiased">
        <TRPCReactProvider ssrOnlySecret={encryptedCookie}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
