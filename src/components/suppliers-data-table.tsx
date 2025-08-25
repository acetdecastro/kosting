"use client";

import React from "react";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import { Input } from "@src/components/ui/input";
import { DataTableViewOptions } from "@src/components/reuse-data-table-view-options";
import { DataTablePagination } from "@src/components/reuse-data-table-pagination";
import { api } from "@src/trpc/react";
import { columns } from "@src/app/(protected)/app/suppliers/overview/columns";
import SupplierFormDrawer from "@src/components/supplier-drawer-form";
import type {
  InsertSupplier,
  UpdateSupplier,
} from "@src/server/api/routers/suppliers";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function SuppliersDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Data fetching
  const [suppliers] = api.suppliers.getAll.useSuspenseQuery(undefined, {
    staleTime: 10_000,
    refetchOnWindowFocus: true,
  });

  // Mutations
  const utils = api.useUtils();
  const invalidateSuppliers = () => utils.suppliers.getAll.invalidate();

  const addSupplier = api.suppliers.add.useMutation({
    onSuccess: async (data) => {
      await invalidateSuppliers();
    },
    onError: (error) => {
      // Re-open drawer and show error on the form
      console.log("addSupplier error", error);
    },
  });

  const updateSupplier = api.suppliers.update.useMutation({
    onSuccess: async (data) => {
      await invalidateSuppliers();
    },
    onError: (error) => {
      // Re-open drawer and show error on the form
      console.log("updateSupplier error", error);
    },
  });

  // Helper function to generate unique name
  const generateUniqueName = (
    proposedName: string,
    excludeId?: string,
  ): string => {
    const trimmedName = proposedName.trim();
    const existingNames = suppliers
      .filter((supplier) => (excludeId ? supplier.id !== excludeId : true))
      .map((supplier) => supplier.name);

    if (!existingNames.includes(trimmedName)) {
      return trimmedName;
    }

    let counter = 1;
    let uniqueName = `${trimmedName} (${counter})`;

    while (existingNames.includes(uniqueName)) {
      counter++;
      uniqueName = `${trimmedName} (${counter})`;
    }

    return uniqueName;
  };

  // Handlers
  const handleAddSupplier = (data: InsertSupplier) => {
    const uniqueName = generateUniqueName(data.name);
    const supplierData = { ...data, name: uniqueName };

    toast.promise(addSupplier.mutateAsync(supplierData), {
      loading: "Creating supplier...",
      success: (data) => `Supplier ${data?.name} created successfully`,
      error: (error) =>
        `Failed to create supplier: ${error ?? "Unknown error"}`,
    });
  };

  const handleUpdateSupplier = (supplierId: string, data: InsertSupplier) => {
    const uniqueName = generateUniqueName(data.name, supplierId);
    const updateData: UpdateSupplier = {
      id: supplierId,
      ...data,
      name: uniqueName,
    };

    // Use mutateAsync to get a promise
    toast.promise(updateSupplier.mutateAsync(updateData), {
      loading: "Updating supplier...",
      success: (data) => `Supplier ${data?.name} updated successfully`,
      error: (error) =>
        `Failed to update supplier: ${error ?? "Unknown error"}`,
    });
  };

  // Table setup
  const table = useReactTable({
    data: suppliers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    // Removed manualSorting: true
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        {/* Search and Actions */}
        <div className="flex-col items-center justify-between space-y-4">
          <Input
            placeholder="Search suppliers (name, email, phone, notes)"
            value={
              (table.getColumn("global")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("global")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center justify-between">
            <DataTableViewOptions table={table} />
            <SupplierFormDrawer
              onSubmit={handleAddSupplier}
              isPending={addSupplier.isPending}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        <div className="overflow-x-auto rounded-md border">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-accent px-3 py-1 text-left font-medium sm:px-4"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    className="hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-3 py-0.5 sm:px-4">
                        <div className="text-sm">
                          {cell.column.id === "name" ? (
                            <SupplierFormDrawer
                              supplier={row.original}
                              onSubmit={(data) =>
                                handleUpdateSupplier(row.original.id, data)
                              }
                              isPending={updateSupplier.isPending}
                            >
                              <button className="w-40 truncate text-left hover:underline hover:underline-offset-4">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </button>
                            </SupplierFormDrawer>
                          ) : (
                            <>
                              {cell.column.id === "actions" ? (
                                <SupplierFormDrawer
                                  supplier={row.original}
                                  onSubmit={(data) =>
                                    handleUpdateSupplier(row.original.id, data)
                                  }
                                  isPending={updateSupplier.isPending}
                                >
                                  <Button variant={"ghost"}>
                                    <span className="sr-only">Open menu</span>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                                  </Button>
                                </SupplierFormDrawer>
                              ) : (
                                <>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-muted-foreground h-24 text-center"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-sm font-medium">
                        No results found
                      </div>
                      <div className="text-xs">
                        Try adjusting your search or filters
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
