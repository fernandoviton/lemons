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
            if (!hasDayEnded(state.day)) {
                return state;
            }
            return {
                ...state,
                day: {
                    actualSoldCount: 0,
                    currentTick: 0,
                    lemonadePitchers: 0,
                    potentialSoldCount: 10,
                    totalTicks: 100,
                } as Day
            }
        case ActionType.PASS_TIME:
            const currentTick = Math.min(state.day.currentTick + action.ticks, state.day.totalTicks - 1);
            return {
                ...state,
                day: {
                    ...state.day,
                    currentTick,
                }
            }

        default:
            // This can happen if redux sends the action (like at init)
            return state;
    }
};

export default root;