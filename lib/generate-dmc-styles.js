const path = require('path')
const fs = require('fs')
const chroma = require('chroma-js')
const dmc = require('../src/data/dmc')

const OUTPUT_PATH = path.join(__dirname, '..', 'src/styles/dmc.css');

const styles = dmc.map(color => {
  const hexColor = `#${color[5]}`
  const textColor = chroma(hexColor).luminance() > 0.5 ? '#000000' : '#FFFFFF'; 

  return `
.dmc-color-${color[0]} line { stroke: ${hexColor}; }
.dmc-color-${color[0]} rect { fill: ${hexColor}; }
.dmc-color-${color[0]} text { fill: ${textColor}; }
`.trim()
}).join('\n')

fs.writeFileSync(OUTPUT_PATH, styles);
console.log(`Styles written to ${OUTPUT_PATH}`);
