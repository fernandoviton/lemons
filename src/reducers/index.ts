import { Action, ActionType } from '../actions';
import initialState from './initialState';

const root = (state = initialState, action: Action) => {

    // TODO: we can add something like this
    // to help catch if folks accidentally return a non immutable
    // if (!immutable.isImmutable(state))
    //    throw 'not immutable';

    switch (action.type) {
        case ActionType.BUY_ITEM:
            return state.set('inventory', state.inventory.set(action.name,
                state.inventory.get(action.name) + action.amount));

        default:
            // This can happen if redux sends the action (like at init)
            return state;
    }
};

export default root;