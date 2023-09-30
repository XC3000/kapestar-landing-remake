import {
  TFoiRow,
  TFutureOpenInterestHistoric,
  getFOIHistoricData,
  getFOISubscriptionName,
} from "@/api/futures/open-interest";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import useMarketStatus from "@/hooks/useMarketStatus";
import { sbClient } from "@/lib/servicebusClient";
import useAuthStore from "@/store/auth";
import formatCurrency from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { useWindowWidth } from "@wojtekmaj/react-hooks";
import { useEffect, useState } from "react";
import BuildUpBadge from "../BuildUpBadge";
import {
  SpotPriceBoxHistoric,
  SpotPriceBoxRealtime,
} from "../shared/SpotPriceBox";
import { SpotPriceMobileHistoric } from "../shared/SpotPriceMobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  FoiTableHistoricMobile,
  FoiTableRealtimeMobile,
} from "./FoiMobileTable";

const TableHeadData = [
  "Time",
  "Build-Ups",
  "LTP",
  "Change in LTP",
  "Current OI Change",
  "Today's Change in OI",
  "Total-OI",
  "Volume",
  "Break Out",
  "Day High",
  "Day Low",
];

// const subscriptionName = "TestSubs";

function processMessage(messages: string[]) {
  const upRows = messages.map((item) => {
    const value = item.split(",") as TFoiRow;
    return value;
  });

  return upRows;
}

export function FoiTableWrapper({ topicName }: { topicName: string }) {
  const marketStatus = useMarketStatus();

  if (marketStatus === "open")
    return <FoiTableRealtimeWrapper topicName={topicName} />;
  else return <FoiTableHistoric topicName={topicName} />;
}

function FoiTableRealtimeWrapper({ topicName }: { topicName: string }) {
  const userId = useGetFromStore(useAuthStore, (state) => state.user.id)!;

  const marketStatus = useMarketStatus();

  const { data: subscriptionName, isLoading } = useQuery({
    queryKey: ["futures-open-interest", topicName, userId],
    queryFn: () => getFOISubscriptionName(topicName, userId),
    // enabled: marketStatus === "Open" ,
    enabled: userId !== undefined && marketStatus === "open",
    // enabled: userId !== undefined,
  });

  if (isLoading) return <p>loading sub</p>;

  if (subscriptionName)
    return (
      <FoiTableRealtime
        topicName={topicName}
        subscriptionName={subscriptionName}
      />
    );
}

function FoiTableRealtime({
  topicName,
  subscriptionName,
}: {
  topicName: string;
  subscriptionName: string;
}) {
  const [rows, setRows] = useState<TFoiRow[]>([]);
  const [lastRow, setLastRow] = useState<TFoiRow | []>([]);
  const [dayHigh, setDayHigh] = useState(0);

  const [dayLow, setDayLow] = useState(100000000);

  useEffect(() => {
    const receiver = sbClient.createReceiver(topicName, subscriptionName);

    const myMessageHandler = async (messageReceived: { body: string }) => {
      const messages = messageReceived.body.toString().split("\n") as string[];

      const fRows = processMessage(messages);

      const reversedRow = fRows.reverse();

      setRows(reversedRow);
      setLastRow(reversedRow[0]);
      setDayHigh((prev) => {
        return prev > reversedRow[0][9] ? prev : reversedRow[0][9];
      });
      setDayLow((prev) => {
        return prev < reversedRow[0][10] ? prev : reversedRow[0][10];
      });
    };

    // function to handle any errors
    const myErrorHandler = async (error: any) => {
      console.log(error);
    };

    // subscribe and specify the message and error handlers
    receiver.subscribe({
      processMessage: myMessageHandler,
      processError: myErrorHandler,
    });

    return () => {
      console.log("closing receiver");
      receiver.close();
    };
  }, [topicName, subscriptionName]);

  return (
    <>
      <SpotPriceBoxRealtime row={lastRow} dayHigh={dayHigh} dayLow={dayLow} />
      <FoiTable rows={rows} />
    </>
  );
}

function FoiTableHistoric({ topicName }: { topicName: string }) {
  const { isLoading, data } = useQuery({
    queryKey: [topicName],
    queryFn: () => getFOIHistoricData(topicName),
  });
  const windowWidth = useWindowWidth();

  if (isLoading) return <p>loading</p>;

  if (data)
    return (
      <>
        {windowWidth && windowWidth > 640 ? (
          <SpotPriceBoxHistoric
            row={data.rows[0]}
            dayHigh={data.dayHigh}
            dayLow={data.dayLow}
          />
        ) : (
          <SpotPriceMobileHistoric
            row={data.rows[0]}
            dayHigh={data.dayHigh}
            dayLow={data.dayLow}
          />
        )}
        <div className="mt-3">
          {windowWidth && windowWidth > 640 ? (
            <FoiTableHistoricComp rows={data.rows} />
          ) : (
            <FoiTableHistoricMobile rows={data.rows} />
          )}
        </div>
      </>
    );
}

const cellStyles = "px-4 py-2 text-center text-[12px] lg:text-[14px]";
function FoiTable({ rows }: { rows: TFoiRow[] }) {
  const windowWidth = useWindowWidth();

  return windowWidth && windowWidth > 640 ? (
    <Table className="m-auto block h-full max-h-[500px] max-w-max overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-600">
      <TableHeader className="sticky top-0 w-full border-b border-zinc-200 bg-white  dark:border-zinc-600 dark:bg-zinc-800">
        <TableRow>
          <TableHead className="w-4 px-0 pl-2 text-center text-black dark:text-zinc-50"></TableHead>
          {TableHeadData.map((item, index) => {
            return (
              <TableHead
                className="w-[140px] text-center text-[12px] font-bold  text-black dark:text-zinc-50 lg:text-[14px]"
                key={index}
              >
                {item}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item, index) => {
          return (
            <TableRow
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-zinc-200 dark:bg-zinc-900"
                  : "dark:bg-zinc-800"
              } `}
            >
              <TableCell className="px-0 py-2 pl-2 text-center">
                {index + 1}
              </TableCell>
              <TableCell className={cellStyles}>{item[0]}</TableCell>
              <TableCell className={cellStyles}>
                <BuildUpBadge text={item[1]} />
              </TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item[2])}
              </TableCell>
              <TableCell
                className={`px-4 py-2 text-center text-sm ${
                  item[3] < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {formatCurrency(item[3])}
              </TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item[4])}
              </TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item[5])}
              </TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item[6])}
              </TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item[7])}
              </TableCell>
              <TableCell className={cellStyles}>{item[8]}</TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item[9])}
              </TableCell>
              <TableCell className={cellStyles}>
                {formatCurrency(item[10])}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <FoiTableRealtimeMobile rows={rows} />
  );
}

function FoiTableHistoricComp({ rows }: { rows: TFutureOpenInterestHistoric }) {
  return (
    <Table className="m-auto block h-full max-h-[500px] max-w-max overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-600">
      <TableHeader className="sticky top-0 w-full border-b border-zinc-200 bg-white  dark:border-zinc-600 dark:bg-zinc-800">
        <TableRow>
          <TableHead className="w-4 px-0 pl-2 text-center text-black dark:text-zinc-50"></TableHead>
          {TableHeadData.map((item, index) => {
            return (
              <TableHead
                className="w-[140px] text-center text-[12px] font-bold text-black dark:text-zinc-50"
                key={index}
              >
                {item}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item, index) => {
          return (
            <TableRow
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-zinc-200 dark:bg-zinc-900"
                  : "dark:bg-zinc-800"
              } `}
            >
              <TableCell className="px-0 py-2 pl-2 text-center">
                {index + 1}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {item.DataDateTime}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                <BuildUpBadge text={item.BuildUps.trim()} />
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {formatCurrency(item.LastTradePrice)}
              </TableCell>
              <TableCell
                className={`text-center ${
                  item.LastTradePriceChange < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatCurrency(item.LastTradePriceChange)}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {formatCurrency(item.CurrentOIChange)}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {formatCurrency(item.TodaysChangeInOI)}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {formatCurrency(item.TotalOI)}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {formatCurrency(item.Volume)}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {item.BreakOut}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {formatCurrency(item.DayHigh)}
              </TableCell>
              <TableCell className="px-4 py-2 text-center ">
                {formatCurrency(item.DayLow)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
