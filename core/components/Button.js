import styled from "styled-components";
import { Link } from "react-router-dom";

import { getFlavor } from "../utils/getFlavor";

export const flavorColors = {
  default: {
    background: "var(--color-default)",
    hover: "var(--color-default-dark)",
  },
  primary: {
    background: "var(--color-primary)",
    hover: "var(--color-primary-dark)",
  },
  secondary: {
    background: "var(--color-secondary)",
    hover: "var(--color-secondary-dark)",
  },
  success: {
    background: "var(--color-success)",
    hover: "var(--color-success-dark)",
  },
  warning: {
    background: "var(--color-warning)",
    hover: "var(--color-warning-dark)",
  },
  danger: {
    background: "var(--color-danger)",
    hover: "var(--color-danger-dark)",
  },
};

export const Button = styled.button.attrs((p) => {
  let type = getFlavor(p, p.fallbackFlavor);
  return {
    style: {
      "--color": p.disabled ? "var(--color-font-disabled)" : "var(--color-font)",
      "--background":
        p.inactive || p.disabled ? "var(--color-background-alt)" : flavorColors[type].background,
      "--background-hover": flavorColors[type].hover,
      "--border": p.bordered ? "var(--button-bordered)" : 0,
      ...p.style,
    },
  };
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: var(--button-radius);
  border: var(--border);
  cursor: pointer;
  pointer-events: auto;
  background: var(--background);
  transition: 0.25s ease-in-out;
  padding: 0;
  color: var(--color);
  user-select: none;
  box-sizing: border-box;

  transition: background 0.5s;

  :enabled:hover,
  :enabled:focus {
    background: var(--background-hover);
    color: var(--color);
  }

  :focus {
    border-color: none;
    outline: 0;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const ButtonLink = styled(Button).attrs(() => ({ as: Link }))`
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;
