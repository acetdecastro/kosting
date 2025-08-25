"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@src/components/ui/sidebar";
import type { NavItem } from "@src/constants";

export type NavMainProps = {
  items: NavItem[];
};

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="select-none">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // A parent item is active if the current pathname starts with its URL.
          const isParentActive = pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              {/* Only render the top-level button, removing all collapsible logic */}
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isParentActive}
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
