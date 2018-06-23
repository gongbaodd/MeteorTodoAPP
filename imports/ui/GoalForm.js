import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class GoalForm extends Component {
    render() {
        return (
            <form className="columns" action="#" onSubmit={this.submit}>
                <div className="column">
                    <input className="input" type="text" ref={input => this.goal = input} />
                </div>
                <div className="column is-narrow">
                    <button className="button">add</button>
                </div>
            </form>
        );
    }
    submit = e => {
        e.preventDefault();
        this.props.createGoal({
            variables: {
                name: this.goal.value,
                taskId: this.props.taskId,
            }
        })
        .then(_ => {
            this.goal.value = "";
        })
        .catch(error => {
            console.log(error);
        });
    } 
}

const goalSchema = gql`
mutation createGoal($name: String!, $taskId: String!) {
    createGoal(name: $name, taskId: $taskId) {
        _id
    }
}
`;

export default graphql(goalSchema, {
    name: 'createGoal',
    options: {
        refetchQueries: ['Tasks']
    }
})(GoalForm);
