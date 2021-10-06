import { useState, useEffect } from "react";

const checkBool = (value) => {
  const isBool = typeof value === "boolean";
  if (!isBool) {
    console.warn("non boolean value passed to toggleState hook");
  }
  return isBool;
};

export const useToggle = (value = false, updateCounter = 0) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    if (value !== state && checkBool(value)) {
      setState(() => value);
    }
  }, [updateCounter, setState]);

  const toggleState = (value = null) => {
    if (value === null) {
      setState((s) => !s);
    } else if (checkBool(value)) {
      setState((s) => value);
    }
  };

  return [state, toggleState];
};
