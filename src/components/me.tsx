"use client";

import { Suspense } from "react";

import { api } from "@src/trpc/react";

export function Me() {
  const [me] = api.post.me.useSuspenseQuery();

  return (
    <div className="w-full max-w-xs">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col items-start justify-center gap-2">
          <h2 className="mb-4 text-2xl font-bold">Your user details</h2>
          <pre className="max-h-60 overflow-auto rounded border p-3 font-mono text-xs">
            {JSON.stringify(me, null, 2)}
          </pre>
        </div>
      </Suspense>
    </div>
  );
}
