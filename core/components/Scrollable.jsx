import styled from "styled-components";

export const Scrollable = styled.div.attrs((p) => {
  return {
    style: {
      "--padding-right": p.paddingRight ?? "10px",
      "--scrollbar-width": p.scrollbarWidth ?? "5px",
    },
  };
})`
  width: calc(100% + var(--padding-right));
  height: 100%;
  overflow-y: auto;
  overflow-y: overlay;
  padding-right: var(--padding-right);
  color: #6663;
  /* fade out slowly */
  transition: color 1s ease-in;
  scrollbar-color: #0000 #0000;
  scrollbar-width: thin;
  :hover {
    /* fade color in quickly */
    transition: color 0.1s ease-out;
    color: #6667;
    scrollbar-color: #9997 #0000;
  }
  ::-webkit-scrollbar,
  ::-webkit-scrollbar-thumb {
    width: var(--scrollbar-width);
    border-radius: var(--scrollbar-width);
    background-color: #0000;
  }
  ::-webkit-scrollbar-thumb {
    /* box-shadow color here inherits from div's "color" property */
    box-shadow: inset 0 0 0 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    /* I still want it to be bright when I hover over the scrollbar */
    background-color: #9997;
  }
  & > * {
    /* Make sure children don't inherit the color! */
    color: var(--color-text);
  }
`;
