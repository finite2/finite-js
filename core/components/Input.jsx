import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "./Button";

export const InputBase = styled(Button)`
  text-align: center;

  & {
    cursor: text;
  }
`;

export const Input = (props) => {
  return <InputBase as="input" {...props} />;
};

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
};
