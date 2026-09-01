import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">

        <h1 className="text-2xl font-bold text-center mb-2">
          Forgot Password?
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Enter your registered email
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Send Reset Link
        </button>

        <p className="text-center mt-4">
          <button
            type="button"
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;