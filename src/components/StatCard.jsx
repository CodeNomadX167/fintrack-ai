function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-2xl font-bold text-gray-900">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;