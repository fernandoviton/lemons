import { Action } from 'redux';

export enum ActionType {
    BUY_ITEM = 'BUY_ITEM',
    END_DAY = 'END_DAY',
    NEXT_DAY = 'NEXT_DAY',
    PASS_TIME = 'PASS_TIME',
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

export interface EndDay {
    readonly type: ActionType.END_DAY;
}
export const endDay = (): EndDay => ({
    type: ActionType.END_DAY
});

export interface NextDay {
    readonly type: ActionType.NEXT_DAY;
}
export const nextDay = (): NextDay => ({
    type: ActionType.NEXT_DAY
});

export interface PassTime {
    readonly ticks: number;
    readonly type: ActionType.PASS_TIME;
}
export const passTime = (ticks: number): PassTime => ({
    ticks,
    type: ActionType.PASS_TIME
});

export type Action =
    BuyItem
    | EndDay
    | NextDay
    | PassTime;