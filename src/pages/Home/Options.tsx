import React from 'react';
import {Switch, FormControlLabel, Grid, makeStyles, Paper, TextField, Typography, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';

import { TwoDimensions } from '../../types/util';

type DisplayOptions = 'Stitches' | 'Pattern'
export interface GenerationOptions {
  targetDimensions: TwoDimensions;
  autoAdjustAspectRatio: boolean;
  stitchSize: number;
  displayAs: DisplayOptions;
}


export const INITIAL_OPTIONS: GenerationOptions = { 
  targetDimensions: [100, 100],
  autoAdjustAspectRatio: true,
  stitchSize: 10,
  displayAs: 'Stitches',
}

interface OptionsProps {
  onChange: (options: GenerationOptions) => void;
  options: GenerationOptions;
}

const displayAsOptions = [ 'Stitches', 'Pattern' ]

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
  options,
  onChange,
}) => {
  const classes = useStyles();

  const handleChange = (element: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    switch (element) {
      case 'width':
        onChange({ ...options, targetDimensions: [ parseInt(value), options.targetDimensions[1] ]})
        break;
      case 'height':
        onChange({ ...options, targetDimensions: [ options.targetDimensions[0], parseInt(value) ]})
        break;
      case 'autoAdjust':
        onChange({ ...options, autoAdjustAspectRatio: checked })
        break;
    } 
  }

  const handleSelectChange = (element: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target
    switch(element) {
      case 'displayAs':
        const displayAs = value as DisplayOptions
        onChange({ ...options, displayAs })
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
        <Grid container item xs={12} spacing={4}>
          <Grid container item xs={6} direction="column">
            <Typography variant="overline">Dimensions</Typography>
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
          </Grid>
          <Grid container item xs={6} direction="column">
            <Typography variant="overline">Generation Options</Typography>
            <FormControl>
              <InputLabel id="displayAs">Display As</InputLabel>
              <Select
                label="Display As"
                value={options.displayAs}
                labelId="displayAs"
                onChange={handleSelectChange('displayAs')}
              >
                {displayAsOptions.map((value) => (
                  <MenuItem value={value} key={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={options.autoAdjustAspectRatio}
                  onChange={handleChange('autoAdjust')}
                />
              }
              className={classes.control}
              label="Keep Image Aspect Ratio"
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Options;
