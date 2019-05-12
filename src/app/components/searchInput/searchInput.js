import React from 'react';
import { connect } from 'react-redux';
import { fetchAddress } from '../../store/actions/address';
import { getCurrentBlockHeight } from '../../store/actions/block';

import './style.scss';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        };
    };

    handleInputChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    searchResult = async () => {
        await this.props.getCurrentBlockHeight();
        await this.props.fetchAddress(this.state.address);
    }

    render() {
        const { address } = this.state;

        return (
            <div className="search-container">
                <input
                    className="search-input"
                    placeholder="Search"
                    onChange={this.handleInputChange}
                    value={address}
                />
                <button 
                    className="search-btn" 
                    disabled={address === ''} 
                    onClick={this.searchResult}>
                    Search
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hasFailed: state.addressFetchFailed,
        isLoading: state.addressIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddress: async (address) => await dispatch(fetchAddress(address)),
        getCurrentBlockHeight: async () => await dispatch(getCurrentBlockHeight())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
