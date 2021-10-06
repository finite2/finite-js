import React from "react";
import styled from "styled-components";

export const CheckList = styled.ul`
  list-style: none;
  ul {
    list-style: none;
  }

  li:before {
    content: "x ";
    width: 25px;
    display: inline-block;
  }

  li.done:before {
    content: "✓ ";
  }
`;

export const Li = ({ done, children }) => (
  <li className={done ? "done" : ""}>{children}</li>
);
