import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import configureStore from '../../store/configureStore';
import SearchInput from './searchInput';
import { fetchAddress } from '../../store/actions/address';
import { getCurrentBlockHeight } from '../../store/actions/block';

Enzyme.configure({ adapter: new Adapter() })

describe('(Component) SearchInput', () => {
	let wrapper;
	let store = configureStore();

	beforeEach(() => {
		wrapper = shallow(<SearchInput store={store} />).dive().dive();
	});

	it('renders <SearchInput /> components', () => {
		expect(wrapper.find('button')).to.have.length(1);
		expect(wrapper.find('input')).to.have.length(1);
	});

	it('Should disable search button if input is empty', () => {
		const searchInput = wrapper.find('input').at(0);

		searchInput.props().onChange({target: {
			value: ''
		}});

		wrapper.update();

		const searchBtn = wrapper.find('button').at(0);

		expect(searchBtn.props().disabled).to.equal(true);
	});

	it('Should enable search button if input has value', () => {
		const searchInput = wrapper.find('input').at(0);

		searchInput.props().onChange({target: {
			value: '1234567900'
		}});

		wrapper.update();

		const searchBtn = wrapper.find('button').at(0);

		expect(searchBtn.props().disabled).to.equal(false);
	});

	it('Should fetch Bitcoin address', () => {
		const searchInput = wrapper.find('input').at(0);

		searchInput.props().onChange({target: {
			value: '32UnBuRWjP8qN6qrtbUTGERSyFBTx6zo9w'
		}});

		wrapper.update();

		const searchBtn = wrapper.find('button').at(0);

		expect(searchBtn.props().disabled).to.equal(false);

		searchBtn.simulate('click');

		expect(store.getState().blockIsLoading).to.equal(true);
	});


	it('Should store fetch Current Bitcoin Block Height', async () => {
		const reduxStore = configureStore();
		await reduxStore.dispatch(getCurrentBlockHeight());

		expect(reduxStore.getState().blockHeight).to.be.a('number');
	});

	it('Should store fetch Bitcoin address', async () => {
		const reduxStore = configureStore();
		await reduxStore.dispatch(fetchAddress('32UnBuRWjP8qN6qrtbUTGERSyFBTx6zo9w'));

		expect(reduxStore.getState().address.hash160).to.equal('08a7ab30a0ab03f2d0c5848fea96f6d5f6188252');
	});

	it('Should return error when store fetch incorrect Bitcoin address', async () => {
		const reduxStore = configureStore();
		await reduxStore.dispatch(fetchAddress('32UnBuR'));

		expect(reduxStore.getState().addressFetchFailed.hasError).to.equal(true);
	});
});
