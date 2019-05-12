import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import BigNumber from "bignumber.js"
import { getConfirmation, getAmount, estimateTxFees } from '../../utils/currencyUtils';
import './style.scss';

class TransactionList extends React.PureComponent {
    render() {
        const { txs, currentBlockHeight } = this.props;

        if (txs && txs.length > 0) {
            const transactions = txs.map((tx, index) => {
                let totalOutputs = 0;
                let totalInputs = 0;
                return (
                    <div className="tx-container" key={index}>
                    <div className="header">
                        <div className="tx-hash">
                            {tx.hash}
                        </div>
                        <div className="tx-date">
                            {moment.unix(tx.time).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>
                    </div>
                    <div className="tx-content">
                        <div className="input-list">
                            {
                                tx.inputs.map((input_tx, index) => {
                                    totalInputs = new BigNumber(input_tx.prev_out.value).plus(totalInputs);
                                    return (
                                        <div className="tx-input" key={index}> 
                                            <p className="tx-address">{'#'+index + ' ' + input_tx.prev_out.addr}</p>
                                            <p className="tx-value">{getAmount(input_tx.prev_out.value, 8, 'BTC')}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <span className="arrow"> > </span>
                        <div className="output-list">
                            {
                                tx.out.map((out_tx, index) => {
                                    totalOutputs = new BigNumber(out_tx.value).plus(totalOutputs);
                                    return (
                                        <div className="tx-output" key={index}> 
                                            <p className="tx-address">{'#'+index + ' ' + out_tx.addr}</p>
                                            <p className="tx-value">{getAmount(out_tx.value, 8, 'BTC')}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="tx-info">
                        <div className="tx-confirmation">{getConfirmation(currentBlockHeight, tx.block_height)} Confirmations</div>
                        <div className="tx-fees">Fees: {estimateTxFees(totalInputs, totalOutputs, 8, 'BTC')}</div>
                    </div>
                </div>
                );
            });
            return (
                <div className="transaction-container">
                    <h4 className="title">{txs.length} Transactions</h4>
                    {transactions}
                </div>
            );
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        txs: state.address.txs,
        currentBlockHeight: state.blockHeight
    };
};

export default connect(mapStateToProps, null)(TransactionList);
