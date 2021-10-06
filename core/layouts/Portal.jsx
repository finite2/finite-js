import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children, target, order, zIndex }) => {
  const mount = useRef(null);
  const [element, setElement] = useState();

  useEffect(() => {
    let newElement = document.createElement("div");
    mount.current = document.getElementById(target);
    if (mount.current) {
      mount.current.appendChild(newElement);
    }
    setElement(newElement);
    return () => mount.current.removeChild(newElement);
  }, [target]);

  if (element) {
    element.style.order = order;
    element.style.zIndex = zIndex ?? 3;
  }

  if (!element) {
    return null;
  }
  return createPortal(children, element);
};

Portal.defaultProps = {
  target: "codi-portal",
  order: null,
  zIndex: null
};
