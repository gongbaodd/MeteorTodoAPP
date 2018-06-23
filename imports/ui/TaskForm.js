import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class TaskForm extends Component {
    render() {
        return (
            <form className="subtitle columns" onSubmit={this.submitTask}>
                <div className="column">
                    <input 
                        className="input" 
                        type="text" 
                        ref={input => (this.task = input)} 
                    />
                </div>
                <div className="column is-narrow">
                    <button className="button is-light" type="submit">add</button>
                </div>
            </form>
        )
    }
    submitTask = e => {
        e.preventDefault();

        this.props.createTask({
            variables: {
                name: this.task.value,
            }
        })
        .catch(error => {
            if (error) {
                return console.error(error);
            }
        });
    }
}

const createTask = gql`
    mutation createTask($name: String!) {
        createTask(name: $name) {
            _id
        }
    }
`;

export default graphql(
    createTask,
    {
        name: 'createTask',
        options: {
            refetchQueries: [
                'Tasks',
            ]
        }
    }
)(TaskForm);