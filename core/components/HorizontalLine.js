import styled from "styled-components";

export const HorizontalLine = styled.div.attrs(({ shorten, width, style, ...rest }) => {
  return {
    style: {
      ...style,
      width: width ? `calc(${width} - ${shorten * 2}px)` : `calc(100% - ${shorten * 2}px)`,
    },
    ...rest,
  };
})`
  margin: 20px auto;
  height: 4px;
  background: black;
`;

HorizontalLine.defaultProps = {
  shorten: 0,
  width: "",
};
