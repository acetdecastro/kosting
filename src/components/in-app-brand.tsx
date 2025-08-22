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
          className="font-number cursor-default !bg-transparent select-none hover:!bg-transparent focus-visible:!ring-0 active:!bg-transparent"
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300/70 to-rose-300/70 text-black/90">
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300/70 to-rose-300/70 text-black">
              <span className="text-sm font-extrabold sm:text-base md:text-lg">
                {/* {brand.name.charAt(0).toUpperCase()}
                 */}
                <TrendingUp size={20} />
              </span>
            </div>
          </div>
          <span className="text-primary font-bold tracking-tighter">
            {brand.name}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
