import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, asc, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { suppliers } from "@src/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { o } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

export const metadataSchema = z.object({
  contactInfo: z
    .object({
      email: z
        .string()
        .email("Invalid email address")
        .max(50, "Email  is too long")
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .max(20, "Phone number is too long")
        .optional()
        .or(z.literal("")),
    })
    .optional(),
  notes: z.string().max(100, "Notes is too long").optional().or(z.literal("")),
});

export const insertSupplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required").max(50),
  metadata: metadataSchema.optional().nullable(),
});

export const updateSupplierSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Supplier name is required"),
  metadata: metadataSchema.optional().nullable(),
});

export const selectSupplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  metadata: metadataSchema.optional().nullable(),
  deletedAt: z.string().nullable().optional(),
});

export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type SelectSupplier = z.infer<typeof selectSupplierSchema>;
export type UpdateSupplier = z.infer<typeof updateSupplierSchema>;

export const validSupplierSortFields = z.enum(["createdAt", "name"]);
export const suppliersRouter = createTRPCRouter({
  // Define the valid sortable fields for type safety

  // Update the input schema to use the defined enum
  getAll: protectedProcedure
    .output(z.array(selectSupplierSchema))
    .query(async ({ ctx, input }) => {
      const queryResult = await ctx.db.query.suppliers.findMany({
        where: eq(suppliers.userId, ctx.user.sub),
        orderBy: desc(suppliers.createdAt),
      });

      if (!queryResult || queryResult.length === 0) {
        return [];
      }

      return z.array(selectSupplierSchema).parse(queryResult);
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(selectSupplierSchema.optional()) // ✅ validate single supplier
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.suppliers.findFirst({
        where: and(
          eq(suppliers.id, input.id),
          eq(suppliers.userId, ctx.user.sub),
        ),
      });

      return result ? selectSupplierSchema.parse(result) : undefined;
    }),

  add: protectedProcedure
    .input(insertSupplierSchema)
    .output(selectSupplierSchema.optional()) // Add output validation
    .mutation(async ({ ctx, input }) => {
      console.log(input.name.trim());

      const [newSupplier] = await ctx.db
        .insert(suppliers)
        .values({
          userId: ctx.user.sub,
          name: input.name.trim(),
          metadata: input.metadata ?? null,
        })
        .returning();

      return newSupplier ? selectSupplierSchema.parse(newSupplier) : undefined;
    }),

  update: protectedProcedure
    .input(
      insertSupplierSchema.extend({
        id: z.string(),
      }),
    )
    .output(selectSupplierSchema.optional()) // Add output validation
    .mutation(async ({ ctx, input }) => {
      const [updatedSupplier] = await ctx.db
        .update(suppliers)
        .set({
          name: input.name.trim(),
          metadata: input.metadata ?? null,
        })
        .where(
          and(eq(suppliers.id, input.id), eq(suppliers.userId, ctx.user.sub)),
        )
        .returning();

      return updatedSupplier
        ? selectSupplierSchema.parse(updatedSupplier)
        : undefined;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(z.boolean())
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .delete(suppliers)
        .where(
          and(eq(suppliers.id, input.id), eq(suppliers.userId, ctx.user.sub)),
        )
        .returning();

      return result.length > 0;
    }),
});
