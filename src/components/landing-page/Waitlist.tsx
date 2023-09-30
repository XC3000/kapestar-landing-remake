"use client";

import { montserrat } from "@/app/layout";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import useAuthStore from "@/store/auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "../layouts/theme-toggle";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";

const Waitlist = () => {
  const isLoggedIn = useGetFromStore(useAuthStore, (state) => state.isLoggedIn);
  const logOut = useAuthStore((state) => state.logOut);

  if (isLoggedIn === false) {
    redirect("/login");
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url("/assets/waitlist/spiral.png")` }}
        className="flex min-h-screen items-center justify-between bg-cover bg-center px-4 py-24 dark:bg-zinc-900"
      >
        <div className="absolute left-0 right-0 top-0 mx-auto  flex w-full max-w-[1400px] items-center justify-between  p-3">
          <div className="">
            <Logo showText />
          </div>
          <div className="flex  items-center justify-end">
            <ThemeToggle />
            <Button onClick={logOut} variant="destructive" size="sm">
              Log Out
            </Button>
          </div>
        </div>
        <div className="relative z-10 m-auto max-w-[976px] rounded-lg border  p-[20px] text-center  text-[14px] text-zinc-500 backdrop-blur-xl dark:border-zinc-600 dark:text-zinc-50 sm:text-[20px] md:px-[70px] md:py-[50px] lg:text-[24px]">
          <h1
            className={`${montserrat.className} text-[36px] font-bold text-blue-600 sm:text-[60px] lg:text-[90px]`}
          >
            Congratulations!
          </h1>
          <p className="mt-6">You have joined the wait list!!</p>
          <p>
            Now you are eligible for the access of beta version of TRADE DONS.
          </p>
          <p>we will notify you on your registered email ID.</p>

          <p className="my-8">Stay in touch.</p>
          <p>care@tradedons.com</p>
          <p>9152023888</p>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
