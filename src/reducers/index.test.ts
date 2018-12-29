import { buyItem, nextDay, passTime } from '../actions';
import Day, { hasDayEnded } from '../store/day';
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
    endTime: 5,
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
    // const stateAtDayEnd = {
    //     ...stateWithDay,
    //     day: {
    //         ...stateWithDay.day,
    //         endTime: 5,
    //         startTime: 0,
    //     }
    // };
    // const stateDuringDay = {
    //     ...stateWithDay,
    //     day: {
    //         ...stateWithDay.day,
    //         currentTime: 3,
    //         endTime: 5,
    //     }
    // };

    it ('when first starting out, sets day', () =>
        checkDayForNewDay(reducer(defaultState, nextDay()).day, 0));

    // it ('when at end of day, resets day', () =>
    //     checkDayForNewDay(reducer(stateAtDayEnd, nextDay()).day))

    // it ('when not at end of day, doesnt change day', () =>
    //     expect(reducer(stateDuringDay, nextDay()).day).toEqual(stateDuringDay.day))
});

// describe('PassTime', () => {
//     describe('ticks', () => {
//         it ('with 1 tick increments currentTime by 1', () =>
//             expect(reducer(stateWithDay, passTime(1)).day.currentTime)
//                 .toBe(stateWithDay.day.currentTime + 1))
//         it ('with 2 ticks increments currentTime by 2', () =>
//             expect(reducer(stateWithDay, passTime(2)).day.currentTime)
//                 .toBe(stateWithDay.day.currentTime + 2))
//         it ('current ticks doesnt go past to endTime - 1', () =>
//             expect(reducer(stateWithDay, passTime(stateWithDay.day.endTime)).day.currentTime)
//                 .toBe(stateWithDay.day.endTime - 1))
//         it ('hasDayEnded returns false only if currentTime < endTime -1 ', () => {
//             const day = stateWithDay.day;
//             expect(hasDayEnded({...day, currentTime: 0, endTime: 5})).toBe(false);
//             expect(hasDayEnded({...day, currentTime: 3, endTime: 5})).toBe(false);
//             expect(hasDayEnded({...day, currentTime: 4, endTime: 5})).toBe(true);
//             expect(hasDayEnded({...day, currentTime: 5, endTime: 5})).toBe(true);
//             expect(hasDayEnded({...day, currentTime: 6, endTime: 5})).toBe(true);
//         });
//     });
// });