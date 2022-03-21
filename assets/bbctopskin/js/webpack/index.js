// import bar from './bar.js';
const sass = require('sass');

const result = sass.compileString(`
h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}`);
console.log(result.css);