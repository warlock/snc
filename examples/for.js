/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const snc = require('../snc.js')

snc.for(0, 10, 1, (index, next, end) => {
  console.log(index)
  setTimeout(() => {
    next(5)
  }, 1000)
}, data => {
  console.log(`LENGTH: ${data.length} -> ${JSON.stringify(data)}`)
})
