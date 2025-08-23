"use client";

import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { ROUTES } from "@src/constants";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
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
            <Button onClick={reset} variant="default" className="w-full">
              Try Again
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={ROUTES.root}>Go Back Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
