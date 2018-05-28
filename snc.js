/* exported snc */
const snc = {
  each: function (array, callback) {
    return new Promise((resolve) => {
      var i = 0
      var store = []
      const end = resolve
      const done = (data) => {
        if (undefined !== data && data !== null) store[i-1] = data
  
        if (i < array.length) {
          var y = i
          i++
          setTimeout(() => {
            callback(array[y], y, done, end)
          }, 0)
        } else resolve(store)
      }
  
      if (i < array.length) done()
      else resolve(store)
    })
  },
  waterfall: function (callbacks, response) {
    var i = 0
    var done = function (data, respdata) {
      if (i < callbacks.length-1) {
        i++
        if (data !== null && data !== undefined) {
          if (data === true) {
            if (typeof response === 'function') response(respdata)
          } else {
            setTimeout(function () {
              callbacks[i](done, data)
            }, 0)
          }
        } else {
          setTimeout(function () {
            callbacks[i](done)
          }, 0)
        }
      } else {
        if (typeof response === 'function') {
          if (data !== null && data !== undefined) {
            if (data === true) response(respdata)
            else response(data)
          } else response()
        }
      }
    }
    if (callbacks instanceof Array) {
      setTimeout(function () {
        callbacks[i](done)
      }, 0)
    }
  },
  forever: function (callback, response) {
    var end = function (data) {
      if (typeof response === 'function') response(data)
    }

    var next = function () {
      setTimeout(function () {
        callback(next, end)
      }, 0)
    }

    callback(next, end)
  },
  parallelLimit: function (limit, callbacks, response) {
    var it = 0
    var to = callbacks.length
    var store = []
    var async = function (ix) {
      var done = function (data) {
        to--
        if (data !== null && data !== undefined) store[ix] = data
        if (it !== callbacks.length) {
          async(it)
          it++
        } else if (to === 0 && typeof response === 'function') {
          response(store)
        }
      }
      setTimeout(function () {
        callbacks[ix](done)
      }, 0)
    }

    if (callbacks instanceof Array) {
      for (var i = 0; i < limit; i++) {
        async(i)
        it++
      }
    }
  },
  forSync: function (ini, fin, inc, callback, response) {
    var i = ini
    var store = []
    var end = function (data) {
      if (typeof response === 'function') response(data)
    }

    var done = function (data) {
      if (undefined !== data && data !== null) store.push(data)
      i += inc
      if (i < fin) {
        setTimeout(function () {
          callback(i, done, end)
        }, 0)
      } else end(store)
    }

    if (i < fin) callback(i, done, end)
    else end()
  },
  eachParallelLimit: function (array, limit, callback, response) {
    var it = 0
    var to = array.length
    var store = []
    var async = function (item, index) {
      var done = function (data) {
        to--
        if (data !== null && data !== undefined) store[index] = data
        if (it !== array.length) {
          async(array[it], it)
          it++
        } else if (to === 0 && typeof response === 'function') response(store)
      }

      var end = function (data) {
        if (typeof response === 'function') response(data)
      }

      setTimeout(function () {
        callback(item, index, done, end)
      }, 0)
    }

    if (array instanceof Array && array.length > 0) {
      if (limit > array.length) limit =  array.length
      for (var i = 0; i < limit; i++) {
        async(array[i], i)
        it++
      }
    } else if ( typeof response === 'function') response(store)
  },
  times: function (fin, callback, end) {
    snc.forSync(0, fin-1, 1, callback, end)
  },
  parallel: function (callbacks, response) {
    var it = 0
    var store = []
    var async = function (ix) {
      var done = function (data) {
        if (data !== null && data !== undefined) store[ix] = data
        if (it < callbacks.length -1) it++
        else {
          if (typeof response === 'function') response(store)
        }
      }
      setTimeout(function () {
        callbacks[ix](done)
      }, 0)
    }

    if (callbacks instanceof Array) {
      for (var i = 0; i < callbacks.length; i++) {
        async(i)
      }
    }
  },
  all: function (array, callback, response) {
    var it = 0
    var store = []
    var async = function (index) {
      var done = function (data) {
        it++
        if (data !== null && data !== undefined) store[index] = data
        if (it === array.length && typeof response === 'function') response(store)
      }

      setTimeout(function () {
        callback(array[index], index, done)
      }, 0)
    }

    if (array instanceof Array && array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        async(i)
      }
    } else if (typeof response === 'function') response(store)
  },
  foreverParallel: function (limit, callback, response) {
    var counter = 0
    var endcounter = 0
    var end = function (data) {
      endcounter++
      if (typeof response === 'function' && endcounter === limit) response(data)
    }

    var done = function () {
      setTimeout(function () {
        counter++
        callback(counter, done, end)
      }, 0)
    }

    for (var i = 0; i < limit; i++) {
      done()
    }
  },
  now: function (operation, response) {
    var then = function (data) {
      if (typeof response === 'function') response(data)
    }
    operation(then)
  },
  interval: function (time, operation, response) {
    var inter = null

    var end = function (data) {
      clearInterval(inter)
      if (typeof response === 'function') response(data)
    }

    inter = setInterval(function () {
      operation(end)
    }, time)

  }
}

snc.eachpl = snc.eachParallelLimit
snc.epl = snc.eachParallelLimit
snc.wf = snc.waterfall
snc.pl = snc.parallelLimit
snc.fe = snc.forever
snc.for = snc.forSync
snc.p = snc.parallel
snc.map = snc.all
snc.fp = snc.foreverParallel

if (typeof process === 'object') module.exports = snc
