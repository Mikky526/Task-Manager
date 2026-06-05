import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (formData) => {
    setMessage("");
    setError("");

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
        setMessage("Task updated successfully");
        setEditingTask(null);
      } else {
        await API.post("/tasks", formData);
        setMessage("Task added successfully");
      }

      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    setMessage("");
    setError("");

    try {
      await API.delete(`/tasks/${id}`);
      setMessage("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "Pending").length,
      progress: tasks.filter((t) => t.status === "In Progress").length,
      completed: tasks.filter((t) => t.status === "Completed").length
    };
  }, [tasks]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 px-8 py-10 text-white shadow-2xl shadow-slate-900/20">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100">
              Task management</p>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Your productivity, elevated.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A premium dashboard for managing tasks with clarity. Build the right habits, stay focused, and ship your work with confidence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white/10 p-6 shadow-xl shadow-slate-900/20 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Total tasks</p>
              <p className="mt-4 text-4xl font-semibold text-white">{stats.total}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/10 p-6 shadow-xl shadow-slate-900/20 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Completed</p>
              <p className="mt-4 text-4xl font-semibold text-emerald-200">{stats.completed}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/10 p-6 shadow-xl shadow-slate-900/20 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">In progress</p>
              <p className="mt-4 text-4xl font-semibold text-sky-200">{stats.progress}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/10 p-6 shadow-xl shadow-slate-900/20 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Pending</p>
              <p className="mt-4 text-4xl font-semibold text-amber-200">{stats.pending}</p>
            </div>
          </div>
        </div>
      </section>

      {message && (
        <div className="mb-4 rounded-3xl bg-emerald-100 px-5 py-4 text-emerald-700 shadow">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-3xl bg-rose-100 px-5 py-4 text-rose-700 shadow">
          {error}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-8 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Task board</h2>
              <p className="mt-1 text-sm text-slate-500">Organize your workflow with filters and smart task cards.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "In Progress", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === status
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-200/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-slate-200 p-12 text-center text-slate-500">
              <p>No tasks found.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-8 shadow-xl shadow-slate-900/40">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Quick action</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Add or update tasks</h2>
            <p className="mt-2 text-sm text-slate-400">A clean interface for fast task entry and quick edits.</p>
          </div>
          <TaskForm
            onSubmit={handleSubmit}
            editingTask={editingTask}
            clearEdit={() => setEditingTask(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
