import { buyItem } from '../actions';
import reducer from './';
import defaultState from './initialState';

describe('BuyItem', () => {
    it ('updates inventory with bought item amount', () =>
        expect(reducer(defaultState, buyItem('lemons', 2, .5)).inventory.lemons)
            .toEqual(defaultState.inventory.lemons + 2));

    it ('removes money', () =>
        expect(reducer(defaultState, buyItem('lemons', 4, .5)).money)
            .toEqual(defaultState.money - .5));
})