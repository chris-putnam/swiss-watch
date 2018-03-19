/// <reference types="node" />
import { EventEmitter } from "events";
export interface ISwissWatchStatus {
    elapsed: number;
    remaining: number;
}
export declare class SwissWatch extends EventEmitter {
    private _elapsed;
    private _duration;
    private _remaining;
    private _startTime;
    private _lastElapsed;
    private _timer;
    private _interval;
    constructor();
    readonly elapsed: number;
    readonly remaining: number;
    start(duration?: number): void;
    stop(): void;
    reset(): void;
    private _tick();
    private _finish();
    readonly status: ISwissWatchStatus;
    private _getNowMs();
}
