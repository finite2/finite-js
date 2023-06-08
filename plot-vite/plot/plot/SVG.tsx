import {
  useRef,
  useState,
  useEffect,
  useCallback,
  SVGProps,
  Dispatch,
  SetStateAction,
  CSSProperties,
  ReactNode,
  RefObject,
} from "react";

import { SVGContext } from "./plot-utils";
import { PlotContainer } from "./menu/PlotContainer";
import { getId } from "../utils";

const SVGstyled = ({
  children,
  fRef,
  ...rest
}: SVGProps<SVGSVGElement> & { fRef: RefObject<SVGSVGElement> }) => {
  return (
    <svg ref={fRef} {...rest} className="user-select-none relative">
      {children}
    </svg>
  );
};

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
  const idRef = useRef<string>(getId());

  const [{ width, height }, setSize, resetSize] = useSVGsize(propWidth, propHeight);

  return (
    <SVGContext.Provider value={{ width, height, svgRef, containerRef, setSize, resetSize }}>
      <PlotContainer fRef={containerRef} id={idRef.current} className={className} style={style}>
        <SVGstyled fRef={svgRef} onClick={onClick} viewBox={`0 0 ${width} ${height}`}>
          {children}
        </SVGstyled>
        {overlay}
      </PlotContainer>
    </SVGContext.Provider>
  );
};
