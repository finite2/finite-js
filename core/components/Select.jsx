import { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button, flavorColors } from "./Button";

flavorColors;

const SelectBase = styled.select`
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
  text-align-last: center;
  width: 100%;
  max-width: 100%;
  text-align: center;

  :not([size]):not([multiple]) {
    height: calc(2.25rem + 2px);
  }
  border-radius: 100vh;
  &.arrowless {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
  option {
    background: red;
  }
`;

export const Select = (props) => {
  const { style, options, flavor, ...rest } = props;
  const ref = useRef(null);

  return (
    <Button title={props.title} flavor={flavor} onClick={() => ref.current.focus()} style={style}>
      <SelectBase ref={ref} {...rest}>
        {options.map((o, i) => {
          o = typeof o === "string" ? { label: o, value: o } : o;
          return (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </SelectBase>
    </Button>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  flavor: "white",
};
