function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          FinTrack AI
        </h1>

        <h2 className="mt-2 mb-6 text-center text-xl font-semibold text-gray-800">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <button className="ml-1 font-medium text-blue-600 underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;