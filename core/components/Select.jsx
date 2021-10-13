import { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "./Button";
import { getFlavor } from "../utils/getFlavor";

const SelectBase = styled(Button)`
  text-align: center;
  text-align-last: center;
  text-align: center;

  &.arrowless {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
  option {
    background: var(--color-background);
  }
`;

export const Select = (props) => {
  const { options, ...rest } = props;

  return (
    <SelectBase as="select" {...rest}>
      {options.map((o, i) => {
        o = typeof o === "string" ? { label: o, value: o } : o;
        return (
          <option key={i} value={o.value}>
            {o.label}
          </option>
        );
      })}
    </SelectBase>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
