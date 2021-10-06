import React, { useState, useEffect } from "react";

export const ProgressWheel = ({ probability, size = 100, ...rest }) => {
  const hSize = size / 2;
  const [portion, setPortion] = useState(0);

  useEffect(() => {
    if (probability) {
      setPortion(probability);
    }
  }, [probability]);

  useEffect(() => {
    setInterval(() => setPortion(p => (p + 0.0025) % 1), 25);
  }, []);

  let x = hSize * Math.sin(2 * Math.PI * portion);
  let y = -hSize * Math.cos(2 * Math.PI * portion);

  return (
    <svg width={size} height={size} {...rest}>
      <g transform={`translate(${hSize},${hSize})`}>
        <circle cx={0} cy={0} r={hSize} fill="#f00" />
        <path
          d={`M0 0 0 -${hSize} A${hSize} ${hSize} 0 ${
            portion > 0.5 ? 1 : 0
          } 1  ${x} ${y} z`}
          fill="#0f0"
        />
      </g>
    </svg>
  );
};
