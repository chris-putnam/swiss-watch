"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var SwissWatch = /** @class */ (function (_super) {
    __extends(SwissWatch, _super);
    function SwissWatch() {
        var _this = _super.call(this) || this;
        _this._interval = 100;
        _this.reset();
        return _this;
    }
    Object.defineProperty(SwissWatch.prototype, "elapsed", {
        get: function () {
            return this._elapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwissWatch.prototype, "remaining", {
        get: function () {
            return this._remaining;
        },
        enumerable: true,
        configurable: true
    });
    SwissWatch.prototype.start = function (duration) {
        var _this = this;
        this._startTime = this._lastElapsed = this._getNowMs();
        this._duration = this._remaining = duration || this._duration || 0;
        this._timer = setInterval(function () {
            _this._tick();
        }, this._interval);
        this.emit('start');
    };
    SwissWatch.prototype.stop = function () {
        clearInterval(this._timer);
        this.emit('stop');
    };
    SwissWatch.prototype.reset = function () {
        this._elapsed = 0;
    };
    SwissWatch.prototype._tick = function () {
        var nowSeconds = this._getNowMs();
        var elapsedSinceLastTime = Math.floor((nowSeconds - this._lastElapsed) / 1000);
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
    };
    SwissWatch.prototype._finish = function () {
        this.emit('finish');
    };
    Object.defineProperty(SwissWatch.prototype, "status", {
        get: function () {
            return {
                elapsed: this.elapsed,
                remaining: this.remaining
            };
        },
        enumerable: true,
        configurable: true
    });
    SwissWatch.prototype._getNowMs = function () {
        return new Date().getTime();
    };
    return SwissWatch;
}(events_1.EventEmitter));
exports.SwissWatch = SwissWatch;
