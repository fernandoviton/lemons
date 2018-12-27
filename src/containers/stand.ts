import { connect } from 'react-redux';
import { nextDay } from 'src/actions';
import Stand from '../components/stand';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    day: state.day,
    inventory: state.inventory,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStart: () => { dispatch(nextDay()) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);