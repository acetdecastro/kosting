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
import { tags } from "./tags";

export const entityTags = pgTable(
  "entity_tags",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    entityType: varchar("entity_type", { length: 30 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    tagId: uuid("tag_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("idx_entity_tags_entity").using(
      "btree",
      t.entityType.asc().nullsLast().op("text_ops"),
      t.entityId.asc().nullsLast().op("text_ops"),
    ),
    index("idx_entity_tags_tag_id").using(
      "btree",
      t.tagId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_entity_tags_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [t.tagId],
      foreignColumns: [tags.id],
      name: "entity_tags_tag_id_fkey",
    }),
    check(
      "entity_tags_entity_type_check",
      sql`(entity_type)::text = ANY ((ARRAY['product'::character varying, 'raw_material'::character varying, 'packaging_item'::character varying])::text[])`,
    ),
  ],
);
