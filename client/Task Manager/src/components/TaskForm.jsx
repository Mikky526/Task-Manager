import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: ""
};

const TaskForm = ({ onSubmit, editingTask, clearEdit }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "Pending",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ""
      });
    } else {
      setFormData(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    if (!editingTask) {
      setFormData(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] bg-slate-950 p-8 shadow-2xl shadow-slate-900/20">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-white">{editingTask ? "Update Task" : "Create Task"}</h2>
        <p className="text-sm text-slate-400">Use the form below to keep your task list up to date.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-indigo-500"
          required
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-indigo-500"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-indigo-500"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-indigo-500"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <textarea
        name="description"
        placeholder="Task description"
        rows="5"
        value={formData.description}
        onChange={handleChange}
        className="mt-5 w-full rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-indigo-500"
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          {editingTask ? "Update Task" : "Create Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={clearEdit}
            className="inline-flex items-center justify-center rounded-3xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
