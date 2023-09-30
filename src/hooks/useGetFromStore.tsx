import { useEffect, useState } from "react";

export function useGetFromStore<T, F>(
  store: (_callback: (_state: T) => unknown) => unknown,
  storeCallback: (_state: T) => F
) {
  const result = store(storeCallback) as F;
  const [state, setstate] = useState<F>();

  useEffect(() => {
    setstate(result);
  }, [result]);

  return state;
}
