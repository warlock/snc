/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const { times } = require('../snc.js')
const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

times(5, (index, next, end) => {
  console.log(`iterator: ${index}`)
  setTimeout(() => {
    if (index === 3) end()
    else next()
  }, index*1000)
},
() => {
  console.log(`End!`)
})

