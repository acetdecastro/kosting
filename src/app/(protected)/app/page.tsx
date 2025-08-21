import { LogoutButton } from "@src/components/logout-button";
import { Me } from "@src/components/me";
import { ThemeSwitcher } from "@src/components/theme-switcher";
import { api, HydrateClient } from "@src/trpc/server";

export default async function Page() {
  void api.post.me.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full items-center justify-center">
        <div className="space-y-3.5">
          <div className="flex space-x-3.5">
            <ThemeSwitcher />
            <LogoutButton />
          </div>
          <div>
            <Me />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
