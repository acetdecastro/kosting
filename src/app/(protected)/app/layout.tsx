import "@src/styles/globals.css";

import { type Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { TRPCReactProvider } from "@src/trpc/react";
import { headers } from "next/headers";
import { cloakSSROnlySecret } from "ssr-only-secrets";
import { ThemeProvider } from "@src/components/providers/theme-provider";
import { AppSidebar } from "@src/components/app-sidebar";
import { SiteHeader } from "@src/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@src/components/ui/sidebar";
import { Separator } from "@src/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@src/components/ui/breadcrumb";

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
                  "--sidebar-width": "calc(var(--spacing) * 55)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar />
              <SidebarInset>
                <SiteHeader />
                {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                      orientation="vertical"
                      className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="#">
                            Building Your Application
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header> */}
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
