const fs = require("fs");
const path = require("path");

// Generate tRPC routers from schema files

const SCHEMA_DIR = path.join(__dirname, "src/server/db/schema");
const ROUTERS_DIR = path.join(__dirname, "src/server/api/routers");

if (!fs.existsSync(ROUTERS_DIR)) {
  fs.mkdirSync(ROUTERS_DIR, { recursive: true });
}

// Converts dash-case to camelCase
/**
 * @param {string} str
 */
function dashToCamel(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const files = fs
  .readdirSync(SCHEMA_DIR)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts");

files.forEach((file) => {
  const base = file.replace(/\.ts$/, "");
  const entity = dashToCamel(base);
  const routerName = `${entity}Router`;

  const routerContent = `import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { ${entity} } from "@src/server/db/schema";


export const ${routerName} = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.${entity}.findMany({
      where: eq(${entity}.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.${entity}.findFirst({
        where: and(
          eq(${entity}.id, input.id),
          eq(${entity}.userId, ctx.user.sub),
        ),
      });
    }),
});

`;

  fs.writeFileSync(path.join(ROUTERS_DIR, `${base}.ts`), routerContent);
});

console.log("tRPC routers generated in:", ROUTERS_DIR);
