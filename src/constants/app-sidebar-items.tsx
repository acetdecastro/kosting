import { ROUTES } from "./routes";
import {
  LayoutDashboard,
  Calculator,
  type LucideIcon,
  Boxes,
  Truck,
} from "lucide-react";

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
    title: "Products",
    url: ROUTES.app.products.root,
    icon: Boxes,
    items: [
      {
        title: "Costings",
        url: ROUTES.app.products.costings,
      },
      {
        title: "Versions",
        url: ROUTES.app.products.versions,
      },
      {
        title: "Tags",
        url: ROUTES.app.products.tags,
      },
    ],
  },
  {
    title: "Suppliers",
    url: ROUTES.app.suppliers.root,
    icon: Truck,
    items: [
      {
        title: "Overview",
        url: ROUTES.app.suppliers.overview,
      },
    ],
  },
];
