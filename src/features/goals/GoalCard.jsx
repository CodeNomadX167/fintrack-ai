import { Link } from "react-router-dom";

function GoalCard({ goal }) {
  const remaining = Math.max(
    goal.targetAmount - goal.savedAmount,
    0
  );

  const progress =
    goal.targetAmount > 0
      ? Math.min(
          (goal.savedAmount / goal.targetAmount) * 100,
          100
        )
      : 0;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

      {/* Goal Name */}
      <h2 className="text-xl font-semibold text-gray-900">
        {goal.name}
      </h2>

      {/* Amount Details */}
      <div className="mt-5 space-y-2 text-sm">

        <p className="text-gray-600">
          Target:
          <span className="ml-1 font-semibold text-gray-900">
            ₹{goal.targetAmount.toLocaleString("en-IN")}
          </span>
        </p>

        <p className="text-gray-600">
          Saved:
          <span className="ml-1 font-semibold text-gray-900">
            ₹{goal.savedAmount.toLocaleString("en-IN")}
          </span>
        </p>

        <p className="text-gray-600">
          Remaining:
          <span className="ml-1 font-semibold text-gray-900">
            ₹{remaining.toLocaleString("en-IN")}
          </span>
        </p>

      </div>

      {/* Progress */}
      <div className="mt-5">

        <div className="mb-2 flex items-center justify-between text-sm">

          <span className="font-medium text-gray-700">
            Progress
          </span>

          <span className="font-semibold text-gray-900">
            {progress.toFixed(1)}%
          </span>

        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Target Date */}
      <p className="mt-4 text-sm text-gray-500">
        Target Date:{" "}
        <span className="font-medium text-gray-700">
          {goal.targetDate}
        </span>
      </p>

      {/* Details Button */}
      <Link
        to={`/goals/${goal.id}`}
        className="mt-6 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-50"
      >
        View Details
      </Link>

    </div>
  );
}

export default GoalCard;