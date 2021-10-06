import styled from "styled-components";

const getRows = (r) => {
  if (typeof r === "string") {
    return r;
  }
  return Array(r).fill("1fr").join(" ");
};

/* a vertical single column version of ratio grid. */
export const GridColumn = styled.div.attrs(({ rows, style, ...rest }) => {
  return { ...rest, style: { ...style, gridTemplateRows: getRows(rows) } };
})`
  display: grid;
  grid-gap: var(--layout-widget-intra-grid-gap);
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

GridColumn.defaultProps = {
  rows: "1fr",
};
