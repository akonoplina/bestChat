import React, { PropTypes, Component } from 'react';

export default class SignUp extends Component {
    onKeyPress(e){

    }
    render() {
        const { login } = this.props;
        return <div className="pass">
            <p><label>{login}:</label><input type="text" placeholder={login} /></p>
        </div>
    }
}

SignUp.propTypes = {
    login: PropTypes.string.isRequired
};