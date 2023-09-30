import Image from "next/image";

interface CardProps {
  src: string;
  heading: string;
  desc: string;
  bg?: string;
}
function Card({ src, heading, desc, bg }: CardProps) {
  return (
    <div
      style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
      className={`${
        bg ? bg : "bg-white dark:bg-zinc-950"
      } rounded-lg  border p-4  py-6 text-center  capitalize dark:border-zinc-600`}
    >
      <Image
        src={`/assets/landing-page/${src}`}
        width={60}
        height={60}
        className="m-auto h-16 w-auto"
        alt="simplicity image"
      />
      <h3 className="mt-6 text-[22px] font-semibold">{heading}</h3>
      <p className="m-auto mt-3 max-w-xs text-[14px] text-zinc-600 dark:text-zinc-400">
        {desc}
      </p>
    </div>
  );
}

export default Card;
