import { buyItem, passTime, pauseTime, startTime } from '../actions';
import { hasDayEnded } from '../store';
import reducer from './';
import defaultState from './initialState';

describe('BuyItem', () => {
    it ('updates inventory with bought item amount', () =>
        expect(reducer(defaultState, buyItem('lemons', 2, .5)).inventory.lemons)
            .toEqual(defaultState.inventory.lemons + 2));

    it ('removes money', () =>
        expect(reducer(defaultState, buyItem('lemons', 4, .5)).money)
            .toEqual(defaultState.money - .5));
});

// describe('NextDay', () => {
//     const checkDayForNewDay = (day: Day) => {
//         expect(day.actualSoldCount).toBe(0);
//         expect(day.lemonadePitchers).toBe(0);
//         expect(day.potentialSoldCount).toBeGreaterThan(0);
//     }
//     const stateAtDayEnd = {
//         ...defaultState,
//         currentTime: defaultState.config.dayLength - 1,
//     };
//     const stateDuringDay = {
//         ...defaultState,
//         currentTime: defaultState.config.dayLength + 1,
//     };

//     it ('when no current day, sets day', () =>
//         checkDayForNewDay(reducer(defaultState, nextDay()).day));

//     it ('when at end of current day, resets new day using current time', () =>
//         checkDayForNewDay(reducer(stateAtDayEnd, nextDay()).day));

//     it ('when in middle of day, doesnt change day', () =>
//         expect(reducer(stateDuringDay, nextDay()).day).toEqual(stateDuringDay.day))
// });

describe('PassTime', () => {
    describe('currentTime', () => {
        it ('with 1 tick increments by 1', () =>
            expect(reducer(defaultState, passTime(1)).currentTime)
                .toBe(defaultState.currentTime + 1))
        it ('with >1 ticks is not implemented', () =>
            expect(() => reducer(defaultState, passTime(2)).currentTime)
                .toThrow())
        it ('with <1 ticks is not valid', () =>
            expect(() => reducer(defaultState, passTime(0)).currentTime)
                .toThrow())
    }),
    describe('day', () => {
        const stateEndOfDay = {
            ...defaultState,
            config: {
                ...defaultState.config,
                dayLength: 10,
            },
            currentTime: 9,
            day: {
                ...defaultState.day,
                actualSoldCount: 50,
                potentialSoldCount: 100,
            },
        };
        const stateDuringDay = {
            ...stateEndOfDay,
            currentTime: 5,
            day: {
                ...defaultState.day,
                actualSoldCount: 10,
                potentialSoldCount: 100,
            },
        };
        it ('when currentTime is within a day, no change to day data ', () => {
            expect(reducer(stateDuringDay, passTime(1)).day).toEqual(stateDuringDay.day);
        });
        it ('when currentTime goes to start of a new day, day is reset', () => {
            expect(reducer(stateEndOfDay, passTime(1)).day.actualSoldCount).toBe(0);
            expect(reducer(stateEndOfDay, passTime(1)).day.lemonadePitchers).toBe(0);
        });
    });
});

describe('StartTime', () => {
    it ('sets isTimerOn to true', () =>
        expect(reducer({...defaultState, isTimerOn: false}, startTime()).isTimerOn).toBe(true));
});

describe('PauseTime', () => {
    it ('sets isTimerOn to false', () =>
        expect(reducer({...defaultState, isTimerOn: true}, pauseTime()).isTimerOn).toBe(false));
});

describe('hasDayEnded', () => {
    it ('returns true if currentTime is 1 less than a dayLength multiple', () => {
        expect(hasDayEnded({...defaultState, currentTime: defaultState.config.dayLength - 1})).toBe(true);
        expect(hasDayEnded({...defaultState, currentTime: (defaultState.config.dayLength * 2) - 1})).toBe(true);
    });

    it ('returns false otherwse', () => {
        expect(hasDayEnded({...defaultState, currentTime: 0})).toBe(false);
        expect(hasDayEnded({...defaultState, currentTime: defaultState.config.dayLength})).toBe(false);
        expect(hasDayEnded({...defaultState, currentTime: defaultState.config.dayLength + 1})).toBe(false);
        expect(hasDayEnded({...defaultState, currentTime: defaultState.config.dayLength * 2})).toBe(false);
    });
});