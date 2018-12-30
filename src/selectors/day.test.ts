import defaultState from '../reducers/initialState';
import createDaySelector from './day';

describe('DaySelector', () => {
    const s = createDaySelector();
    const state = {...defaultState, config: {...defaultState.day, dayLength: 10}};

    it ('dayNumber from currentTime and dayLength', () => {
        expect(s({...state, currentTime: 0}).dayNumber).toBe(0);
        expect(s({...state, currentTime: 9}).dayNumber).toBe(0);
        expect(s({...state, currentTime: 10}).dayNumber).toBe(1);
        expect(s({...state, currentTime: 11}).dayNumber).toBe(1);
        expect(s({...state, currentTime: 80}).dayNumber).toBe(8);
    });

    it ('startTime from currentTime and dayLength', () => {
        expect(s({...state, currentTime: 0}).startTime).toBe(0);
        expect(s({...state, currentTime: 9}).startTime).toBe(0);
        expect(s({...state, currentTime: 10}).startTime).toBe(10);
        expect(s({...state, currentTime: 11}).startTime).toBe(10);
        expect(s({...state, currentTime: 80}).startTime).toBe(80);
    });

    it ('endTime from currentTime and dayLength', () => {
        expect(s({...state, currentTime: 0}).endTime).toBe(10);
        expect(s({...state, currentTime: 9}).endTime).toBe(10);
        expect(s({...state, currentTime: 10}).endTime).toBe(20);
        expect(s({...state, currentTime: 11}).endTime).toBe(20);
        expect(s({...state, currentTime: 80}).endTime).toBe(90);
    });
});