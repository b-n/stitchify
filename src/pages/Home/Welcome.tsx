import {makeStyles, Paper, Typography} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  container: {
    padding: '20px',
  }
})

const Welcome: React.FC = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.container}>
      <Typography variant="h3">Stitchify</Typography>
      <Typography variant="body1">
        A small app to help generate cross stitch patterns from an image. The colours generated are matched
        against a database of DMC colours to try and make the image "real"
      </Typography>
    </Paper>
  )
}

export default Welcome;
