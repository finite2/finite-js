import { useState, useEffect } from "react";

export const useObject = (init, update = []) => {
  const [object, setObject] = useState({});

  const updateObject = (partialObject) => {
    if (typeof partialObject === "function") {
      setObject(partialObject);
    } else {
      setObject((o) => ({ ...o, ...partialObject }));
    }
  };

  useEffect(() => {
    setObject(init);
  }, update);

  return [object, setObject, updateObject];
};
