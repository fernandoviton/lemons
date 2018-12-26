import { Action, ActionType } from '../actions';
import { State } from '../store';
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
        case ActionType.START_TURN:
            return {
                ...state,
                turnData: {
                    currentTick: 0,
                    potentialSoldCount: 10,
                    totalTicks: 100,
                }
            }
        case ActionType.UPDATE_TURN:
            const currentTick = Math.min(state.turnData.currentTick + action.ticks, state.turnData.totalTicks - 1);
            return {
                ...state,
                turnData: {
                    ...state.turnData,
                    currentTick,
                }
            }

        default:
            // This can happen if redux sends the action (like at init)
            return state;
    }
};

export default root;