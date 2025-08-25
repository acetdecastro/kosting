import { getTabs } from "@lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@src/components/ui/tabs";
import { ROUTES } from "@src/constants";
import { SuppliersDataTable } from "@src/components/suppliers-data-table";

export default async function Page() {
  const suppliersTabs = getTabs(ROUTES.app, "suppliers");
  const defaultTab = suppliersTabs?.[0]?.toLowerCase() ?? "";

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col px-4 py-6 lg:px-6">
        <Card className="mx-auto w-full flex-1 rounded-xl border-0 bg-transparent shadow-none md:min-h-min">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Suppliers</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Tabs defaultValue={defaultTab} className="gap-4">
              <TabsList>
                {suppliersTabs?.map((tab) => {
                  if (tab === "Details") {
                    return null;
                  }
                  return (
                    <TabsTrigger key={tab} value={tab.toLowerCase()}>
                      {tab}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {suppliersTabs?.map((tab) => {
                if (tab === "Overview") {
                  return (
                    <TabsContent key={tab} value={tab.toLowerCase()}>
                      <SuppliersDataTable />
                    </TabsContent>
                  );
                }
              })}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
