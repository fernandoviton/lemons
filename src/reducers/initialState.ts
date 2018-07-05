import { List, Record } from 'immutable';
import { State } from '../store';

export default Record({
    availableForSale: Record({
        cups: List([
            {amount: 80, cost: 2.25},
            {amount: 200, cost: 4.25},
        ]),
        lemons: List([
            {amount: 1, cost: .25},
        ]),
    })(),

    inventory: Record({
        cups: 20,
        lemons: 0,
    })(),
})() as State;