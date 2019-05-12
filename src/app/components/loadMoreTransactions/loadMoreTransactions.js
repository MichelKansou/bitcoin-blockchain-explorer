import React from 'react';
import { connect } from 'react-redux';
import { fetchMoreTx } from '../../store/actions/address';
import './style.scss';

class LoadMoreTransactions extends React.PureComponent {

    fetchMoreTx = async(address) => {
        const { result } = this.props;
        await this.props.fetchMoreTx(address, result.txs.length);
    } 

    render() {
        const { result } = this.props;
        if (result && result.n_tx > result.txs.length) {
            return <button className="load-txs-btn" onClick={() => this.fetchMoreTx(result.address)}>+ Show More</button>
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        result: state.address
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMoreTx: async (address, offSet) => await dispatch(fetchMoreTx(address, offSet))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreTransactions);
