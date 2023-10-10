import Image from "next/image";

interface CardProps {
  src: string;
  heading: string;
  desc: string;
}
export default function InfoCard({ src, heading, desc }: CardProps) {
  return (
    <div className="overflow-hidden bg-white capitalize dark:bg-zinc-950">
      <Image
        src={`${src}`}
        width={300}
        height={300}
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className="max-h-52 w-full  rounded-2xl object-cover sm:max-h-full"
        alt="simplicity image"
      />
      <div className="-mt-1 rounded-xl rounded-t-none border-2 border-t-transparent px-4 py-4 pt-6 dark:border-zinc-600">
        <h3 className="font-semibold">{heading}</h3>
        <p className="m-auto mt-1 text-[13px] capitalize text-zinc-600 dark:text-zinc-400">
          {desc}
        </p>
      </div>
    </div>
  );
}
