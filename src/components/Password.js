import React, { PropTypes, Component } from 'react';

export default class Password extends Component {
    render() {

        const { passwordTitle, showPass } = this.props;

        return <div ref="pass" className={'pass ' + (!showPass ? 'none' : '')}>
            <p><label>{passwordTitle}:</label><input type="text" placeholder={passwordTitle} /></p>
        </div>
    }
}

Password.propTypes = {
    passwordTitle: PropTypes.string.isRequired,
    showPass: PropTypes.bool.isRequired
};