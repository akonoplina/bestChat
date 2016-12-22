import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Password from '../components/Password';
import OkButton from '../components/OkButton';

//import * as pageActions from '../actions/PageActions';

class App extends Component {
    render() {
        const { signIn, signUp, password, okButton } = this.props;


        return <div className='loginForm'>
            <SignIn login={ signIn.login }/>
            <Password password={ password.password }/>
            <SignUp login={ signUp.login}/>
            <OkButton title={okButton.title}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        signIn: state.signIn,
        signUp: state.signUp,
        password: state.password,
        okButton: state.okButton
    }
}
//
// function mapDispatchToProps(dispatch) {
//     return {
//         pageActions: bindActionCreators(pageActions, dispatch)
//     }
// }

export default connect(mapStateToProps)(App)
