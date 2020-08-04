snc
===
> Asyncronous Iterators Collection

http://snc.js.gl

## INSTALL/DOWNLOAD
http://npmjs.com/package/snc

```sh
npm install snc
```

## Node.Js : Import module:
```javascript
const snc = require("snc")
```

## Web : Import module:
```html
<script src="snc/snc.js"></script>
```

# Http CDN
* [https://cdn.jsdelivr.net/npm/snc@latest](https://cdn.jsdelivr.net/npm/snc@latest)
* [https://raw.githubusercontent.com/warlock/snc/master/snc.js](https://raw.githubusercontent.com/warlock/snc/master/snc.js)
* [https://unpkg.com/snc](https://unpkg.com/snc)

**snc.each(array, callback_loop(item, index, next_method, end_method), callback_end)**

Runs next function when "next" method is executed.
```javascript
const list = ['a', 'b', 'c']

snc.each(list, (item, index, next, end) => {
  console.log(`item: ${item}`)
  setTimeout(next, 3000)
}, () => {
  console.log(`End`)
})
```
```
-> item: a // Wait 3 seconds
-> item: b // Wait 3 seconds
-> item: c // Wait 3 seconds
-> End
```

Call "end" method for break the loop.
```javascript
const list = ['a', 'b', 'c']

snc.each(list, (item, index, next, end) => {
  console.log(`item: ${item}`)
  setTimeout(() => {
    if (index === 1) end(`Bye!`)
    else next()
  }, 3000)
}, data => {
  if (data) console.log(`End: ${data}`)
  else console.log(`End`)
})
```
```
-> item: a // Wait 3 seconds
-> item: b // Wait 3 seconds
-> End: Bye!
```

**snc.eachParallelLimit(array, number_limit, callback_loop(item, index, next_method), callback_end)**

Runs in parallel limit and next loop when "next" method is executed. Alternative names: eachpl, epl.
```javascript
const list = ['a', 'b', 'c', 'd']
snc.epl(list, 2, (item, index, next) => {
  console.log(`item: ${item}`)
  setTimeout(next, 2000)
}, () => {
  console.log(`End`)
})
```
```
-> item: a
-> item: b
-> item: c // Next to start when next method executed
-> item: d // Next to start when next method executed
-> End
```

**snc.waterfall(array_functions(done, data), callback_end)**

Runs next function when "done" method is executed.
Alternative name: wf.
```javascript
snc.waterfall([
  done => {
    console.log(`fire`)
    done(5)
  },
  (done, data) => {
    console.log(`ice: ${data}`)
    done(`win`)
  }
], data => {
  console.log(`End: ${data}`)
})
```
```
-> fire
-> ice: 5
-> End: win
```

Break the waterfall with "true".
```javascript
snc.wf([
  done => {
    console.log(`fire`)
    done(true, 5)
  },
  (done, data) => {
    console.log(`ice: ${data}`)
    done(`win`)
  }
], data => {
  console.log(`End: ${data}`)
})
```
```
-> fire
-> End: 5
```


**snc.parallel(array_functions(done), callback_end(data))**

Run functions in parallel and then execute "callback_end".
Alternative name: p.

```javascript
snc.parallel([
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
],data => {
  console.log(`End: ${JSON.stringify(data)}`)
})
```
```
//Wait 1 second
-> hi 1! //Wait 1 second
-> hi 2! //Wait 1 second
-> hi 3!
-> End: ["a","b","c"]
```

**snc.parallelLimit(number, array_functions(done), callback_end(data))**

Run limit of functions in parallel and then execute "callback_end". Alternative name : pl
```javascript
snc.pl(2, [
  done => {
    setTimeout(() => {
      console.log("go 1!")
      done("a")
    }, 1000)
  },
  done => {
    setTimeout(() => {
      console.log("go 2!")
      done("b")
    }, 3000)
  },
  done => {
    setTimeout(() => {
      console.log("go 3!")
      done("c")
    }, 1000)
  },
  done => {
    setTimeout(() => {
      console.log("go 4!")
      done("a2")
    }, 3000)
  },
  done => {
    setTimeout(() => {
      console.log("go 5!")
      done("b2")
    }, 1000)
  },
  done => {
    setTimeout(() => {
      console.log("go 6!")
      done("c2")
   }, 3000)
  },
  done => {
    setTimeout(() => {
      console.log("go 7!")
      done("a3")
    }, 1000)
  },
  done => {
    setTimeout(() => {
      console.log("go 8!")
      done("b3")
    }, 3000)
  },
  done => {
    setTimeout(() => {
       console.log("go 9!")
       done("c3")
    }, 1000)
  }
],data => {
  console.log(`we: ${JSON.stringify(data)}`)
})
```
```
-> go 1!
-> go 3!
-> go 2!
-> go 5!
-> go 4!
-> go 7!
-> go 6!
-> go 9!
-> go 8!
-> we: ["a","b","c","a2","b2","c2","a3","b3","c3"]
```

**snc.forever(callback(repeat, end), callback_end)**

Loops syncronous forever.
Alternative name: fe.

```javascript
snc.forever((repeat, end) => {
  console.log(`Hi!`)
  setTimeout(repeat, 3000)
})
```
```
-> Hi! // Wait 3 seconds
-> Hi! // Wait 3 seconds
-> ...
```

Breaking forever loop.
```javascript
const i = 0
snc.fe((repeat, end) => {
  console.log(`loop: ${i}`)
  if (i>=3) end(`Now Break!!!`)
  i++
  setTimeout(repeat, 3000)
}, data => {
  console.log(`Response: ${data}`)
})
```
```
-> loop: 0 // Wait 3 seconds
-> loop: 1 // Wait 3 seconds
-> loop: 2 // Wait 3 seconds
-> loop: 3 // Wait 3 seconds
-> Response: Now Break!!
```

**snc.foreverParallel(limit, callback(counter, done), callback_end(data))**

Forever loop with parallel limit.
Alternative name: fp.

```javascript
snc.fp(2, (counter, done, end) => {
  console.log(counter)
  if (counter < 6 ) {
    setTimeout(() => {
      done()
    }, 3000)
  } else end('bye!')
},
data => {
  console.log(`END: ${data}`)
})
```

```
-> 1
-> 2
-> 3 // Wait 3 seconds
-> 4 // Wait 3 seconds
-> 5 // Wait 6 seconds
-> 6 // Wait 6 seconds
-> 7 // Wait 9 seconds
-> END: bye bye! // Wait 9 seconds
```

**snc.times(number, callback(index, next, end), end)**

Iterates function "number" times.
```javascript
snc.times(5, (index, next, end) => {
  console.log(`Iterator ${index}`)
  next()
},
() => {
  console.log('End')
})
```
```
-> Iterator 0
-> Iterator 1
-> Iterator 2
-> Iterator 3
-> Iterator 4
-> End
```

**snc.for(initial, final, increment, callback(index, next, end), callback_end(data))**

Syncronous "for" iterator.
Alternative name: forSync.

```javascript
snc.for(0, 10, 1, (index, next, end) => {
  console.log(index)
  setTimeout(() => {
    next(5)
  }, 1000)
}, data => {
  console.log(`LENGTH: ${data.length} -> ${JSON.stringify(data)}`)
})
```
```
-> 0
-> 1
-> 2
-> 3
-> 4
-> 5
-> 6
-> 7
-> 8
-> 9
-> LENGTH: 10 -> [5,5,5,5,5,5,5,5,5,5]
```

```javascript
snc.for(1, 10, 2, (index, next, end) => {
  console.log(index)
  setTimeout(() => {
    next(index)
  }, 1000)
}, data => {
  console.log(data)
})
```
```
-> 1
-> 3
-> 5
-> 7
-> 9
-> [ 1, 3, 5, 7, 9 ]
```

**snc.all(array, callback(element, done))**

Execute all elements in array in parallel. And get all responses in order.
Alternative name: map.

```javascript
snc.all([3,2,1], (element, index, done) => {
  setTimeout(() => {
    console.log(element)
    done(element)
  }, element * 1000)
},
res => {
  console.log(`Reponse: ${JSON.stringify(res)}`)
})
```

```
-> 1
-> 2
-> 3
-> [3,2,1]
```

**snc.now(function, callback(data))**

Execute now and then execute callback.

```javascript
snc.now(then => {
  console.log('Now')

  setTimeout(() => {
    then('End...')
  }, 3000)
},
res => {
  console.log(`Reponse: ${JSON.stringify(res)}`)
})
```

```
-> Now
-> Response: "End..."
```

**snc.interval(function, end(data))**

Execute in time intervals and break with end function.

```javascript
var i = 0
snc.interval(2000, end => {
  console.log(`Executed: ${new Date()}`)
  i++
  if (i === 3) end('Bye bye')
},
res => {
  console.log(`End: ${res}`)
})
```

```
-> Executed: Thu Feb 01 2018 13:54:27 GMT+0100 (CET)
-> Executed: Thu Feb 01 2018 13:54:29 GMT+0100 (CET)
-> Executed: Thu Feb 01 2018 13:54:31 GMT+0100 (CET)
-> Response: "End..."
```



## License
All the code here is under MIT license. Which means you could do virtually anything with the code.
I will appreciate it very much if you keep an attribution where appropriate.

The MIT License (MIT)
Copyright (c) 2015 Josep Subils (js@js.gl)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
