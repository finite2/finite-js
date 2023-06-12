import {
  useRef,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  CSSProperties,
  ReactNode,
} from "react";

import { SVGContext } from "./plot-utils";
import { PlotContainer } from "./menu/PlotContainer";
import { getID } from "plot/utils/getID";

const useSVGsize = (
  width: number,
  height: number
): [
  { width: number; height: number },
  Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >,
  () => void
] => {
  const [size, setSize] = useState({ width, height });

  useEffect(() => {
    setSize((s) => {
      if (width !== s.width || height !== s.height) {
        return { width, height };
      } else {
        return s;
      }
    });
  }, [width, height]);

  const resetSize = useCallback(() => {
    setSize({ width, height });
  }, [width, height]);

  return [size, setSize, resetSize];
};

export type MySVGProps = {
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  children: ReactNode;
  overlay?: ReactNode;
};

export const SVG = ({
  width: propWidth = 900,
  height: propHeight = 600,
  children,
  overlay,
  className,
  style,
  onClick,
}: MySVGProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(getID());

  const [{ width, height }, setSize, resetSize] = useSVGsize(propWidth, propHeight);

  return (
    <SVGContext.Provider value={{ width, height, svgRef, containerRef, setSize, resetSize }}>
      <PlotContainer fRef={containerRef} id={idRef.current} className={className} style={style}>
        <svg
          ref={svgRef}
          className={"user-select-none relative"}
          onClick={onClick}
          viewBox={`0 0 ${width} ${height}`}>
          {children}
        </svg>
        {overlay}
      </PlotContainer>
    </SVGContext.Provider>
  );
};
