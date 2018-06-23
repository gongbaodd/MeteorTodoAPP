import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';

import App from '../ui/App';

const httpLink = new HttpLink({
    uri: Meteor.absoluteUrl('graphql'),
});

const apolloLink = new ApolloLink(
    (operation, forward) => {
        const token = Accounts._storedLoginToken();
        operation.setContext(
            _ => ({
                headers: {
                    'meteor-login-token': token,
                }
            })
        );
        return forward(operation);
    }
);
const cache = new InMemoryCache();
const client = new ApolloClient({
    link: from([apolloLink, httpLink]),
    cache,
});

const ApolloApp = _ => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

Meteor.startup(_ => render( <ApolloApp /> , document.getElementById('render-target')));