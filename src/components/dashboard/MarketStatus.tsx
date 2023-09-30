import useMarketStatus from "@/hooks/useMarketStatus";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { Skeleton } from "../ui/skeleton";

function MarketStatus() {
  const [currentTime, setCurrentTime] = useState("");
  const marketStatus = useMarketStatus();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours < 12 ? "AM" : "PM";

      if (hours > 12) {
        hours = hours - 12;
      }

      let dbldigitHour = hours.toString().length === 1 ? "0" + hours : hours;
      let dbldigitMinute =
        minutes.toString().length === 1 ? "0" + minutes : minutes;
      let dbldigitSeconds =
        seconds.toString().length === 1 ? "0" + seconds : seconds;

      setCurrentTime(
        `${
          dbldigitHour +
          ":" +
          dbldigitMinute +
          ":" +
          dbldigitSeconds +
          " " +
          ampm
        }`
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      weekday: "short",
    };

    const dateString = date.toLocaleDateString(
      undefined,
      options as Intl.DateTimeFormatOptions
    );
    setCurrentDate(dateString);
  }, []);
  return (
    <div>
      <div className="mb-4 mt-10 rounded-lg border bg-white p-4 dark:border-zinc-600 dark:bg-zinc-800">
        <p className="text-xl">Hello!</p>
        <p className="font-semibold sm:text-2xl ">Gunjan Arora</p>
      </div>

      <div className="mb-4 rounded-lg bg-blue-600 p-4 text-white">
        <div className="mb-2 flex items-center gap-3 text-sm uppercase">
          <Clock className="text-whtie h-5 w-5 " />
          {currentTime === "" ? (
            <Skeleton className="h-4 w-24 opacity-50 dark:bg-gray-200" />
          ) : (
            <p className="mt-1">{currentTime}</p>
          )}
        </div>

        <div className="mb-3 flex items-center gap-3 text-sm uppercase">
          <Icons.calendar className="text-whtie h-5 w-5 " />
          {currentDate === "" ? (
            <Skeleton className="h-4 w-24 opacity-50 dark:bg-gray-200" />
          ) : (
            <p className="mt-1">{currentDate}</p>
          )}
        </div>

        <div>
          <p className="mb-1 text-xs">Market Status-</p>

          <p className="flex max-w-max items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-[14px] text-sm font-semibold capitalize text-black">
            <Image
              src="/assets/dashboard/marketstatus.svg"
              width={15}
              height={15}
              alt="marketstatus"
            />
            {marketStatus}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketStatus;
