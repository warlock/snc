/*eslint no-unused-vars: 0*/
var snc = {
  "each": function (array, callback, response) {
    var i = 0;
    var store = [];
    var done = function (data) {
      if (data) store[i] = data;
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
        if (data) {
          if (data === true) {
            if (typeof response === 'function') response(respdata);
          } else callbacks[i](done, data);
        } else callbacks[i](done);
      } else {
        if (typeof response === 'function') {
          if (data) {
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
        if (data) store[ix] = data;
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
      if (data) store[ini] = data;
      if (ini < fin-1) {
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
        if (data) store[index] = data;
        if (it !== array.length) {
          async(array[it], it);
          it++;
        } else if (to === 0 && typeof response === 'function') response(store);
      };
      callback(item, index, done);
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
    this.for(0, fin, 1, callback, end);
  },
  "parallel": function (callbacks, response) {
    var it = 0;
    var store = [];
    var async = function (ix) {
      var done = function (data) {
        if (data) store[ix] = data;
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
  },
  "eachpl": snc.eachParallelLimit,
  "epl": snc.eachParallelLimit,
  "wf": snc.waterfall,
  "pl": snc.parallelLimit,
  "fe": snc.forever,
  "for": snc.forSync
};

if (typeof process === 'object') module.exports = snc;
