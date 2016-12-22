import React, { PropTypes, Component } from 'react';

export default class Password extends Component {
    onKeyPress(e){

    }
    render() {
        const { password } = this.props;
        return <div className="pass">
            <p><label>{password}:</label><input type="text" placeholder={password} /></p>
        </div>
    }
}

Password.propTypes = {
    password: PropTypes.string.isRequired
};