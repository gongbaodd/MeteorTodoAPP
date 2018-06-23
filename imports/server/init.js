import '../api/tasks';
import '../api/goals';
import merge from 'lodash/merge';

import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import TaskTypeDefs from '../api/tasks/Task.graphql';
import TaskResolver from '../api/tasks/resolver';
import UserTypeDefs from '../api/users/user.graphql';
import UserResolver from '../api/users/resolver';
import GoalTypeDefs from '../api/goals/goals.graphql';
import GoalResolver from '../api/goals/resolver';

const typeDefs = [
    TaskTypeDefs,
    UserTypeDefs,
    GoalTypeDefs,
];

const resolvers = merge(
    TaskResolver,
    UserResolver,
    GoalResolver,
);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

createApolloServer({ schema });