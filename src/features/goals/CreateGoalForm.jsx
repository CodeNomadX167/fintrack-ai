import { useState } from "react";
import { CalendarDays, IndianRupee, Target } from "lucide-react";

const INITIAL_FORM_DATA = {
  name: "",
  targetAmount: "",
  targetDate: "",
  description: "",
};

function CreateGoalForm({ onCreate, onCancel }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const trimmedName = formData.name.trim();
    const amount = Number(formData.targetAmount);

    if (!trimmedName) {
      newErrors.name = "Goal name is required.";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Goal name must be 100 characters or less.";
    }

    if (!formData.targetAmount) {
      newErrors.targetAmount = "Target amount is required.";
    } else if (!Number.isFinite(amount) || amount <= 0) {
      newErrors.targetAmount = "Target amount must be greater than 0.";
    }

    if (!formData.targetDate) {
      newErrors.targetDate = "Target date is required.";
    } else {
      const selectedDate = new Date(`${formData.targetDate}T00:00:00`);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.targetDate = "Target date cannot be in the past.";
      }
    }

    if (formData.description.trim().length > 500) {
      newErrors.description =
        "Description must be 500 characters or less.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newGoal = {
      name: formData.name.trim(),
      targetAmount: Number(formData.targetAmount),
      targetDate: formData.targetDate,
      description: formData.description.trim(),
      savedAmount: 0,
    };

    onCreate(newGoal);

    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 text-[var(--text-primary)] shadow-[var(--shadow-md)] transition-colors duration-300 sm:p-6 lg:p-7">
      {/* Header */}
      <div className="mb-7 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--primary)]">
          <Target size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold sm:text-2xl">
            Create Goal
          </h2>

          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
            Create a new financial savings goal and track your progress.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Goal Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium"
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
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full rounded-xl border bg-[var(--input-bg)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] ${
              errors.name
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            }`}
          />

          {errors.name && (
            <p
              id="name-error"
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Target Amount */}
        <div>
          <label
            htmlFor="targetAmount"
            className="mb-2 block text-sm font-medium"
          >
            Target Amount
          </label>

          <div className="relative">
            <IndianRupee
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              aria-hidden="true"
            />

            <input
              id="targetAmount"
              name="targetAmount"
              type="number"
              min="1"
              step="1"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="e.g. 60000"
              aria-invalid={Boolean(errors.targetAmount)}
              aria-describedby={
                errors.targetAmount ? "targetAmount-error" : undefined
              }
              className={`w-full rounded-xl border bg-[var(--input-bg)] py-3 pl-11 pr-4 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] ${
                errors.targetAmount
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              }`}
            />
          </div>

          {errors.targetAmount && (
            <p
              id="targetAmount-error"
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {errors.targetAmount}
            </p>
          )}
        </div>

        {/* Target Date */}
        <div>
          <label
            htmlFor="targetDate"
            className="mb-2 block text-sm font-medium"
          >
            Target Date
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              aria-hidden="true"
            />

            <input
              id="targetDate"
              name="targetDate"
              type="date"
              value={formData.targetDate}
              onChange={handleChange}
              aria-invalid={Boolean(errors.targetDate)}
              aria-describedby={
                errors.targetDate ? "targetDate-error" : undefined
              }
              className={`w-full rounded-xl border bg-[var(--input-bg)] py-3 pl-11 pr-4 text-[var(--text-primary)] outline-none transition ${
                errors.targetDate
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              }`}
            />
          </div>

          {errors.targetDate && (
            <p
              id="targetDate-error"
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {errors.targetDate}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
              <span className="ml-1 font-normal text-[var(--text-muted)]">
                (Optional)
              </span>
            </label>

            <span className="text-xs text-[var(--text-muted)]">
              {formData.description.length}/500
            </span>
          </div>

          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            placeholder="Write something about this goal..."
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
            className={`w-full resize-none rounded-xl border bg-[var(--input-bg)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] ${
              errors.description
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            }`}
          />

          {errors.description && (
            <p
              id="description-error"
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {errors.description}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[var(--border-color)] px-5 py-3 font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:min-w-28"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[var(--primary)] px-5 py-3 font-medium text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 sm:min-w-32"
          >
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGoalForm;