import styled from "styled-components";

export const FlexColumn = styled.div(
  (p) => `
  display: flex;
  flex-direction: column;
  justify-content: ${p.justify};
  height: 100%;

  > div {
    margin-top: 3px;
  }

  > :last-child {
    margin-bottom: 3px;
  }
`
);

FlexColumn.defaultProps = {
  justify: "space-between",
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
