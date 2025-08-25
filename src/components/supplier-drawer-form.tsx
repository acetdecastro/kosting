"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@src/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { Label } from "@src/components/ui/label";
import { useIsMobile } from "@src/hooks/use-mobile";
import { type InsertSupplier } from "@src/server/api/routers";
import { PlusCircleIcon } from "lucide-react";
import { Textarea } from "@src/components/ui/textarea";
import { Spinner } from "./ui/spinner";
import { withEllipsis } from "@lib/utils";

const supplierSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  metadata: z
    .object({
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
      notes: z
        .string()
        .max(100, "Notes is too long")
        .optional()
        .or(z.literal("")),
    })
    .optional()
    .nullable(),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

interface SupplierDrawerProps {
  supplier?: InsertSupplier & { id?: string }; // for edit mode
  isPending?: boolean;
  onSubmit?: (data: InsertSupplier) => void;
  children?: React.ReactNode;
}

export default function SupplierFormDrawer({
  supplier,
  onSubmit,
  children,
  isPending,
}: SupplierDrawerProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const form = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: supplier?.name ?? "",
      metadata: {
        contactInfo: {
          email: supplier?.metadata?.contactInfo?.email ?? "",
          phone: supplier?.metadata?.contactInfo?.phone ?? "",
        },
        notes: supplier?.metadata?.notes ?? "",
      },
    },
  });

  // Reset form when the drawer is opened or the supplier prop changes
  React.useEffect(() => {
    if (open) {
      form.reset({
        name: supplier?.name ?? "",
        metadata: {
          contactInfo: {
            email: supplier?.metadata?.contactInfo?.email ?? "",
            phone: supplier?.metadata?.contactInfo?.phone ?? "",
          },
          notes: supplier?.metadata?.notes ?? "",
        },
      });
    }
  }, [open, supplier, form]);

  const handleSubmit = (data: SupplierFormData) => {
    const cleanedData: InsertSupplier = {
      name: data.name.trim(),
      metadata: data.metadata
        ? {
            contactInfo: {
              email: data.metadata.contactInfo?.email ?? undefined,
              phone: data.metadata.contactInfo?.phone ?? undefined,
            },
            notes: data.metadata.notes ?? undefined,
          }
        : undefined,
    };
    console.log("Submitting supplier data:", cleanedData);
    onSubmit?.(cleanedData);
    setOpen(false);
  };

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      closeThreshold={0.5}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        {children ?? (
          <Button
            variant="default"
            size="sm"
            className="flex items-center"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner className="size-4" />
                {withEllipsis("Creating")}
              </>
            ) : (
              <>
                <PlusCircleIcon />
                Supplier
              </>
            )}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>
            {supplier ? "Edit Supplier" : "Add New Supplier"}
          </DrawerTitle>
          <DrawerDescription>
            {supplier
              ? "Update the supplier information below."
              : "Fill in the details to add a new supplier."}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <div className="flex flex-col gap-3">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Supplier Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs">
                        {`${field.value?.length ?? "0"} of 50`}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email">Email</Label>
                  <FormField
                    control={form.control}
                    name="metadata.contactInfo.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="phone">Phone</Label>
                  <FormField
                    control={form.control}
                    name="metadata.contactInfo.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="notes">Notes</Label>
                <FormField
                  control={form.control}
                  name="metadata.notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Additional notes or comments"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-xs">
                        Optional {`${field.value?.length ?? "0"} of 100`}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DrawerFooter>
          <Button onClick={form.handleSubmit(handleSubmit)}>
            {supplier ? "Update" : "Submit"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
