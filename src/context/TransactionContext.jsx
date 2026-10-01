import { createContext, useCallback, useMemo, useState } from "react";

export const TransactionContext = createContext(null);

const INITIAL_TRANSACTIONS = [
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
];

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  /**
   * Add a new transaction.
   * Backend API can replace this local state operation later.
   */
  const addTransaction = useCallback((transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      transaction,
    ]);
  }, []);

  /**
   * Update an existing transaction.
   * Supports both numeric and string route IDs.
   */
  const updateTransaction = useCallback((id, updatedData) => {
    const transactionId = Number(id);

    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        Number(transaction.id) === transactionId
          ? {
              ...transaction,
              ...updatedData,
            }
          : transaction
      )
    );
  }, []);

  /**
   * Delete an existing transaction.
   */
  const deleteTransaction = useCallback((id) => {
    const transactionId = Number(id);

    setTransactions((prevTransactions) =>
      prevTransactions.filter(
        (transaction) => Number(transaction.id) !== transactionId
      )
    );
  }, []);

  /**
   * Replace all transactions.
   * Useful later when loading data from the backend API.
   */
  const replaceTransactions = useCallback((newTransactions) => {
    setTransactions(
      Array.isArray(newTransactions) ? newTransactions : []
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      transactions,
      setTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      replaceTransactions,
    }),
    [
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      replaceTransactions,
    ]
  );

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};