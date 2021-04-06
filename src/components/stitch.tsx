import React from 'react';

interface StitchProps {
  x: number;
  y: number;
  size?: number;
  thickness?: number;
  className?: string;
}

const Stitch: React.FC<StitchProps> = ({
  x,
  y,
  size = 10,
  thickness = 2,
  className = '',
}) => (
  <g className={className}>
    <line
      x1={x*size}
      y1={y*size+10}
      x2={x*size+10}
      y2={y*size}
      strokeWidth={thickness}
    />
    <line
      x1={x*size}
      y1={y*size}
      x2={x*size+10}
      y2={y*size+10}
      strokeWidth={thickness}
    />
  </g>
)

export default Stitch;
