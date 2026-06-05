import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-xl bg-white/80 text-slate-900 shadow-lg shadow-slate-200/40 border-b border-slate-200/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">TM</span>
          <span>Task Manager</span>
        </Link>

        {userInfo ? (
          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 shadow-sm">
              Hi, {userInfo.name}
            </div>
            <button
              onClick={handleLogout}
              className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
