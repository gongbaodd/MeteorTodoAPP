import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import UserForm from './userForm';
import TaskForm from './TaskForm';
import GoalForm from './GoalForm';
import { withApollo } from 'react-apollo';
import Goal from './Goal';

class App extends Component{
    renderTasks() {
        const {
            loading,
            tasks,
        } = this.props;
        if (loading) {
            return null;
        }
        if (tasks) {
            return tasks.map(
                ({_id, name, goals, done}) => (
                    <li key={_id} className="box">
                        <div className="title">
                            <span style={{
                                textDecoration: done ? 'line-through': 'none',
                            }}>{name}</span>
                        </div>
                        { !goals.length ? null :
                        <section className="section">
                            <ul className="container">
                            {
                                goals.map((goal) => (<Goal key={goal._id} {...goal}/>))
                            }
                            </ul>
                        </section>
                        }
                        <GoalForm taskId={_id} />
                    </li>
                )
            );
        }
        return null;       
    }
    renderUser() {
        const {
            loading,
            user,
            client,
        } = this.props;
        if (loading) {
            return null;
        }

        if (!user) {
            return <UserForm client={client} />;
        }

        const {
            _id: userId,
            email,
        } = user;

        if (userId) {
            return (
                <div className="navbar-item columns">
                    <div className="column">
                        <h1>{email}</h1>
                    </div>
                    <div className="column is-narrow">
                        <button
                            className="button is-black"
                            onClick={
                                _ => {
                                    Meteor.logout();
                                    this.props.client.resetStore();
                                }
                            }
                        >
                            logout
                        </button>
                    </div>
                </div>
            );
        }

        return null;
    }
    render() {
        return (
            <div className="container">
                <nav className="navbar is-dark">
                    {this.renderUser()}
                </nav> 
                <header className="hero is-primary">
                    <div className="hero-body">
                        <h1 className="title is-1">TODO APP</h1>
                        <TaskForm/>
                    </div>
                </header>
                <div className="section">
                    <ul className="continer">
                    {this.renderTasks()}
                    </ul>
                </div>
            </div>
        )
    }
}

const taskQuery = gql `
query Tasks {
    tasks {
        _id
        name
        goals {
            _id
            name
            done
        }
        done
    }
    user {
        _id
        email
    }
}
`;

export default graphql(
    taskQuery,
    {
        props: ({data}) => ({...data})
    }
)(
    withApollo(App)
)