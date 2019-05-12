export function addressFetchFailed(state = false, action) {
    switch (action.type) {
        case 'ADDRESS_FETCH_FAILED':
            return {
                hasError: action.hasError,
                detail: action.detail
            };

        default:
            return state;
    }
}

export function addressIsLoading(state = false, action) {
    switch (action.type) {
        case 'ADDRESS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function address(state = '', action) {
    switch (action.type) {
        case 'ADDRESS_FETCH_SUCCEEDED':
            return action.data;
        case 'MORE_TRANSACTIONS_FETCH_SUCCEEDED':
            return {
                ...state,
                txs: [...state.txs, ...action.txs]
            };
        default:
            return state;
    }
}
