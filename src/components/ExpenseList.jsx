// ExpenseList.js
import React, { useState, useEffect } from 'react';
import './ExpenseList.css';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend API when the component mounts
    fetch('http://localhost:3000/api/expenses')
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <div>
      <h1>EXPENSE LIST</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.description}</td>
              <td>{expense.expense_category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;