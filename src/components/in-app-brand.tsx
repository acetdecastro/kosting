"use client";

import type { BrandInfo } from "@src/constants";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@src/components/ui/sidebar";
import { TrendingUp } from "lucide-react";

export function InAppBrand({ brand }: { brand: BrandInfo }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="font-number flex cursor-default items-center gap-1 !bg-transparent select-none hover:!bg-transparent focus-visible:!ring-0 active:!bg-transparent"
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-200 to-amber-200 text-black/90">
            {/* <brand.logo className="size-4" /> */}

            <TrendingUp size={20} />
          </div>
          <span className="text-primary font-medium tracking-tighter">
            {brand.name}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
