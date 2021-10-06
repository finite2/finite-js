import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faIcons from "@fortawesome/free-solid-svg-icons";

export const Icon = ({ name, ...rest }) => {
  const ic = faIcons[name];
  if (ic) {
    return <FontAwesomeIcon icon={faIcons[name]} {...rest} />;
  } else {
    console.error(`FontAwesome Icon with name ${name} was not found`);
    return null;
  }
};

export const IconSpin = styled(Icon)`
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;
