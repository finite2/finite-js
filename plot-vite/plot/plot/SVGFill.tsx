import { useElementSize } from "plot/utils";
import { MySVGProps, SVG } from "./SVG";

export const SVGFill = ({ children, ...rest }: Omit<MySVGProps, "width" | "height">) => {
  const [elementRef, { innerWidth, innerHeight }] = useElementSize<HTMLDivElement>({
    width: 100,
    height: 200,
  });

  return (
    <div className="w-full h-inherit" ref={elementRef}>
      <SVG width={innerWidth} height={innerHeight} {...rest}>
        {children}
      </SVG>
    </div>
  );
};
