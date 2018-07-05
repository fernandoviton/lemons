import { Action } from 'redux';

export enum ActionType {
    BUY_ITEM = 'BUY_ITEM',
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

export type Action =
    BuyItem;