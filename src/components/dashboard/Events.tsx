import { format } from "date-fns";

type Event = {
  title: string;
  created: string;
  link: string;
  published: string;
};

type EventsProps = {
  events: Event[];
  title: string;
};

function Events({ events, title }: EventsProps) {
  return (
    <div>
      <p className=" rounded-t-lg border  border-blue-600 bg-blue-600 px-3 py-3  capitalize text-white">
        {title}
      </p>
      <ScrollArea className="h-72  w-full rounded-b-lg border bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-900  ">
        <div className=" overflow-y-auto">
          <div className="grid gap-3 gap-y-4 px-2 py-4 sm:grid-cols-2">
            {events.map((event, index) => (
              <Link
                href={event.link}
                key={index}
                className="rounded-md bg-zinc-100 p-3 text-sm font-medium duration-300 ease-linear dark:bg-zinc-800 dark:hover:bg-zinc-800/50"
                target="_blank"
              >
                <p className=" capitalize text-zinc-500 dark:text-zinc-400">
                  {event.title.length >= 7
                    ? event.title.split(" ").splice(0, 7).join(" ") + ".."
                    : event.title}
                </p>
                <p className="mt-1 font-semibold">
                  {format(new Date(event.created), "EEE, d MMM")},{" "}
                  {format(new Date(parseInt(event.published) * 1000), "h:mm a")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Events;

import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

export function EventDummy() {
  return (
    <div>
      <p className=" rounded-t-lg border  border-blue-600 bg-blue-600 px-3 py-3  capitalize text-white">
        Loading.....
      </p>
      <ScrollArea className="h-72  w-full rounded-b-lg border shadow-sm  dark:border-zinc-600  ">
        <div className=" overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 gap-y-4 px-2 py-4">
            <div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
            </div>
            <div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
            </div>
            <div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
            </div>
            <div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
            </div>
            <div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
            </div>
            <div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="mt-1 h-6 w-full max-w-[180px] " />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
