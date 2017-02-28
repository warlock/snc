var Snc = function () {
	this.each = function (array, callback, response) {
		var i = 0;
		var stack = [];
		var done = function (data) {
			if (data !== undefined) stack.push(data)
			if (i < array.length) {
				var y = i;
				i++;
				callback(array[y], y, done, end);
			} else if (typeof response === 'function') response(stack);
		};

		var end = function (data) {
			if (typeof response === 'function') response(data);
		};

		if (i < array.length) done();
		else if (typeof response === 'function') response(stack);
	};

	this.wf = this.waterfall = function (callbacks, response) {
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
	};

	this.fe = this.forever = function (callback, response) {
		var end = function (data) {
			if (typeof response === 'function') response(data);
		};
		var next = function () {
			callback(next, end);
		};
		callback(next, end);
	};

	this.parallel = function (callbacks, response) {
		var it = 0;
		var data = [];
		var async = function (ix) {
			setTimeout(function () {
				callbacks[ix](done);
			}, 0);

			var done = function (gdata) {
				if (gdata) data[ix] = gdata;
				if (it < callbacks.length -1) it++;
				else {
					if (typeof response === 'function')response(data);
				}
			};
		};

		if (callbacks instanceof Array) {
			for (var i = 0; i < callbacks.length; i++) async(i);
		}
	};

	this.pl = this.parallelLimit = function (limit, callbacks, response) {
		var it = 0;
		var to = callbacks.length;
		var data = [];
		var async = function (ix) {
			setTimeout(function () {
				callbacks[ix](done);
			}, 0);

			var done = function (gdata) {
				to--;
				if (gdata) data[ix] = gdata;
				if (it !== callbacks.length) {
					async(it);
					it++;
				} else if (to === 0 && typeof response === 'function') response(data);
			};
		};

		if (callbacks instanceof Array) {
			for (var i = 0; i < limit; i++) {
				async(i);
				it++;
			}
		}
	};

	this.epl = this.eachpl = this.eachParallelLimit = function (array, limit, callback, response) {
		var it = 0;
		var to = array.length;
		var data = [];
		var async = function (item, index) {
			setTimeout(function () {
				callback(item, index, done);
			}, 0);

			var done = function (gdata) {
				to--;
				if (gdata) data[index] = gdata;
				if (it !== array.length) {
					async(array[it], it);
					it++;
				} else if (to === 0 && typeof response === 'function') response(data);
			};
		};

		if (array instanceof Array && array.length > 0) {
			if (limit > array.length) limit =  array.length;
			for (var i = 0; i < limit; i++) {
				async(array[i], i);
				it++;
			}
		} else if ( typeof response === 'function') response(data);
	};

	this.for = this.forSync = function (ini, fin, inc, callback, end) {
		var store = [];
		var done = function (data) {
			store.push(data);
			if (ini < fin) {
				ini = ini + inc;
				callback(ini, done, end);
			} else if (typeof end === 'function') end(store);
		};
		callback(ini, done, end);
	};


	this.times = function (fin, callback, end) {
		this.for(0, fin-1, 1, callback, end);
	};
}

if (typeof process === 'object') module.exports = new Snc();
else var sb = new Snc();
