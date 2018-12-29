import { connect } from 'react-redux';
import { pauseTime, startTime } from 'src/actions';
import Stand from '../components/stand';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    currentTime: state.currentTime,
    day: state.day,
    inventory: state.inventory,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onPause: () => { dispatch(pauseTime()) },
    onStart: () => { dispatch(startTime()) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);