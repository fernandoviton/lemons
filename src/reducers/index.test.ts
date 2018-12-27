import { buyItem, nextDay, passTime } from '../actions';
import TurnData, { isTurnEnded } from '../store/turnData';
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

const stateWithTurnData = {...defaultState, turnData: {
    currentTick: 0,
    potentialSoldCount: 10,
    totalTicks: 5,
}};

describe('NextDay', () => {
    const checkTurnDataForNewDay = (turnData: TurnData) => {
        expect(turnData.currentTick).toBe(0);
        expect(turnData.totalTicks).toBeGreaterThan(0);
        expect(turnData.potentialSoldCount).toBeGreaterThan(0);
        expect(turnData.actualSoldCount).toBe(0);
    }
    const stateAtDayEnd = {
        ...stateWithTurnData,
        turnData: {
            ...stateWithTurnData.turnData,
            currentTick: 4,
            totalTicks: 5,
        }
    };
    const stateDuringDay = {
        ...stateWithTurnData,
        turnData: {
            ...stateWithTurnData.turnData,
            currentTick: 3,
            totalTicks: 5,
        }
    };

    it ('when first starting out, sets turnData', () =>
        checkTurnDataForNewDay(reducer(defaultState, nextDay()).turnData))

    it ('when at end of day, resets turnData', () =>
        checkTurnDataForNewDay(reducer(stateAtDayEnd, nextDay()).turnData))

    it ('when not at end of day, doesnt change turnData', () =>
        expect(reducer(stateDuringDay, nextDay()).turnData).toEqual(stateDuringDay.turnData))
});

describe('PassTime', () => {
    describe('ticks', () => {
        it ('with 1 tick increments currentTick by 1', () =>
            expect(reducer(stateWithTurnData, passTime(1)).turnData.currentTick)
                .toBe(stateWithTurnData.turnData.currentTick + 1))
        it ('with 2 ticks increments currentTick by 2', () =>
            expect(reducer(stateWithTurnData, passTime(2)).turnData.currentTick)
                .toBe(stateWithTurnData.turnData.currentTick + 2))
        it ('current ticks doesnt go past to totalTicks - 1', () =>
            expect(reducer(stateWithTurnData, passTime(stateWithTurnData.turnData.totalTicks)).turnData.currentTick)
                .toBe(stateWithTurnData.turnData.totalTicks - 1))
        it ('isTurnEnded returns false only if currentTicks < totalTicks -1 ', () => {
            const turnData = stateWithTurnData.turnData;
            expect(isTurnEnded({...turnData, currentTick: 0, totalTicks: 5})).toBe(false);
            expect(isTurnEnded({...turnData, currentTick: 3, totalTicks: 5})).toBe(false);
            expect(isTurnEnded({...turnData, currentTick: 4, totalTicks: 5})).toBe(true);
            expect(isTurnEnded({...turnData, currentTick: 5, totalTicks: 5})).toBe(true);
            expect(isTurnEnded({...turnData, currentTick: 6, totalTicks: 5})).toBe(true);
        });
    });
});