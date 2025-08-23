"use client";

import { brand, ROUTES } from "@src/constants";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AuthBrand() {
  return (
    <Link
      href={ROUTES.root}
      className="font-number flex shrink-0 items-center gap-1 text-base select-none"
    >
      <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-200 to-amber-200 text-black">
        <span className="text-sm font-extrabold sm:text-base md:text-lg">
          {/* {brand.name.charAt(0).toUpperCase()}
           */}
          <TrendingUp size={20} />
        </span>
      </div>
      <span className="text-primary font-medium tracking-tighter">
        {brand.name}
      </span>
    </Link>
  );
}
