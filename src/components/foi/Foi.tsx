"use client";
import {
  TFuturesOpenInterst,
  getIndexAndExpiryDetails,
} from "@/api/futures/open-interest";
import { FoiExpiry, FoiRefreshRateData, FoiTimeInterval } from "@/data/foi";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import useAuthStore from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FoiSwitch from "./FoiSwitch";
import { FoiTableWrapper } from "./FoiTable";

// const topicName = "FUTIDX_FINNIFTY_26SEP2023_XX_0_5Min";

function Foi() {
  const { isLoading, data: indexList } = useQuery({
    queryKey: ["instruments-list"],
    queryFn: () => getIndexAndExpiryDetails(),
  });

  if (isLoading) return <p>loading...</p>;

  if (indexList) return <FoiWrapper indexList={indexList} />;
}

export default Foi;

function FoiWrapper({ indexList }: { indexList: TFuturesOpenInterst }) {
  const [timeInterval, setTimeInterval] = useState(FoiTimeInterval[1].value);
  const [refreshRate, setRefreshRate] = useState(FoiRefreshRateData[0].value);
  const [instrument, setInstrument] = useState(indexList[0].ProductName);
  const [expiry, setExpiry] = useState<string>(FoiExpiry[0].value);
  const [selectedInstrument, setSelectedInstrument] = useState(indexList[0]);
  const [topicName, setTopicName] = useState(
    `FUTSTK_${indexList[0].ProductName}_${indexList[0].CurrentMonth}_XX_0_5Min`
  );

  const isLoggedIn = useGetFromStore(useAuthStore, (state) => state.isLoggedIn);

  const userId = useGetFromStore(useAuthStore, (state) => state.user.id);

  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleTopicNameChange = (
    productName: string,
    instrumentExpiry: string,
    instrumentInterval: string
  ) => {
    // return `FUTSTK_${indexList[0].ProductName}_${indexList[0].CurrentMonth}`;

    const isIndex = ["BANKNIFTY", "FINNIFTY", "MIDCPNIFTY", "NIFTY"].find(
      (idx) => idx === productName
    );

    setTopicName(
      `${
        !!isIndex ? "FUTIDX" : "FUTSTK"
      }_${productName}_${instrumentExpiry}_XX_0_${instrumentInterval}`
    );
  };

  if (userId === undefined) return <></>;

  if (isLoggedIn === false) {
    redirect("/login");
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex justify-end pt-3">
          <div className="flex gap-4">
            <FoiSwitch />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 min-[1064px]:grid-cols-5">
          <div className="w-full">
            <p className="mb-1 pl-1 text-xs">Name:</p>

            <Select
              value={instrument}
              onValueChange={(e) => {
                const found = indexList.find((i) => i.ProductName === e);
                if (!found) throw new Error("Not found in the list");

                handleTopicNameChange(e, found.CurrentMonth, timeInterval);

                setSelectedInstrument(found);
                setInstrument(e);
                setExpiry("CurrentMonth");
              }}
            >
              <SelectTrigger className="w-full shadow">
                <SelectValue placeholder="Nifty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="h-[400px] overflow-y-scroll">
                  {indexList.map((item, index) => {
                    return (
                      <SelectItem key={index} value={`${item.ProductName}`}>
                        {item.ProductName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <p className="mb-1 pl-1 text-xs">Expiry:</p>
            <Select
              value={expiry}
              onValueChange={(e: keyof (typeof indexList)[0]) => {
                handleTopicNameChange(
                  instrument,
                  selectedInstrument[e],
                  timeInterval
                );
                setExpiry(e);
              }}
            >
              <SelectTrigger className="w-full shadow">
                <SelectValue placeholder="Expiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FoiExpiry.map((item, index) => {
                    return (
                      <SelectItem key={index} value={`${item.value}`}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/*  <div className="w-full">
            <p className="mb-1 pl-1 text-xs">Date:</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={!historical}
                  variant="outline"
                  className={cn(
                    "flex h-auto w-full justify-between  rounded-none border px-3 py-2.5 text-[10px] font-normal shadow dark:border-zinc-600 dark:bg-zinc-900  sm:text-xs",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Date (To)</span>}
                  <CalendarDaysIcon className="ml-2 h-4 w-4 text-zinc-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
 */}
          <div className="w-full">
            <p className="mb-1 pl-1 text-xs">Time Interval:</p>

            <Select
              value={timeInterval}
              onValueChange={(e) => {
                setTimeInterval(e);
                handleTopicNameChange(
                  instrument,
                  selectedInstrument[
                    expiry as
                      | "ProductName"
                      | "CurrentMonth"
                      | "NextMonth"
                      | "FarMonth"
                  ],
                  e
                );
              }}
            >
              <SelectTrigger className="w-full shadow">
                <SelectValue placeholder="Interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FoiTimeInterval.map((item, index) => {
                    return (
                      <SelectItem key={index} value={`${item.value}`}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* ONLY FOR TABLET AND DESKTOP SCREENS */}

          <div className="col-span-2 hidden w-full grid-cols-2 gap-4 sm:grid min-[1064px]:col-span-1 ">
            <div className="w-full">
              <p className="mb-1 pl-1 text-xs">Refresh Rate:</p>

              <Select
                value={refreshRate}
                onValueChange={(e) => setRefreshRate(e)}
              >
                <SelectTrigger className="w-full shadow">
                  <SelectValue placeholder="Refresh Rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FoiRefreshRateData.map((item, index) => {
                      return (
                        <SelectItem key={index} value={`${item.value}`}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* <Button
              variant="outline"
              className="justify-start gap-2 self-end rounded-none text-xs shadow-sm dark:bg-zinc-900"
              onClick={handleCollapse}
            >
              {collapsed ? "Expand" : "Collapse"}
              {collapsed ? (
                <Icons.chevronDown className="ml-2 h-4 w-4" />
              ) : (
                <Icons.chevronUp className="h-4 w-4" />
              )}
            </Button> */}
          </div>
        </div>

        {/*  {mobile ? (
          <motion.div
            initial={{ y: 10, opacity: 0, height: collapsed ? 110 : 0 }}
            animate={{ y: 0, opacity: 1, height: collapsed ? 0 : 110 }}
            exit={{ y: -100, opacity: 0 }}
            className="overflow-hidden "
          >
            <SpotPriceMobile />
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 10, opacity: 0, height: collapsed ? 145 : 0 }}
            animate={{ y: 0, opacity: 1, height: collapsed ? 0 : 145 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="h-[145px] overflow-hidden "
          >
            <SpotPriceBox />
          </motion.div>
        )}
        */}
        {/* ONLY FOR MOBILES */}
        <div className="mt-2 flex items-center justify-between sm:hidden">
          <Button
            onClick={handleCollapse}
            className="w-full max-w-max justify-start self-end rounded-none border-none bg-zinc-50 py-0 text-xs text-blue-600 dark:bg-zinc-900"
            variant="outline"
          >
            {collapsed ? (
              <>
                Expand
                <Icons.chevronDown className="ml-2 dark:text-white" />
              </>
            ) : (
              <>
                Collapse
                <Icons.chevronUp className="ml-2 dark:text-white" />
              </>
            )}
          </Button>
          <div className="max-w-max">
            <div className="flex items-center gap-3">
              <p className="mb-1 min-w-max pl-1 text-xs">Refersh Rate:</p>

              <Select
                value={refreshRate}
                onValueChange={(e) => setRefreshRate(e)}
              >
                <SelectTrigger className="w-full border-x-0 border-b border-t-0 px-1 py-0 ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FoiRefreshRateData.map((item, index) => {
                      return (
                        <SelectItem key={index} value={`${item.value}`}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-3">
          {/*  {mobile ? (
            <FoiMobileCard />
          ) : (
            <FoiTableWrapper topicName={topicName} />
          )} */}

          <FoiTableWrapper topicName={topicName} />
        </div>
      </div>
    </div>
  );
}
