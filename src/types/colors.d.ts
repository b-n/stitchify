export type RGBColor = Uint8ClampedArray;
export type HexColor = string;

export interface DMCColor {
  id: string;
  name: string;
  rgb: RGBColor
  hex: HexColor
}

