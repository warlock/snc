/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const { times } = require('../snc.js')

times(5, (index, next, end) => {
  console.log(`iterator: ${index}`)
  setTimeout(() => {
    next()
  }, 1000);
},
() => {
  console.log(`End!`)
})

