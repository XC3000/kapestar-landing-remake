import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OsTableData } from "@/data/os";
import { cn } from "@/lib/utils";
import BuildUpBadge from "../BuildUpBadge";

// Define your data and columns
const data: OsTableData[] = OsTableData;

export type OsTableData = {
  time: string;
  buildupcall: string;
  totaloicall: number;
  todayoichangecall: number;
  currentoichangecall: number;
  changeinltpcall: number;
  ltpcall: number;
  strikeprice: number;
  ltpput: number;
  changeinltpput: number;
  currentoichangeput: number;
  todayoichangeput: number;
  totaloiput: number;
  buildupput: string;
};

const columns: ColumnDef<OsTableData>[] = [
  // Define your columns here
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "buildupcall",
    header: "Build-Ups",
    cell: ({ row }) => <BuildUpBadge text={row.getValue("buildupcall")} />,
  },
  {
    accessorKey: "totaloicall",
    header: "Total OI In Call",
  },
  {
    accessorKey: "todayoichangecall",
    header: "Today’s Change In OI",
  },
  {
    accessorKey: "currentoichangecall",
    header: "Current OI-Change",
  },
  {
    accessorKey: "changeinltpcall",
    header: "Change In LTP",
  },
  {
    accessorKey: "ltpcall",
    header: "LTP Call",
  },
  {
    accessorKey: "strikeprice",
    header: "Strike Price",
  },
  {
    accessorKey: "ltpput",
    header: "LTP Put",
  },
  {
    accessorKey: "changeinltpput",
    header: "Change In LTP",
  },
  {
    accessorKey: "currentoichangeput",
    header: "Current OI-Change",
  },
  {
    accessorKey: "todayoichangeput",
    header: "Today’s Change In OI",
  },
  {
    accessorKey: "totaloiput",
    header: "Total OI In PUT",
  },
  {
    accessorKey: "buildupput",
    header: "Build-Ups",
    cell: ({ row }) => <BuildUpBadge text={row.getValue("buildupput")} />,
  },
];

function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center pb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="block h-[500px]">
        <TableHeader className="sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "text-center font-semibold text-zinc-800",
                      {
                        "bg-gray-200 dark:bg-gray-400 dark:text-zinc-800":
                          header.column.columnDef.header === "Strike Price",
                      },
                      {
                        "bg-zinc-200 py-2 dark:bg-zinc-800 dark:text-zinc-50":
                          header.column.columnDef.header !== "Strike Price",
                      }
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.columnDef.header === "Strike Price"
                          ? "bg-gray-200 text-center text-zinc-800  dark:bg-gray-400 dark:text-black"
                          : "py-2 text-center text-sm"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
