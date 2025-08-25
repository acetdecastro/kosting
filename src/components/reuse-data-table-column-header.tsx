import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@src/lib/utils";
import { Button } from "./ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // Hide sorting for non-sortable columns
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSort = () => {
    const currentSort = column.getIsSorted();

    if (currentSort === "asc") {
      // If currently ascending, switch to descending
      column.toggleSorting(true);
    } else if (currentSort === "desc") {
      // If currently descending, clear sorting
      column.clearSorting();
    } else {
      // If not sorted, start with ascending
      column.toggleSorting(false);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-accent -ml-3 h-8"
        onClick={handleSort}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
