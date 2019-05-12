import { combineReducers } from 'redux';
import { address, addressFetchFailed, addressIsLoading } from './address';
import { blockHeight, blockFetchFailed, blockIsLoading } from './block';

export default combineReducers({
    address,
    addressFetchFailed,
    addressIsLoading,
    blockHeight,
    blockFetchFailed,
    blockIsLoading
});
