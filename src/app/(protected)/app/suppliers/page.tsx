import { ROUTES } from "@src/constants";
import { api } from "@src/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
  void api.suppliers.getAll.prefetch();
  redirect(ROUTES.app.suppliers.overview);
}
