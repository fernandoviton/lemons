import { Action, ActionType } from '../actions';
import { State } from '../store';
import initialState from './initialState';

const root = (state = initialState, action: Action) => {

    switch (action.type) {
        case ActionType.BUY_ITEM:
            return state.withMutations((s: State) => s
                .set('inventory', state.inventory.set(action.name,
                    state.inventory.get(action.name) + action.amount))
                .set('money', state.money - action.cost));

        default:
            // This can happen if redux sends the action (like at init)
            return state;
    }
};

export default root;