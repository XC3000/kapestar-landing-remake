import {
  TFoiRow,
  TFutureOpenInterestHistoricRow,
} from "@/api/futures/open-interest";

const commanStyles =
  "flex justify-between items-center p-2 dark:border-zinc-600";
export function SpotPriceMobileHistoric({
  row,
  dayHigh,
  dayLow,
}: {
  row: TFutureOpenInterestHistoricRow;
  dayHigh: number;
  dayLow: number;
}) {
  return (
    <div className="mt-4 grid grid-cols-3 border bg-white p-3 py-2 text-[10px] font-medium  dark:border-zinc-600 dark:bg-zinc-900">
      <div className={`${commanStyles} border-b`}>
        <span>Spot Price</span>
        <span>{"-"}</span>
      </div>
      <div className={`${commanStyles} border-x border-b `}>
        <span>Day High</span>
        <span>{dayHigh}</span>
      </div>
      <div className={`${commanStyles} border-b`}>
        <span>Day Open</span>
        <span>{"-"}</span>
      </div>
      <div className={`${commanStyles} border-t`}>
        <span>Open</span>
        <span>{"-"}</span>
      </div>
      <div className={`${commanStyles} border-x border-t`}>
        <span>Day Low</span>
        <span>{dayLow}</span>
      </div>
      <div className={`${commanStyles} border-t  `}>
        <span>Day Close</span>
        <span>{"-"}</span>
      </div>
    </div>
  );
}

export function SpotPriceMobileRealTime({
  row,
  dayHigh,
  dayLow,
}: {
  row: TFoiRow | [];
  dayHigh: number;
  dayLow: number;
}) {
  return (
    <div className="mt-4 grid grid-cols-3 border p-3 py-2 text-[10px]  font-medium dark:border-zinc-600">
      <div className={`${commanStyles} border-b`}>
        <span>Spot Price</span>
        <span>{"-"}</span>
      </div>
      <div className={`${commanStyles} border-x border-b `}>
        <span>Day High</span>
        <span>{dayHigh}</span>
      </div>
      <div className={`${commanStyles} border-b`}>
        <span>Day Open</span>
        <span>{"-"}</span>
      </div>
      <div className={`${commanStyles} border-t`}>
        <span>Open</span>
        <span>{"-"}</span>
      </div>
      <div className={`${commanStyles} border-x border-t`}>
        <span>Day Low</span>
        <span>{dayLow}</span>
      </div>
      <div className={`${commanStyles} border-t p-3 `}>
        <span>Day Close</span>
        <span>{"-"}</span>
      </div>
    </div>
  );
}
