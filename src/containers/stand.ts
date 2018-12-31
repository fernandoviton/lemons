import { connect } from 'react-redux';
import { pauseTime, startTime } from 'src/actions';
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
    inventory: state.inventory,
    isTimerOn: state.isTimerOn,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onPause: () => { dispatch(pauseTime()) },
    onStart: () => { dispatch(startTime()) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);