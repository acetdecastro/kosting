import "@src/styles/globals.css";

import { type Metadata } from "next";
import { Fira_Sans } from "next/font/google";

import { ThemeProvider } from "@src/components/providers/theme-provider";

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
  return (
    <html lang="en" className={firaSans.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
