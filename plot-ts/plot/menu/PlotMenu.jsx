import styled from "styled-components";

import { FullscreenButton } from "./FullscreenButton";

const MenuHolder = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  visibility: hidden;

  :hover {
    visibility: visible;
  }
`;

export const PlotMenu = () => {
  return (
    <MenuHolder>
      <FullscreenButton />
    </MenuHolder>
  );
};
