import { createClient } from "@lib/supabase/server";
import { LogoutButton } from "@src/components/logout-button";
import { Me } from "@src/components/me";
import { LatestPost } from "@src/components/post";
import { ThemeSwitcher } from "@src/components/theme-switcher";
import { api, HydrateClient } from "@src/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    // redirect("/auth/login");
    redirect("/");
  }

  void api.post.me.prefetch();
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex w-full flex-1 flex-col gap-12">
        <div className="w-full">
          <div className="bg-accent text-foreground flex items-center gap-3 rounded-md p-3 px-5 text-sm">
            This is a protected page that you can only see as an authenticated
            user
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h2 className="mb-4 text-2xl font-bold">Your user details</h2>
          <pre className="max-h-32 overflow-auto rounded border p-3 font-mono text-xs">
            {JSON.stringify(data.claims, null, 2)}
          </pre>
        </div>
        <div>
          <Me />
        </div>
        <div>
          <LatestPost />
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </main>
    </HydrateClient>
  );
}
