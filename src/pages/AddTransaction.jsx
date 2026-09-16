import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const AddTransaction = () => {
  const { id } = useParams();

  const [type, setType] = useState("Expense");

  const {
    transactions,
    addTransaction,
    updateTransaction,
  } = useContext(TransactionContext);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Find transaction and pre-fill form in Edit mode
  useEffect(() => {
    if (id) {
      const transaction = transactions.find(
        (item) => item.id === Number(id)
      );

      if (transaction) {
        setType(transaction.type);
        setAmount(transaction.amount);
        setCategory(transaction.category);
        setAccount(transaction.account || "");
        setDate(transaction.date);
        setPaymentMethod(transaction.paymentMethod || "");
        setDescription(transaction.description || "");
      }
    }
  }, [id, transactions]);

  const isEditMode = Boolean(id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!type) {
      newErrors.type = "Please select transaction type.";
    }

    if (!amount) {
      newErrors.amount = "Amount is required.";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!category) {
      newErrors.category = "Please select a category.";
    }

    if (!account) {
      newErrors.account = "Please select an account.";
    }

    if (!date) {
      newErrors.date = "Please select a date.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      const transactionData = {
        type,
        amount: Number(amount),
        category,
        account,
        date,
        paymentMethod,
        description,
      };

      if (isEditMode) {
        // Update existing transaction
        updateTransaction(id, transactionData);

        alert("Transaction updated successfully!");
      } else {
        // Add new transaction
        const newTransaction = {
          id: Date.now(),
          ...transactionData,
        };

        addTransaction(newTransaction);

        alert("Transaction added successfully!");
      }

      navigate("/transactions");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8">

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {isEditMode ? "Edit Transaction" : "Add Transaction"}
            </h1>

            <p className="mt-2 text-gray-500">
              {isEditMode
                ? "Update your existing transaction."
                : "Add a new income or expense transaction."}
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-3xl rounded-xl bg-white p-5 shadow-sm md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Transaction Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Transaction Type
                </label>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setType("Income")}
                    className={`rounded-lg px-5 py-2.5 font-medium transition ${
                      type === "Income"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Income
                  </button>

                  <button
                    type="button"
                    onClick={() => setType("Expense")}
                    className={`rounded-lg px-5 py-2.5 font-medium transition ${
                      type === "Expense"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Expense
                  </button>
                </div>

                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Rent">Rent</option>
                  <option value="Bills">Bills</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Other">Other</option>
                </select>

                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Account */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Account
                </label>

                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Account</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Account">Bank Account</option>
                  <option value="Wallet">Wallet</option>
                </select>

                {errors.account && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.account}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payment Method
                </label>

                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Method</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description (optional)"
                  rows="4"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => navigate("/transactions")}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                  {isEditMode ? "Save Changes" : "Add Transaction"}
                </button>

              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTransaction;