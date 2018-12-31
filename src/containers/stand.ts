import { connect } from 'react-redux';
import { pauseTime, startNextDay, startTime } from 'src/actions';
import Stand, { DayProps } from '../components/stand';
import { createDaySelector } from '../selectors';
import { Dispatch, State } from '../store';

const daySelector = createDaySelector();

export const mapStateToProps = (state: State) => ({
    currentTime: state.currentTime,
    day: {
        ...daySelector(state),
        actualSoldCount: state.day.actualSoldCount,
        currentMadeCups: state.day.currentMadeCups,
    } as DayProps,
    hasDayEnded: state.hasDayEnded,
    inventory: state.inventory,
    isTimerOn: state.isTimerOn,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onPause: () => { dispatch(pauseTime()) },
    onStart: () => { dispatch(startTime()) },
    onStartNextDay: () => { dispatch(startNextDay()) }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);