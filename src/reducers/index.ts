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

        default:
            // This can happen if redux sends the action (like at init)
            return state;
    }
};

export default root;