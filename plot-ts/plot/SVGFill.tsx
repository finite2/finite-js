import { useElementSize } from "@finite/core/hooks/useElementSize";
import { SVG } from "./SVG";


export const SVGFill = ({ children, ...rest }) => {
  const [elementRef, { innerWidth, innerHeight }] = useElementSize({ width: 100, height: 200 });

  return (
    <div className="w-full h-inherit" ref={elementRef}>
      <SVG width={innerWidth} height={innerHeight} {...rest}>
        {children}
      </SVG>
    </Div>
  );
};
