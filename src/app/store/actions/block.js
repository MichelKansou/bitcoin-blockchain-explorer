const API = 'https://blockchain.info/';

export function blockFetchFailed(bool, err = '') {
    return {
        type: 'BLOCK_FETCH_FAILED',
        hasError: bool,
        details: err
    };
}

export function blockIsLoading(bool) {
    return {
        type: 'BLOCK_IS_LOADING',
        isLoading: bool
    };
}

export function blockHeightFetchSucceeded(blockHeight) {
    return {
        type: 'BLOCK_HEIGHT_FETCH_SUCCEEDED',
        blockHeight
    };
}

export function getCurrentBlockHeight() {
    return async (dispatch) => {
        dispatch(blockIsLoading(true));
        await fetch(API + 'q/getblockcount?cors=true', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            dispatch(blockIsLoading(false));
            dispatch(blockHeightFetchSucceeded(data))
        })
        .catch(err => {
            dispatch(blockIsLoading(false));
            dispatch(blockFetchFailed(true, err))
        })
    }
}
