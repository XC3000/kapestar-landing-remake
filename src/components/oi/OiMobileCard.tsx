import { OsTableData } from "@/data/os";
import BuildUpBadge from "../BuildUpBadge";

const innerCardStyles =
  "border px-3 py-2 dark:border-zinc-600 flex items-center justify-between gap-2";
function OiMobileCard() {
  return (
    <div>
      {OsTableData.map((item, index) => {
        return (
          <div
            key={index}
            className="mt-2 grid grid-cols-3 gap-3 rounded-md border p-3 text-[10px] font-medium dark:border-zinc-600 "
          >
            <div className="col-span-3 gap-2 px-3 pb-1.5 pt-1 text-center">
              <span className="ml-4 font-semibold">Time:</span>
              {item.time}
            </div>
            <div className={innerCardStyles}>
              <p>Total OI CALL:</p>
              <p>{item.totaloicall}</p>
            </div>
            <div className="flex items-center justify-center text-center">
              <p>
                LTP Call: <span>{item.ltpcall}</span>
              </p>
            </div>

            <div className={innerCardStyles}>
              <p>
                Change In LTP: <span>{item.changeinltpcall}</span>
              </p>
            </div>
            <div className={innerCardStyles}>
              <p>
                Today OI Change: <span>{item.todayoichangecall}</span>
              </p>
            </div>
            <div className="text-center">
              <BuildUpBadge text={item.buildupcall} />
            </div>
            <div className={innerCardStyles}>
              <p>
                OI Change: <span>{item.currentoichangecall}</span>
              </p>
            </div>
            <p className="col-span-3 bg-gray-400 py-2 text-center font-semibold text-black">
              Strike Price : {item.strikeprice}
            </p>

            <div className={innerCardStyles}>
              <p>Total Oi Put:</p>
              <p>{item.totaloiput}</p>
            </div>
            <div className="text-center">
              <BuildUpBadge text={item.buildupput} />
            </div>
            <div className={innerCardStyles}>
              <p>OI Change: </p>
              <p>{item.todayoichangeput}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Today OI Change: </p>
              <p>{item.currentoichangeput}</p>
            </div>
            <div className="flex items-center justify-center text-center">
              <p>LTP Put: </p>
              <p>{item.currentoichangeput}</p>
            </div>
            <div className={innerCardStyles}>
              <p>Change in LTP: </p>
              <p>{item.changeinltpput}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OiMobileCard;
