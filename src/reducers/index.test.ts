import { buyItem, nextDay, passTime } from '../actions';
import { isTurnEnded } from '../store/turnData';
import reducer from './';
import defaultState from './initialState';

describe('BuyItem', () => {
    it ('updates inventory with bought item amount', () =>
        expect(reducer(defaultState, buyItem('lemons', 2, .5)).inventory.lemons)
            .toEqual(defaultState.inventory.lemons + 2));

    it ('removes money', () =>
        expect(reducer(defaultState, buyItem('lemons', 4, .5)).money)
            .toEqual(defaultState.money - .5));
})

describe('NextDay', () => {
    it ('sets nextTurnData', () =>
        expect(reducer(defaultState, nextDay()).turnData).not.toBeUndefined())
    it ('sets currentTick to 0', () =>
        expect(reducer(defaultState, nextDay()).turnData.currentTick).toBe(0))
    it ('sets totalTicks to > 0', () =>
        expect(reducer(defaultState, nextDay()).turnData.totalTicks).toBeGreaterThan(0))
    it ('sets potentialSoldCount to > 0', () =>
        expect(reducer(defaultState, nextDay()).turnData.potentialSoldCount).toBeGreaterThan(0))
    it ('doesnt set actualSoldCount', () =>
        expect(reducer(defaultState, nextDay()).turnData.actualSoldCount).toBeUndefined())
});

describe('PassTime', () => {
    const defaultStateWithTurnData = {...defaultState, turnData: {
        currentTick: 0,
        potentialSoldCount: 10,
        totalTicks: 5,
    }}

    describe('ticks', () => {

        it ('with 1 tick increments currentTick by 1', () =>
            expect(reducer(defaultStateWithTurnData, passTime(1)).turnData.currentTick)
                .toBe(defaultStateWithTurnData.turnData.currentTick + 1))
        it ('with 2 ticks increments currentTick by 2', () =>
            expect(reducer(defaultStateWithTurnData, passTime(2)).turnData.currentTick)
                .toBe(defaultStateWithTurnData.turnData.currentTick + 2))
        it ('current ticks doesnt go past to totalTicks - 1', () =>
            expect(reducer(defaultStateWithTurnData, passTime(defaultStateWithTurnData.turnData.totalTicks)).turnData.currentTick)
                .toBe(defaultStateWithTurnData.turnData.totalTicks - 1))
        it ('isTurnEnded returns false only if currentTicks < totalTicks -1 ', () => {
            const turnData = defaultStateWithTurnData.turnData;
            expect(isTurnEnded({...turnData, currentTick: 0, totalTicks: 5})).toBe(false);
            expect(isTurnEnded({...turnData, currentTick: 3, totalTicks: 5})).toBe(false);
            expect(isTurnEnded({...turnData, currentTick: 4, totalTicks: 5})).toBe(true);
            expect(isTurnEnded({...turnData, currentTick: 5, totalTicks: 5})).toBe(true);
            expect(isTurnEnded({...turnData, currentTick: 6, totalTicks: 5})).toBe(true);
        });
    });
});