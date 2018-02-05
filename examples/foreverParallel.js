/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const { fp } = require('../snc.js')

fp(3, (counter, done, end) => {
  console.log(`COUNTER ${counter}`)
  if (counter < 12 ) {
    setTimeout(() => {
      done()
    }, 3000)
  } else end('buuu')
},
res => {
  console.log(`END: ${res}`)
})
