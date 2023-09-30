"use client";
import { dashboardNav } from "@/config/dashboardNav";
import { ArrowRightSquare } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/auth";
import useSidebarStore from "@/store/sidebar";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Logo } from "../ui/logo";
import { Switch } from "../ui/switch";

const menuStyles: string = "dark:bg-zinc-950 dark:border-zinc-600";

export default function Topbar() {
  return (
    <header className="border-b bg-white px-5 py-3 dark:border-zinc-600 dark:bg-zinc-900">
      <div className="m-auto flex max-w-[1600px] items-center justify-between">
        <div className="flex items-center">
          <div className="md:hidden">
            <MobileNav />
          </div>
          <Link href="/dashboard">
            <Logo showText={false} />
          </Link>
        </div>
        <div className="hidden gap-x-8 md:flex">
          {dashboardNav.map((section, index) => {
            return (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="flex items-center justify-center gap-2 text-sm">
                  {section.heading}
                </DropdownMenuTrigger>
                <DropdownMenuContent className={menuStyles}>
                  {section.links.map((item, subIndex) => (
                    <div
                      key={subIndex}
                      className="min-w-max max-w-md p-4 px-6 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      <Link href={item.href}>
                        <p className="text-semibold text-[15px]">{item.name}</p>
                        {/* <p className="mt-1 text-[13px] text-gray-500 dark:text-white/60">
                            {item.desc}
                          </p> */}
                      </Link>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </div>

        <DashboardDropdown />
      </div>
    </header>
  );
}

export function DashboardDropdown() {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const { toggleSidebar, isSidebarOpen } = useSidebarStore();
  const pathname = usePathname();

  const logOut = useAuthStore((state) => state.logOut);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className=" cursor-pointer ">
          <AvatarImage src="/assets/avatar.jpg" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 min-h-[100vh] w-full min-w-[100vw] py-2 sm:h-auto sm:min-h-max sm:w-72 sm:min-w-max">
        <DropdownMenuGroup>
          <div className="flex justify-end pr-5 ">
            <DropdownMenuItem className="max-w-max sm:hidden">
              <Icons.close />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="sm:hidden" />
          </div>

          {/* <Link href="/login" className="hover:cursor-pointer">
            <DropdownMenuItem className="rounded-md py-4 text-blue-500 ">
              <UserCircle2 className="mr-2 h-5 w-5" />
              <span>Sign in</span>
            </DropdownMenuItem>
          </Link> 
          <DropdownMenuSeparator />

          */}
          {/* <Link href="/support" className="hover:cursor-pointer">
            <DropdownMenuItem className="rounded-md py-4">
              <LifeBuoy className="mr-2 h-5 w-5" />
              <span>Support</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator /> */}

          <DropdownMenuItem
            className="rounded-md py-4 hover:cursor-pointer"
            onClick={() => logOut()}
          >
            <ArrowRightSquare className="mr-2 h-5 w-5" />
            <span className="text-red-500">Log Out</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <div className="flex items-center justify-between gap-4 rounded-md px-2 py-4 pr-4 text-sm hover:bg-zinc-100 dark:bg-transparent dark:hover:bg-zinc-800">
            <span className="inline-block pl-1"> Dark color theme </span>
            <Switch
              checked={theme === "dark" ? true : false}
              onClick={handleTheme}
              className="mr-2"
            />
          </div>
          <DropdownMenuSeparator
            className={`${pathname === "/dashboard" ? "" : "hidden"}`}
          />
          <div
            style={{ display: pathname === "/dashboard" ? "flex" : "none" }}
            className="flex items-center justify-between gap-4 rounded-md px-2 py-4 pr-4 text-sm hover:bg-zinc-100 dark:bg-transparent dark:hover:bg-zinc-800"
          >
            <span className="inline-block pl-1">
              {isSidebarOpen ? "Hide" : "Show"} Sidebar{" "}
            </span>
            <Switch
              checked={isSidebarOpen === true ? true : false}
              onClick={toggleSidebar}
              className="mr-2 "
            />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
