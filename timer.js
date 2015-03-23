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
		
		this.counter = 0;
		this.timeouts = [];
		this.intervals = [];
	};
	
	Timer.prototype = {
		start: function() {
			this.checkpoint = getCurrentTime();
			this.started = true;
			
			for (var uid in this.timeouts) {
				if (!this.timeouts.hasOwnProperty(uid)) continue;
				this.timeouts[uid].start();
			}
		},
		stop: function() {
			this.elapsed += this.getSessionTime();
			this.checkpoint = 0;
			this.started = false;
			
			for (var uid in this.timeouts) {
				if (!this.timeouts.hasOwnProperty(uid)) continue;
				this.timeouts[uid].stop();
			}
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
			var uid = this.counter++;
			var timer = this;
			var wrapper = function() {
				setTimeout(f, 0); // asynchronous call
				timer.clearTimeout(uid);
			};
			wrapper.sid = 0; // system setTimeout() id
			wrapper.uid = uid;
			wrapper.time = time;
			wrapper.start = function() {
				wrapper.sid = setTimeout(wrapper, wrapper.time);
				wrapper.started = timer.getElapsedTime();
				return wrapper.sid;
			};
			wrapper.stop = function() {
				clearTimeout(wrapper.sid);
				wrapper.time -= timer.getElapsedTime() - wrapper.started;
				wrapper.started = 0;
				wrapper.sid = 0;
			};
			timer.timeouts[uid] = wrapper;
			return wrapper;
		},
		setTimeout: function(f, time) {
			var wrapper = this.createWrapper(f, time);
			wrapper.start();
			return wrapper.uid;
		},
		clearTimeout: function(uid) {
			this.timeouts[uid].stop();
			delete this.timeouts[uid];
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
