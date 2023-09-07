import React, { useState } from 'react';
import './ExpenseEntryForm.css'; // Import the CSS file

function ExpenseEntryForm() {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: '',
  });

  // State variables for validation
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors when input changes
    if (name === 'amount') {
      setAmountError('');
    } else if (name === 'date') {
      setDateError('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (formData.amount <= 0) {
      setAmountError('Amount must be greater than 0.');
      return;
    }

    // Date validation
    const inputDate = new Date(formData.date);
    if (isNaN(inputDate.getTime())) {
      setDateError('Invalid date format.');
      return;
    }

    // Submit data to the server
    const response = await fetch('http://127.0.0.1:3001/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (response.ok) {
      // Expense created successfully
      // Optionally, you can reset the form or perform other actions.
      setFormData({
        amount: '',
        date: '',
        description: '',
        category: '',
      });
      // You can also display a success message to the user if needed.
      alert('Expense created successfully');
    } else {
      // Handle error scenarios.
      // For example, you can display an error message to the user.
      alert('Error creating expense');
      // You can also log the specific error details to the console for debugging.
      console.error('Error:', response.statusText);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">EXPENSE ENTRY FORM </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              className="form-control"
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
            {/* Display validation error message */}
            {amountError && <div className="error-message">{amountError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              className="form-control"
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {/* Display validation error message */}
            {dateError && <div className="error-message">{dateError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              className="form-control"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="food">Food</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseEntryForm;
