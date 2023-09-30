"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icons } from "../icons";

const ThemeSwitcher = ({ className }: { className: string }) => {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <>
      {hasMounted && theme === "dark" ? (
        <button onClick={handleTheme} className={cn("p-0", className)}>
          <Icons.sun />
        </button>
      ) : (
        <button onClick={handleTheme} className={cn("p-0", className)}>
          <Icons.moon />
        </button>
      )}
    </>
  );
};

export default ThemeSwitcher;
