import { useState } from "react";

const initialBudgets = [
  {
    id: 1,
    name: "Food",
    category: "Food",
    amount: 5000,
    spent: 2500,
  },
  {
    id: 2,
    name: "Transport",
    category: "Transport",
    amount: 3000,
    spent: 1800,
  },
];

const initialForm = {
  name: "",
  category: "",
  amount: "",
  startDate: "",
  endDate: "",
};

function Budgets() {
  const [budgets, setBudgets] = useState(initialBudgets);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Budget name is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.amount) {
      newErrors.amount = "Budget amount is required.";
    } else if (Number(formData.amount) <= 0) {
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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
  };

  // Open form
  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  // Close form
  const closeCreateForm = () => {
    resetForm();
    setShowForm(false);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Budgets
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your monthly spending limits
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          + Create Budget
        </button>
      </div>

      {/* Create Budget Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Create Budget
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Set a spending limit for your budget.
              </p>
            </div>

            <button
              type="button"
              onClick={closeCreateForm}
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            {/* Budget Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Budget Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Food Budget"
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-white px-4 py-3 outline-none ${
                  errors.category
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              >
                <option value="" disabled>
                  Select Category
                </option>

                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">
                  Entertainment
                </option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>

              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Budget Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="5000"
                min="1"
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.amount
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />

              {errors.amount && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.startDate
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />

              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 outline-none ${
                  errors.endDate
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />

              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endDate}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-3">
              <button
                type="submit"
                className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Create Budget
              </button>

              <button
                type="button"
                onClick={closeCreateForm}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty State */}
      {budgets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            No budgets yet.
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first budget.
          </p>

          <button
            onClick={openCreateForm}
            className="mt-6 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Create Budget
          </button>
        </div>
      ) : (
        /* Budget List */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const remaining = budget.amount - budget.spent;

            const percentage = Math.min(
              (budget.spent / budget.amount) * 100,
              100
            );

            return (
              <div
                key={budget.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Budget Name + Amount */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {budget.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {budget.category}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-gray-900">
                    ₹{budget.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Spent + Remaining */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Spent
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      ₹{budget.spent.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Remaining
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      ₹{remaining.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Spending Progress
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(percentage)}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-black transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Budgets;