import React, {useRef, useEffect, useState} from 'react';

import { ReactSVGPanZoom, TOOL_NONE, INITIAL_VALUE} from 'react-svg-pan-zoom';

interface SVGViewerProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

const SVGViewer: React.FC<SVGViewerProps> = ({
  children,
  width = 1000,
  height = 1000,
}) => {
  const Viewer = useRef<typeof ReactSVGPanZoom>(null);

  const [tool, setTool] = useState(TOOL_NONE)
  const [value, setValue] = useState(INITIAL_VALUE)

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <div style={{border: '1px solid black'}}>
      <ReactSVGPanZoom
        ref={Viewer}
        width={width} height={height}
        tool={tool} onChangeTool={setTool}
        value={value} onChangeValue={setValue}
        detectAutoPan={false}
        onClick={(event: any) => console.log('click', event.x, event.y, event.originalEvent)}
      >
        {children}
      </ReactSVGPanZoom>
    </div>
  )
}

export default SVGViewer;
