/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const { now } = require('../snc.js')

now(done => {
  console.log('Executed')
  setTimeout(() => {
    done('response')
  }, 3000)
},
res => {
  console.log(res)
})
