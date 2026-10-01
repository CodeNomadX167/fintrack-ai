import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

function GoalCard({ goal }) {
  const targetAmount = Number(goal?.targetAmount) || 0;
  const savedAmount = Number(goal?.savedAmount) || 0;

  const remaining = Math.max(targetAmount - savedAmount, 0);

  const progress =
    targetAmount > 0
      ? Math.min((savedAmount / targetAmount) * 100, 100)
      : 0;

  const isCompleted = progress >= 100;

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <article
      className="
        group relative overflow-hidden rounded-2xl
        border border-[var(--border-color)]
        bg-[var(--bg-secondary)]
        p-5 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* Top Accent */}
      <div
        className={`absolute left-0 top-0 h-1 w-full ${
          isCompleted ? "bg-emerald-500" : "bg-[var(--primary-color)]"
        }`}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl bg-[var(--primary-soft)]
              text-[var(--primary-color)]
            "
          >
            <Target size={21} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate text-lg font-bold
                text-[var(--text-primary)]
              "
            >
              {goal?.name || "Untitled Goal"}
            </h2>

            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              Financial Goal
            </p>
          </div>
        </div>

        {isCompleted && (
          <span
            className="
              shrink-0 rounded-full bg-emerald-100
              px-2.5 py-1 text-xs font-semibold text-emerald-700
              dark:bg-emerald-900/30 dark:text-emerald-400
            "
          >
            Completed
          </span>
        )}
      </div>

      {/* Amount Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div
          className="
            rounded-xl border border-[var(--border-color)]
            bg-[var(--bg-primary)] p-3
          "
        >
          <div className="flex items-center gap-2">
            <CircleDollarSign
              size={15}
              className="text-[var(--primary-color)]"
            />

            <p className="text-xs font-medium text-[var(--text-muted)]">
              Target
            </p>
          </div>

          <p className="mt-1.5 text-base font-bold text-[var(--text-primary)]">
            {formatCurrency(targetAmount)}
          </p>
        </div>

        <div
          className="
            rounded-xl border border-[var(--border-color)]
            bg-[var(--bg-primary)] p-3
          "
        >
          <div className="flex items-center gap-2">
            <TrendingUp
              size={15}
              className="text-emerald-500"
            />

            <p className="text-xs font-medium text-[var(--text-muted)]">
              Saved
            </p>
          </div>

          <p className="mt-1.5 text-base font-bold text-[var(--text-primary)]">
            {formatCurrency(savedAmount)}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            Progress
          </span>

          <span
            className={`text-sm font-bold ${
              isCompleted
                ? "text-emerald-500"
                : "text-[var(--text-primary)]"
            }`}
          >
            {progress.toFixed(1)}%
          </span>
        </div>

        <div
          className="
            h-2.5 w-full overflow-hidden rounded-full
            bg-[var(--border-color)]
          "
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted
                ? "bg-emerald-500"
                : "bg-[var(--primary-color)]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Remaining + Date */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--text-muted)]">
            Remaining
          </span>

          <span className="text-sm font-bold text-[var(--text-primary)]">
            {formatCurrency(remaining)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <CalendarDays size={15} />

          <span>
            Target Date:{" "}
            <span className="font-medium text-[var(--text-secondary)]">
              {goal?.targetDate || "Not set"}
            </span>
          </span>
        </div>
      </div>

      {/* Details */}
      <Link
        to={`/goals/${goal?.id}`}
        className="
          mt-6 flex w-full items-center justify-center gap-2
          rounded-xl border border-[var(--border-color)]
          bg-[var(--bg-primary)]
          px-4 py-2.5 text-sm font-semibold
          text-[var(--text-primary)]
          transition-all duration-200
          hover:border-[var(--primary-color)]
          hover:text-[var(--primary-color)]
        "
      >
        View Details
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}

export default GoalCard;