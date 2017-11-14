/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0, semi: 0, arrow-parens: 0 */

const snc = require('../snc.js');
const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

/*
snc.each(list, (item, index, next, end) => {
  console.log(`item: ${item}`)
  setTimeout(next, 3000)
},
() => {
  console.log(`End`)
})
*/

/*
snc.epl(list, 2, (item, index, next) => {
  console.log(`item: ${item}`)
  setTimeout(next, 2000)
},
() => {
  console.log(`End`)
})
*/

/*
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
*/

/*
snc.parallel(
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
*/

/*
var i = 0;
snc.fe((repeat, end) => {
  console.log(`loop: ${i}`)
  if (i>=3) end(`Now Break!!`)
  else {
    i++;
    setTimeout(repeat, 3000)
  }
}, data => {
  console.log(`Response: ${data}`)
});
*/

/*
snc.pl(2,
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
*/

/*
snc.times(5, (index, next, end) => {
  console.log(`iterator: ${index}`)
  setTimeout(() => {
    if (index === 3) end()
    else next()
  }, index*1000);
},
() => {
  console.log(`End!`)
})
*/

/*
snc.times(5, (index, next, end) => {
  console.log(`iterator: ${index}`)
  setTimeout(() => {
    next()
  }, 1000);
},
() => {
  console.log(`End!`)
})
*/

/*
snc.for(0, 10, 1, (index, next, end) => {
  console.log(index)
  setTimeout(() => {
    next(5)
  }, 1000)
}, data => {
  console.log(`LENGTH: ${data.length} -> ${JSON.stringify(data)}`)
})
*/

/*
snc.for(1, 10, 2, (index, next, end) => {
  console.log(index)
  setTimeout(() => {
    next(index)
  }, 1000)
}, data => {
  console.log(data)
})
*/

snc.all([3,2,1], (element, index, done) => {
  setTimeout(() => {
    console.log(element)
    done(element)
  }, element * 1000)
},
res => {
  console.log(`Reponse: ${JSON.stringify(res)}`)
})
