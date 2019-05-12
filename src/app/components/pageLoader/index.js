import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class PageLoader extends React.PureComponent {
    loader() {
        return (
            <div className="lds-ellipsis">
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        );
    }

    render() {
        const children = this.props.loading ? this.loader() : this.props.children;
        return (
            <div className={this.props.loading ? 'loader-container is-loading' : 'loader-container'}>
                {children}
            </div>
        )
    }
}

PageLoader.propTypes = {
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool.isRequired
};
