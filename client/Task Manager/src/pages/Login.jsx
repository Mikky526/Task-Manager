import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(formData);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthLayout
      variant="login"
      actionText="Welcome back"
      heading="Access your task workspace instantly."
      subheading="Login securely and continue managing your tasks in a modern dashboard environment optimized for efficiency."
      featureTitle="Your security matters"
      featureItems={[
        "Token-based login with safe session handling",
        "Clean interface for rapid task access",
        "Designed for both desktop and handheld screens"
      ]}
      actionLink="Don't have an account?"
      actionLinkText={{ href: "/register", label: "Register" }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Welcome back</h2>
        <p className="mt-3 text-sm text-slate-500">
          Enter your credentials to access your tasks and stay productive.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-3xl bg-rose-100 px-5 py-4 text-rose-700 shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-3xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
