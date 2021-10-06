import styled from "styled-components";
import { Link } from "react-router-dom";

import { getFlavor } from "../utils/getFlavor";

export const flavorColors = {
  default: {
    background: "var(--color-primary)",
    hover: "var(--color-primary-dark)",
    border: 0,
  },
  light: {
    background: "#9ad7f3",
    hover: "#b8e2f5",
    border: 0,
  },
  success: {
    background: "#4fdb6d",
    hover: "#31ac4b",
    border: 0,
  },
  danger: {
    background: "#daa240",
    hover: "#a87a28",
    border: 0,
  },
  white: {
    background: "white",
    hover: "#ddddff",
    border: "2px solid black",
  },
  defaultBorder: {
    background: "#45bedf",
    hover: "#2aadd1",
    border: "2px solid black",
  },
};

export const Button = styled.button.attrs((p) => {
  let type = getFlavor(p);
  return {
    style: {
      "--color": p.active ? "#3300AA" : "#000",
      "--border": flavorColors[type].border,
      "--background": flavorColors[type].background,
      "--background-hover": flavorColors[type].hover,
      ...p.style,
    },
  };
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: var(--border);
  cursor: pointer;
  pointer-events: auto;
  background: var(--background);
  transition: 0.25s ease-in-out;
  padding: 0;
  color: var(--color);
  user-select: none;

  :hover {
    background: var(--background-hover);
    color: var(--color);
  }

  :focus {
    border-color: none;
    outline: 0;
  }
`;

export const ButtonLink = styled(Button).attrs(() => ({ as: Link }))`
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;
