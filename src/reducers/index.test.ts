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
    currentTick: 0,
    potentialSoldCount: 10,
    totalTicks: 5,
}};

describe('NextDay', () => {
    const checkDayForNewDay = (day: Day) => {
        expect(day.actualSoldCount).toBe(0);
        expect(day.currentTick).toBe(0);
        expect(day.lemonadePitchers).toBe(0);
        expect(day.potentialSoldCount).toBeGreaterThan(0);
        expect(day.totalTicks).toBeGreaterThan(0);
    }
    const stateAtDayEnd = {
        ...stateWithDay,
        day: {
            ...stateWithDay.day,
            currentTick: 4,
            totalTicks: 5,
        }
    };
    const stateDuringDay = {
        ...stateWithDay,
        day: {
            ...stateWithDay.day,
            currentTick: 3,
            totalTicks: 5,
        }
    };

    it ('when first starting out, sets day', () =>
        checkDayForNewDay(reducer(defaultState, nextDay()).day))

    it ('when at end of day, resets day', () =>
        checkDayForNewDay(reducer(stateAtDayEnd, nextDay()).day))

    it ('when not at end of day, doesnt change day', () =>
        expect(reducer(stateDuringDay, nextDay()).day).toEqual(stateDuringDay.day))
});

describe('PassTime', () => {
    describe('ticks', () => {
        it ('with 1 tick increments currentTick by 1', () =>
            expect(reducer(stateWithDay, passTime(1)).day.currentTick)
                .toBe(stateWithDay.day.currentTick + 1))
        it ('with 2 ticks increments currentTick by 2', () =>
            expect(reducer(stateWithDay, passTime(2)).day.currentTick)
                .toBe(stateWithDay.day.currentTick + 2))
        it ('current ticks doesnt go past to totalTicks - 1', () =>
            expect(reducer(stateWithDay, passTime(stateWithDay.day.totalTicks)).day.currentTick)
                .toBe(stateWithDay.day.totalTicks - 1))
        it ('hasDayEnded returns false only if currentTicks < totalTicks -1 ', () => {
            const day = stateWithDay.day;
            expect(hasDayEnded({...day, currentTick: 0, totalTicks: 5})).toBe(false);
            expect(hasDayEnded({...day, currentTick: 3, totalTicks: 5})).toBe(false);
            expect(hasDayEnded({...day, currentTick: 4, totalTicks: 5})).toBe(true);
            expect(hasDayEnded({...day, currentTick: 5, totalTicks: 5})).toBe(true);
            expect(hasDayEnded({...day, currentTick: 6, totalTicks: 5})).toBe(true);
        });
    });
});