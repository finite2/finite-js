import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { getId } from "@finite/core/utils/getId";

import { SVGContext } from "./plot-utils";
import { PlotMenu } from "./menu/PlotMenu";
import { PlotContainer } from "./menu/PlotContainer";

const SVGstyled = styled.svg`
  user-select: none;
  position: relative;

  fill: var(--color-font);

  &:fullscreen {
    background: var(--color-background);
  }
`;

const useSVGsize = (width, height) => {
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
}) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const idRef = useRef(getId());

  const [{ width, height }, setSize, resetSize] = useSVGsize(propWidth, propHeight);

  return (
    <SVGContext.Provider value={{ width, height, svgRef, containerRef, setSize, resetSize }}>
      <PlotContainer ref={containerRef} id={idRef.current} className={className} style={style}>
        <SVGstyled ref={svgRef} onClick={onClick} viewBox={`0 0 ${width} ${height}`}>
          {children}
        </SVGstyled>
        <PlotMenu />
      </PlotContainer>
    </SVGContext.Provider>
  );
};
