/**
 * Created by hlomzik on 6.03.15.
 */
window.Timer = function() {
	"use strict";

	/**
	 * Current time in microseconds
	 * @returns {number} ms
	 */
	function getCurrentTime() {
		return +new Date();
	}
	
	var Timer = function() {
		this.elapsed = 0;
		this.checkpoint = 0;
		this.started = false;
		
		this.timeouts = [];
		this.intervals = [];
	};
	
	Timer.prototype = {
		start: function() {
			this.checkpoint = getCurrentTime();
			this.started = true;
		},
		stop: function() {
			this.elapsed += this.getSessionTime();
			this.checkpoint = 0;
			this.started = false;
		},
		getSessionTime: function() {
			if (this.started) {
				return getCurrentTime() - this.checkpoint;
			} else {
				return 0;
			}
		},
		getElapsedTime: function() {
			return this.elapsed + this.getSessionTime();
		},
		setTimeout: function(f, time) {
			var uid = 0;
			// @todo shim for Function.bind()
			var wrapper = (function() {
				setTimeout(f, 0);
				this.clearTimeout(uid);
			}).bind(this);
			uid = setTimeout(wrapper, time);
			this.timeouts[uid] = [ wrapper, time, this.getElapsedTime() ];
			return uid;
		},
		clearTimeout: function(uid) {
			delete this.timeouts[uid];
			clearTimeout(uid);
		},
		setInterval: function() {
			// @todo implement
		},
		clearInterval: function(uid) {
			// @todo implement
		}
	};
	
	return Timer;
}();
