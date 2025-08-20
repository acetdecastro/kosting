import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Sorry, something went wrong.
              </CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-muted-foreground text-sm">
                  Code error: {params.error}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  An unspecified error occurred.
                </p>
              )}
              <div className="mt-4 flex flex-col space-y-1 text-sm">
                <Link
                  href="/auth/sign-in"
                  className="w-fit underline underline-offset-4"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="w-fit underline underline-offset-4"
                >
                  Sign up
                </Link>
                <Link href="/" className="w-fit underline underline-offset-4">
                  Kosting
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
