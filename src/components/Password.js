import React, { PropTypes, Component } from 'react';

export default class Password extends Component {
    onKeyPress(e){

    }
    render() {
        const { passwordTitle, showPass } = this.props;
        return <div className={'pass ' + (!showPass ? 'none' : '')}>
            <p><label>{passwordTitle}:</label><input type="text" placeholder={passwordTitle} /></p>
        </div>
    }
}

Password.propTypes = {
    passwordTitle: PropTypes.string.isRequired
};