"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/app");
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Kosting 🩵</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Your email has been successfully confirmed. You’ll be redirected to
            your dashboard shortly.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/app" passHref>
              <Button className="w-full">Go now</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
