import "@src/styles/globals.css";

import { type Metadata } from "next";
import { Fira_Sans, Fira_Code } from "next/font/google";
import { TRPCReactProvider } from "@src/trpc/react";
import { headers } from "next/headers";
import { cloakSSROnlySecret } from "ssr-only-secrets";
import { ThemeProvider } from "@src/components/providers/theme-provider";
import { AppSidebar } from "@src/components/app-sidebar";
import { AppHeader } from "@src/components/app-header";
import { SidebarInset, SidebarProvider } from "@src/components/ui/sidebar";
import { api, HydrateClient } from "@src/trpc/server";
import { Toaster } from "sonner";

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

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-number",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookie = new Headers(await headers()).get("cookie");
  const encryptedCookie = await cloakSSROnlySecret(
    cookie ?? "",
    "SECRET_CLIENT_COOKIE_VAR",
  );
  void api.users.me.prefetch();

  return (
    <html
      lang="en"
      className={`${firaSans.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <TRPCReactProvider ssrOnlySecret={encryptedCookie}>
          <HydrateClient>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider
                style={
                  {
                    "--sidebar-width": "calc(var(--spacing) * 55)",
                    "--header-height": "calc(var(--spacing) * 12)",
                  } as React.CSSProperties
                }
              >
                <AppSidebar />
                <SidebarInset>
                  <AppHeader />

                  {children}
                </SidebarInset>
              </SidebarProvider>
              <Toaster position="bottom-center" />
            </ThemeProvider>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
