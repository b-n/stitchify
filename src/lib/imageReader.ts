import { TwoDimensions } from '../types/util'

export type RGBPixel = [number, number, number];
export type HexPixel = string;

export class ImageReader {
  dimensions: TwoDimensions | null = null;
  width: number | null = null;
  height: number | null = null;

  private canvas: HTMLCanvasElement | null = null;

  loadImage = async (imageDataBase64: string) => {
    this.canvas = null;

    const image = await this.getImage(imageDataBase64)
    const { width, height } = image

    this.dimensions = [ width, height ];
    this.canvas = this.getCanvasFromImage(image);
  }

  pixel = (x: number, y: number, scaling: TwoDimensions): HexPixel => {
    const canvas = this.getCanvas();
    const [ targetWidth, targetHeight ] = scaling

    const [
      widthRatio,
      heightRatio,
    ] = [
      canvas.width / targetWidth,
      canvas.height / targetHeight,
    ]

    return this.getPixel(
      canvas.getContext('2d')?.getImageData(Math.round(x * widthRatio), Math.round(y * heightRatio), 1, 1)!
    );
  } 

  getCanvas = (): HTMLCanvasElement => {
    if (!this.canvas) { throw new Error('Need a canvas') }
    return this.canvas
  }

  hasDimensions = () => {
    return this.dimensions && this.dimensions.length === 2;
  }

  private getImage = async (base64: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      var i = new Image()
      i.addEventListener("load", () => {
        resolve(i)
      })
      i.src = base64;
    }) 
  }

  private getCanvasFromImage = (image: HTMLImageElement): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d')?.drawImage(image, 0, 0, image.width, image.height);

    return canvas;
  }

  private getPixel = (imageData: ImageData): HexPixel => {
    const { data } = imageData
    if (!data || data.length < 3) { throw new Error('Failed to get image data') }

    return `#${Array.from(data.slice(0, 3)).map(v => v.toString(16).padStart(2, '0')).join('')}`;
  }
}
