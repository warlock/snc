/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const snc = require('../snc.js')

snc.all([3,2,1], (element, index, done) => {
  setTimeout(() => {
    console.log(element)
    done(element)
  }, element * 1000)
},
res => {
  console.log(`Reponse: ${JSON.stringify(res)}`)
})
