import { createContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "01 Sep 2026",
      description: "Salary",
      category: "Income",
      type: "Income",
      amount: 25000,
    },
    {
      id: 2,
      date: "02 Sep 2026",
      description: "Grocery",
      category: "Food",
      type: "Expense",
      amount: 1200,
    },
    {
      id: 3,
      date: "03 Sep 2026",
      description: "Freelance Work",
      category: "Freelancing",
      type: "Income",
      amount: 5000,
    },
    {
      id: 4,
      date: "04 Sep 2026",
      description: "Electricity Bill",
      category: "Bills",
      type: "Expense",
      amount: 850,
    },
  ]);

  // Add new transaction
  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      transaction,
    ]);
  };

  // Update existing transaction
  const updateTransaction = (id, updatedData) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === Number(id)
          ? {
              ...transaction,
              ...updatedData,
            }
          : transaction
      )
    );
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter(
        (transaction) => transaction.id !== Number(id)
      )
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};