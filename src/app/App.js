import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from './components/searchInput/searchInput';
import Summary from './components/summary/summary';
import TransactionList from './components/transactionList/transactionList';
import LoadMoreTransactions from './components/loadMoreTransactions/loadMoreTransactions';
import PageLoader from './components/pageLoader';
import './App.scss';


class App extends Component {
	constructor(props) {
		super(props);
		// Don't call this.setState() here!
		this.state = {
			loading: false
		};
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props !== prevProps) {
			this.setState({
				loading: this.props.blockIsLoading || this.props.addressIsLoading
			})
		}
	}

	render() {
		return (
			<div className={this.state.loading ? 'app active' : 'app'}>
				<header className="main-header">
					<SearchInput />
				</header>
				<PageLoader loading={this.state.loading}>
					<main className='main-container'>
						<Summary />
						<TransactionList />
						<LoadMoreTransactions />
					</main>
				</PageLoader>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
		addressIsLoading: state.addressIsLoading,
		blockIsLoading: state.blockIsLoading
    };
};

export default connect(mapStateToProps, null)(App);
