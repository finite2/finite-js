import { useRef, useEffect, useState } from "react";

export const useInputDelay = (value, callback, delay = 1000) => {
  const [currentValue, setCurrentValue] = useState(0);

  const timeoutRef = useRef();

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
      return clear;
    }
  }, [value]);

  const onChange = e => {
    setCurrentValue(e.target.value);
    const tempValue = e.target.value;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(tempValue), delay);
  };

  const clear = () => clearTimeout(timeoutRef.current);

  return [currentValue, onChange, setCurrentValue, clear];
};
