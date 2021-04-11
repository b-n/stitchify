import chroma, { deltaE } from 'chroma-js';
import dmc from '../data/dmc'

import { DMCColor, HexColor } from '../types/colors'

const dmcCache: Array<DMCColor> = [];

const loadDMCCache = () => {
  if (dmcCache.length === 0) {
    const values = dmc.map(v => ({
      id: `${v[0]}`,
      name: `${v[1]}`,
      rgb: new Uint8ClampedArray([v[2] as number, v[3] as number, v[4] as number]),
      hex: `#${v[5]}`
    }));
    dmcCache.push(...values);
  }

  return dmcCache;
}

const closestDMC = async (color: HexColor): Promise<DMCColor> => {
  return new Promise((resolve) => {
    const dmcs = loadDMCCache();

    let closestDeltaE = 100;
    let closestDMC: DMCColor;

    dmcs.forEach(dmc => {
      const { hex } = dmc
      let d = deltaE(hex, color)
      if (d < closestDeltaE) {
        closestDeltaE = d;
        closestDMC = dmc 
      }
    })

    resolve(closestDMC!);
  })
}

const textColor = (color: HexColor): HexColor => {
  return chroma(color).luminance() > 0.5 ? '#000000' : '#FFFFFF'
}

export { 
  closestDMC,
  textColor
}
