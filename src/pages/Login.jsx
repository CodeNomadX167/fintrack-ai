function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center">
          FinTrack AI
        </h1>

        <h2 className="text-xl font-semibold text-center mt-2 mb-6">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
          />
        </div>

        <button className="w-full py-2 rounded-lg font-medium">
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?
          <button className="ml-1 font-medium underline">
            Sign Up
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;