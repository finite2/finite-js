import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  SVGProps,
  Dispatch,
  SetStateAction,
  CSSProperties,
  ReactNode,
} from "react";

import { getId } from "@finite/core/utils/getId";

import { SVGContext } from "./plot-utils";
import { PlotMenu } from "./menu/PlotMenu";
import { PlotContainer } from "./menu/PlotContainer";

const SVGstyled = ({ children, ...rest }: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...rest} className="user-select-none relative">
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

export const SVG = ({
  width: propWidth = 900,
  height: propHeight = 600,
  children,
  className,
  style,
  onClick,
}: {
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  children: ReactNode;
}) => {
  const svgRef = useRef<SVGSVGElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const idRef = useRef<string>(getId());

  const [{ width, height }, setSize, resetSize] = useSVGsize(propWidth, propHeight);

  return (
    <SVGContext.Provider value={{ width, height, svgRef, containerRef, setSize, resetSize }}>
      <PlotContainer fRef={containerRef} id={idRef.current} className={className} style={style}>
        <SVGstyled ref={svgRef} onClick={onClick} viewBox={`0 0 ${width} ${height}`}>
          {children}
        </SVGstyled>
        <PlotMenu />
      </PlotContainer>
    </SVGContext.Provider>
  );
};
