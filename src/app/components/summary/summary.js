import React from 'react';
import { connect } from 'react-redux';
import QRious from 'qrious';
import { getAmount } from '../../utils/currencyUtils';
import './style.scss';

class Summary extends React.PureComponent {

    getQRCode = (address) => {
        return new QRious({
            level: 'H',
            padding: 25,
            size: 400,
            value: address
        }).toDataURL('image/jpeg');
    }

    render() {
        const { result } = this.props;
        if (result.address) {
            return (
                <div className="summary-container">
                    <div className="qr-container">
                        <img alt="address-qr-code" src={this.getQRCode(result.address)} />
                    </div>
                    <div className="row">
                        <div className="column">
                            <h4>Summary</h4>
                            <p>Address : {result.address} </p>
                            <p>Hash 160 : {result.hash160} </p>
                        </div>
                        <div className="column">
                            <h4>Transactions</h4>
                            <p>Numbers of Transactions : {result.n_tx} </p>
                            <p>Total Recieved : {getAmount(result.total_received, 8, 'BTC')} </p>
                            <p>Final Balance : {getAmount(result.final_balance, 8, 'BTC')} </p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        result: state.address
    };
};

export default connect(mapStateToProps, null)(Summary);
