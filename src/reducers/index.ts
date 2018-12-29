import { Action, ActionType } from '../actions';
import { State } from '../store';
import Day, { hasDayEnded } from '../store/day';
import initialState from './initialState';

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
            // if (!hasDayEnded(state.day)) {
            //     return state;
            // }
            return {
                ...state,
                day: {
                    actualSoldCount: 0,
                    endTime: 100,
                    lemonadePitchers: 0,
                    potentialSoldCount: 10,
                    startTime: 0,
                } as Day
            }
        // case ActionType.PASS_TIME:
        //     const currentTime = Math.min(state.day.currentTime + action.ticks, state.day.endTime - 1);
        //     return {
        //         ...state,
        //         day: {
        //             ...state.day,
        //             currentTime,
        //         }
        //     }

        default:
            // This can happen if redux sends the action (like at init)
            return state;
    }
};

export default root;