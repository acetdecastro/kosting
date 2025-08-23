"use client";

import { Separator } from "@src/components/ui/separator";
import { SidebarTrigger } from "@src/components/ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import { ROUTES } from "@src/constants";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pathname}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
