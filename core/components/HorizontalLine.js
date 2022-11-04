import styled from "styled-components";

export const HorizontalLine = styled.div.attrs(({ shorten, spacing, style, ...rest }) => {
  return {
    style: {
      ...style,
      "--margin": `${spacing}px ${shorten}px`,
    },
    ...rest,
  };
})`
  margin: var(--margin);
  height: 4px;
  background: var(--color-font);
  box-sizing: bounding-box;
`;

HorizontalLine.defaultProps = {
  spacing: 0,
  shorten: 0,
  width: "",
};
