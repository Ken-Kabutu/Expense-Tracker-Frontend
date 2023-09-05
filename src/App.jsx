// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import ExpenseEntryForm from './ExpenseEntryForm';
import ExpenseList from './ExpenseList';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/expense-entry" component={ExpenseEntryForm} />
          <Route path="/expense-list" component={ExpenseList} />
          <Route path="/login" component={UserLogin} />
          <Route path="/registration" component={UserRegistration} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
