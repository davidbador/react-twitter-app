import React from 'react';

function LoadingIndicator(props) {
    const { showLoading } = props;
    return (
        <div className="loader center">
            <i className="fa fa-cog fa-spin" style={{ color: 'lightblue', display: showLoading ? 'block' : 'none' }} />
        </div>
    );
}

export default LoadingIndicator
