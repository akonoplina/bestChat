import React, { PropTypes, Component } from 'react';

export default class OkButton extends Component {
    onKeyPress(e){

    }
    render() {
        const { title } = this.props;
        return <button className="okButton">{title}</button>
    }
}