function StatCard({ title, value, icon, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
          {icon}
        </div>
      </div>

      <h2 className="mt-3 text-2xl font-bold text-gray-900">
        {value}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-gray-400">
          {description}
        </p>
      )}

    </div>
  );
}

export default StatCard;