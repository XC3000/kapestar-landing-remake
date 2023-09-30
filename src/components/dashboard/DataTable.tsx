import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  FoiTableDataSchema,
  TableKey,
  getDashboardTableData,
} from "@/api/dashboard";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

// Define your data and columns

export type OsTableData = {
  StockName: string;
  LastTradePrice: number;
  PriceChangePercent: number;
  OIChangePercent: number;
};

const columns: ColumnDef<OsTableData>[] = [
  {
    accessorKey: "StockName",
    header: "Symbol",
  },
  {
    accessorKey: "LastTradePrice",
    header: "LTP",
  },
  {
    accessorKey: "PriceChangePercent",
    header: "LTP Change%",
  },
  {
    accessorKey: "OIChangePercent",
    header: "OI Change%",
  },
];
function DashboardLoader() {
  return (
    <ScrollArea className="h-72  w-full rounded-b-lg border shadow-sm  dark:border-zinc-600  ">
      <div className=" overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 gap-y-4 px-2 py-4">
          <div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
          </div>
          <div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
          </div>
          <div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
          </div>
          <div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
          </div>
          <div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
          </div>
          <div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
function DataTable({ type }: { type: keyof TableKey }) {
  const {
    isLoading,
    data = [],
    error,
  } = useQuery({
    queryKey: [type],
    queryFn: () => getDashboardTableData(type),
  });

  if (isLoading) return <DashboardLoader />;

  if (error) return <p>Some error occurred</p>;

  if (data) return <Table data={data} />;
}

function Table({ data }: { data: z.infer<typeof FoiTableDataSchema> }) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data!,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <ScrollArea className="h-full max-h-[360px] w-full overflow-auto  rounded-md border border-zinc-200 dark:border-zinc-600 lg:max-h-[314px]">
      <table className=" w-full rounded-md">
        <thead className="sticky top-0 w-full border-b bg-white    dark:bg-zinc-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-4">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-start text-sm font-semibold text-zinc-800 dark:text-zinc-50 sm:py-4 "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => {
            return (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                  { "bg-zinc-200 dark:bg-zinc-900 ": index % 2 === 0 },
                  { "bg-zinc-50 dark:bg-zinc-800": index % 2 !== 0 }
                )}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td
                      key={cell.id}
                      className={cn(
                        "p-4 text-start text-xs sm:text-sm",
                        { "text-red-500": (cell.getValue() as number) < 0 },
                        { "text-green-500": (cell.getValue() as number) > 0 },
                        { "text-zinc-800 dark:text-zinc-50": index === 1 }
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {index === 2 && "%"}
                      {index === 3 && "%"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </ScrollArea>
  );
}

export default DataTable;
