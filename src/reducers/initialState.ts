import { List } from 'immutable';
import { Recipe, State } from '../store';

export default {
    availableForSale: {
        cups: List([
            {amount: 80, cost: 2.25},
            {amount: 200, cost: 4.25},
        ]),
        lemons: List([
            {amount: 1, cost: .25},
        ]),
        poundsOfSugar: List([
            {amount: 1, cost: 3.75}
        ]),
    },

    day: {
        actualSoldCount: 0,
        chanceToSell: 1.0,
        currentMadeCups: 0,
    },

    money: 4.25 * 2,

    inventory: {
        cups: 20,
        lemons: 0,
        poundsOfSugar: 0,
    },

    config : {
        dayLength: 100,
    },

    recipe: {
        lemons: 3,
        makesInCups: 8,
        poundsOfSugar: .5,
    } as Recipe,

    currentTime: 0,
    isTimerOn: false,
    // hasDayEnded: true,
} as State;