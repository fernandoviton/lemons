import { connect } from 'react-redux';
import AppHeader from '../components/appHeader';
import { Dispatch, State } from '../store';

export const mapStateToProps = (state: State) => ({
    money: state.money,
    pageLinks: [{display: 'Store', page: 'store'}],
    title: 'Lemons',
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppHeader);