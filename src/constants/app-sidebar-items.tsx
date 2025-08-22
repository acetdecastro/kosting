import { ROUTES } from "./routes";
import { LayoutDashboard, Calculator, type LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
};

export const appSidebarItems: NavItem[] = [
  {
    title: "Dashboard",
    url: ROUTES.app.dashboard,
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Costings",
    url: ROUTES.app.costings.root,
    icon: Calculator,
    items: [
      {
        title: "Suppliers",
        url: ROUTES.app.costings.suppliers,
      },
    ],
  },
];
