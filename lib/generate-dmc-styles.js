const path = require('path')
const fs = require('fs')
const dmc = require('../src/data/dmc')

const OUTPUT_PATH = path.join(__dirname, '..', 'src/styles/dmc.css');

const styles = dmc.map(color => {
  return `
.dmc-color-${color[0]} line { stroke: #${color[5]}; }
.dmc-color-${color[0]} rect { fill: #${color[5]}; }
`.trim()
}).join('\n')

fs.writeFileSync(OUTPUT_PATH, styles);
console.log(`Styles written to ${OUTPUT_PATH}`);
