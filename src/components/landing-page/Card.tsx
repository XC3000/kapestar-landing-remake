import { MapPin } from "lucide-react";
import Image from "next/image";

interface CardProps {
  src: string;
  heading: string;
  role: string;
  location: string;
}
function Card({ src, heading, role, location }: CardProps) {
  return (
    <div
      style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
      className="dark:bg-zinc-950rounded-lg overflow-hidden rounded-xl border-2 bg-white  capitalize dark:border-zinc-600"
    >
      <Image
        src={`${src}`}
        width={400}
        height={300}
        className="max-h-52 w-full rounded-xl object-cover shadow sm:max-h-full"
        alt="simplicity image"
      />
      <div className="my-3 px-4">
        <h3 className="font-semibold">{heading}</h3>
        <p className="m-auto  text-[13px] capitalize text-zinc-600 dark:text-zinc-400">
          ({role})
        </p>
        <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold uppercase">
          <MapPin className="mb-0.5 h-4 w-4 " /> {location}
        </p>
      </div>
    </div>
  );
}

export default Card;
