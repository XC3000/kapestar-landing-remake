"use client";

import { montserrat } from "@/app/layout";
import { useGetFromStore } from "@/hooks/useGetFromStore";
import useAuthStore from "@/store/auth";
import { redirect } from "next/navigation";
import Topbar from "../shared/Topbar";

const ComingSoon = () => {
  const isLoggedIn = useGetFromStore(useAuthStore, (state) => state.isLoggedIn);

  if (isLoggedIn === false) {
    redirect("/login");
  }

  return (
    <div>
      <div className="relative z-20">
        <Topbar />
      </div>
      <div
        style={{
          backgroundImage: `url("/assets/waitlist/spiral2.png")`,
          height: `calc(100vh - ${70}px)`,
        }}
        className="flex  items-center justify-between bg-cover  bg-center px-4 py-24 dark:bg-zinc-900"
      >
        <div className="absolute left-0 right-0 top-0 mx-auto flex w-full max-w-[1400px] items-center justify-between  p-3"></div>
        <div className="relative z-10 m-auto max-w-[976px] rounded-lg border  p-[20px] text-center  text-[14px] text-zinc-500 backdrop-blur-xl dark:border-zinc-600 dark:text-zinc-50 sm:text-[20px] md:px-[70px] md:py-[50px] lg:text-[24px]">
          <h1
            className={`${montserrat.className} text-[36px] font-bold text-blue-600 sm:text-[60px] lg:text-[90px]`}
          >
            Coming Soon
          </h1>
          <p className="mt-6">This feature will be released soon.</p>
          <p>You will be notified on your registered email Id.</p>

          <p className="my-8">Stay in touch.</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
