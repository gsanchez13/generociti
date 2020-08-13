import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserProfile from './Components/UserProfile';

const App = () => (
  <div>
    <Switch>
      <Route to='/user/profile' component={UserProfile}/>
    </Switch>
  </div>
);

export default App;