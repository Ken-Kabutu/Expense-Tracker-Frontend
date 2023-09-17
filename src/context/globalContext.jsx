import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //var userId = localStorage.getItem("userId");

  const axiosConfig = {
    withCredentials: true,
    // add any other default headers if needed
    headers: {
      userSession: localStorage.getItem("userId"),
    },
  };

  const loginUser = () => {
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
  };

  // Add a new income
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}/incomes`, income, axiosConfig);
      if (isLoggedIn) {
        getIncomes();
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/incomes`, axiosConfig);
      setIncomes(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/incomes/${id}`, axiosConfig);
      if (isLoggedIn) {
        getIncomes();
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += parseFloat(income.amount);
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}/expenses`, expense, axiosConfig);
      if (isLoggedIn) {
        getExpenses();
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses/`, axiosConfig);
      setExpenses(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((expense) => {
      totalIncome += parseFloat(expense.amount);
    });

    return totalIncome;
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`, axiosConfig);
      if (isLoggedIn) {
        getExpenses();
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        isLoggedIn,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
