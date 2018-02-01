/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const snc = require('../snc.js')
var i = 0

snc.fe((repeat, end) => {
  console.log(`loop: ${i}`)
  if (i>=3) end(`Now Break!!`)
  else {
    i++
    setTimeout(repeat, 3000)
  }
}, data => {
  console.log(`Response: ${data}`)
})
