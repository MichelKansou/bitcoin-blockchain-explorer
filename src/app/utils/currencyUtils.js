import BigNumber from "bignumber.js"

export const getConfirmation = (currentBlockHeight, txBlockHeight) => {
    return (currentBlockHeight - txBlockHeight) + 1;
}

export const getAmount = (value, magnitude, symbol) => {
    return new BigNumber(value)
            .dividedBy(10**(magnitude))
            .toString() + ' ' + symbol
}

export const estimateTxFees = (totalInputs, totalOutputs, magnitude, symbol) => {
    return new BigNumber(totalInputs)
            .minus(totalOutputs)
            .dividedBy(10**(magnitude))
            .toString() + ' ' + symbol
}
