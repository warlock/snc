/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */
const { pl } = require('../snc.js')

pl(2,
  [
    done => {
      setTimeout(() => {
        console.log(`go 1!`)
        done(`a`)
      }, 1000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 2!`)
        done(`b`)
      }, 3000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 3!`)
        done(`c`)
      }, 1000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 4!`)
        done(`a2`)
      }, 3000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 5!`)
        done(`b2`)
      }, 1000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 6!`)
        done(`c2`)
      }, 3000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 7!`)
        done(`a3`)
      }, 1000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 8!`)
        done(`b3`)
      }, 3000)
    },
    done => {
      setTimeout(() => {
        console.log(`go 9!`)
        done(`c3`)
      }, 1000)
    }
  ],
  data => {
    console.log(`we: ${JSON.stringify(data)}`)
  })
