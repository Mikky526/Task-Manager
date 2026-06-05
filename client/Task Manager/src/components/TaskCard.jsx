const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    if (status === "Completed") return "bg-emerald-100 text-emerald-800";
    if (status === "In Progress") return "bg-sky-100 text-sky-800";
    return "bg-amber-100 text-amber-800";
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-rose-100 text-rose-800";
    if (priority === "Medium") return "bg-indigo-100 text-indigo-800";
    return "bg-slate-100 text-slate-800";
  };

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{task.title}</h3>
          <p className="mt-2 text-sm text-slate-500">{task.description || "No description provided."}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <span>
          {task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString()}` : "No due date"}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onEdit(task)}
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
