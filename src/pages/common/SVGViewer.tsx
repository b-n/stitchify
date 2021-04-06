import React, {useRef, useEffect, useState} from 'react';

import { ReactSVGPanZoom, TOOL_AUTO, INITIAL_VALUE} from 'react-svg-pan-zoom';

interface SVGViewerProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  onClick?: (event: any) => void;
}

const SVGViewer: React.FC<SVGViewerProps> = ({
  children,
  onClick,
}) => {
  const Viewer = useRef<typeof ReactSVGPanZoom>(null);

  const [tool, setTool] = useState(TOOL_AUTO)
  const [value, setValue] = useState(INITIAL_VALUE)

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <ReactSVGPanZoom
      ref={Viewer}
      width={1000} height={600}
      tool={tool} onChangeTool={setTool}
      value={value} onChangeValue={setValue}
      detectAutoPan={false}
      onClick={onClick}
    >
      {children}
    </ReactSVGPanZoom>
  )
}

export default SVGViewer;
