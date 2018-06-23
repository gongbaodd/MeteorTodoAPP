import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class RegisterForm extends Component {
    render() {
        return (
            <div className="column navbar-item">
                <form action="#" onSubmit={this.register}>
                    <div className="columns">
                        <div className="column">
                            <input 
                                className="input" 
                                type="email"
                                placeholder="input your email"
                                ref={input => this.email = input}
                            />
                        </div>
                        <div className="column">
                            <input
                                className="input" 
                                type="password" 
                                placeholder="input your password"
                                ref={input => this.password = input}
                            />
                        </div>
                        <div className="column is-narrow">
                            <button
                                className="button"
                                type="submit"
                            >register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }  
    register = e => {
        e.preventDefault();
        Accounts.createUser(
            {
                email: this.email.value,
                password: this.password.value,
            },
            error => {
                if (error) {
                    return console.error(error);
                }

                console.log('register OK');
            }
        )
    }   
}
