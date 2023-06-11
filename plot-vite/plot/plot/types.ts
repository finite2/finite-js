import { PointerEvent, MouseEvent } from "react";

export type Orientation = "top" | "left" | "right" | "bottom";

export type Direction = "vertical" | "horizontal";

export type CurveType =
  | "curveBasis"
  | "curveBasisClosed"
  | "curveBasisOpen"
  | "curveBundle"
  | "curveCardinal"
  | "curveCardinalClosed"
  | "curveCardinalOpen"
  | "curveCatmullRom"
  | "curveCatmullRomClosed"
  | "curveCatmullRomOpen"
  | "curveLinear"
  | "curveLinearClosed"
  | "curveMonotoneX"
  | "curveMonotoneY"
  | "curveNatural"
  | "curveStep"
  | "curveStepAfter"
  | "curveStepBefore";

export type PosPointerEvent = PointerEvent & {
  xAbsPosition: number;
  xPosition: number;
  yAbsPosition: number;
  yPosition: number;
};

export type PosMouseEvent = MouseEvent & {
  xAbsPosition: number;
  xPosition: number;
  yAbsPosition: number;
  yPosition: number;
};

export type LocationEvents = {
  onClick?: (event: PosMouseEvent) => void;
  onDoubleClick?: (event: PosMouseEvent) => void;
  onPointerDown?: (event: PosPointerEvent) => void;
  onPointerUp?: (event: PosPointerEvent) => void;
  onPointerMove?: (event: PosPointerEvent) => void;
  onPointerEnter?: (event: PosPointerEvent) => void;
  onPointerLeave?: (event: PosPointerEvent) => void;
  onPointerOver?: (event: PosPointerEvent) => void;
  onPointerOut?: (event: PosPointerEvent) => void;
  onPointerCancel?: (event: PosPointerEvent) => void;
  onGotPointerCapture?: (event: PosPointerEvent) => void;
  onLostPointerCapture?: (event: PosPointerEvent) => void;
};

export type GEvents = {
  onClick?: (event: MouseEvent) => void;
  onDoubleClick?: (event: MouseEvent) => void;
  onPointerDown?: (event: PointerEvent) => void;
  onPointerUp?: (event: PointerEvent) => void;
  onPointerMove?: (event: PointerEvent) => void;
  onPointerEnter?: (event: PointerEvent) => void;
  onPointerLeave?: (event: PointerEvent) => void;
  onPointerOver?: (event: PointerEvent) => void;
  onPointerOut?: (event: PointerEvent) => void;
  onPointerCancel?: (event: PointerEvent) => void;
  onGotPointerCapture?: (event: PointerEvent) => void;
  onLostPointerCapture?: (event: PointerEvent) => void;
};

// export const Events = {
//   onClick,
//   onDoubleClick,
//   onPointerDown,
//   onPointerUp,
//   onPointerMove,
//   onPointerEnter,
//   onPointerLeave,
//   onPointerOver,
//   onPointerOut,
//   onPointerCancel,
//   onGotPointerCapture,
//   onLostPointerCapture,
// };
