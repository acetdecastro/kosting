import Link from "next/link";

import { LatestPost } from "@src/components/post";
import { api, HydrateClient } from "@src/trpc/server";

export default async function Page() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create{" "}
          <span className="text-[hsl(280,100%,70%)]">
            DASHBOARD PROTECTED
          </span>{" "}
        </h1>
      </div>
    </HydrateClient>
  );
}
