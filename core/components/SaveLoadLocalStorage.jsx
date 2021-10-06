import React, { useState, useEffect } from "react";

import { Button } from "./Button";
import { Input } from "./Input";

export const SaveLoadLocalStorage = ({ payload, initValue, onLoad }) => {
  const [value, setValue] = useState();
  useEffect(() => {}, []);

  const reqestSave = () => {
    localStorage.setItem(value, JSON.stringify(payload));
  };

  const requestLoad = () => {
    const item = JSON.parse(localStorage.getItem(value));
    onLoad(item);
  };

  return (
    <div
      style={{
        width: 300,
        margin: 5,
        padding: 10,
        border: "1px solid black",
        borderRadius: 10
      }}
    >
      <div style={{ marginBottom: 5 }}>Load/Save from local state</div>
      <Input
        flavor="white"
        onChange={e => setValue(e.target.value)}
        style={{ marginBottom: 5 }}
        placeholder="save name"
        value={value}
      />
      <Button onClick={reqestSave} style={{ width: 120, float: "left" }}>
        Save
      </Button>
      <Button onClick={requestLoad} style={{ width: 120, float: "right" }}>
        Load
      </Button>
      <div style={{ clear: "both" }} />
    </div>
  );
};
