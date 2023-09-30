import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const data = [
  {
    heading: "Academy",
    desc: "Shape your trading career with us & learn data-driven trading",
    href: "/coming-soon",
  },
  {
    heading: "Sprint Trade",
    desc: "Trade like a sprinter with speed & ease on our platform",
    href: "/coming-soon",
  },
  // {
  //   heading: "Foreign Markets",
  //   desc: "Now you can explore, US market & crypto.",
  //   href: "",
  // },
];

function Courses() {
  return (
    <div className="flex w-full flex-col gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex w-full flex-col rounded-lg border bg-white p-4 py-3 shadow-sm dark:border-zinc-600 dark:bg-zinc-800 md:w-auto md:flex-1"
        >
          <h2 className="text-xl font-bold ">{item.heading}</h2>
          <p className="mt-2 text-sm dark:text-zinc-400 ">{item.desc}</p>
          <Link
            href={item.href}
            className={cn(
              buttonVariants({
                variant: "default",
                className:
                  "mt-2 h-full  max-w-max cursor-pointer self-end text-[13px]",
              })
            )}
          >
            Explore Now
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Courses;
