export function blockFetchFailed(state = false, action) {
    switch (action.type) {
        case 'BLOCK_FETCH_FAILED':
            return {
                hasError: action.hasError,
                detail: action.detail
            };

        default:
            return state;
    }
}

export function blockIsLoading(state = false, action) {
    switch (action.type) {
        case 'BLOCK_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function blockHeight(state = '', action) {
    switch (action.type) {
        case 'BLOCK_HEIGHT_FETCH_SUCCEEDED':
            return action.blockHeight;

        default:
            return state;
    }
}
