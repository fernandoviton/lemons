import { connect } from 'react-redux';
import { startTurn } from 'src/actions';
import Stand from '../components/stand';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    inventory: state.inventory,
    standInventory: state.standInventory,
    turnData: state.turnData,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStart: () => { dispatch(startTurn()) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);