"use client";
import {
  FoiExpiry,
  FoiInstrumentData,
  FoiRefreshRateData,
  FoiTimeInterval,
} from "@/data/foi";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import useAuthStore from "@/store/auth";
import { useWindowWidth } from "@wojtekmaj/react-hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import DataTable from "./OiDataTable";
import OiMobileCard from "./OiMobileCard";

function Oi() {
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());
  const [mobile, setMobile] = useState(false);
  const windowWidth = useWindowWidth();
  const isLoggedIn = useGetFromStore(useAuthStore, (state) => state.isLoggedIn);

  if (isLoggedIn === false) {
    redirect("/login");
  }
  useEffect(() => {
    if (windowWidth && windowWidth < 640) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowWidth]);

  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="mt-3 flex justify-end">
        <div className="flex gap-4">
          <div className="flex items-center gap-3 text-sm dark:text-neutral-400">
            <span>Live Data</span>
            <Switch />
            <span>Historical Data</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="w-full">
          <p className="mb-1 pl-1 text-xs">Name:</p>

          <Select>
            <SelectTrigger className="w-full shadow">
              <SelectValue placeholder="Nifty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {FoiInstrumentData.map((item, index) => {
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

        <div className="w-full">
          <p className="mb-1 pl-1 text-xs">Expiry:</p>
          <Select>
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

        <div className="w-full ">
          <p className="mb-1 pl-1 text-xs">Date:</p>
          <Select>
            <SelectTrigger className="w-full shadow">
              <SelectValue placeholder="DATE (TO)" />
            </SelectTrigger>
            <SelectContent className="border-none bg-transparent dark:bg-transparent">
              <Calendar
                fromMonth={dateTo}
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                className="rounded-md border dark:border-zinc-600 dark:bg-zinc-900"
              />
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <p className="mb-1 pl-1 text-xs">Strike Price:</p>

          <Select>
            <SelectTrigger className="w-full shadow">
              <SelectValue placeholder="Strike Price" />
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
        <div className="w-full">
          <p className="mb-1 pl-1 text-xs">Strike Price:</p>

          <Select>
            <SelectTrigger className="w-full shadow">
              <SelectValue placeholder="Strike Price" />
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

        <div className="w-full">
          <p className="mb-1 pl-1 text-xs">Refresh Rate:</p>

          <Select>
            <SelectTrigger className="w-full shadow">
              <SelectValue placeholder="5M" />
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

      {/* {mobile ? (
        <motion.div
          initial={{ y: 10, opacity: 0, height: collapsed ? 120 : 0 }}
          animate={{ y: 0, opacity: 1, height: collapsed ? 0 : 120 }}
          exit={{ y: -100, opacity: 0 }}
          className="h-[130px] overflow-hidden "
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
      )} */}

      {/* ONLY FOR MOBILES */}
      <div className="mt-2 flex items-center justify-between sm:hidden">
        <Button
          onClick={handleCollapse}
          className="w-full max-w-max justify-start self-end rounded-none border-none py-0 text-xs text-blue-600 dark:bg-zinc-900"
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

            <Select>
              <SelectTrigger className="w-full border-x-0 border-b border-t-0 py-0 ring-0">
                <SelectValue placeholder="5M" />
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

      {/* {!mobile && <OiTable />} */}
      {!mobile && <DataTable />}

      {mobile && <OiMobileCard />}
    </div>
  );
}

export default Oi;
