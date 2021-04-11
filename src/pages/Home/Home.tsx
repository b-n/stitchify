import React, { useState } from 'react';
import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';

import Stitch from '../../components/stitch';
import SVGViewer from '../common/SVGViewer'

import { ImageReader } from '../../lib/imageReader';
import { closestDMC } from '../../lib/color';

import Welcome from './Welcome';
import Options, { GenerationOptions, INITIAL_OPTIONS } from './Options';
import ImageSelection from './ImageSelection';

import { TwoDimensions } from '../../types/util'

import 'styles/dmc.css'

const imageReader = new ImageReader();

const useStyles = makeStyles({
  container: {
    marginTop: '10px',
  },
  cta: {
    width: "50%",
  }
})

const getAutoRatioDimensions = (imageDimensions: TwoDimensions, targetDimensions: TwoDimensions): TwoDimensions => {
  return [
    targetDimensions[0],
    Math.round(targetDimensions[0] * imageDimensions[1] / imageDimensions[0])
  ]
}

const Home: React.FC = () => {
  const [options, setOptions] = useState<GenerationOptions>(INITIAL_OPTIONS)
  const [stitches, setStitches] = useState<Array<React.ReactNode>>([]);
  const [canGenerate, setCanGenerate] = useState(false);
  const classes = useStyles();

  const loadImageData = async (imageData: string) => {
    setCanGenerate(false);
    await imageReader.loadImage(imageData);
    if (options.autoAdjustAspectRatio && imageReader.hasDimensions()) {
      setOptions({
        ...options,
        targetDimensions: getAutoRatioDimensions(imageReader.dimensions!, options.targetDimensions)
      })
      console.log('setting options', options)
    }
    setCanGenerate(true);
  }

  const generateStitches = () => {
    const [ width, height ] = options.targetDimensions;

    const elements = Array.from(Array(width * height), (_, i) => {
      const [x, y] = [i % width, Math.floor(i / width)]
      const dmcColor = closestDMC(imageReader.pixel(x, y, options.targetDimensions))

      return (
        <Stitch
          key={i}
          displayAs={options.displayAs}
          className={`dmc-color-${dmcColor.id}`}
          x={x}
          y={y}
        />
      )
    })

    setStitches(elements)
  }

  return (
    <Container className={classes.container}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Welcome />
        </Grid>
        <Grid item>
          <Options 
            onChange={setOptions}
            options={options}
          />
        </Grid>
        <Grid item>
          <ImageSelection onChange={loadImageData} />
        </Grid>
        <Grid item>
          <Button
            className={classes.cta}
            variant="contained"
            color="primary"
            disabled={!canGenerate}
            onClick={() => { generateStitches() }}
          >
            Generate
          </Button>
        </Grid>
        <Paper>
          <SVGViewer>
            <svg
              width={options.stitchSize*options.targetDimensions[0]}
              height={options.stitchSize*options.targetDimensions[1]}>
              {stitches && stitches}
            </svg>
          </SVGViewer>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Home;
