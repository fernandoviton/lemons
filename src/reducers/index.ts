import { Action, ActionType } from '../actions';
import { State } from '../store';
import { Day } from '../store/';
import initialState from './initialState';

// const makeNewDay = () => ({
//     actualSoldCount: 0,
//     currentMadeCups: 0,
//     potentialSoldCount: 10,
// });

// const tryMakeLemonade = (currentMadeCups: number, inventory: Inventory, recipe: Recipe) => {
//     const poundsOfSugar = inventory.poundsOfSugar - recipe.poundsOfSugar;
//     const lemons = inventory.lemons - recipe.lemons;

//     return (currentMadeCups > 0 || poundsOfSugar < 0 || lemons < 0)
//         ? {inventory, cupsMade: 0}
//         : {inventory: {...inventory, lemons, poundsOfSugar}, cupsMade: recipe.makesInCups};
// };

const updateDay = (day: Day, currentMadeCupsDelta?: number, soldCountDelta?: number) => ({
    ...day,
    actualSoldCount: day.actualSoldCount + (soldCountDelta || 0),
    currentMadeCups: day.currentMadeCups + (currentMadeCupsDelta || 0),
})

const trySell = (state: State) =>
    state.day.currentMadeCups > 0
        && state.inventory.cups > 0
        && state.day.chanceToSell === 1.0
        ? {
            ...state,
            day: updateDay(state.day, -1, 1),
            inventory: {...state.inventory, cups: state.inventory.cups - 1},
            money: state.money + state.salePrice,
        }
        : state;

const tryMakeLemonade = (state: State) => {
    if (state.day.currentMadeCups > 0) {
        return state;
    }

    const poundsOfSugar = state.inventory.poundsOfSugar - state.recipe.poundsOfSugar;
    const lemons = state.inventory.lemons - state.recipe.lemons;

    if (poundsOfSugar < 0 || lemons < 0) {
        return state;
    };

    const inventory = {...state.inventory, lemons, poundsOfSugar};
    const day = {...state.day, currentMadeCups: state.day.currentMadeCups + state.recipe.makesInCups};

    return {...state, inventory, day};
};

// const updateDay = (state: State) => {
//     if (state.day.currentMadeCups === 0) {
//         const { cupsMade, inventory } = tryMakeLemonade(state.inventory, state.recipe);
//         return (cupsMade === 0)
//             ? state
//             : {
//                 ...state,
//                 day: {...state.day, currentMadeCups: state.day.currentMadeCups + cupsMade},
//                 inventory,
//             };
//     }
//     else {
//         return state;
//     }
// };

const root = (state: State = initialState, action: Action) => {

    switch (action.type) {
        case ActionType.BUY_ITEM:
            const amount = state.inventory[action.name] + action.amount;
            const money = state.money - action.cost;
            return {
                ...state,
                inventory: {...state.inventory, [action.name]: amount},
                money};
        case ActionType.START_NEXT_DAY:
            if (!state.hasDayEnded) {
                return state;
            }
            return {
                ...state,
                day: {
                    actualSoldCount: 0,
                    chanceToSell: 1,
                    currentMadeCups: 0,
                } as Day,
                hasDayEnded: false,
            }
        case ActionType.PASS_TIME:
            if (action.ticks < 1) {
                throw new Error('Invalid amount of time to passTime');
            }
            if (action.ticks > 1) {
                throw new Error('>1 time to passTime is NYI');
            }

            if (state.hasDayEnded || !state.isTimerOn) {
                return state;
            }

            const newState = trySell(tryMakeLemonade(state));

            return {
                ...newState,
                currentTime: state.currentTime + action.ticks,
                hasDayEnded: (state.currentTime % state.config.dayLength) === (state.config.dayLength - 1),
            }
        case ActionType.START_TIME:
            return {
                ...state,
                isTimerOn: true,
            }
        case ActionType.PAUSE_TIME:
            return {
                ...state,
                isTimerOn: false,
            }
        default:
            // This can happen if redux sends the action (like at init)
            return state;
    }
};

export default root;