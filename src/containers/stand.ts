import { connect } from 'react-redux';
import Stand from '../components/stand';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    inventory: state.inventory,
    standInventory: state.standInventory,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Stand);