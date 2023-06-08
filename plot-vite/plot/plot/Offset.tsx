import React, { ReactNode } from "react";

export const Offset = ({
  left = 0,
  top = 0,
  children,
}: {
  left: number;
  top: number;
  children: ReactNode;
}) => {
  return <g transform={`translate(${left},${top})`}>{children}</g>;
};
