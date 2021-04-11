import React, { useState } from 'react';
import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';

import ImageSelection from '../common/ImageSelection';
import Stitch from '../common/Stitch';
import SVGViewer from '../common/SVGViewer'
import ThreadLegend from '../common/ThreadLegend';

import Options, { GenerationOptions, INITIAL_OPTIONS } from './Options';
import Welcome from './Welcome';

import { ImageReader } from '../../lib/imageReader';
import { closestDMC } from '../../lib/color';
import { toBase } from '../../lib/toBase';

import { TwoDimensions } from '../../types/util'
import { StitchData } from '../../types/stitches'

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
  const [stitches, setStitches] = useState<Array<StitchData>>([]);
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
    }
    setCanGenerate(true);
  }

  const generateStitches = async () => {
    const [ width, height ] = options.targetDimensions;

    Promise.all(Array.from(Array(width * height), async (_, i) => {
      const [x, y] = [i % width, Math.floor(i / width)]
      return closestDMC(imageReader.pixel(x, y, options.targetDimensions))
        .then((dmc) => ({ x, y, dmc }) as StitchData)
    }))
      .then(result => {
        const colorKeys = Object.keys(result.reduce((a, c) => { a[c.dmc.id] = ''; return a; }, {} as Record<string, string>))
          .reduce((a, c, i) => { a[c] = i; return a }, {} as Record<string, number>)

        return result.map(d => ({ ...d, key: toBase(colorKeys[d.dmc.id])}))
      })
      .then(setStitches)
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
              {stitches && stitches.map((stitch, i) => (
                <Stitch
                  key={i}
                  displayAs={options.displayAs}
                  className={`dmc-color-${stitch.dmc.id}`}
                  colorKey={stitch.key}
                  x={stitch.x}
                  y={stitch.y}
                />
              ))}
            </svg>
          </SVGViewer>
          <ThreadLegend data={stitches} />
        </Paper>
      </Grid>
    </Container>
  );
}

export default Home;
