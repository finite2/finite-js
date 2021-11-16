import styled from "styled-components";

export const FlexColumn = styled.div(
  (p) => `
  display: flex;
  flex-direction: column;
  justify-content: ${p.justify};
  height: 100%;

  > ${FlexChild} {
    margin-top: ${p.spaceBetween}px;
  }

  > :last-child {
    margin-bottom: ${p.spaceBetween}px;
  }
`
);

FlexColumn.defaultProps = {
  justify: "space-between",
  spaceBetween: 0,
};

export const FlexChild = styled.div(
  (p) => `
  flex-grow: ${p.grow};
  height: ${p.height};
`
);

FlexChild.defaultProps = {
  grow: 0,
  height: "fit-content",
};
