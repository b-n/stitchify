import React, {useState, useEffect} from 'react';
import {Checkbox, FormControlLabel, Grid, makeStyles, Paper, TextField, Typography} from '@material-ui/core';

import { TwoDimensions } from '../../types/util';

export interface GenerationOptions {
  targetDimensions: TwoDimensions;
  autoAdjustAspectRatio: boolean;
  stitchSize: number;
}

export const INITIAL_OPTIONS: GenerationOptions = { 
  targetDimensions: [100, 100],
  autoAdjustAspectRatio: true,
  stitchSize: 10,
}

interface OptionsProps extends GenerationOptions {
  onChange: (options: GenerationOptions) => void;
}

const useStyles = makeStyles({
  container: {
    padding: '20px',
  },
  title: {
    marginBottom: '10px',
  },
  control: {
    marginBottom: '10px',
  }
})

const Options: React.FC<OptionsProps> = ({
  targetDimensions,
  autoAdjustAspectRatio,
  stitchSize,
  onChange,
}) => {
  const classes = useStyles();

  const [options, setOptions] = useState<GenerationOptions>({
    targetDimensions,
    autoAdjustAspectRatio,
    stitchSize,
  });

  useEffect(() => {
    onChange(options)
  }, [options, onChange])

  const handleChange = (element: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    switch (element) {
      case 'width':
        setOptions({ ...options, targetDimensions: [parseInt(value), options.targetDimensions[1]] })
        break;
      case 'height':
        setOptions({ ...options, targetDimensions: [options.targetDimensions[0], parseInt(value)] })
        break;
      case 'autoAdjust':
        setOptions({ ...options, autoAdjustAspectRatio: event.target.checked })
        break;
    } 
  }

  return (
    <Paper className={classes.container}>
      <Grid container>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h4">
            Options
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container item xs={6} direction="column">
            <TextField
              label="Width"
              value={options.targetDimensions[0]}
              onChange={handleChange('width')}
              className={classes.control}
            />
            <TextField
              label="Height"
              value={options.targetDimensions[1]}
              onChange={handleChange('height')}
              className={classes.control}
            />
            <FormControlLabel
              control={
                <Checkbox
                  label="Keep Aspect Ratio"
                  checked={options.autoAdjustAspectRatio}
                  onChange={handleChange('autoAdjust')}
                  className={classes.control}
                />
              }
              label="Keep Aspect Ratio"
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Options;
