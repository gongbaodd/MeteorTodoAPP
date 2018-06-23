import React, { Component } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

export default class UserForm extends Component {
    state = {
        login: true,
    }
    render() {
        const { client } = this.props;
        const { login } = this.state;
        return (
            <div className="columns">
                {!login && <RegisterForm client={client} />}
                {login && <LoginForm client={client} />}
                <div className="column is-narrow navbar-item">
                    <button 
                        className="button is-black"
                        onClick={_ => {
                            this.setState({login: !login})
                        }}
                    >
                    toggle {!login ? 'login': 'register'}
                    </button>
                </div>
            </div>
        );
    }    
}


