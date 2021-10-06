import { useRef, useEffect } from "react";

/**
 *
 * @param {func} callback async function to call
 * @param {int} delay in ms
 */
export const useAsyncInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (savedCallback.current) {
      if (typeof savedCallback.current !== "function") {
        console.error("useAsyncInterval callback is not a function");
        return;
      }

      const callback = savedCallback.current;

      let id;
      if (delay !== null) {
        async function tick() {
          await callback();
          id = setTimeout(tick, delay);
        }

        tick();
        return () => id && clearTimeout(id);
      } else {
        console.error("useAsyncInterval delay is required");
      }
    }
  }, [savedCallback, delay]);
};
