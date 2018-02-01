/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const snc = require('../snc.js')
const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

snc.each(list, (item, index, next, end) => {
  console.log(`item: ${item}`)
  setTimeout(next, 3000)
},
() => {
  console.log(`End`)
})
