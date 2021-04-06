import { deltaE } from 'chroma-js';
import dmc from '../data/dmc'

export type RGBColor = Uint8ClampedArray;
export type HexColor = string;

export interface DMCColor {
  id: string;
  name: string;
  rgb: RGBColor
  hex: HexColor
}

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

const closestDMC = (color: HexColor): DMCColor => {
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

  return closestDMC!;
}

export { 
  closestDMC
}
