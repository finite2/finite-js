import styled from "styled-components";

const DateSelectBase = styled.input`
  width: 100%;
  height: 100%;
`;

export const DateSelectButton = ({ value, onChange }) => {
  return (
    <DateSelectBase
      type="date"
      value={value.toLocaleDateString("en-CA")}
      onChange={(e) => onChange(new Date(e.target.value))}
    />
  );
};
