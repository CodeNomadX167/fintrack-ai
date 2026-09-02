import { useState } from "react";

function Profile() {
  const [name, setName] = useState("Rahul");
  const [email, setEmail] = useState("rahul@gmail.com");
  const [phone, setPhone] = useState("9876543210");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          My Profile
        </h1>

        {/* Profile Picture */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl">
            👤
          </div>

          <p className="mt-2 text-gray-600">
            Profile Picture
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Phone
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-lg border border-blue-600 py-2 text-blue-600 hover:bg-blue-50"
          >
            Edit Profile
          </button>

          <button
            type="button"
            className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;