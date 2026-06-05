import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    const result = await register(formData);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthLayout
      variant="register"
      actionText="New member"
      heading="Secure onboarding for modern teams."
      subheading="Register and start managing your tasks in a secure workspace built for productivity, clarity, and fast execution."
      featureTitle="What you get"
      featureItems={[
        "Modern auth with JWT and secure backend login",
        "Task workflow built for clean daily planning",
        "Responsive design that scales from desktop to mobile"
      ]}
      actionLink="Already have an account?"
      actionLinkText={{ href: "/login", label: "Login" }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Create your account</h2>
        <p className="mt-3 text-sm text-slate-500">
          Register now and keep your task progress safe and synced.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-3xl bg-rose-100 px-5 py-4 text-rose-700 shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>

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
            placeholder="Create a strong password"
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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
