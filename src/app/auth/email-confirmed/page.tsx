"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import Link from "next/link";
import { FullPageLoader } from "@src/components/ui/full-page-loader";

export default function Page() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirecting(true);

      // give loader a moment to render before navigating
      setTimeout(() => {
        router.push("/app/dashboard");
      }, 1000);
    }, 4500);

    return () => clearTimeout(timer);
  }, [router]);

  if (redirecting) {
    return <FullPageLoader message="Redirecting" />;
  }

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
            <Link href="/app/dashboard" passHref>
              <Button className="w-full" onClick={() => setRedirecting(true)}>
                Go now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
