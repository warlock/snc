const tck = require('tck')

const snc = {
  each: (array, callback, response) => {
    var i = 0
    var store = []
    const done = data => {
      if (tck.isSet(data)) store[i-1] = data

      if (i < array.length) {
        var y = i
        i++
        callback(array[y], y, done, end)
      } else if (tck.isSet(response) && tck.isFunction(response)) response(store)
    }

    const end = data => {
      if (tck.isSet(response) && tck.isFunction(response)) response(data)
    }

    if (i < array.length) done()
    else if (tck.isSet(response) && tck.isFunction(response)) response(store)
  },
  waterfall: (callbacks, response) => {
    var i = 0
    const done = (data, respdata) => {
      if (i < callbacks.length-1) {
        i++
        if (tck.isSet(data)) {
          if (data === true) {
            if (tck.isSet(response) && tck.isFunction(response)) response(respdata)
          } else callbacks[i](done, data)
        } else callbacks[i](done)
      } else {
        if (tck.isSet(response) && tck.isFunction(response)) {
          if (tck.isSet(data)) {
            if (data === true) response(respdata)
            else response(data)
          } else response()
        }
      }
    }

    if (tck.isSet(callbacks) && tck.isArray(callbacks)) callbacks[i](done)
  },
  forever: (callback, response) => {
    const end = data => {
      if (tck.isSet(response) && tck.isFunction(response)) response(data)
    }
    const next = () => {
      callback(next, end)
    }
    callback(next, end)
  },
  parallelLimit: (limit, callbacks, response) => {
    var it = 0;
    var to = callbacks.length;
    var store = [];
    const async = ix => {
      const done = data => {
        to--
        if (tck.isSet(data)) store[ix] = data
        if (it !== callbacks.length) {
          async(it)
          it++
        } else if (to === 0 && tck.isSet(response) && tck.isFunction(response)) response(store)
      }
      callbacks[ix](done)
    }

    if (tck.isSet(callbacks) && tck.isArray(callbacks)) {
      for (let i = 0; i < limit; i++) {
        async(i)
        it++
      }
    }
  },
  forSync: (ini, fin, inc, callback, end) => {
    var store = []
    const done = data => {
      if (tck.isSet(data)) store.push(data)
      if (ini < fin) {
        ini = ini + inc
        callback(ini, done, end)
      } else if (tck.isSet(end) && tck.isFunction(end)) end(store)
    }
    callback(ini, done, end)
  },
  eachParallelLimit: (array, limit, callback, response) => {
    var it = 0
    var to = array.length
    var store = []
    const async = (item, index) => {
      const done = data => {
        to--
        if (tck.isSet(data)) store[index] = data
        if (it !== array.length) {
          async(array[it], it)
          it++
        } else if (to === 0 && tck.isSet(response) && tck.isFunction(response)) response(store)
      }

      const end = data => {
        if (tck.isSet(response) && tck.isFunction(response)) response(data)
      }

      callback(item, index, done, end)
    }

    if (tck.isSet(array) && tck.isArray(array) && array.length > 0) {
      if (limit > array.length) limit =  array.length
      for (let i = 0; i < limit; i++) {
        async(array[i], i)
        it++
      }
    } else if (tck.isSet(response) && tck.isFunction(response)) response(store)
  },
  times: (fin, callback, end) => {
    snc.forSync(0, fin-1, 1, callback, end)
  },
  parallel: (callbacks, response) => {
    var it = 0
    var store = []
    const async = ix => {
      const done = data => {
        if (tck.isSet(data)) store[ix] = data
        if (it < callbacks.length -1) it++
        else {
          if (tck.isSet(response) && tck.isFunction(response)) response(store)
        }
      }
      callbacks[ix](done)
    }

    if (tck.isSet(callbacks) && tck.isArray(callbacks)) {
      for (let i = 0; i < callbacks.length; i++) async(i)
    }
  }
}

snc.eachpl = snc.eachParallelLimit
snc.epl = snc.eachParallelLimit
snc.wf = snc.waterfall
snc.pl = snc.parallelLimit
snc.fe = snc.forever
snc.for = snc.forSync

if (typeof process === 'object') module.exports = snc
