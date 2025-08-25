import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col px-4 py-6 lg:px-6">
        <Card className="mx-auto min-h-[100vh] w-full flex-1 rounded-xl md:min-h-min">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Costings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Costings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
