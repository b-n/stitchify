import React from 'react';

interface StitchProps {
  x: number;
  y: number;
  colorKey?: string;
  size?: number;
  thickness?: number;
  className?: string;
  displayAs?: string;
}

const Stitch: React.FC<StitchProps> = ({
  x,
  y,
  colorKey = '',
  size = 10,
  thickness = 2,
  className = '',
  displayAs = 'Stitches',
}) => (
  <>
    {
      displayAs === 'Stitches' && (
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
    }
    {
      displayAs === 'Pattern' && (
        <g className={className}>
          <rect x={x*size} y={y*size} width={size} height={size} /> 
          <text
            x={x*size + size/2}
            y={y*size + size/2}
            fontSize={size/2 + 2}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {colorKey}
          </text>
        </g>
      )
    }
  </>
)

export default Stitch;
