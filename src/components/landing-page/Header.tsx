"use client";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@wojtekmaj/react-hooks";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
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
        scrollTop && scrollTop > 80 && "fixed left-0 right-0"
      } top-0 z-20  w-full  bg-zinc-50 px-3 text-black duration-300`}
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between p-3 lg:items-end">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 gap-y-1"
          >
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="Kapestar logo"
              className="dark:invert"
            />
            <p className=" font-bold">KAPESTAR</p>
          </Link>
          <div className="hidden items-end gap-6 text-sm lg:flex">
            <Link href="/">Why Kapestar</Link>
            <Link href="/">Oboarding</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>

        <div className="hidden items-center gap-4  lg:flex">
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
            Signup
          </Link>
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
        </div>
        <div className="relative z-10 flex items-center  dark:text-white lg:hidden">
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Icons.menu />
            </SheetTrigger>
            <SheetContent className="flex min-h-screen items-center justify-center  text-center">
              <div className="flex flex-col gap-6 ">
                <Link href="/">Why Kapestar</Link>
                <Link href="/">Oboarding</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Contact</Link>

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
                  Signup
                </Link>
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
