import React, {useEffect, useState} from 'react';
import chunk from 'lodash.chunk';

import { StitchData } from '../../types/stitches'
import {Grid, makeStyles} from '@material-ui/core';
import { textColor } from '../../lib/color';

interface ThreadLegendProps {
  data: Array<StitchData>;
}

interface LegendData {
  label: string;
  color: string;
  dmcId: string;
  colorKey: string;
}

const useStyles = makeStyles({
  threadContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '4px 0px',
  },
  threadSwatch: {
    width: '25px',
    height: '25px',
    lineHeight: '25px',
    textAlign: 'center',
  },
  threadLabel: {
    marginLeft: '4px', 
  }
})

const Thread: React.FC<LegendData> = ({
  label,
  color,
  dmcId,
  colorKey,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.threadContainer}>
      <div className={classes.threadSwatch} style={{backgroundColor: color, color: textColor(color) }}>
        {colorKey}
      </div>
      <div className={classes.threadLabel}>{dmcId} - {label}</div>
    </div>
  )
}

const ThreadLegend: React.FC<ThreadLegendProps> = ({
  data,
}) => {
  const [legendData, setLegendData] = useState<Array<LegendData>>([])
  useEffect(() => {
    setLegendData(
      Object.values(
        data.reduce((a, c) => {
          if (!a[c.dmc.id]) {
            a[c.dmc.id] = {
              label: c.dmc.name,
              dmcId: c.dmc.id,
              color: c.dmc.hex,
              colorKey: c.key,
            }
          }
          return a
        }, {} as Record<string, LegendData>)
      )
    )
  }, [data])

  return (
    <Grid container>
      {legendData && chunk(legendData, Math.ceil(legendData.length / 3)).map((d, i) => (
        <Grid item xs={4} key={i}>
          {d.map((e, j) => (
            <>
              <Thread key={j} {...e} /> 
              {(j % 5 === 4) && <hr />}
            </>
          ))}
        </Grid>
      ))}
    </Grid>
  )
}

export default ThreadLegend;
