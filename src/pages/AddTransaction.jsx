import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Receipt,
  Save,
  WalletCards,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";

const CATEGORY_OPTIONS = [
  "Food",
  "Travel",
  "Shopping",
  "Rent",
  "Bills",
  "Salary",
  "Freelancing",
  "Other",
];

const ACCOUNT_OPTIONS = [
  "Cash",
  "Bank Account",
  "Wallet",
];

const PAYMENT_METHOD_OPTIONS = [
  "Cash",
  "UPI",
  "Card",
  "Bank Transfer",
  "Other",
];

const INITIAL_FORM = {
  type: "Expense",
  amount: "",
  category: "",
  account: "",
  date: "",
  paymentMethod: "",
  description: "",
};

function AddTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    transactions,
    addTransaction,
    updateTransaction,
  } = useContext(TransactionContext);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(id);

  /*
   * Find transaction and pre-fill form in Edit mode.
   */
  useEffect(() => {
    if (!id) {
      return;
    }

    const transaction = transactions.find(
      (item) => String(item.id) === String(id)
    );

    if (!transaction) {
      return;
    }

    setFormData({
      type: transaction.type || "Expense",
      amount:
        transaction.amount !== undefined
          ? String(transaction.amount)
          : "",
      category: transaction.category || "",
      account: transaction.account || "",
      date: transaction.date || "",
      paymentMethod: transaction.paymentMethod || "",
      description: transaction.description || "",
    });

    setErrors({});
  }, [id, transactions]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleTypeChange = (type) => {
    setFormData((previous) => ({
      ...previous,
      type,
    }));

    setErrors((previous) => ({
      ...previous,
      type: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const amount = Number(formData.amount);

    if (!formData.type) {
      newErrors.type = "Please select transaction type.";
    }

    if (formData.amount === "") {
      newErrors.amount = "Amount is required.";
    } else if (!Number.isFinite(amount)) {
      newErrors.amount = "Please enter a valid amount.";
    } else if (amount <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.account) {
      newErrors.account = "Please select an account.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
    }

    if (formData.description.trim().length > 500) {
      newErrors.description =
        "Description cannot exceed 500 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm();

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const transactionData = {
      type: formData.type,
      amount: Number(formData.amount),
      category: formData.category,
      account: formData.account,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      description: formData.description.trim(),
    };

    if (isEditMode) {
      updateTransaction(id, transactionData);
    } else {
      addTransaction({
        id: Date.now(),
        ...transactionData,
      });
    }

    navigate("/transactions");
  };

  const handleCancel = () => {
    navigate("/transactions");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">

            {/* Back Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="
                mb-5 inline-flex items-center gap-2
                text-sm font-semibold
                text-[var(--text-secondary)]
                transition
                hover:text-[var(--primary-color)]
              "
            >
              <ArrowLeft size={17} />
              Back to Transactions
            </button>

            {/* Page Header */}
            <div className="mb-7">
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-xl bg-[var(--primary-soft)]
                    text-[var(--primary-color)]
                  "
                >
                  <Receipt size={23} />
                </div>

                <div>
                  <h1
                    className="
                      text-2xl font-bold
                      text-[var(--text-primary)]
                      sm:text-3xl
                    "
                  >
                    {isEditMode
                      ? "Edit Transaction"
                      : "Add Transaction"}
                  </h1>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {isEditMode
                      ? "Update your existing transaction details."
                      : "Record a new income or expense transaction."}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div
              className="
                overflow-hidden rounded-2xl
                border border-[var(--border-color)]
                bg-[var(--bg-secondary)]
                shadow-sm
              "
            >
              {/* Card Header */}
              <div
                className="
                  border-b border-[var(--border-color)]
                  px-5 py-5 sm:px-7
                "
              >
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  Transaction Information
                </h2>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Enter the details below to keep your finances organized.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-7"
              >
                <div className="space-y-6">

                  {/* Transaction Type */}
                  <div>
                    <label
                      className="
                        mb-2 block text-sm font-semibold
                        text-[var(--text-primary)]
                      "
                    >
                      Transaction Type
                    </label>

                    <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                      <button
                        type="button"
                        onClick={() => handleTypeChange("Income")}
                        className={`
                          inline-flex items-center justify-center gap-2
                          rounded-xl border px-4 py-3
                          text-sm font-semibold transition
                          ${
                            formData.type === "Income"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-emerald-400"
                          }
                        `}
                      >
                        <CheckCircle2 size={17} />
                        Income
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTypeChange("Expense")}
                        className={`
                          inline-flex items-center justify-center gap-2
                          rounded-xl border px-4 py-3
                          text-sm font-semibold transition
                          ${
                            formData.type === "Expense"
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-red-400"
                          }
                        `}
                      >
                        <Receipt size={17} />
                        Expense
                      </button>
                    </div>

                    {errors.type && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {errors.type}
                      </p>
                    )}
                  </div>

                  {/* Amount */}
                  <div>
                    <label
                      htmlFor="transaction-amount"
                      className="
                        mb-2 block text-sm font-semibold
                        text-[var(--text-primary)]
                      "
                    >
                      Amount
                    </label>

                    <div className="relative">
                      <CircleDollarSign
                        size={18}
                        className="
                          pointer-events-none absolute left-4 top-1/2
                          -translate-y-1/2
                          text-[var(--text-muted)]
                        "
                      />

                      <input
                        id="transaction-amount"
                        name="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="
                          w-full rounded-xl
                          border border-[var(--input-border)]
                          bg-[var(--input-bg)]
                          py-3 pl-11 pr-4
                          text-sm text-[var(--text-primary)]
                          outline-none transition
                          placeholder:text-[var(--text-muted)]
                          focus:border-[var(--primary-color)]
                          focus:ring-2
                          focus:ring-[var(--primary-color)]/20
                        "
                      />
                    </div>

                    {errors.amount && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  {/* Category + Account */}
                  <div className="grid gap-5 md:grid-cols-2">

                    {/* Category */}
                    <div>
                      <label
                        htmlFor="transaction-category"
                        className="
                          mb-2 block text-sm font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        Category
                      </label>

                      <select
                        id="transaction-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="
                          w-full rounded-xl
                          border border-[var(--input-border)]
                          bg-[var(--input-bg)]
                          px-4 py-3
                          text-sm text-[var(--text-primary)]
                          outline-none transition
                          focus:border-[var(--primary-color)]
                          focus:ring-2
                          focus:ring-[var(--primary-color)]/20
                        "
                      >
                        <option value="">
                          Select Category
                        </option>

                        {CATEGORY_OPTIONS.map((category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ))}
                      </select>

                      {errors.category && (
                        <p className="mt-2 text-sm font-medium text-red-500">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    {/* Account */}
                    <div>
                      <label
                        htmlFor="transaction-account"
                        className="
                          mb-2 block text-sm font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        Account
                      </label>

                      <div className="relative">
                        <WalletCards
                          size={17}
                          className="
                            pointer-events-none absolute left-4 top-1/2
                            -translate-y-1/2
                            text-[var(--text-muted)]
                          "
                        />

                        <select
                          id="transaction-account"
                          name="account"
                          value={formData.account}
                          onChange={handleChange}
                          className="
                            w-full rounded-xl
                            border border-[var(--input-border)]
                            bg-[var(--input-bg)]
                            py-3 pl-11 pr-4
                            text-sm text-[var(--text-primary)]
                            outline-none transition
                            focus:border-[var(--primary-color)]
                            focus:ring-2
                            focus:ring-[var(--primary-color)]/20
                          "
                        >
                          <option value="">
                            Select Account
                          </option>

                          {ACCOUNT_OPTIONS.map((account) => (
                            <option
                              key={account}
                              value={account}
                            >
                              {account}
                            </option>
                          ))}
                        </select>
                      </div>

                      {errors.account && (
                        <p className="mt-2 text-sm font-medium text-red-500">
                          {errors.account}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date + Payment Method */}
                  <div className="grid gap-5 md:grid-cols-2">

                    {/* Date */}
                    <div>
                      <label
                        htmlFor="transaction-date"
                        className="
                          mb-2 block text-sm font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        Date
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={17}
                          className="
                            pointer-events-none absolute left-4 top-1/2
                            -translate-y-1/2
                            text-[var(--text-muted)]
                          "
                        />

                        <input
                          id="transaction-date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="
                            w-full rounded-xl
                            border border-[var(--input-border)]
                            bg-[var(--input-bg)]
                            py-3 pl-11 pr-4
                            text-sm text-[var(--text-primary)]
                            outline-none transition
                            focus:border-[var(--primary-color)]
                            focus:ring-2
                            focus:ring-[var(--primary-color)]/20
                          "
                        />
                      </div>

                      {errors.date && (
                        <p className="mt-2 text-sm font-medium text-red-500">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label
                        htmlFor="payment-method"
                        className="
                          mb-2 block text-sm font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        Payment Method
                      </label>

                      <div className="relative">
                        <Banknote
                          size={17}
                          className="
                            pointer-events-none absolute left-4 top-1/2
                            -translate-y-1/2
                            text-[var(--text-muted)]
                          "
                        />

                        <select
                          id="payment-method"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className="
                            w-full rounded-xl
                            border border-[var(--input-border)]
                            bg-[var(--input-bg)]
                            py-3 pl-11 pr-4
                            text-sm text-[var(--text-primary)]
                            outline-none transition
                            focus:border-[var(--primary-color)]
                            focus:ring-2
                            focus:ring-[var(--primary-color)]/20
                          "
                        >
                          <option value="">
                            Select Method
                          </option>

                          {PAYMENT_METHOD_OPTIONS.map(
                            (method) => (
                              <option
                                key={method}
                                value={method}
                              >
                                {method}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="transaction-description"
                        className="
                          text-sm font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        Description
                      </label>

                      <span className="text-xs text-[var(--text-muted)]">
                        {formData.description.length}/500
                      </span>
                    </div>

                    <div className="relative">
                      <FileText
                        size={17}
                        className="
                          pointer-events-none absolute left-4 top-4
                          text-[var(--text-muted)]
                        "
                      />

                      <textarea
                        id="transaction-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description (optional)"
                        rows={4}
                        maxLength={500}
                        className="
                          w-full resize-none rounded-xl
                          border border-[var(--input-border)]
                          bg-[var(--input-bg)]
                          px-11 py-3
                          text-sm text-[var(--text-primary)]
                          outline-none transition
                          placeholder:text-[var(--text-muted)]
                          focus:border-[var(--primary-color)]
                          focus:ring-2
                          focus:ring-[var(--primary-color)]/20
                        "
                      />
                    </div>

                    {errors.description && (
                      <p className="mt-2 text-sm font-medium text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div
                    className="
                      flex flex-col-reverse gap-3
                      border-t border-[var(--border-color)]
                      pt-6 sm:flex-row sm:justify-end
                    "
                  >
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl
                        border border-[var(--border-color)]
                        bg-[var(--bg-primary)]
                        px-5 py-3
                        text-sm font-semibold
                        text-[var(--text-primary)]
                        transition
                        hover:border-[var(--primary-color)]
                      "
                    >
                      <X size={17} />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl bg-[var(--primary-color)]
                        px-5 py-3
                        text-sm font-semibold text-white
                        shadow-sm transition
                        hover:opacity-90
                      "
                    >
                      <Save size={17} />
                      {isEditMode
                        ? "Save Changes"
                        : "Add Transaction"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddTransaction;