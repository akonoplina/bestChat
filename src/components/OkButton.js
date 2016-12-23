import React, { PropTypes, Component } from 'react';

export default class OkButton extends Component {
    onOkButtonPress(){
        this.props.OkButtonAction();
    }
    render() {
        const { okButtonTitle, okButtonVisible } = this.props;
        return <button onClick={::this.onOkButtonPress} className={'okButton ' + (!okButtonVisible ? 'none' : '')}>{okButtonTitle}</button>
    }
}
OkButton.propTypes = {
    okButtonTitle: PropTypes.string.isRequired,
    OkButtonAction: PropTypes.func.isRequired
};