import styled from "styled-components";

const ratiosToColumnWidths = (ratios) => {
  if (typeof ratios === "string") {
    return ratios;
  } else if (typeof ratios === "number") {
    return Array(ratios).fill("1fr").join(" ");
  }
};

export const Grid = styled.div.attrs(({ columns, rowHeight, gridGap, style, dense, ...rest }) => ({
  ...rest,
  style: {
    gridTemplateColumns: ratiosToColumnWidths(columns),
    gridAutoRows: rowHeight,
    gridAutoFlow: `row${dense ? " dense" : ""}`,
    gridGap,
    ...style,
  },
}))`
  display: grid;
  text-align: center;
  align-items: center;
  width: 100%;
`;

Grid.defaultProps = {
  columns: 1,
  gridGap: 10,
  rowHeight: 40,
  dense: false,
};
