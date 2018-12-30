import { Action, ActionType } from '../actions';
import { Inventory, Recipe, State } from '../store';
import { Day } from '../store/';
import initialState from './initialState';

const makeNewDay = () => ({
    actualSoldCount: 0,
    currentMadeCups: 0,
    potentialSoldCount: 10,
});

const tryMakeLemonade = (currentMadeCups: number, inventory: Inventory, recipe: Recipe) => {
    const poundsOfSugar = inventory.poundsOfSugar - recipe.poundsOfSugar;
    const lemons = inventory.lemons - recipe.lemons;

    return (currentMadeCups > 0 || poundsOfSugar < 0 || lemons < 0)
        ? {inventory, cupsMade: 0}
        : {inventory: {...inventory, lemons, poundsOfSugar}, cupsMade: recipe.makesInCups};
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

const updateDay = (day: Day, cupsMade: number) => ({
    ...day,
    currentMadeCups: day.currentMadeCups + cupsMade,
})

const root = (state: State = initialState, action: Action) => {

    switch (action.type) {
        case ActionType.BUY_ITEM:
            const amount = state.inventory[action.name] + action.amount;
            const money = state.money - action.cost;
            return {
                ...state,
                inventory: {...state.inventory, [action.name]: amount},
                money};
        case ActionType.NEXT_DAY:
            if (!state.hasDayEnded) {
                return state;
            }
            return {
                ...state,
                day: {
                    actualSoldCount: 0,
                    currentMadeCups: 0,
                    potentialSoldCount: 10,
                } as Day
            }
        case ActionType.PASS_TIME:
            if (action.ticks < 1) {
                throw new Error('Invalid amount of time to passTime');
            }
            if (action.ticks > 1) {
                throw new Error('>1 time to passTime is NYI');
            }

            if (state.hasDayEnded) {
                return state;
            }

            const { cupsMade, inventory } =
                tryMakeLemonade(state.day.currentMadeCups, state.inventory, state.recipe);

            return {
                ...state,
                currentTime: state.currentTime + action.ticks,
                day: updateDay(state.day, cupsMade),
                hasDayEnded: (state.currentTime % state.config.dayLength) === (state.config.dayLength - 1),
                inventory,
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