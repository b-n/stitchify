const path = require('path')
const fs = require('fs')
const dmc = require('../src/data/dmc')

const OUTPUT_PATH = path.join(__dirname, '..', 'src/styles/dmc.css');

const styles = dmc.map(color => {
  return `.dmc-color-${color[0]} { stroke: #${color[5]}; }`
}).join('\n')

fs.writeFileSync(OUTPUT_PATH, styles);
console.log(`Styles written to ${OUTPUT_PATH}`);
