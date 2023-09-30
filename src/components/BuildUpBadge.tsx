"use client";

const buttonColors = {
  "short-covering": "bg-blue-500 dark:bg-blue-600",
  "long-build-up": "bg-green-500 dark:bg-green-500",
  "short-build-up": "bg-red-500 dark:bg-red-600",
  "long-unwinding": "bg-yellow-500 dark:bg-yellow-500",
};

function BuildUpBadge({ text }: { text: string }) {
  return (
    <p
      className={`${
        (buttonColors as Record<string, string>)[
          text === "Long Unwinding"
            ? "long-unwinding"
            : text === "Short Covering"
            ? "short-covering"
            : text === "Short Build Up"
            ? "short-build-up"
            : text === "Long Build Up"
            ? "long-build-up"
            : ""
        ]
      }  flex h-full items-center justify-center px-3 py-2 text-[12px] font-medium text-white sm:min-w-max sm:text-[12px]`}
    >
      {/* {windowWidth && windowWidth <= 600 ? convertToInitals(text) : text} */}
      {text}
    </p>
  );
}

export default BuildUpBadge;
