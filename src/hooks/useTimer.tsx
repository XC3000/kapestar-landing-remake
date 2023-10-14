import { useEffect, useRef, useState } from "react";

export type TimerReturnType = {
  count: number;
  isActive: boolean;
  reset: () => void;
};

export default function useTimer(totalCount: number): TimerReturnType {
  const [count, setCount] = useState<number>(totalCount);
  const [isActive, setIsActive] = useState<boolean>(true);

  const intervalRef = useRef<NodeJS.Timeout>();

  const decreaseCount = () => setCount((prev) => prev - 1);

  useEffect(() => {
    if (count === 0) {
      setIsActive(false);
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseCount, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [count]);

  const reset = () => {
    setCount(totalCount);
    setIsActive(true);
  };

  return { count, isActive, reset };
}
