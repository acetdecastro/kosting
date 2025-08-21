import { LogoutButton } from "@src/components/logout-button";
import { Me } from "@src/components/me";
import { ThemeSwitcher } from "@src/components/theme-switcher";
import { api, HydrateClient } from "@src/trpc/server";

export default async function Page() {
  void api.post.me.prefetch();

  return (
    <HydrateClient>
      <main className="flex h-screen w-full flex-col items-center justify-center space-y-3.5">
        <div className="flex space-x-3.5">
          <ThemeSwitcher />
          <LogoutButton />
        </div>
        <div>
          <Me />
        </div>
      </main>
    </HydrateClient>
  );
}
