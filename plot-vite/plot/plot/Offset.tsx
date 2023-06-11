import { ReactNode } from "react";

export type OffsetProps = {
  left: number;
  top: number;
  children: ReactNode;
};

export const Offset = ({ left = 0, top = 0, children }: OffsetProps) => {
  return <g transform={`translate(${left},${top})`}>{children}</g>;
};
