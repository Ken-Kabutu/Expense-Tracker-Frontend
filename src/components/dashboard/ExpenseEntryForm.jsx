import React, { useState } from 'react';

function ExpenseEntryForm() {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: '',
  });

  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'amount') {
      setAmountError('');
    } else if (name === 'date') {
      setDateError('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      setAmountError('Amount must be greater than 0.');
      return;
    }

    const inputDate = new Date(formData.date);
    if (isNaN(inputDate.getTime())) {
      setDateError('Invalid date format.');
      return;
    }

    const response = await fetch('http://127.0.0.1:3001/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (response.ok) {
      setFormData({
        amount: '',
        date: '',
        description: '',
        category: '',
      });
      alert('Expense created successfully');
    } else {
      alert('Error creating expense');
      console.error('Error:', response.statusText);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">EXPENSE ENTRY FORM</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount:
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
            {amountError && <div className="text-danger">{amountError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {dateError && <div className="text-danger">{dateError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="food">Food</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseEntryForm;
