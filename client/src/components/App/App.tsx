import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Form from '../Form/Form';

const App: React.FunctionComponent = () =>
  <Router>
    <Switch>
      <Route exact={true} path='/' render={() => <Form/>} />
    </Switch>
  </Router>


export default App;
