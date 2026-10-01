import { useState } from "react";
import {
  Plus,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import GoalCard from "./GoalCard";
import CreateGoalForm from "./CreateGoalForm";

const DEFAULT_GOALS = [
  {
    id: 1,
    name: "Emergency Fund",
    targetAmount: 50000,
    savedAmount: 20000,
    targetDate: "2026-12-31",
    description: "Emergency savings",
  },
  {
    id: 2,
    name: "New Laptop",
    targetAmount: 80000,
    savedAmount: 30000,
    targetDate: "2027-06-30",
    description: "Savings for a new laptop",
  },
];

function GoalsPage() {
  const [goals, setGoals] = useState(() => {
    try {
      const savedGoals = localStorage.getItem("fintrack_goals");

      if (savedGoals) {
        const parsedGoals = JSON.parse(savedGoals);

        return Array.isArray(parsedGoals)
          ? parsedGoals
          : DEFAULT_GOALS;
      }

      localStorage.setItem(
        "fintrack_goals",
        JSON.stringify(DEFAULT_GOALS)
      );

      return DEFAULT_GOALS;
    } catch {
      return DEFAULT_GOALS;
    }
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  const totalTarget = goals.reduce(
    (total, goal) =>
      total + (Number(goal.targetAmount) || 0),
    0
  );

  const totalSaved = goals.reduce(
    (total, goal) =>
      total + (Number(goal.savedAmount) || 0),
    0
  );

  const overallProgress =
    totalTarget > 0
      ? Math.min((totalSaved / totalTarget) * 100, 100)
      : 0;

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  const handleCreateGoal = (newGoal) => {
    const goal = {
      id: Date.now(),
      ...newGoal,
      savedAmount: 0,
    };

    setGoals((previousGoals) => {
      const updatedGoals = [...previousGoals, goal];

      localStorage.setItem(
        "fintrack_goals",
        JSON.stringify(updatedGoals)
      );

      return updatedGoals;
    });

    setShowCreateForm(false);
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
                <Target size={22} />
              </div>

              <div>
                <h1
                  className="
                    text-2xl font-bold
                    text-[var(--text-primary)]
                    sm:text-3xl
                  "
                >
                  Financial Goals
                </h1>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Plan, save, and track your financial goals.
                </p>
              </div>
            </div>
          </div>

          {!showCreateForm && (
            <button
              type="button"
              onClick={() => setShowCreateForm(true)}
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl bg-[var(--primary-color)]
                px-5 py-3 text-sm font-semibold text-white
                shadow-sm transition-all duration-200
                hover:-translate-y-0.5 hover:opacity-90
                sm:w-auto
              "
            >
              <Plus size={18} />
              Create Goal
            </button>
          )}
        </div>

        {/* Summary Cards */}
        {!showCreateForm && goals.length > 0 && (
          <div className="mb-7 grid gap-4 sm:grid-cols-3">

            {/* Total Goals */}
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
                    rounded-xl bg-[var(--primary-soft)]
                    text-[var(--primary-color)]
                  "
                >
                  <Target size={19} />
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Goals
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
                {goals.length}
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Active financial goals
              </p>
            </div>

            {/* Total Target */}
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
                  <WalletCards size={19} />
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Target
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
                {formatCurrency(totalTarget)}
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Combined target amount
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
                    rounded-xl bg-emerald-100 text-emerald-600
                    dark:bg-emerald-900/30 dark:text-emerald-400
                  "
                >
                  <TrendingUp size={19} />
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Progress
                </span>
              </div>

              <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
                {overallProgress.toFixed(1)}%
              </p>

              <div className="mt-2">
                <div
                  className="
                    h-1.5 overflow-hidden rounded-full
                    bg-[var(--border-color)]
                  "
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>

              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {formatCurrency(totalSaved)} saved
              </p>
            </div>
          </div>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <div className="mb-8">
            <CreateGoalForm
              onCreate={handleCreateGoal}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        )}

        {/* Goals */}
        {!showCreateForm && (
          <>
            {goals.length > 0 ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">
                      Your Goals
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Keep track of your savings progress.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {goals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                    />
                  ))}
                </div>
              </div>
            ) : (
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
                  No Financial Goals Yet
                </h2>

                <p
                  className="
                    mx-auto mt-2 max-w-md
                    text-sm leading-6
                    text-[var(--text-muted)]
                  "
                >
                  Create your first financial goal and start
                  tracking how close you are to reaching it.
                </p>

                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="
                    mt-6 inline-flex items-center gap-2
                    rounded-xl bg-[var(--primary-color)]
                    px-5 py-3 text-sm font-semibold text-white
                    transition hover:opacity-90
                  "
                >
                  <Plus size={18} />
                  Create Your First Goal
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GoalsPage;