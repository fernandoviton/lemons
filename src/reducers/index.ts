import { Action, ActionType } from '../actions';
import { State } from '../store';
import TurnData, { isTurnEnded } from '../store/turnData';
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
            if (!isTurnEnded(state.turnData)) {
                return state;
            }
            return {
                ...state,
                turnData: {
                    actualSoldCount: 0,
                    currentTick: 0,
                    potentialSoldCount: 10,
                    totalTicks: 100,
                } as TurnData
            }
        case ActionType.PASS_TIME:
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