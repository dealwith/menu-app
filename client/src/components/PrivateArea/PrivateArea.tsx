import React from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

type Props = {
}

const PrivateArea = (props: Props) => {
  if (!Cookies.get('token')) {
    return <Redirect to='/private-area' />
  }

  return (
    <div>
      <Query
        query={gql`
          {
            todos {
              id
              name
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>
          if (error) {
            props.history.push('/');
            return <p></p>
          }
          return <ul>{
            data.todos.map((item) =>
              <li key={item.id}>{item.name}</li>)
          }</ul>
        }}
      </Query>
    </div>
  )
}


export default PrivateArea;
