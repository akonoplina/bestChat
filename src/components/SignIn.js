import React, { PropTypes, Component } from 'react';

export default class SignIn extends Component {
    onKeyPress(e){

    }
    render() {
        const { login } = this.props;
        return <div className="signIn">
            <p><label>{login}:</label><input type="text" placeholder={login} /></p>
        </div>
    }
}

SignIn.propTypes = {
    login: PropTypes.string.isRequired
};