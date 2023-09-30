import {
  TFoiRow,
  TFutureOpenInterestHistoric,
} from "@/api/futures/open-interest";
import BuildUpBadge from "../BuildUpBadge";

const innerCardStyles =
  "border px-3 py-1 dark:border-zinc-600 flex items-center justify-between gap-2";
export function FoiTableHistoricMobile({
  rows,
}: {
  rows: TFutureOpenInterestHistoric;
}) {
  return (
    <div>
      {rows.map((item, index) => {
        return (
          <div
            key={index}
            className="mt-2 grid grid-cols-2 gap-3 rounded-md border p-3 text-[10px] font-medium dark:border-zinc-600 sm:hidden "
          >
            <div className="flex items-center justify-between gap-2 border px-3 py-1.5 dark:border-zinc-600">
              <p>Time: </p>
              <p className="text-end">{item.DataDateTime}</p>
            </div>

            <div className={innerCardStyles}>
              <p>OI-Change:</p>
              <p>{item.CurrentOIChange}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Change In LTP:</p>
              <p>{item.LastTradePriceChange}</p>
            </div>

            <div className={innerCardStyles}>
              <p>Change In OI: </p>
              <p>{item.TodaysChangeInOI}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Volume: </p>
              <p>{item.Volume}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Total OI: </p>
              <p>{item.TotalOI}</p>
            </div>
            <div className="col-span-2 text-center">
              <BuildUpBadge text={item.BuildUps.trim()} />
            </div>
            <div className="col-span-2 flex  items-center justify-center text-center  text-sm">
              <p>LTP: </p>
              <p>{item.LastTradePrice}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FoiTableRealtimeMobile({ rows }: { rows: TFoiRow[] }) {
  return (
    <div>
      {rows.map((item, index) => {
        return (
          <div
            key={index}
            className="mt-2 grid grid-cols-2 gap-3 rounded-md border p-3 text-[10px] font-medium dark:border-zinc-600 sm:hidden "
          >
            <div className="flex items-center justify-between gap-2 border px-3 py-1.5 dark:border-zinc-600">
              <p>Time: </p>
              <p className="text-end">{item[0]}</p>
            </div>

            <div className={innerCardStyles}>
              <p>OI-Change:</p>
              <p>{item[4]}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Change In LTP:</p>
              <p>{item[3]}</p>
            </div>

            <div className={innerCardStyles}>
              <p>Change In OI: </p>
              <p>{item[5]}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Volume: </p>
              <p>{item[7]}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Total OI: </p>
              <p>{item[6]}</p>
            </div>
            <div className="col-span-2 text-center">
              <BuildUpBadge text={item[1]} />
            </div>
            <div className="col-span-2 flex  items-center justify-center text-center  text-sm">
              <p>LTP: </p>
              <p>{item[2]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
