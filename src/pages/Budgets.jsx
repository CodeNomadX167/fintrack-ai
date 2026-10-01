import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  Plus,
  Target,
  WalletCards,
  X,
} from "lucide-react";

const INITIAL_BUDGETS = [
  {
    id: 1,
    name: "Food",
    category: "Food",
    amount: 5000,
    spent: 2500,
    startDate: "",
    endDate: "",
  },
  {
    id: 2,
    name: "Transport",
    category: "Transport",
    amount: 3000,
    spent: 1800,
    startDate: "",
    endDate: "",
  },
];

const INITIAL_FORM = {
  name: "",
  category: "",
  amount: "",
  startDate: "",
  endDate: "",
};

const CATEGORY_OPTIONS = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Other",
];

function Budgets() {
  const [budgets, setBudgets] = useState(INITIAL_BUDGETS);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const totalBudget = budgets.reduce(
    (total, budget) => total + (Number(budget.amount) || 0),
    0
  );

  const totalSpent = budgets.reduce(
    (total, budget) => total + (Number(budget.spent) || 0),
    0
  );

  const totalRemaining = Math.max(
    totalBudget - totalSpent,
    0
  );

  const overallPercentage =
    totalBudget > 0
      ? Math.min((totalSpent / totalBudget) * 100, 100)
      : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const trimmedName = formData.name.trim();
    const numericAmount = Number(formData.amount);

    if (!trimmedName) {
      newErrors.name = "Budget name is required.";
    } else if (trimmedName.length > 50) {
      newErrors.name =
        "Budget name cannot exceed 50 characters.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (formData.amount === "") {
      newErrors.amount = "Budget amount is required.";
    } else if (!Number.isFinite(numericAmount)) {
      newErrors.amount = "Please enter a valid amount.";
    } else if (numericAmount <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate =
        "End date must be after start date.";
    }

    return newErrors;
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const closeCreateForm = () => {
    resetForm();
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm();

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newBudget = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      amount: Number(formData.amount),
      spent: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    setBudgets((previousBudgets) => [
      ...previousBudgets,
      newBudget,
    ]);

    closeCreateForm();
  };

  const getBudgetStatus = (percentage) => {
    if (percentage >= 100) {
      return {
        label: "Over Budget",
        className:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        progressClass: "bg-red-500",
        icon: AlertTriangle,
      };
    }

    if (percentage >= 80) {
      return {
        label: "Near Limit",
        className:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        progressClass: "bg-amber-500",
        icon: AlertTriangle,
      };
    }

    return {
      label: "On Track",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      progressClass: "bg-emerald-500",
      icon: CheckCircle2,
    };
  };

  return (
    <div
      className="
        min-h-screen bg-[var(--bg-primary)]
        px-4 py-6 sm:px-6 lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div
          className="
            mb-7 flex flex-col gap-5
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl bg-[var(--primary-soft)]
                  text-[var(--primary-color)]
                "
              >
                <Gauge size={22} />
              </div>

              <div>
                <h1
                  className="
                    text-2xl font-bold
                    text-[var(--text-primary)]
                    sm:text-3xl
                  "
                >
                  Budgets
                </h1>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Set spending limits and keep your expenses on track.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-[var(--primary-color)]
              px-5 py-3 text-sm font-semibold text-white
              shadow-sm transition-all duration-200
              hover:-translate-y-0.5 hover:opacity-90
            "
          >
            <Plus size={18} />
            Create Budget
          </button>
        </div>

        {/* Summary Cards */}
        {!showForm && budgets.length > 0 && (
          <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total Budget */}
            <div
              className="
                rounded-2xl border border-[var(--border-color)]
                bg-[var(--bg-secondary)] p-5 shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-blue-100 text-blue-600
                    dark:bg-blue-900/30 dark:text-blue-400
                  "
                >
                  <Target size={19} />
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Total Budget
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
                {formatCurrency(totalBudget)}
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Across {budgets.length} budget
                {budgets.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Total Spent */}
            <div
              className="
                rounded-2xl border border-[var(--border-color)]
                bg-[var(--bg-secondary)] p-5 shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-orange-100 text-orange-600
                    dark:bg-orange-900/30 dark:text-orange-400
                  "
                >
                  <CircleDollarSign size={19} />
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Total Spent
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
                {formatCurrency(totalSpent)}
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {Math.round(overallPercentage)}% of total budget
              </p>
            </div>

            {/* Remaining */}
            <div
              className="
                rounded-2xl border border-[var(--border-color)]
                bg-[var(--bg-secondary)] p-5 shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-emerald-100 text-emerald-600
                    dark:bg-emerald-900/30 dark:text-emerald-400
                  "
                >
                  <WalletCards size={19} />
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Remaining
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
                {formatCurrency(totalRemaining)}
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Available budget balance
              </p>
            </div>

            {/* Overall Progress */}
            <div
              className="
                rounded-2xl border border-[var(--border-color)]
                bg-[var(--bg-secondary)] p-5 shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl bg-purple-100 text-purple-600
                    dark:bg-purple-900/30 dark:text-purple-400
                  "
                >
                  <Gauge size={19} />
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Usage
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
                {Math.round(overallPercentage)}%
              </p>

              <div className="mt-2">
                <div
                  className="
                    h-1.5 overflow-hidden rounded-full
                    bg-[var(--border-color)]
                  "
                >
                  <div
                    className={`
                      h-full rounded-full transition-all duration-500
                      ${
                        overallPercentage >= 100
                          ? "bg-red-500"
                          : overallPercentage >= 80
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }
                    `}
                    style={{
                      width: `${overallPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Budget Form */}
        {showForm && (
          <div
            className="
              mb-8 overflow-hidden rounded-2xl
              border border-[var(--border-color)]
              bg-[var(--bg-secondary)]
              shadow-sm
            "
          >
            {/* Form Header */}
            <div
              className="
                flex items-start justify-between gap-4
                border-b border-[var(--border-color)]
                px-5 py-5 sm:px-7
              "
            >
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  Create Budget
                </h2>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Set a spending limit for a category.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCreateForm}
                aria-label="Close create budget form"
                className="
                  rounded-lg p-2
                  text-[var(--text-muted)]
                  transition
                  hover:bg-[var(--bg-primary)]
                  hover:text-[var(--text-primary)]
                "
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-7"
            >
              <div className="grid gap-5 md:grid-cols-2">

                {/* Budget Name */}
                <div>
                  <label
                    htmlFor="budget-name"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Budget Name
                  </label>

                  <input
                    id="budget-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Food Budget"
                    maxLength={50}
                    className={`
                      w-full rounded-xl border
                      bg-[var(--input-bg)]
                      px-4 py-3 text-sm
                      text-[var(--text-primary)]
                      outline-none transition
                      placeholder:text-[var(--text-muted)]
                      focus:ring-2
                      ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-[var(--input-border)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/20"
                      }
                    `}
                  />

                  {errors.name && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="budget-category"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Category
                  </label>

                  <select
                    id="budget-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`
                      w-full rounded-xl border
                      bg-[var(--input-bg)]
                      px-4 py-3 text-sm
                      text-[var(--text-primary)]
                      outline-none transition
                      focus:ring-2
                      ${
                        errors.category
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-[var(--input-border)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/20"
                      }
                    `}
                  >
                    <option value="" disabled>
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

                {/* Amount */}
                <div>
                  <label
                    htmlFor="budget-amount"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Budget Amount
                  </label>

                  <div className="relative">
                    <span
                      className="
                        pointer-events-none absolute left-4 top-1/2
                        -translate-y-1/2
                        text-sm font-semibold
                        text-[var(--text-muted)]
                      "
                    >
                      ₹
                    </span>

                    <input
                      id="budget-amount"
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="5000"
                      min="1"
                      step="0.01"
                      className={`
                        w-full rounded-xl border
                        bg-[var(--input-bg)]
                        py-3 pl-8 pr-4 text-sm
                        text-[var(--text-primary)]
                        outline-none transition
                        placeholder:text-[var(--text-muted)]
                        focus:ring-2
                        ${
                          errors.amount
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-[var(--input-border)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/20"
                        }
                      `}
                    />
                  </div>

                  {errors.amount && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.amount}
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <label
                    htmlFor="budget-start-date"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Start Date
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
                      id="budget-start-date"
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`
                        w-full rounded-xl border
                        bg-[var(--input-bg)]
                        py-3 pl-11 pr-4 text-sm
                        text-[var(--text-primary)]
                        outline-none transition
                        focus:ring-2
                        ${
                          errors.startDate
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-[var(--input-border)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/20"
                        }
                      `}
                    />
                  </div>

                  {errors.startDate && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label
                    htmlFor="budget-end-date"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    End Date
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
                      id="budget-end-date"
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={`
                        w-full rounded-xl border
                        bg-[var(--input-bg)]
                        py-3 pl-11 pr-4 text-sm
                        text-[var(--text-primary)]
                        outline-none transition
                        focus:ring-2
                        ${
                          errors.endDate
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-[var(--input-border)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/20"
                        }
                      `}
                    />
                  </div>

                  {errors.endDate && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div
                className="
                  mt-6 flex flex-col-reverse gap-3
                  border-t border-[var(--border-color)]
                  pt-6 sm:flex-row sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={closeCreateForm}
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
                    transition hover:opacity-90
                  "
                >
                  <Plus size={17} />
                  Create Budget
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Empty State */}
        {budgets.length === 0 ? (
          <div
            className="
              rounded-2xl border border-dashed
              border-[var(--border-color)]
              bg-[var(--bg-secondary)]
              px-6 py-14 text-center shadow-sm
            "
          >
            <div
              className="
                mx-auto flex h-16 w-16 items-center justify-center
                rounded-2xl bg-[var(--primary-soft)]
                text-[var(--primary-color)]
              "
            >
              <Target size={29} />
            </div>

            <h2
              className="
                mt-5 text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              No Budgets Yet
            </h2>

            <p
              className="
                mx-auto mt-2 max-w-md
                text-sm leading-6
                text-[var(--text-muted)]
              "
            >
              Create your first budget to start tracking
              and controlling your spending.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
              className="
                mt-6 inline-flex items-center gap-2
                rounded-xl bg-[var(--primary-color)]
                px-5 py-3
                text-sm font-semibold text-white
                transition hover:opacity-90
              "
            >
              <Plus size={18} />
              Create Your First Budget
            </button>
          </div>
        ) : (
          <>
            {/* Budget List Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Your Budgets
              </h2>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Monitor spending across your budget categories.
              </p>
            </div>

            {/* Budget Cards */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {budgets.map((budget) => {
                const amount = Number(budget.amount) || 0;
                const spent = Number(budget.spent) || 0;

                const remaining = Math.max(
                  amount - spent,
                  0
                );

                const percentage =
                  amount > 0
                    ? Math.min((spent / amount) * 100, 100)
                    : 0;

                const status = getBudgetStatus(
                  amount > 0
                    ? (spent / amount) * 100
                    : 0
                );

                const StatusIcon = status.icon;

                return (
                  <div
                    key={budget.id}
                    className="
                      group rounded-2xl
                      border border-[var(--border-color)]
                      bg-[var(--bg-secondary)]
                      p-5 shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg
                    "
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="
                            flex h-11 w-11 shrink-0
                            items-center justify-center
                            rounded-xl bg-[var(--primary-soft)]
                            text-[var(--primary-color)]
                          "
                        >
                          <Target size={21} />
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="
                              truncate text-base font-bold
                              text-[var(--text-primary)]
                            "
                          >
                            {budget.name}
                          </h3>

                          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                            {budget.category}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`
                          inline-flex shrink-0 items-center gap-1
                          rounded-full px-2.5 py-1
                          text-xs font-semibold
                          ${status.className}
                        `}
                      >
                        <StatusIcon size={13} />
                        {status.label}
                      </span>
                    </div>

                    {/* Budget Amount */}
                    <div
                      className="
                        mt-6 flex items-end justify-between
                        rounded-xl
                        border border-[var(--border-color)]
                        bg-[var(--bg-primary)]
                        p-4
                      "
                    >
                      <div>
                        <p className="text-xs font-medium text-[var(--text-muted)]">
                          Budget Limit
                        </p>

                        <p className="mt-1 text-xl font-bold text-[var(--text-primary)]">
                          {formatCurrency(amount)}
                        </p>
                      </div>

                      <span className="text-xs text-[var(--text-muted)]">
                        {Math.round(percentage)}% used
                      </span>
                    </div>

                    {/* Spent / Remaining */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div
                        className="
                          rounded-xl
                          border border-[var(--border-color)]
                          bg-[var(--bg-primary)]
                          p-3
                        "
                      >
                        <p className="text-xs text-[var(--text-muted)]">
                          Spent
                        </p>

                        <p className="mt-1 text-base font-bold text-[var(--text-primary)]">
                          {formatCurrency(spent)}
                        </p>
                      </div>

                      <div
                        className="
                          rounded-xl
                          border border-[var(--border-color)]
                          bg-[var(--bg-primary)]
                          p-3
                        "
                      >
                        <p className="text-xs text-[var(--text-muted)]">
                          Remaining
                        </p>

                        <p
                          className={`mt-1 text-base font-bold ${
                            remaining > 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {formatCurrency(remaining)}
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text-secondary)]">
                          Spending Progress
                        </span>

                        <span className="text-sm font-bold text-[var(--text-primary)]">
                          {Math.round(percentage)}%
                        </span>
                      </div>

                      <div
                        className="
                          h-2.5 overflow-hidden rounded-full
                          bg-[var(--border-color)]
                        "
                      >
                        <div
                          className={`
                            h-full rounded-full
                            transition-all duration-500
                            ${status.progressClass}
                          `}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    {(budget.startDate || budget.endDate) && (
                      <div
                        className="
                          mt-5 flex items-center gap-2
                          border-t border-[var(--border-color)]
                          pt-4 text-xs
                          text-[var(--text-muted)]
                        "
                      >
                        <CalendarDays size={14} />

                        <span>
                          {budget.startDate || "—"}{" "}
                          →{" "}
                          {budget.endDate || "—"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Budgets;