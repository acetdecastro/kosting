"use client";

import { ThemeProvider } from "@src/components/providers/theme-provider";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { ROUTES } from "@src/constants";
import "@src/styles/globals.css";

import { type Metadata } from "next";
import { Fira_Sans, Fira_Code } from "next/font/google";
import Link from "next/link";

export const metadata: Metadata = {
  title: "500 - Internal Server Error",
  description: "Something went wrong on our end.",
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

export default function GlobalError() {
  return (
    <html
      lang="en"
      className={`${firaSans.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
              <CardHeader className="space-y-4">
                <div className="text-muted-foreground font-number text-6xl font-bold">
                  500
                </div>
                <CardTitle className="text-2xl">Something Went Wrong</CardTitle>
                <CardDescription className="text-base">
                  We’re experiencing some technical difficulties.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="default"
                    className="w-full"
                  >
                    Try Again
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={ROUTES.root}>Go Back Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
