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
		createWrapper: function(f, time) {
			var uid = 0;
			var timer = this;
			var wrapper = function() {
				setTimeout(f, 0); // asynchronous call
				timer.clearTimeout(uid);
			};
			wrapper.uid = function(id) {
				uid = id;
				return wrapper;
			};
			return wrapper;
		},
		setTimeout: function(f, time) {
			var wrapper = this.createWrapper(f, time);
			var uid = setTimeout(wrapper, time);
			wrapper.uid(uid);
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
