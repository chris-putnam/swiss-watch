# swiss-watch

Basic timer that uses diffs in timestamps instead of relying on setTimeout firing at exact times. Can either work like a regular stop watch, or a count down.

## countdown

```
timer
.on('start', () => { // })
.on('finish', () => { // })
.on('stop', () => { // })
.on('tick', (status: ISwissWatchStatus) => {

});
```