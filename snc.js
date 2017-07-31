/*eslint no-unused-vars: 0*/
var snc = {
  "each": function (array, callback, response) {
    var i = 0;
    var store = [];
    var done = function (data) {
      if (undefined !== data && data !== null) store[i-1] = data;

      if (i < array.length) {
        var y = i;
        i++;
        callback(array[y], y, done, end);
      } else if (typeof response === 'function') response(store);
    };

    var end = function (data) {
      if (typeof response === 'function') response(data);
    };

    if (i < array.length) done();
    else if (typeof response === 'function') response(store);
  },
  "waterfall": function (callbacks, response) {
    var i = 0;
    var done = function (data, respdata) {
      if (i < callbacks.length-1) {
        i++;
        if (data !== null && data !== undefined) {
          if (data === true) {
            if (typeof response === 'function') response(respdata);
          } else callbacks[i](done, data);
        } else callbacks[i](done);
      } else {
        if (typeof response === 'function') {
          if (data !== null && data !== undefined) {
            if (data === true) response(respdata);
            else response(data);
          } else response();
        }
      }
    };
    if (callbacks instanceof Array) callbacks[i](done);
  },
  "forever": function (callback, response) {
    var end = function (data) {
      if (typeof response === 'function') response(data);
    };
    var next = function () {
      callback(next, end);
    };
    callback(next, end);
  },
  "parallelLimit": function (limit, callbacks, response) {
    var it = 0;
    var to = callbacks.length;
    var store = [];
    var async = function (ix) {
      var done = function (data) {
        to--;
        if (data !== null && data !== undefined) store[ix] = data;
        if (it !== callbacks.length) {
          async(it);
          it++;
        } else if (to === 0 && typeof response === 'function') {
          response(store);
        }
      };
      callbacks[ix](done);
    };

    if (callbacks instanceof Array) {
      for (var i = 0; i < limit; i++) {
        async(i);
        it++;
      }
    }
  },
  "forSync": function (ini, fin, inc, callback, end) {
    var store = [];
    var done = function (data) {
      if (data !== null && data !== undefined) store.push(data);
      if (ini < fin) {
        ini = ini + inc;
        callback(ini, done, end);
      } else if (typeof end === 'function') end(store);
    };
    callback(ini, done, end);
  },
  "eachParallelLimit": function (array, limit, callback, response) {
    var it = 0;
    var to = array.length;
    var store = [];
    var async = function (item, index) {
      var done = function (data) {
        to--;
        if (data !== null && data !== undefined) store[index] = data;
        if (it !== array.length) {
          async(array[it], it);
          it++;
        } else if (to === 0 && typeof response === 'function') response(store);
      };

      var end = function (data) {
        if (typeof response === 'function') response(data);
      };

      callback(item, index, done, end);
    };

    if (array instanceof Array && array.length > 0) {
      if (limit > array.length) limit =  array.length;
      for (var i = 0; i < limit; i++) {
        async(array[i], i);
        it++;
      }
    } else if ( typeof response === 'function') response(store);
  },
  "times": function (fin, callback, end) {
    snc.forSync(0, fin-1, 1, callback, end);
  },
  "parallel": function (callbacks, response) {
    var it = 0;
    var store = [];
    var async = function (ix) {
      var done = function (data) {
        if (data !== null && data !== undefined) store[ix] = data;
        if (it < callbacks.length -1) it++;
        else {
          if (typeof response === 'function') response(store);
        }
      };
      callbacks[ix](done);
    };

    if (callbacks instanceof Array) {
      for (var i = 0; i < callbacks.length; i++) async(i);
    }
  }
};

snc.eachpl = snc.eachParallelLimit;
snc.epl = snc.eachParallelLimit;
snc.wf = snc.waterfall;
snc.pl = snc.parallelLimit;
snc.fe = snc.forever;
snc.for = snc.forSync;

if (typeof process === 'object') module.exports = snc;
