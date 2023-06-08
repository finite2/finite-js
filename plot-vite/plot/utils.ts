import { useRef, useLayoutEffect, useState, RefObject } from "react";

export const getId = (head = "", dash = true) =>
  head +
  (dash ? "-" : "") +
  [...Array(15)].map((i) => (~~(Math.random() * 36)).toString(36)).join("");

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

export function throttle(func, timeout = 300) {
  let timer;
  let lastTime = Date.now();
  return (...args) => {
    clearTimeout(timer);
    let timeDiff = timeout + lastTime - Date.now();
    if (timeDiff < 0) {
      func.apply(this, args);
      lastTime = Date.now();
      return;
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      lastTime = Date.now();
    }, timeDiff);
  };
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
