/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const { interval } = require('../snc.js')

var i = 0
interval(2000, end => {
  console.log(`Executed: ${new Date()}`)
  i++
  if (i === 8) end('Bye bye')
},
res => {
  console.log(`End: ${res}`)
})
