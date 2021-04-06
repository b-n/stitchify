import React, {useEffect, useState} from 'react';

import FileSelector from '../components/fileSelector';
import Stitch from '../components/stitch';
import TextField from '../components/textField';
import Button from '../components/button';

import {ImageReader} from '../lib/imageReader';
import {closestDMC} from '../lib/color';

import SVGViewer from './common/SVGViewer'

import '../styles/dmc.css'
import Checkbox from '../components/checkbox';

const imageReader = new ImageReader();

const Index: React.FC = () => {
  const [targetDimensions, setTargetDimensions] = useState<[number, number]>([100, 100]);
  const [autoAdjustAspectRatio, setAutoAdjustAspectRatio] = useState<boolean>(true);
  const [stitches, setStitches] = useState<Array<React.ReactNode>>([]);
  const [canGenerate, setCanGenerate] = useState(false);

  useEffect(() => {
    imageReader.targetDimensions = targetDimensions;
  }, [targetDimensions])

  const loadImageData = async (imageData: string) => {
    setCanGenerate(false);
    await imageReader.loadImage(imageData);
    if (autoAdjustAspectRatio && imageReader.hasDimensions()) {
      setTargetDimensions([
        targetDimensions[0],
        Math.round(targetDimensions[0] * imageReader.height! / imageReader.width!)
      ])
    }
    setCanGenerate(true);
  }

  const generateStitches = () => {
    const [ width, height ] = targetDimensions;

    const elements = Array.from(Array(width * height), (_, i) => {
      const [x, y] = [i % width, Math.floor(i / width)]
      const dmcColor = closestDMC(imageReader.pixel(x, y))
      return (<Stitch key={i} className={`dmc-color-${dmcColor.id}`} x={x} y={y} />)
    })

    setStitches(elements)
  }

  return (
    <div style={{ margin: '0px auto', width: "1002px"}}>
      <div style={{border: '1px solid black'}}>
        <h3>Options</h3>
        <TextField
          label="Width"
          value={""+targetDimensions[0]}
          type="number"
          onChange={(value) => { setTargetDimensions([parseInt(value), targetDimensions[1]]) }}
        />
        <br />
        <TextField
          label="Height"
          value={""+targetDimensions[1]}
          type="number"
          onChange={(value) => { setTargetDimensions([targetDimensions[0], parseInt(value)]) }}
        />
        <br />
        <Checkbox
          label="Auto adjust Aspect Ratio"
          value={autoAdjustAspectRatio}
          onChange={(value => { setAutoAdjustAspectRatio(value) })}
        />
      </div>
      <FileSelector
        label="Select a file"
        onChange={loadImageData}
      />
      <div>
        <Button 
          label="Generate"
          disabled={!canGenerate}
          onClick={() => { generateStitches() }}
        />
      </div>
      <SVGViewer>
        <svg width={1000} height={1000}>
          {stitches && stitches}
        </svg>
      </SVGViewer>
    </div>
  )
}

export default Index;
