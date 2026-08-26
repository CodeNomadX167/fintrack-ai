export default function Card({ title, children }) {
  return (
    <div className="p-6 bg-white shadow rounded-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{children}</p>
    </div>
  );
}