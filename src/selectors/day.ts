import { createSelector } from 'reselect'
import { State } from '../store';

export default () => createSelector(
    (state: State) => state.currentTime,
    (state: State) => state.config.dayLength,
    (currentTime, dayLength) => {
        const dayNumber = Math.floor(currentTime / dayLength);
        return {
            dayNumber,
            endTime: (dayNumber + 1) * dayLength,
            startTime: dayNumber * dayLength,
        };
    }
);