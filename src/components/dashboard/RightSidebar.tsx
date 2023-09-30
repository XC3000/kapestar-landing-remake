"use client";
import useSidebarStore from "@/store/sidebar";
import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import Courses from "./Courses";
import MarketStatus from "./MarketStatus";
import QuickAcess from "./QuickAcess";

function RightSidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [sidebarClosedOnce, setSidebarClosedOnce] = useState(false); // Add this state

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (
      isSidebarOpen &&
      windowWidth &&
      windowWidth < 1280 &&
      !sidebarClosedOnce
    ) {
      toggleSidebar();
      setSidebarClosedOnce(true);
    }
  }, [isSidebarOpen, windowWidth, sidebarClosedOnce, toggleSidebar]);

  return (
    <div
      className={`sticky top-0 ${isSidebarOpen ? "lg:h-[980px]" : "hidden"}`}
    >
      <div className="hidden lg:block ">
        {isSidebarOpen && <SidebarComponent />}
      </div>
      <div className="lg:hidden">
        {isSidebarOpen && windowWidth && windowWidth < 1280 && (
          <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
            <SheetContent className="overflow-y-scroll">
              <SidebarComponent />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}

export default RightSidebar;

const SidebarComponent = () => {
  return (
    <div>
      <MarketStatus />
      <QuickAcess />
      <Courses />
    </div>
  );
};
