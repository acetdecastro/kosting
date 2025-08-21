"use client";

import { withEllipsis } from "@lib/utils";
import { Spinner } from "@src/components/ui/spinner";

export function FullPageLoader({ message = "Loading" }: { message?: string }) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-12 w-12" />
        <p className="text-muted-foreground text-lg">{withEllipsis(message)}</p>
      </div>
    </div>
  );
}
