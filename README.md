# swiss-watch

Basic timer that uses diffs in timestamps instead of relying on setTimeout firing at exact times. Can either work like a regular stop watch, or a count down.

## countdown

```
var timer = new SwissWatch();

timer
.on('start', () => { // })
.on('finish', () => { // will be called after 60 seconds })
.on('stop', () => { // })
.on('tick', (status: ISwissWatchStatus) => {

}).start(60);
```

## timer

```
var timer = new SwissWatch();

timer
.on('start', () => { // })
.on('finish', () => { // })
.on('stop', () => { // })
.on('tick', (status: ISwissWatchStatus) => {

}).start();

setTimeout(() => {
    timer.stop();
}, 5000);
```