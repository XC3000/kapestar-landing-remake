import {
  TFoiRow,
  TFutureOpenInterestHistoricRow,
} from "@/api/futures/open-interest";
import { useWindowWidth } from "@wojtekmaj/react-hooks";
import { SpotPriceMobileRealTime } from "./SpotPriceMobile";

const spotPriceParaStyles =
  "border border-zinc-200 py-2 px-2 dark:border-zinc-600 min-w-max";
const spotPriceBoxStyles =
  "border w-full bg-white dark:bg-zinc-900 grid grid-cols-2 gap-2 text-center dark:border-zinc-600 p-4 min-w-max shadow";

export function SpotPriceBoxRealtime({
  row,
  dayHigh,
  dayLow,
}: {
  row: TFoiRow | [];
  dayHigh: number;
  dayLow: number;
}) {
  const windowWidth = useWindowWidth();
  if (row.length > 0)
    return (
      <>
        {windowWidth && windowWidth > 640 ? (
          <div className="overflow-hidden ">
            <div className="mt-4 flex h-full w-full justify-between gap-4 overflow-x-auto pb-2 text-xs">
              <div className={spotPriceBoxStyles}>
                <p className={spotPriceParaStyles}>Spot Price</p>
                <p className={spotPriceParaStyles}>{"-"}</p>
                <p className={spotPriceParaStyles}>Current Future Price</p>
                <p className={spotPriceParaStyles}>{"-"}</p>
              </div>
              <div className={spotPriceBoxStyles}>
                <p className={spotPriceParaStyles}>Current Build-Ups</p>
                <p className={spotPriceParaStyles}>{row[1]}</p>
                <p className={spotPriceParaStyles}>Last Traded Price</p>
                <p className={spotPriceParaStyles}>{row[2]}</p>
              </div>
              <div className={spotPriceBoxStyles}>
                <p className={spotPriceParaStyles}>Previous Day Close</p>
                <p className={spotPriceParaStyles}>{"-"}</p>
                <p className={spotPriceParaStyles}>Today&apos;s Open</p>
                <p className={spotPriceParaStyles}>{"-"}</p>
              </div>
              <div className={spotPriceBoxStyles}>
                <p className={spotPriceParaStyles}>Today&apos;s Day High</p>
                <p className={spotPriceParaStyles}>{dayHigh}</p>
                <p className={spotPriceParaStyles}>Today&apos;s Day Low</p>
                <p className={spotPriceParaStyles}>{dayLow}</p>
              </div>
            </div>
          </div>
        ) : (
          <SpotPriceMobileRealTime
            row={row}
            dayHigh={dayHigh}
            dayLow={dayLow}
          />
        )}
      </>
    );

  return <></>;
}

export function SpotPriceBoxHistoric({
  row,
  dayHigh,
  dayLow,
}: {
  row: TFutureOpenInterestHistoricRow;
  dayHigh: number;
  dayLow: number;
}) {
  return (
    <div className="overflow-hidden ">
      <div className="mt-4 flex h-full w-full  justify-between gap-4 overflow-x-auto pb-2 text-xs">
        <div className={spotPriceBoxStyles}>
          <p className={spotPriceParaStyles}>Spot Price</p>
          <p className={spotPriceParaStyles}>{"-"}</p>
          <p className={spotPriceParaStyles}>Current Future Price</p>
          <p className={spotPriceParaStyles}>{"-"}</p>
        </div>
        <div className={spotPriceBoxStyles}>
          <p className={spotPriceParaStyles}>Current Build-Ups</p>
          <p className={spotPriceParaStyles}>{row.BuildUps}</p>
          <p className={spotPriceParaStyles}>Last Traded Price</p>
          <p className={spotPriceParaStyles}>{row.LastTradePrice}</p>
        </div>
        <div className={spotPriceBoxStyles}>
          <p className={spotPriceParaStyles}>Previous Day Close</p>
          <p className={spotPriceParaStyles}>{"-"}</p>
          <p className={spotPriceParaStyles}>Today&apos;s Open</p>
          <p className={spotPriceParaStyles}>{"-"}</p>
        </div>
        <div className={spotPriceBoxStyles}>
          <p className={spotPriceParaStyles}>Today&apos;s Day High</p>
          <p className={spotPriceParaStyles}>{dayHigh}</p>
          <p className={spotPriceParaStyles}>Today&apos;s Day Low</p>
          <p className={spotPriceParaStyles}>{dayLow}</p>
        </div>
      </div>
    </div>
  );
}
