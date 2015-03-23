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

			var old_id, item;
			for (old_id in this.timeouts) {
				if (!this.timeouts.hasOwnProperty(old_id)) continue;
				item = this.timeouts[old_id];
				this.clearTimeout(old_id);
				item[0].start(item[1]);
			}
		},
		stop: function() {
			this.elapsed += this.getSessionTime();
			this.checkpoint = 0;
			this.started = false;
			
			var uid, item;
			for (uid in this.timeouts) {
				if (!this.timeouts.hasOwnProperty(uid)) continue;
				item = this.timeouts[uid];
				item[0].stop();
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
		createWrapper: function(f) {
			var uid = 0;
			var timer = this;
			var wrapper = function() {
				setTimeout(f, 0); // asynchronous call
				timer.clearTimeout(uid);
			};
			wrapper.start = function(time) {
				uid = setTimeout(wrapper, time);
				timer.timeouts[uid] = [ wrapper, time, timer.getElapsedTime() ];
				return uid;
			};
			wrapper.stop = function() {
				var item = timer.timeouts[uid];
				var time = timer.getElapsedTime();
				clearTimeout(uid);
				timer.timeouts[uid] = [ wrapper, item[1] - (time - item[2]), 0 ];
				return uid;
			};
			wrapper.uid = function(id) {
				uid = id;
				return wrapper;
			};
			return wrapper;
		},
		setTimeout: function(f, time) {
			var wrapper = this.createWrapper(f);
			var uid = wrapper.start(time);
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
