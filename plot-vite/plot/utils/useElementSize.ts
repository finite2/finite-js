import { useRef, useLayoutEffect, useState, RefObject } from "react";

class ElementSize {
  width: number;
  height: number;

  innerWidth: number;
  innerHeight: number;

  padding: number;

  constructor(width: number, height: number, padding = 0) {
    this.width = width;
    this.height = height;

    this.innerWidth = width - 2 * padding;
    this.innerHeight = height - 2 * padding;

    this.padding = padding;
  }
}

export const useElementSize = <T extends Element>(
  init = { width: 0, height: 0 }
): [RefObject<T>, ElementSize] => {
  const elementRef = useRef<T>(null);
  const [elementSize, setState] = useState(new ElementSize(init.width, init.height));

  useLayoutEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;

      const updateSize = () => {
        const style = window.getComputedStyle(element, null);
        const padding = parseFloat(style.getPropertyValue("padding"));

        const w = parseFloat(style.getPropertyValue("width"));
        const h = parseFloat(style.getPropertyValue("height"));

        setState(new ElementSize(w, h, padding));
      };
      const observer = new ResizeObserver(updateSize);
      observer.observe(element);
      updateSize();
      return () => observer.unobserve(element);
    }
  }, [setState]);

  return [elementRef, elementSize];
};
