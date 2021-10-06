import React, { useRef } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { getFlavor } from "../utils/getFlavor";

export const InputBase = styled.input`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  text-align: center;

  :focus {
    border-color: none;
    outline: 0;
  }
`;

export const Input = (props) => {
  const { style, options, flavor, ...rest } = props;
  const ref = useRef(null);

  return (
    <Button
      title={props.title}
      flavor={getFlavor(props)}
      onClick={() => ref.current.focus()}
      style={style}
    >
      <InputBase ref={ref} {...rest} />
    </Button>
  );
};
