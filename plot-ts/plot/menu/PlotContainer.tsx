import React from "react";

export const PlotContainer = ({ children, fRef, ...rest }) => (
  <div ref={fRef} className="relative" {...rest}>
    {children}
  </div>
);
