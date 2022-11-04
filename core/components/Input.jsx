import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "./Button";

export const Input = styled(Button).attrs({ as: "input" })`
  text-align: center;

  & {
    cursor: text;
  }
`;

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
};
