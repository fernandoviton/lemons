import { Action } from '../actions';

export { AvailableForSale, Inventory, Price } from './inventory';

export { default as Day } from './day';

export { Recipe } from './recipe';

// export interface StateParams {
//     availableForSale?: AvailableForSale;
//     inventory?: Inventory;
// }
// export class State extends Record({}) {
//     public with(values: StateParams) {
//         return this.merge(values) as this;
//     }
// }

// export interface State {
//     availableForSale: AvailableForSale;
//     inventory: Inventory;
// }

// export type StateRecord = Record.Class;

export type Dispatch = (action: Action) => Action;
export type State = any;