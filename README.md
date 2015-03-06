# timer
Simple js timer. Useful for casual games and any other activities which could be paused.

Usage sample:

```js
var timer = new Timer;

timer.start();
/* your code with some calls of timer.stop() and timer.start() */
timer.getElapsedTime(); // counted time
```

## Methods
### start()
Start or resume the timer

### stop()
Pause timer

### getElapsedTime()
Get all the time was counted by timer

### getSessionTime()
Time elapsed from last start() call

## Planned
### setTimeout()
### setInterval()
