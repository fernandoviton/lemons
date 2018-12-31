import { buyItem, passTime, pauseTime, startNextDay, startTime } from '../actions';
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

describe('StartNextDay', () => {
    const stateAtDayEnd = {
        ...defaultState,
        currentTime: defaultState.config.dayLength,
        hasDayEnded: true,
    };
    const stateDuringDay = {
        ...stateAtDayEnd,
        hasDayEnded: false
    };

    it ('when not at end of day does nothing', () =>
        expect(reducer(stateDuringDay, startNextDay())).toBe(stateDuringDay));
    it ('when at end of day sets hasDayEnded to false', () =>
        expect(reducer(stateAtDayEnd, startNextDay()).hasDayEnded).toBe(false));
    it ('when at end of day resets day', () => {
        const day = reducer(stateAtDayEnd, startNextDay()).day;
        expect(day.actualSoldCount).toBe(0);
        expect(day.currentMadeCups).toBe(0);
        expect(day.chanceToSell).toBeGreaterThanOrEqual(0);
    });
});

describe('PassTime', () => {
    const stateAtDayEnd = {
        ...defaultState,
        currentTime: defaultState.config.dayLength,
        day: {
            ...defaultState.day,
            actualSoldCount: 50,
            chanceToSell: 0,
        },
        hasDayEnded: true,
        isTimerOn: true,
    };
    const stateDuringDay = {
        ...stateAtDayEnd,
        hasDayEnded: false
    };

    describe('currentTime', () => {
        it ('with 1 tick increments by 1', () =>
            expect(reducer(stateDuringDay, passTime(1)).currentTime)
                .toBe(stateDuringDay.currentTime + 1))
        it ('with >1 ticks is not implemented', () =>
            expect(() => reducer(stateDuringDay, passTime(2)).currentTime)
                .toThrow())
        it ('with <1 ticks is not valid', () =>
            expect(() => reducer(stateDuringDay, passTime(0)).currentTime)
                .toThrow())
        it ('when hasDayEnded, currentTime doesnt change', () => {
            expect(reducer(stateAtDayEnd, passTime(1)).currentTime).toBe(stateAtDayEnd.currentTime);
        });
        it ('when isTimerOn is false, currentTime doesnt change', () =>
            expect(reducer({...stateDuringDay, isTimerOn: false}, passTime(1)).currentTime)
                .toBe(stateDuringDay.currentTime));

    }),
    describe('hasDayEnded', () => {
        const expectPassTime = (currentTime: number) =>
            expect(reducer({...stateDuringDay, currentTime}, passTime(1)).hasDayEnded);

        it ('if currentTime moves to new day, hasDayEnded gets set to true', () => {
            expectPassTime(stateDuringDay.config.dayLength - 1).toBe(true);
            expectPassTime((stateDuringDay.config.dayLength * 2) - 1).toBe(true);
        });

        it ('if currentTime doesnt move to new day, hasDayEnded stays false', () => {
            expectPassTime(0).toBe(false);
            expectPassTime(stateDuringDay.config.dayLength).toBe(false);
            expectPassTime(stateDuringDay.config.dayLength + 1).toBe(false);
            expectPassTime(stateDuringDay.config.dayLength * 2).toBe(false);
        });
    }),
    describe('currentMadeCups', () => {
        const inventory = {...stateDuringDay.inventory, lemons: 100, poundsOfSugar: 100};
        describe('when not at end of day', () => {
            describe('with no cups made', () => {
                const state = {...stateDuringDay, day: {...stateDuringDay.day, currentMadeCups: 0}};

                it ('when has ingredients, makes cups', () =>
                    expect(reducer({...state, inventory}, passTime(1)).day.currentMadeCups)
                        .toBe(state.recipe.makesInCups));
                it ('with not enough ingredients, doesnt make cups', () => {
                    const inventoryNoLemons = {...inventory, lemons: 0};
                    const inventoryLowLemons = {...inventory, lemons: state.recipe.lemons - 1};
                    const inventoryNoSugar = {...inventory, poundsOfSugar: 0};
                    const inventoryLowSugar = {...inventory, poundsOfSugar: state.recipe.poundsOfSugar - .1};
                    expect(reducer({...state, inventory: inventoryNoLemons}, passTime(1)).day.currentMadeCups)
                        .toBe(state.day.currentMadeCups);
                    expect(reducer({...state, inventory: inventoryLowLemons}, passTime(1)).day.currentMadeCups)
                        .toBe(state.day.currentMadeCups);
                    expect(reducer({...state, inventory: inventoryNoSugar}, passTime(1)).day.currentMadeCups)
                        .toBe(state.day.currentMadeCups);
                    expect(reducer({...state, inventory: inventoryLowSugar}, passTime(1)).day.currentMadeCups)
                        .toBe(state.day.currentMadeCups);
                });
            });

            it('with cups made and ingredients, doesnt make more cups', () => {
                const state = {...stateDuringDay, day: {...stateDuringDay.day, currentMadeCups: 1}};
                expect(reducer({...state, inventory}, passTime(1)).day.currentMadeCups)
                    .toBe(state.day.currentMadeCups);
            });
        });
        it('when at end of day, doesnt make cups', () => {
            const state = {
                ...stateAtDayEnd,
                inventory,
            };
            expect(reducer(state, passTime(1)).day.currentMadeCups)
                .toBe(state.day.currentMadeCups);
        });
    });
    describe('Sold', () => {
        const stateWithMadeLemonade = {
            ...stateDuringDay,
            day: {
                ...stateDuringDay.day,
                chanceToSell: 1.0,
                currentMadeCups: 100,
            }
        };
        const stateWithMadeLemonadeAtEndOfDay = {
            ...stateDuringDay,
            hasDayEnded: true
        };

        it ('when chance to sell is 1 and have made lemonade and not end of day, will sell one', () =>
            expect(reducer(stateWithMadeLemonade, passTime(1)).day.actualSoldCount)
                .toBe(stateWithMadeLemonade.day.actualSoldCount + 1));
        it ('when chance to sell is 1 and have made lemonade and end of day, wont sell', () =>
            expect(reducer(stateWithMadeLemonadeAtEndOfDay, passTime(1)).day.actualSoldCount)
                .toBe(stateWithMadeLemonade.day.actualSoldCount));
        it ('when chance to sell is 1 and no made lemonade (and missing ingredients), wont sell', () => {
            const state = {
                ...stateWithMadeLemonade,
                day: {...stateWithMadeLemonade.day, currentMadeCups: 0},
                inventory: {...stateWithMadeLemonade.inventory, lemons: 0},
            };
            expect(reducer(state, passTime(1)).day.actualSoldCount)
                .toBe(stateWithMadeLemonade.day.actualSoldCount)
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

