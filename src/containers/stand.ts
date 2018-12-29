import { connect } from 'react-redux';
import { startTime } from 'src/actions';
import Stand from '../components/stand';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    day: state.day,
    inventory: state.inventory,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStart: () => { dispatch(startTime()) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);