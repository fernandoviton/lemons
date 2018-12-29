import { Action, ActionType } from '../actions';
import { State } from '../store';
import { Day, hasDayEnded } from '../store/';
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
            if (!hasDayEnded(state)) {
                return state;
            }
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
        case ActionType.PASS_TIME:
            return {
                ...state,
                currentTime: state.currentTime + action.ticks,
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