import { EventEmitter } from "events";
import Timer = NodeJS.Timer;

export interface ISwissWatchStatus {
    elapsed: number;
    remaining: number;
}

export class SwissWatch extends EventEmitter {

    private _elapsed: number;
    private _duration: number;
    private _remaining: number;
    private _startTime: number;
    private _lastElapsed: number;
    private _timer: Timer;
    private _interval: number = 100;

    constructor() {
        super();
        this.reset();
    }

    public get elapsed() {
        return this._elapsed;
    }

    public get remaining() {
        return this._remaining;
    }

    public start(duration?: number) {
        this._startTime = this._lastElapsed = this._getNowMs();
        this._duration = this._remaining = duration ||this._duration || 0;
        this._timer = setInterval(() => {
            this._tick();
        }, this._interval);
        this.emit('start');
    }

    public stop() {
        clearInterval(this._timer);
        this.emit('stop');
    }

    public reset() {
        this._elapsed = 0;
    }

    private _tick() {
        const nowSeconds = this._getNowMs();
        const elapsedSinceLastTime = Math.floor((nowSeconds - this._lastElapsed) / 1000);
        if (elapsedSinceLastTime > 0) {
            this._elapsed += elapsedSinceLastTime;
            this._lastElapsed = nowSeconds;
        }
        if (this._duration) {
            this._remaining = this._duration - this._elapsed;
            if (this._remaining <= 0) {
                this.stop();
                this._finish();
            }
        }
        this.emit('tick', this.status);
    }

    private _finish() {
        this.emit('finish');
    }

    public get status(): ISwissWatchStatus {
        return { 
            elapsed: this.elapsed, 
            remaining: this.remaining 
        };
    }

    private _getNowMs() {
        return new Date().getTime();
    }

}