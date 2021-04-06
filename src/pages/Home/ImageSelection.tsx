import React from 'react';
import {Input, makeStyles, Paper, Typography} from '@material-ui/core';

interface ImageSelectionProps {
  onChange: (imageBase64: string) => void;
}

const useStyles = makeStyles({
  container: {
    padding: '20px',
  }
})

const ImageSelection: React.FC<ImageSelectionProps> = ({
  onChange
}) => {
  const classes = useStyles();
  const showImage = (elem: HTMLInputElement) => {
    if (!elem.files) {
      return;
    }
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      onChange(reader.result as string);
    })
    reader.readAsDataURL(elem.files[0])
  }

  return (
    <Paper className={classes.container}>
      <Typography variant="h4">
        Select an Image
      </Typography>
      <Input
        label="Select Image"
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { showImage(event.target) }}
      />
    </Paper>
  )
}

export default ImageSelection;
