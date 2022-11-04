import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "./Button";

const DateSelectBase = styled(Button)`
  overflow: hidden;
  text-align: center;

  ::-webkit-datetime-edit {
    margin-left: 5px;
  }

  ::-webkit-calendar-picker-indicator {
  }
`;

export const DateSelect = ({ defaultValue, value, onChange, ...rest }) => {
  value = typeof value === "string" ? new Date(value) : value;

  return (
    <DateSelectBase
      as="input"
      type="date"
      defaultValue={defaultValue ? defaultValue.toLocaleDateString("en-CA") : null}
      value={value?.toLocaleDateString("en-CA") ?? null}
      onChange={(e) => onChange(new Date(e.target.value))}
      {...rest}
    ></DateSelectBase>
  );
};

DateSelect.propTypes = {
  onChange: PropTypes.func,
};

DateSelect.defaultProps = {
  onChange: () => null,
};
