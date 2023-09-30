import Image from "next/image";
import Link from "next/link";

function QuickAcess() {
  return (
    <div className="mb-4">
      <p className="mb-2">Quick Access</p>
      <div className="grid grid-cols-2 gap-3 font-medium text-white">
        <Link
          href="/futures/open-interest"
          className="flex items-center gap-2 rounded-md bg-blue-600 p-2"
        >
          <span className="rounded-md bg-white px-3 py-2">
            <Image
              src="/assets/dashboard/future.svg"
              width={24}
              height={24}
              alt="svg"
            />
          </span>
          <p>
            Future <br /> O-I
          </p>
        </Link>
        <Link
          href="/coming-soon"
          className="flex items-center gap-2 rounded-md bg-blue-600 p-2"
        >
          <span className="rounded-md bg-white py-1">
            <Image
              src="/assets/dashboard/option.svg"
              width={48}
              height={36}
              alt="svg"
            />
          </span>
          <p>
            Option <br /> O-I
          </p>
        </Link>
        <Link
          href="/coming-soon"
          className="flex items-center gap-2 rounded-md bg-blue-600 p-2"
        >
          <span className="rounded-md bg-white py-2">
            <Image
              src="/assets/dashboard/trend-guide.svg"
              width={48}
              height={24}
              alt="svg"
            />
          </span>
          <p>
            Trend <br /> Guide
          </p>
        </Link>
        <Link
          href="/coming-soon"
          className="flex items-center gap-2 rounded-md bg-blue-600 p-2"
        >
          <span className="rounded-md bg-white px-1 py-2">
            <Image
              src="/assets/dashboard/option-chain.svg"
              width={38}
              height={24}
              alt="svg"
            />
          </span>
          <p>
            Option <br /> Chain
          </p>
        </Link>
      </div>
    </div>
  );
}

export default QuickAcess;
