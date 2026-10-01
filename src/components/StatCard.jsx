function StatCard({ title, value, icon, description }) {
  const cardStyles = {
    "Total Balance": {
      icon: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
      accent: "bg-blue-600",
    },

    "Total Income": {
      icon:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
      accent: "bg-emerald-600",
    },

    "Total Expense": {
      icon: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
      accent: "bg-red-600",
    },

    Savings: {
      icon:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
      accent: "bg-amber-500",
    },
  };

  const style = cardStyles[title] || {
    icon:
      "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300",
    accent: "bg-gray-500",
  };

  return (
    <article
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-[var(--border-color)]
        bg-[var(--bg-secondary)]
        p-5
        text-[var(--text-primary)]
        shadow-[var(--shadow-sm)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[var(--shadow-lg)]
        sm:p-6
      "
    >
      {/* Top Accent */}
      <div
        className={`absolute left-0 top-0 h-1 w-full ${style.accent}`}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--text-muted)]">
            {title}
          </p>

          <h2 className="mt-3 break-words text-2xl font-bold tracking-tight sm:text-3xl">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className={`
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            ${style.icon}
            transition-transform duration-300
            group-hover:scale-105
          `}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mt-4 border-t border-[var(--border-color)] pt-3">
          <p className="text-sm leading-5 text-[var(--text-muted)]">
            {description}
          </p>
        </div>
      )}
    </article>
  );
}

export default StatCard;