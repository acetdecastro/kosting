import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@src/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            Thank you for signing up! 🫰
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Just one more step! Check your email for a confirmation link to get
            started. Don’t forget to check your spam folder.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
