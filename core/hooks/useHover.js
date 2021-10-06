import { useEffect, useRef, useState } from "react";

export const useHover = (bubble = false) => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  // see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event for bubbling differences
  const leaveMethod = bubble ? "mouseout" : "mouseleave";

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener(leaveMethod, handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener(leaveMethod, handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
};
