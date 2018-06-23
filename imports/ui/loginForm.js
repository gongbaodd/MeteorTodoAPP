import React, { Component } from 'react';

export default class LoginForm extends Component {
    render() {
        return (
            <div className="column navbar-item">
                <form action="#" onSubmit={this.login}>
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
                            >login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }    
    login = e => {
        e.preventDefault();
        Meteor.loginWithPassword(
            this.email.value,
            this.password.value,
            error => {
                if (error) {
                    return console.error(error);
                }

                this.props.client.resetStore();
            },
        )
    } 
}


