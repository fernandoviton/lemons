import { connect } from 'react-redux';
import { buyItem } from '../actions';
import ItemStore from '../components/itemStore';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    availableForSale: state.availableForSale,
    inventory: state.inventory,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onBuy: (name: string, amount: number, cost: number) => {
        dispatch(buyItem(name, amount, cost));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemStore);