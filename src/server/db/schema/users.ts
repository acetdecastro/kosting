import {
  pgTable,
  index,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
  foreignKey,
  check,
  numeric,
  text,
  jsonb,
  unique,
  smallint,
  boolean,
  date,
  pgSchema,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().notNull(),
    email: varchar({ length: 40 }).notNull(),
    plan: varchar({ length: 12 }).default("free").notNull(),
    currencyCode: text("currency_code").default("PHP").notNull(),
    vatRate: numeric("vat_rate", { precision: 5, scale: 2 })
      .default("12.00")
      .notNull(),
    locale: text().default("en-PH"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    foreignKey({
      columns: [t.id],
      foreignColumns: [t.id],
      name: "users_id_fkey",
    }).onDelete("cascade"),
    check(
      "users_plan_check",
      sql`(plan)::text = ANY ((ARRAY['free'::character varying, 'pro'::character varying])::text[])`,
    ),
  ],
);
