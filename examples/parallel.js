/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const { parallel } = require('../snc.js')

parallel(
  [
    done => {
      setTimeout(() => {
        console.log(`hi 3!`)
        done(`a`)
      }, 3000)
    },
    done => {
      setTimeout(() => {
        console.log(`hi 2!`)
        done(`b`)
      }, 2000)
    },
    done => {
      setTimeout(() => {
        console.log(`hi 1!`)
        done(`c`)
      }, 1000)
    }
  ],
  data => {
    console.log(`End: ${JSON.stringify(data)}`)
  })
