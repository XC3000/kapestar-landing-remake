import Image from "next/image";
interface StepPros {
  bg: string;
  img: string;
  text: string;
}
function Step({ bg, img, text }: StepPros) {
  return (
    <div className="m-auto w-full max-w-xs overflow-hidden rounded-xl border border-zinc-600 shadow-lg">
      <div className="relative py-4 dark:bg-zinc-950">
        <Image
          src={`/assets/landing-page/steps/${bg}`}
          width={120}
          height={120}
          className="absolute left-10 top-5"
          alt="bg"
        />
        <Image
          src={`/assets/landing-page/steps/${img}`}
          width={100}
          height={100}
          alt="steps"
          className="relative z-10 m-auto h-28"
        />
      </div>
      <p className="h-full bg-zinc-300 px-3 py-2 text-sm font-semibold dark:bg-zinc-800">
        {text}
      </p>
    </div>
  );
}

export default Step;
