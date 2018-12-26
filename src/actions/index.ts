import { Action } from 'redux';

export enum ActionType {
    BUY_ITEM = 'BUY_ITEM',
    FINISH_TURN = 'FINISH_TURN',
    START_TURN = 'START_TURN',
    UPDATE_TURN = 'UPDATE_TURN',
}

// Note: Redux only supports plain objects, not classes for actions

export interface BuyItem {
    readonly amount: number;
    readonly cost: number;
    readonly name: string;
    readonly type: ActionType.BUY_ITEM;
}
export const buyItem = (name: string, amount: number, cost: number): BuyItem => ({
    amount,
    cost,
    name,
    type: ActionType.BUY_ITEM,
});

export interface FinishTurn {
    readonly type: ActionType.FINISH_TURN;
}
export const finishTurn = (): FinishTurn => ({
    type: ActionType.FINISH_TURN
});

export interface StartTurn {
    readonly type: ActionType.START_TURN;
}
export const startTurn = (): StartTurn => ({
    type: ActionType.START_TURN
});

export interface UpdateTurn {
    readonly ticks: number;
    readonly type: ActionType.UPDATE_TURN;
}
export const updateTurn = (ticks: number): UpdateTurn => ({
    ticks,
    type: ActionType.UPDATE_TURN
});

export type Action =
    BuyItem
    | FinishTurn
    | StartTurn
    | UpdateTurn;