import { useCallback, useRef } from 'react';

export const useDebounce = <Params extends any[]>(
  func: (...args: Params) => any | void = () => {},
  delay = 0,
) => {
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  return useCallback(
    (...args: Params) => {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );
};
