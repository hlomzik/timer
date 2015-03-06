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
		}
	};
	
	return Timer;
}();
