import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Target,
  TrendingUp,
} from "lucide-react";

function GoalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  let goals = [];

  try {
    const savedGoals = localStorage.getItem("fintrack_goals");
    goals = savedGoals ? JSON.parse(savedGoals) : [];
  } catch {
    goals = [];
  }

  const goal = goals.find(
    (item) => String(item.id) === String(id)
  );

  if (!goal) {
    return (
      <div
        className="
          min-h-screen bg-[var(--bg-primary)]
          px-4 py-6 sm:px-6
        "
      >
        <div className="mx-auto max-w-3xl">
          <div
            className="
              rounded-2xl border border-[var(--border-color)]
              bg-[var(--bg-secondary)]
              p-8 text-center shadow-sm
            "
          >
            <div
              className="
                mx-auto flex h-14 w-14 items-center justify-center
                rounded-full bg-red-100 text-red-600
                dark:bg-red-900/30 dark:text-red-400
              "
            >
              <Target size={26} />
            </div>

            <h1
              className="
                mt-5 text-2xl font-bold
                text-[var(--text-primary)]
              "
            >
              Goal Not Found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-muted)]">
              The financial goal you are looking for does not
              exist or may have been removed.
            </p>

            <button
              type="button"
              onClick={() => navigate("/goals")}
              className="
                mt-6 inline-flex items-center gap-2
                rounded-xl bg-[var(--primary-color)]
                px-5 py-2.5 text-sm font-semibold text-white
                transition hover:opacity-90
              "
            >
              <ArrowLeft size={17} />
              Back to Goals
            </button>
          </div>
        </div>
      </div>
    );
  }

  const targetAmount = Number(goal.targetAmount) || 0;
  const savedAmount = Number(goal.savedAmount) || 0;

  const remaining = Math.max(
    targetAmount - savedAmount,
    0
  );

  const progress =
    targetAmount > 0
      ? Math.min((savedAmount / targetAmount) * 100, 100)
      : 0;

  const isCompleted = progress >= 100;

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div
      className="
        min-h-screen bg-[var(--bg-primary)]
        px-4 py-6 sm:px-6 lg:px-8
      "
    >
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/goals")}
          className="
            mb-6 inline-flex items-center gap-2
            text-sm font-semibold
            text-[var(--text-secondary)]
            transition hover:text-[var(--primary-color)]
          "
        >
          <ArrowLeft size={17} />
          Back to Goals
        </button>

        {/* Header */}
        <div className="mb-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-xl bg-[var(--primary-soft)]
                    text-[var(--primary-color)]
                  "
                >
                  <Target size={23} />
                </div>

                <div>
                  <h1
                    className="
                      text-2xl font-bold
                      text-[var(--text-primary)]
                      sm:text-3xl
                    "
                  >
                    {goal.name}
                  </h1>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Financial Goal Details
                  </p>
                </div>
              </div>
            </div>

            {isCompleted && (
              <span
                className="
                  w-fit rounded-full bg-emerald-100
                  px-3 py-1.5 text-xs font-bold
                  text-emerald-700
                  dark:bg-emerald-900/30
                  dark:text-emerald-400
                "
              >
                Goal Completed
              </span>
            )}
          </div>
        </div>

        {/* Main Card */}
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
              Goal Overview
            </h2>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Track your savings progress toward this goal.
            </p>
          </div>

          <div className="p-5 sm:p-7">

            {/* Amount Cards */}
            <div className="grid gap-4 sm:grid-cols-3">

              <div
                className="
                  rounded-xl border border-[var(--border-color)]
                  bg-[var(--bg-primary)] p-4
                "
              >
                <div className="flex items-center gap-2">
                  <CircleDollarSign
                    size={17}
                    className="text-[var(--primary-color)]"
                  />

                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Target
                  </p>
                </div>

                <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                  {formatCurrency(targetAmount)}
                </p>
              </div>

              <div
                className="
                  rounded-xl border border-[var(--border-color)]
                  bg-[var(--bg-primary)] p-4
                "
              >
                <div className="flex items-center gap-2">
                  <TrendingUp
                    size={17}
                    className="text-emerald-500"
                  />

                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Saved
                  </p>
                </div>

                <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                  {formatCurrency(savedAmount)}
                </p>
              </div>

              <div
                className="
                  rounded-xl border border-[var(--border-color)]
                  bg-[var(--bg-primary)] p-4
                "
              >
                <div className="flex items-center gap-2">
                  <Target
                    size={17}
                    className="text-orange-500"
                  />

                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Remaining
                  </p>
                </div>

                <p className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                  {formatCurrency(remaining)}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Savings Progress
                  </p>

                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {formatCurrency(savedAmount)} of{" "}
                    {formatCurrency(targetAmount)}
                  </p>
                </div>

                <span
                  className={`text-lg font-bold ${
                    isCompleted
                      ? "text-emerald-500"
                      : "text-[var(--primary-color)]"
                  }`}
                >
                  {progress.toFixed(1)}%
                </span>
              </div>

              <div
                className="
                  h-3 w-full overflow-hidden rounded-full
                  bg-[var(--border-color)]
                "
              >
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isCompleted
                      ? "bg-emerald-500"
                      : "bg-[var(--primary-color)]"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Meta Information */}
            <div
              className="
                mt-8 grid gap-5
                border-t border-[var(--border-color)]
                pt-6 sm:grid-cols-2
              "
            >
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={19}
                  className="mt-0.5 text-[var(--primary-color)]"
                />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Target Date
                  </p>

                  <p className="mt-1 font-semibold text-[var(--text-primary)]">
                    {goal.targetDate || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText
                  size={19}
                  className="mt-0.5 text-[var(--primary-color)]"
                />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Description
                  </p>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {goal.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default GoalDetailsPage;