import { buyItem, nextDay, passTime, pauseTime, startTime } from '../actions';
import { Day, hasDayEnded } from '../store';
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

const stateWithDay = {...defaultState, day: {
    actualSoldCount: 0,
    endTime: 5,
    lemonadePitchers: 0,
    potentialSoldCount: 10,
    startTime: 0,
}};

describe('NextDay', () => {
    const checkDayForNewDay = (day: Day, expectedStartTime: number) => {
        expect(day.actualSoldCount).toBe(0);
        expect(day.endTime).toBeGreaterThan(0);
        expect(day.lemonadePitchers).toBe(0);
        expect(day.potentialSoldCount).toBeGreaterThan(0);
        expect(day.startTime).toBe(expectedStartTime);
    }
    const stateAtDayEnd = {
        ...stateWithDay,
        currentTime: stateWithDay.day.endTime,
    };
    const stateDuringDay = {
        ...stateWithDay,
        currentTime: stateWithDay.day.endTime - 1,
    };

    it ('when no current day, sets day using current time ', () =>
        checkDayForNewDay(reducer(defaultState, nextDay()).day, defaultState.currentTime));

    it ('when at end of current day, sets new day using current time', () =>
        checkDayForNewDay(reducer(stateAtDayEnd, nextDay()).day, defaultState.currentTime));

    it ('when in middle of day, doesnt change day', () =>
        expect(reducer(stateDuringDay, nextDay()).day).toEqual(stateDuringDay.day))
});

describe('PassTime', () => {
    it ('with 1 tick increments currentTime by 1', () =>
        expect(reducer(defaultState, passTime(1)).currentTime)
            .toBe(defaultState.currentTime + 1))
    it ('with 2 ticks increments currentTime by 2', () =>
        expect(reducer(defaultState, passTime(2)).currentTime)
            .toBe(defaultState.currentTime + 2))
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
    it ('returns false if currentTime < day.endTime', () => {
        expect(hasDayEnded({...stateWithDay, currentTime: 0})).toBe(false);
        expect(hasDayEnded({...stateWithDay, currentTime: 1})).toBe(false);
        expect(hasDayEnded({...stateWithDay, currentTime: 4})).toBe(false);
    });

    it ('returns true if currentTime >= day.endTime', () => {
        expect(hasDayEnded({...stateWithDay, currentTime: 5})).toBe(true);
        expect(hasDayEnded({...stateWithDay, currentTime: 6})).toBe(true);
    });

    it ('returns true if there is no day', () =>
        expect(hasDayEnded({...stateWithDay, day: undefined})).toBe(true));
});