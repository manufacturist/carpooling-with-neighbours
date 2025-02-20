const fs = require('fs')
const path = require('path')

const cssFilePath = path.resolve(__dirname, 'build/style.css')
const htmlFilePath = path.resolve(__dirname, 'src/webapp/index.style.gen.html')

const css = fs.readFileSync(cssFilePath, 'utf8')

const styleTag = `<style>
  ${css}
</style>`

fs.writeFileSync(htmlFilePath, styleTag);

console.log('HTML file generated with embedded CSS!');