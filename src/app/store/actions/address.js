const API = 'https://blockchain.info/';

export function addressFetchFailed(bool, err = '') {
    return {
        type: 'ADDRESS_FETCH_FAILED',
        hasError: bool,
        details: err
    };
}

export function addressIsLoading(bool) {
    return {
        type: 'ADDRESS_IS_LOADING',
        isLoading: bool
    };
}

export function addressFetchSucceeded(data) {
    return {
        type: 'ADDRESS_FETCH_SUCCEEDED',
        data
    };
}


export function transactionsFetchFailed(bool, err = '') {
    return {
        type: 'MORE_TRANSACTIONS_FETCH_FAILED',
        hasError: bool,
        details: err
    };
}

export function transactionsIsLoading(bool) {
    return {
        type: 'MORE_TRANSACTIONS_LOADING',
        isLoading: bool
    };
}

export function fetchMoreTransactions(txs) {
    return {
        type: 'MORE_TRANSACTIONS_FETCH_SUCCEEDED',
        txs
    };
}


export function fetchAddress(address) {
    return async (dispatch) => {
        dispatch(addressIsLoading(true));
        await fetch(API + 'rawaddr/' + address + '?cors=true&limit=10', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            dispatch(addressIsLoading(false));
            dispatch(addressFetchSucceeded(data))
        })
        .catch(err => {
            dispatch(addressIsLoading(false));
            dispatch(addressFetchFailed(true, err))
        })
    }
}

export function fetchMoreTx(address, offset) {
    return async (dispatch) => {
        dispatch(transactionsIsLoading(true));
        await fetch(`${API}rawaddr/${address}?cors=true&limit=10&offset=${offset}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            dispatch(transactionsIsLoading(false));
            dispatch(fetchMoreTransactions(data.txs))
        })
        .catch(err => {
            dispatch(transactionsIsLoading(false));
            dispatch(transactionsFetchFailed(true, err))
        })
    }
}
