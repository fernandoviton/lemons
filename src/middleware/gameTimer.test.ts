// import { Action, pauseTime, startTime } from "../actions";
// import { forgetActiveTimer, hasActiveTimer, onTimeInterval, timerSideEffect } from "./gameTimer";

jest.useFakeTimers();

// tslint:disable:no-empty

describe('GameTimer', () => {
    it ('when at start, calls nextDay', () => {

    })
});


// describe('GameTimer', () => {
//     beforeEach(() => {
//         forgetActiveTimer();
//         jest.clearAllMocks();
//     });

//     it ('if not already started, startTime calls setInterval', () => {
//         timerSideEffect({}, {}, (action: Action) => {}, startTime());
//         expect(setInterval).toHaveBeenCalledTimes(1);
//         expect(setInterval).toHaveBeenCalledWith(onTimeInterval, 500);
//         expect(hasActiveTimer()).toBe(true);
//     });

//     it ('if not already started, pauseTime does not call clearInterval', () => {
//         timerSideEffect({}, {}, (action: Action) => {}, pauseTime());
//         expect(clearInterval).not.toHaveBeenCalled();
//         expect(hasActiveTimer()).toBe(false);
//     });

//     describe ('if already started', () => {
//         beforeEach(() => {
//             timerSideEffect({}, {}, (action: Action) => {}, startTime());
//             jest.clearAllMocks();
//         });

//         it ('starTime does not call setInterval', () => {
//             timerSideEffect({}, {}, (action: Action) => {}, startTime());
//             expect(setInterval).not.toHaveBeenCalled();
//         });

//         it ('pauseTime calls clearInterval', () => {
//             timerSideEffect({}, {}, (action: Action) => {}, pauseTime());
//             expect(clearInterval).toHaveBeenCalledTimes(1);
//             expect(hasActiveTimer()).toBe(false);
//         });
//     });
// });