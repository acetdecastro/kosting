"use client";

import * as React from "react";

import { NavMain } from "@src/components/nav-main";
import { NavUser } from "@src/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@src/components/ui/sidebar";
import { appSidebarItems, brand } from "@src/constants";
import { InAppBrand } from "./in-app-brand";
import { api } from "@src/trpc/react";
import { Skeleton } from "./ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user] = api.user.me.useSuspenseQuery();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <InAppBrand brand={brand} />
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={appSidebarItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense fallback={<Skeleton className="px-6 py-5" />}>
          <NavUser user={user} />
        </React.Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
