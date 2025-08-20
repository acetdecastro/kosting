import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}
