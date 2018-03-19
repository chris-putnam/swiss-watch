import { SwissWatch, ISwissWatchStatus } from '../src/index';
import { expect } from 'chai';
import * as mocha from 'mocha';
import * as sinon from 'sinon';

describe('swiss watch', () => {

    let eventSpy: any, timer: SwissWatch;

    beforeEach(() => {
        eventSpy = {
            start: sinon.spy(),
            finish: sinon.spy(),
            tick: sinon.spy(),
            stop: sinon.spy()
        };
        
        timer = new SwissWatch();

        timer
        .on('start', () => { eventSpy.start(); })
        .on('finish', () => { eventSpy.finish(); })
        .on('stop', () => { eventSpy.stop(); })
        .on('tick', (status: ISwissWatchStatus) => { 
            eventSpy.tick(status);
         });
    });

    // use regular es5 function cb instead of fat arrow notation so I can call this.timeout
    it('should count down', function(done) {
        this.timeout(5000);

        timer.start(3);

        setTimeout(() => {
            expect(eventSpy.tick.called).to.be.true;
            expect(eventSpy.tick.lastCall.args[0]).to.deep.equal({ elapsed: 3, remaining: 0 });
            expect(eventSpy.start.callCount).to.equal(1);
            expect(eventSpy.finish.callCount).to.equal(1);
            expect(eventSpy.stop.callCount).to.equal(1);
            done();
        }, 3500);

    });

    it('should function as a stopwatch', function (done) {
        this.timeout(5000);

        timer.start();

        setTimeout(() => {
            timer.stop();
            expect(eventSpy.tick.called).to.be.true;
            expect(eventSpy.tick.lastCall.args[0]).to.deep.equal({ elapsed: 1, remaining: 0 });
            expect(eventSpy.start.callCount).to.equal(1);
            expect(eventSpy.finish.callCount).to.equal(0);
            expect(eventSpy.stop.callCount).to.equal(1);
            timer.start();

            setTimeout(() => {
                timer.stop();
                expect(eventSpy.tick.called).to.be.true;
                expect(eventSpy.tick.lastCall.args[0]).to.deep.equal({ elapsed: 3, remaining: 0 });
                expect(eventSpy.start.callCount).to.equal(2);
                expect(eventSpy.finish.callCount).to.equal(0);
                expect(eventSpy.stop.callCount).to.equal(2);
                done();
            }, 2600);
        }, 1600);
    });
});