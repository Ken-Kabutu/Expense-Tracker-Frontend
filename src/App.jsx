import React from 'react';
import ExpenseEntryForm from './components/ExpenseEntryForm'; 
import ExpenseList from './components/ExpenseList'; 


function App() {
  return (
    <div>
      <h1>EXPENSE TRACKER</h1>
      <ExpenseEntryForm /> {/* Render the ExpenseEntryForm component */}
      <ExpenseList />
    </div>
  );
}

export default App;
