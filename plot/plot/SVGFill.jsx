import styled from "styled-components";
import { useElementSize } from "@finite/core/hooks/useElementSize";
import { SVG } from "./SVG";

const Div = styled.div`
  width: 100%;
  height: inherit;
`;

export const SVGFill = ({ children, ...rest }) => {
  const [elementRef, { innerWidth, innerHeight }] = useElementSize({ width: 100, height: 200 });

  return (
    <Div ref={elementRef}>
      <SVG width={innerWidth} height={innerHeight} {...rest}>
        {children}
      </SVG>
    </Div>
  );
};
