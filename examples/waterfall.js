/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const snc = require('../snc.js')

snc.waterfall([
  done => {
    console.log(`fire`)
    done(5)
  },
  (done, data) => {
    console.log(`ice1: ${data}`)
    done(true, "win")
  },
  (done, data) => {
    console.log(`ice2: ${data}`)
    setTimeout(() => {
      done("win")
    }, 2000)
  },
  (done, data) => {
    console.log(`ice3: ${data}`)
    done("win")
  },
  (done, data) => {
    console.log(`ice4: ${data}`)
    done("win")
  }
],
data => {
  console.log(`End: ${data}`)
})
