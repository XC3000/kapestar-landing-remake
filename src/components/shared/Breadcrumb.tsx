"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const pathname = usePathname();
  return (
    <div className="inline-block min-w-max rounded-md bg-zinc-300 px-4 py-1.5 text-[13px] font-medium dark:bg-zinc-800">
      {items.map((item, index) => (
        <span key={item.link}>
          {index > 0 && (
            <span className="mx-1 mt-1 text-zinc-800 dark:text-zinc-400">
              &gt;
            </span>
          )}
          {pathname !== item.link ? (
            <Link href={item.link}>
              <span className="text-zinc-800 dark:text-zinc-400 ">
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="text-blue-500">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
