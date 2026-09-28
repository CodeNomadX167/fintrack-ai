import { useState } from "react";

function CreateGoalForm({ onCreate, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    targetDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    // Goal Name
    if (!formData.name.trim()) {
      newErrors.name = "Goal name is required.";
    }

    // Target Amount
    if (!formData.targetAmount) {
      newErrors.targetAmount =
        "Target amount is required.";
    } else if (Number(formData.targetAmount) <= 0) {
      newErrors.targetAmount =
        "Target amount must be greater than 0.";
    }

    // Target Date
    if (!formData.targetDate) {
      newErrors.targetDate =
        "Target date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const newGoal = {
      name: formData.name.trim(),

      targetAmount: Number(
        formData.targetAmount
      ),

      targetDate: formData.targetDate,

      description:
        formData.description.trim(),

      savedAmount: 0,
    };

    onCreate(newGoal);

    setFormData({
      name: "",
      targetAmount: "",
      targetDate: "",
      description: "",
    });

    setErrors({});
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

      {/* Heading */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Create Goal
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create a new financial savings goal.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Goal Name */}
        <div>

          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Goal Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. New Bike"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}

        </div>

        {/* Target Amount */}
        <div>

          <label
            htmlFor="targetAmount"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Target Amount
          </label>

          <input
            id="targetAmount"
            name="targetAmount"
            type="number"
            min="1"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="e.g. 60000"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.targetAmount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.targetAmount}
            </p>
          )}

        </div>

        {/* Target Date */}
        <div>

          <label
            htmlFor="targetDate"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Target Date
          </label>

          <input
            id="targetDate"
            name="targetDate"
            type="date"
            value={formData.targetDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.targetDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.targetDate}
            </p>
          )}

        </div>

        {/* Description */}
        <div>

          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
            <span className="ml-1 text-gray-400">
              (Optional)
            </span>
          </label>

          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write something about this goal..."
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Create Goal
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}

export default CreateGoalForm;