"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import { Button } from "@src/components/ui/button";
import React from "react";
import { Input } from "@src/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
import { DataTableViewOptions } from "@src/components/reuse-data-table-view-options";
import { DataTablePagination } from "@src/components/reuse-data-table-pagination";
import { PlusCircleIcon } from "lucide-react";
import { useIsMobile } from "@src/hooks/use-mobile";
import { api } from "@src/trpc/react";

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
}

interface AddButtonProps {
  label?: string;
  onClick?: () => void;
}

export function AddButton({ label = "Add", onClick }: AddButtonProps) {
  const isMobile = useIsMobile();

  return (
    <Button variant="default" size="sm" className="h-8" onClick={onClick}>
      <span className="sr-only">{label}</span>
      {isMobile ? (
        <PlusCircleIcon />
      ) : (
        <>
          <PlusCircleIcon className="mr-1" />
          {label}
        </>
      )}
    </Button>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Initialize the mutation once
  const utils = api.useUtils();
  const addSupplier = api.suppliers.add.useMutation({
    onSuccess: async () => {
      await utils.suppliers.invalidate();
      console.log("Supplier added successfully");
    },
    onError: (error) => {
      console.error("Error adding supplier:", error);
    },
  });

  const handleAddSupplier = () => {
    const supplierInput = {
      name: "Ace Hardware Supplier",
      contactInfo: {
        email: "supplier@example.com",
        mobile: "+63 912 345 6789",
      },
      address: "123 Makati Avenue, Makati City",
      contractInfo: {
        startDate: "2025-08-25",
        endDate: "2026-08-25",
        terms: "Net 30",
      },
    };

    addSupplier.mutate(supplierInput);
    // const supplier = api.suppliers.add.useMutation({
    //   onSuccess: () => {
    //     console.log("Supplier added successfully");
    //   },
    //   onError: (error) => {
    //     console.error("Error adding supplier:", error);
    //   },
    // });
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // initialState: {
    //   columnFilters: [
    //     {
    //       id: "status",
    //       value: "pending", // filter the status column by 'pending' by default
    //     },
    //   ],
    // },
  });

  return (
    <div>
      <div className="flex-col items-center space-y-4 py-4">
        <Input
          placeholder="Search suppliers (name, email, mobile)"
          value={(table.getColumn("global")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("global")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="align-center flex justify-between">
          <DataTableViewOptions table={table} />
          <AddButton label="Supplier" onClick={handleAddSupplier} />
        </div>
      </div>
      <div className="w-full">
        <div className="overflow-x-auto rounded-md border">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="bg-accent px-3 py-1 text-left font-medium sm:px-4"
                        style={{
                          minWidth: header.column.columnDef.minSize ?? "auto",
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-3 py-0.5 sm:px-4">
                        <div className="break-words">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
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
