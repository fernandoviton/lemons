import { buyItem, passTime, pauseTime, startTime } from '../actions';
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
//         expect(day.currentMadeCups).toBe(0);
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
    const stateAtDayEnd = {
        ...defaultState,
        currentTime: defaultState.config.dayLength,
        day: {
            ...defaultState.day,
            actualSoldCount: 50,
            chanceToSell: 0,
        },
        hasDayEnded: true,
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
    }),
    describe('hasDayEnded', () => {
        const expectPassTime = (currentTime: number) =>
            expect(reducer({...defaultState, currentTime}, passTime(1)).hasDayEnded);

        it ('if currentTime moves to new day, hasDayEnded gets set to true', () => {
            expectPassTime(defaultState.config.dayLength - 1).toBe(true);
            expectPassTime((defaultState.config.dayLength * 2) - 1).toBe(true);
        });

        it ('returns false otherwse', () => {
            expectPassTime(0).toBe(false);
            expectPassTime(defaultState.config.dayLength).toBe(false);
            expectPassTime(defaultState.config.dayLength + 1).toBe(false);
            expectPassTime(defaultState.config.dayLength * 2).toBe(false);
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

