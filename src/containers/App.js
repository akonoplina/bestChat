import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../actions/authActions';

import * as socketActions from '../actions/socketActions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* global window*/
            route: window.location.hash.substr(1)
        };
    }
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        });
    }
    render() {
        // const { authReducer, socketReducer} = this.props;
        //
        // const { authSendData, userExit} = this.props.authActions;
        // const { socketsMessageSend } = this.props.socketActions;

        return (<div>
            {this.props.children}
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer,
        socketReducer: state.socketReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        socketActions: bindActionCreators(socketActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
