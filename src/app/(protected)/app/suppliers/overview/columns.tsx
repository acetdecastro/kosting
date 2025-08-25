"use client";

import { DataTableColumnHeader } from "@src/components/reuse-data-table-column-header";
import { Button } from "@src/components/ui/button";
import { Checkbox } from "@src/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import { type SelectSupplier } from "@src/server/api/routers/suppliers";

export const columns: ColumnDef<SelectSupplier>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return row.original.name;
    },
  },

  {
    id: "notes",
    accessorKey: "Notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      const metadata = row.original.metadata;
      if (!metadata?.notes) {
        return <span className="text-muted-foreground">—</span>;
      }

      return (
        <div className="flex w-24">
          <span className="text-muted-foreground truncate text-xs">
            {metadata.notes}
          </span>
        </div>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "contact",
    accessorKey: "Contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      const metadata = row.original.metadata;
      if (!metadata?.contactInfo?.email && !metadata?.contactInfo?.phone) {
        return <span className="text-muted-foreground">—</span>;
      }

      const { email, phone } = metadata.contactInfo;

      if (email && phone) {
        return (
          <div className="text-muted-foreground flex w-28 flex-col text-xs">
            <span className="truncate">{email}</span>
            <span className="truncate">{phone}</span>
          </div>
        );
      }

      return (
        <div className="text-muted-foreground flex w-28">
          {email && <span className="truncate">{email}</span>}
          {phone && <span className="truncate">{phone}</span>}
        </div>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue<SelectSupplier["createdAt"]>("createdAt");
      const date = new Date(createdAt);
      return (
        <span className="text-muted-foreground text-xs">
          {date.toLocaleString(undefined, {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use 24-hour format
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    // cell: ({ row }) => {
    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span className="sr-only">Open menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //         <DropdownMenuItem>
    //           <SquarePen />
    //           Edit
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem variant="destructive">
    //           <Trash2 />
    //           Delete
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   );
    // },
    cell: ({ row }) => {
      return <MoreHorizontal className="h-4 w-4" />;
    },
  },
  {
    id: "global",
    header: () => null,
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, _id, value) => {
      if (!value) return true;
      const search = (value as string).toLowerCase();

      const { name, metadata } = row.original;
      const email = metadata?.contactInfo?.email?.toLowerCase() ?? "";
      const phone = metadata?.contactInfo?.phone?.toLowerCase() ?? "";
      const notes = metadata?.notes?.toLowerCase() ?? "";

      return (
        name.toLowerCase().includes(search) ||
        email.includes(search) ||
        phone.includes(search) ||
        notes.includes(search)
      );
    },
  },
];
