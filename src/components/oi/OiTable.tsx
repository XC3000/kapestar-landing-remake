import { OsTableData } from "@/data/os";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
} from "react";
import BuildUpBadge from "../BuildUpBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const TableHeadData = [
  "Time",
  "Build-Ups",
  "Total OI In Call",
  "Today’s Change In OI",
  "Current OI-Change",
  "Change In LTP",
  "LTP Call",
  "Strike Price",
  "LTP Put",
  "Change In LTP",
  "Current OI-Change",
  "Today’s Change In OI",
  "Total OI In Call",
  "Build-Ups",
];

function formatNumber(value: any) {
  return typeof value === "number" ? value : "-";
}

function formatChange(
  value:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | PromiseLikeOfReactNode
    | null
    | undefined
) {
  return typeof value === "number" ? (
    <span className={value < 0 ? "text-red-600" : "text-green-600"}>
      {value}
    </span>
  ) : (
    "-"
  );
}

const cellStyles = "px-4 py-1.5 text-center text-xs";
function OsTableRow({ item, index }: any) {
  return (
    <TableRow className={"dark:bg-zinc-900"} key={index}>
      <TableCell className={cellStyles}>{item.time}</TableCell>
      <TableCell className={cellStyles}>
        <BuildUpBadge text={item.buildupcall} />
      </TableCell>
      <TableCell className={cellStyles}>
        {formatNumber(item.totaloicall)}
      </TableCell>
      <TableCell className={cellStyles}>
        {formatChange(item.todayoichangecall)}
      </TableCell>
      <TableCell className={cellStyles}>
        {formatNumber(item.currentoichangecall)}
      </TableCell>
      <TableCell className={cellStyles}>
        {formatNumber(item.changeinltpcall)}
      </TableCell>
      <TableCell className={cellStyles}>{formatNumber(item.ltpcall)}</TableCell>
      <TableCell
        className={`${cellStyles} bg-gray-200 text-black dark:bg-gray-400`}
      >
        {formatNumber(item.strikeprice)}
      </TableCell>
      <TableCell className={cellStyles}>{formatNumber(item.ltpput)}</TableCell>
      <TableCell className={cellStyles}>
        {formatNumber(item.changeinltpput)}
      </TableCell>
      <TableCell className={cellStyles}>
        {formatNumber(item.currentoichangeput)}
      </TableCell>
      <TableCell className={cellStyles}>
        {formatNumber(item.todayoichangeput)}
      </TableCell>
      <TableCell className={cellStyles}>
        {formatNumber(item.totaloiput)}
      </TableCell>
      <TableCell className={cellStyles}>
        <BuildUpBadge text={item.buildupput} />
      </TableCell>
    </TableRow>
  );
}

function OiTable() {
  return (
    <Table
      //  style={{ height: `calc(100vh - ${400}px)` }}
      className=" mt-2 hidden h-96 w-full min-w-max overflow-auto rounded-lg  border shadow dark:border-zinc-600 sm:block"
    >
      <TableHeader className="top-0 z-[1] w-full rounded-t-lg border-b border-zinc-200 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
        <TableRow>
          {TableHeadData.map((item, index) => (
            <TableHead
              className={`${
                item === "Strike Price"
                  ? "bg-gray-200 text-black dark:bg-gray-400 dark:text-black"
                  : "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-zinc-50"
              } min-w-max text-center  text-[13px]`}
              key={index}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {OsTableData.map((item, index) => (
          <OsTableRow item={item} index={index} key={index} />
        ))}
      </TableBody>
    </Table>
  );
}

export default OiTable;
