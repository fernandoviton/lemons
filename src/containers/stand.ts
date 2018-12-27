import { connect } from 'react-redux';
import { nextDay } from 'src/actions';
import Stand from '../components/stand';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    inventory: state.inventory,
    standInventory: state.standInventory,
    turnData: state.turnData,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStart: () => { dispatch(nextDay()) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);