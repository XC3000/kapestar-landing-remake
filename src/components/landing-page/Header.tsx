"use client";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@wojtekmaj/react-hooks";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import { Icons } from "../icons";
import { ThemeToggle } from "../layouts/theme-toggle";
import { buttonVariants } from "../ui/button";
import { Logo } from "../ui/logo";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

function Header() {
  const scrollTop = useScrollTop();
  const { theme } = useTheme();
  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <header
      className={`${
        scrollTop && scrollTop > 80
          ? "fixed bg-white dark:bg-zinc-900"
          : "absolute text-white"
      } top-0 z-20 w-full border-b text-black duration-300 dark:text-white`}
    >
      <div className="container flex  items-center justify-between  p-3 lg:items-end">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-y-1"
        >
          <Logo showText={false} />
          <p className="font-extrabold">TRADE DONS</p>
        </Link>
        <div className="hidden items-end gap-6 lg:flex">
          <Link className="text-blue-600" href="/">
            <span className="flex gap-3 text-red-600">
              Live <Icons.radio className="animate-pulse" />
            </span>
            Market Data
          </Link>
          <Link href="/">Education</Link>
          <Link href="/">Support</Link>
          <Link href="/">Pricing</Link>
        </div>

        <div className="hidden items-center gap-4  lg:flex">
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
                className: "px-8 py-3 text-sm",
              })
            )}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  "bg-transparent px-8 py-3 dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-black",
              })
            )}
            href="/register"
          >
            Register
          </Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
        <div className="relative z-10 flex items-center  dark:text-white lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Icons.menu />
            </SheetTrigger>
            <SheetContent className="flex min-h-screen items-center justify-center  text-center">
              <div className="flex flex-col gap-6 ">
                <Link href="/">Market Data</Link>
                <Link href="/">Education</Link>
                <Link href="/">Support</Link>
                <Link href="/">Pricing</Link>

                <Link
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      className: "px-8 py-3 text-sm",
                    })
                  )}
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "bg-transparent px-8 py-3 dark:text-white",
                    })
                  )}
                  href="/register"
                >
                  Register
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
