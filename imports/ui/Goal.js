import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { DIRECTIVE } from 'graphql/language/kinds';

class Goal extends Component {
    render() {
        const {
            _id, name, done,
        } = this.props;
        return (
    <div>
        <label key={_id} className="columns is-mobile">
            <div className="column is-narrow">
                <input 
                    className="checkbox" 
                    type="checkbox" 
                    checked={done}
                    onChange={this.toggle}
                />
            </div>
            <div className="column">
                <span
                    style={{
                        textDecoration: done ? 'line-through': 'none'
                    }}
                >
                {name}
                </span>
            </div>
        </label>
    </div>
        );
    }
    toggle = e => {
        const {
            _id
        } = this.props;
        this.props.toggleGoal({
            variables: {
                id: _id,
            }
        }).catch(error => {
            console.error(error);
        })
    }
}

const toggleGoal = gql`
mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
        _id
    }
}
`;
export default graphql(toggleGoal, {
    name: 'toggleGoal',
    options: {
        refetchQueries: ['Tasks']
    }
})(Goal);
