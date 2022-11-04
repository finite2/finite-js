import React from "react";
import styled from "styled-components";

import { Portal } from "./Portal";

export const SubPageHolder = styled.div`
  padding: 20px;
  background: var(--color-background-alt);
  width: 190px;
  height: 100vh;

  transition: 0.25s ease-in-out;
`;

export const SubPageMenu = ({ children }) => {
  return (
    <Portal target="sub-side-menu">
      <SubPageHolder>{children}</SubPageHolder>
    </Portal>
  );
};
