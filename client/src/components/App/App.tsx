import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Form from '../Form/Form';
import PrivateArea from '../PrivateArea/PrivateArea';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';
import gql from 'graphql-tag';


const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token')

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

interface Props { }

const App = (props: Props) => {
  if (Cookies.get('token')) {
    return <Redirect to='/private-area' />
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact={true} path='/' render={() => <Form />} />
          <Route path='/private-area' render={() => <PrivateArea />} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}





export default App;
