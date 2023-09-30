"use client";
import { TableKey, getDashboardTableData } from "@/api/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import formatCurrency from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

export function DashboardTable({ type }: { type: keyof TableKey }) {
  return (
    <div className="mt-2">
      <DesktopTable type={type} />
    </div>
  );
}

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

const headStyles =
  "  max-w-max min-w-max text-start   text-zinc-800 font-semibold dark:text-zinc-50 sm:py-4 ";
const cellStyles = "py-3  max-w-max min-w-max text-start  font-medium sm:py-4 ";
function DesktopTable({ type }: { type: keyof TableKey }) {
  const { isLoading, data } = useQuery({
    queryKey: [type],
    queryFn: () => getDashboardTableData(type),
  });
  const [tableData, setTableData] = useState(data?.slice(0, 5));
  useEffect(() => {
    if (data) {
      setTableData(data?.slice(0, 5));
    }
  }, [data]);

  if (isLoading) return <DashboardLoader />;

  return (
    <div className=" overflow-hidden rounded-md border  border-zinc-200 dark:border-zinc-600">
      <Table>
        <TableHeader className=" border-b  bg-white dark:border-zinc-600 dark:bg-zinc-800">
          <TableRow>
            <TableHead className={headStyles}>Symbol</TableHead>
            <TableHead className={headStyles}>LTP</TableHead>
            <TableHead className={headStyles}>LTP Change%</TableHead>
            <TableHead className={headStyles}>OI Change%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData?.map((item, index) => (
            <TableRow
              className={cn(
                {
                  "bg-zinc-200 dark:bg-zinc-900": index % 2 === 0,
                },
                {
                  "dark:bg-zinc-800": index % 2 !== 0,
                }
              )}
              key={index}
            >
              <TableCell className={cellStyles}>{item.StockName}</TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item.LastTradePrice)}
              </TableCell>
              <TableCell
                className={cn(
                  { cellStyles },
                  {
                    "text-green-500": item.PriceChangePercent >= 0,
                  },
                  {
                    "text-red-500": item.PriceChangePercent < 0,
                  }
                )}
              >
                {item.PriceChangePercent} %
              </TableCell>
              <TableCell
                className={cn(
                  { cellStyles },
                  {
                    "text-green-500": item.OIChangePercent >= 0,
                  },
                  {
                    "text-red-500": item.OIChangePercent < 0,
                  }
                )}
              >
                {item.OIChangePercent} %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
