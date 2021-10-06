import { useState } from "react";

export const useArray = init => {
  const [arr, setArr] = useState(init);

  const insertArr = (items, position = -1) => {
    setArr(a => {
      if (position === -1) {
        return [...a, ...items];
      }
      return [...a.slice(0, position), ...items, ...a.slice(position)];
    });
  };

  const updateItem = (item, position) => {
    setArr(cur => {
      let a = [...cur];
      if (typeof item === "object") {
        a[position] = { ...a[position], ...item };
      } else {
        a[position] = item;
      }
      return a;
    });
  };

  const removeItem = position => {
    setArr(cur => {
      let a = [...cur];
      a.splice(position, 1);
      return a;
    });
  };

  return [arr, setArr, insertArr, updateItem, removeItem];
};
