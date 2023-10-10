import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardProps {
  src: string;
  heading: string;
  desc: string;
  imgSide?: "left" | "right";
}
export default function AdvantageCard({
  src,
  heading,
  desc,
  imgSide,
}: CardProps) {
  return (
    <div
      className={cn(
        " flex  items-center overflow-hidden capitalize ",
        { "flex-row text-end": imgSide === "left" },
        { "flex-row-reverse text-start": imgSide === "right" }
      )}
    >
      <div className="my-3 px-4">
        <h3 className="font-semibold">{heading}</h3>
        <p className="m-auto max-w-xs  text-[13px] capitalize text-zinc-600 dark:text-zinc-400">
          {desc}
        </p>
      </div>
      <div>
        <Image
          src={`${src}`}
          width={48}
          height={48}
          className="rounded-full"
          alt="img"
        />
      </div>
    </div>
  );
}
