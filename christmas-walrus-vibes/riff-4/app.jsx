/*BUSINESS
name: Wendell's Year-End Task Hub
pitch: Enterprise task management with holiday cheer - keep your team productive through the festive season
customer: Team leads and project managers at mid-size companies managing year-end deadlines
revenue: $15/user/month with annual enterprise licensing, 14-day free trial
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

// Wendell the Workflow Walrus SVG Component
function WendellWalrus({ size = 120, mood = "happy" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Santa Hat */}
      <path d="M30 35 L60 5 L90 35 L30 35" fill="oklch(0.45 0.18 25)" />
      <ellipse cx="60" cy="35" rx="35" ry="8" fill="oklch(0.95 0.01 90)" />
      <circle cx="60" cy="8" r="8" fill="oklch(0.95 0.01 90)" />
      
      {/* Walrus Body/Head */}
      <ellipse cx="60" cy="65" rx="40" ry="35" fill="oklch(0.55 0.08 55)" />
      
      {/* Snout */}
      <ellipse cx="60" cy="78" rx="25" ry="18" fill="oklch(0.65 0.06 55)" />
      
      {/* Whisker dots */}
      <circle cx="45" cy="75" r="3" fill="oklch(0.45 0.05 55)" />
      <circle cx="40" cy="80" r="3" fill="oklch(0.45 0.05 55)" />
      <circle cx="42" cy="85" r="3" fill="oklch(0.45 0.05 55)" />
      <circle cx="75" cy="75" r="3" fill="oklch(0.45 0.05 55)" />
      <circle cx="80" cy="80" r="3" fill="oklch(0.45 0.05 55)" />
      <circle cx="78" cy="85" r="3" fill="oklch(0.45 0.05 55)" />
      
      {/* Tusks */}
      <path d="M48 88 L45 110 L52 88" fill="oklch(0.95 0.02 90)" />
      <path d="M72 88 L75 110 L68 88" fill="oklch(0.95 0.02 90)" />
      
      {/* Eyes */}
      <ellipse cx="45" cy="55" rx="8" ry="9" fill="oklch(0.98 0 0)" />
      <ellipse cx="75" cy="55" rx="8" ry="9" fill="oklch(0.98 0 0)" />
      <circle cx="47" cy="54" r="4" fill="oklch(0.2 0.02 250)" />
      <circle cx="77" cy="54" r="4" fill="oklch(0.2 0.02 250)" />
      <circle cx="48" cy="52" r="1.5" fill="oklch(0.98 0 0)" />
      <circle cx="78" cy="52" r="1.5" fill="oklch(0.98 0 0)" />
      
      {/* Monocle */}
      <circle cx="75" cy="55" r="12" fill="none" stroke="oklch(0.7 0.15 85)" strokeWidth="2" />
      <line x1="87" y1="55" x2="95" y2="70" stroke="oklch(0.7 0.15 85)" strokeWidth="1.5" />
      
      {/* Nose */}
      <ellipse cx="60" cy="72" rx="6" ry="4" fill="oklch(0.25 0.08 15)" />
      
      {/* Smile or expression based on mood */}
      {mood === "happy" && (
        <path d="M50 90 Q60 96 70 90" fill="none" stroke="oklch(0.35 0.05 25)" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

// Snowflake decoration component
function Snowflake({ className = "" }) {
  return (
    <span className={`text-[oklch(0.85_0.05_220)] opacity-30 ${className}`}>❄</span>
  );
}

// Priority badge component
function PriorityBadge({ priority }) {
  const styles = {
    high: "bg-[oklch(0.35_0.12_15)] text-[oklch(0.95_0.01_90)]",
    medium: "bg-[oklch(0.6_0.12_85)] text-[oklch(0.2_0.02_85)]",
    low: "bg-[oklch(0.45_0.15_145)] text-[oklch(0.95_0.01_90)]"
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${styles[priority]}`}>
      {priority}
    </span>
  );
}

// Status badge component
function StatusBadge({ status }) {
  const styles = {
    todo: "bg-[oklch(0.3_0.05_250)] text-[oklch(0.8_0.02_250)]",
    "in-progress": "bg-[oklch(0.5_0.12_85)] text-[oklch(0.15_0.02_85)]",
    done: "bg-[oklch(0.45_0.15_145)] text-[oklch(0.95_0.01_90)]"
  };
  
  const labels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Complete"
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("wendell-tasks");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Task form document
  const [formDoc, setFormDoc, saveFormDoc] = useDocument(() => ({
    _id: "new-task-form",
    type: "form",
    title: "",
    description: "",
    assignee: "",
    priority: "medium",
    status: "todo",
    deadline: ""
  }));
  
  // Query all tasks
  const { docs: allTasks } = useLiveQuery("type", { key: "task" });
  
  // Filter tasks
  const tasks = filterStatus === "all" 
    ? allTasks 
    : allTasks.filter(t => t.status === filterStatus);
  
  // Task stats
  const stats = {
    total: allTasks.length,
    todo: allTasks.filter(t => t.status === "todo").length,
    inProgress: allTasks.filter(t => t.status === "in-progress").length,
    done: allTasks.filter(t => t.status === "done").length
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      type: "task",
      title: formDoc.title,
      description: formDoc.description,
      assignee: formDoc.assignee,
      priority: formDoc.priority,
      status: formDoc.status,
      deadline: formDoc.deadline,
      createdAt: editingId ? formDoc.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (editingId) {
      taskData._id = editingId;
    }
    
    await saveFormDoc(taskData);
    
    // Reset form
    setFormDoc({
      _id: "new-task-form",
      type: "form",
      title: "",
      description: "",
      assignee: "",
      priority: "medium",
      status: "todo",
      deadline: ""
    });
    setShowForm(false);
    setEditingId(null);
  };
  
  const handleEdit = (task) => {
    setFormDoc({
      ...task,
      _id: "new-task-form"
    });
    setEditingId(task._id);
    setShowForm(true);
  };
  
  const handleDelete = async (taskId) => {
    const { useDocument: getDoc } = useFireproof("wendell-tasks");
    // Simple delete by saving with _deleted
    await saveFormDoc({ _id: taskId, _deleted: true });
  };
  
  const handleStatusChange = async (task, newStatus) => {
    await saveFormDoc({
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  };
  
  const completionRate = stats.total > 0 
    ? Math.round((stats.done / stats.total) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.15_0.04_250),oklch(0.12_0.03_220))]">
      {/* Decorative snowflakes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Snowflake className="absolute top-10 left-[10%] text-3xl" />
        <Snowflake className="absolute top-20 right-[15%] text-2xl" />
        <Snowflake className="absolute top-40 left-[25%] text-xl" />
        <Snowflake className="absolute top-32 right-[30%] text-4xl" />
        <Snowflake className="absolute bottom-20 left-[5%] text-2xl" />
        <Snowflake className="absolute bottom-40 right-[8%] text-3xl" />
      </div>
      
      {/* Header */}
      <header className="bg-[linear-gradient(in_oklch,oklch(0.2_0.06_250),oklch(0.16_0.04_230))] border-b border-[oklch(0.3_0.04_250)] shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <WendellWalrus size={60} />
              <div>
                <h1 className="text-2xl font-bold text-[oklch(0.95_0.01_90)]">
                  Wendell's Year-End Task Hub
                </h1>
                <p className="text-sm text-[oklch(0.7_0.03_220)]">
                  Keep your team productive through the festive season ❄️
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setFormDoc({
                  _id: "new-task-form",
                  type: "form",
                  title: "",
                  description: "",
                  assignee: "",
                  priority: "medium",
                  status: "todo",
                  deadline: ""
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[linear-gradient(in_oklch,oklch(0.65_0.15_85),oklch(0.55_0.14_75))] text-[oklch(0.15_0.02_85)] font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
            >
              <span className="text-lg">+</span>
              New Task
            </button>
          </div>
        </div>
      </header>
      
      {/* Stats Bar */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[oklch(0.18_0.03_250)] rounded-xl p-4 border border-[oklch(0.25_0.03_250)]">
            <div className="text-[oklch(0.6_0.03_220)] text-sm font-medium">Total Tasks</div>
            <div className="text-3xl font-bold text-[oklch(0.95_0.01_90)]">{stats.total}</div>
          </div>
          <div className="bg-[oklch(0.18_0.03_250)] rounded-xl p-4 border border-[oklch(0.25_0.03_250)]">
            <div className="text-[oklch(0.6_0.03_220)] text-sm font-medium">To Do</div>
            <div className="text-3xl font-bold text-[oklch(0.7_0.08_220)]">{stats.todo}</div>
          </div>
          <div className="bg-[oklch(0.18_0.03_250)] rounded-xl p-4 border border-[oklch(0.25_0.03_250)]">
            <div className="text-[oklch(0.6_0.03_220)] text-sm font-medium">In Progress</div>
            <div className="text-3xl font-bold text-[oklch(0.7_0.15_85)]">{stats.inProgress}</div>
          </div>
          <div className="bg-[oklch(0.18_0.03_250)] rounded-xl p-4 border border-[oklch(0.25_0.03_250)]">
            <div className="text-[oklch(0.6_0.03_220)] text-sm font-medium">Completed</div>
            <div className="text-3xl font-bold text-[oklch(0.55_0.15_145)]">{stats.done}</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 bg-[oklch(0.18_0.03_250)] rounded-xl p-4 border border-[oklch(0.25_0.03_250)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[oklch(0.7_0.03_220)] text-sm font-medium">Year-End Progress</span>
            <span className="text-[oklch(0.95_0.01_90)] font-bold">{completionRate}%</span>
          </div>
          <div className="h-3 bg-[oklch(0.25_0.03_250)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[linear-gradient(in_oklch_90deg,oklch(0.45_0.15_145),oklch(0.55_0.18_145))] transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <div className="flex gap-2">
          {[
            { key: "all", label: "All Tasks" },
            { key: "todo", label: "To Do" },
            { key: "in-progress", label: "In Progress" },
            { key: "done", label: "Completed" }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filterStatus === filter.key
                  ? "bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_85)]"
                  : "bg-[oklch(0.2_0.03_250)] text-[oklch(0.7_0.03_220)] hover:bg-[oklch(0.25_0.03_250)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[oklch(0.18_0.04_250)] rounded-2xl w-full max-w-lg border border-[oklch(0.28_0.04_250)] shadow-2xl">
            <div className="p-6 border-b border-[oklch(0.25_0.03_250)]">
              <div className="flex items-center gap-3">
                <WendellWalrus size={40} />
                <h2 className="text-xl font-bold text-[oklch(0.95_0.01_90)]">
                  {editingId ? "Edit Task" : "Create New Task"}
                </h2>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[oklch(0.7_0.03_220)] mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={formDoc.title}
                  onChange={(e) => setFormDoc({ ...formDoc, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[oklch(0.12_0.02_250)] border border-[oklch(0.3_0.03_250)] rounded-lg text-[oklch(0.95_0.01_90)] placeholder-[oklch(0.5_0.02_220)] focus:outline-none focus:border-[oklch(0.6_0.12_85)]"
                  placeholder="e.g., Finalize Q4 reports"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[oklch(0.7_0.03_220)] mb-1">
                  Description
                </label>
                <textarea
                  value={formDoc.description}
                  onChange={(e) => setFormDoc({ ...formDoc, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-[oklch(0.12_0.02_250)] border border-[oklch(0.3_0.03_250)] rounded-lg text-[oklch(0.95_0.01_90)] placeholder-[oklch(0.5_0.02_220)] focus:outline-none focus:border-[oklch(0.6_0.12_85)] resize-none"
                  placeholder="Add task details..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[oklch(0.7_0.03_220)] mb-1">
                    Assignee
                  </label>
                  <input
                    type="text"
                    value={formDoc.assignee}
                    onChange={(e) => setFormDoc({ ...formDoc, assignee: e.target.value })}
                    className="w-full px-4 py-2 bg-[oklch(0.12_0.02_250)] border border-[oklch(0.3_0.03_250)] rounded-lg text-[oklch(0.95_0.01_90)] placeholder-[oklch(0.5_0.02_220)] focus:outline-none focus:border-[oklch(0.6_0.12_85)]"
                    placeholder="Team member name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[oklch(0.7_0.03_220)] mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={formDoc.deadline}
                    onChange={(e) => setFormDoc({ ...formDoc, deadline: e.target.value })}
                    className="w-full px-4 py-2 bg-[oklch(0.12_0.02_250)] border border-[oklch(0.3_0.03_250)] rounded-lg text-[oklch(0.95_0.01_90)] focus:outline-none focus:border-[oklch(0.6_0.12_85)]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[oklch(0.7_0.03_220)] mb-1">
                    Priority
                  </label>
                  <select
                    value={formDoc.priority}
                    onChange={(e) => setFormDoc({ ...formDoc, priority: e.target.value })}
                    className="w-full px-4 py-2 bg-[oklch(0.12_0.02_250)] border border-[oklch(0.3_0.03_250)] rounded-lg text-[oklch(0.95_0.01_90)] focus:outline-none focus:border-[oklch(0.6_0.12_85)]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[oklch(0.7_0.03_220)] mb-1">
                    Status
                  </label>
                  <select
                    value={formDoc.status}
                    onChange={(e) => setFormDoc({ ...formDoc, status: e.target.value })}
                    className="w-full px-4 py-2 bg-[oklch(0.12_0.02_250)] border border-[oklch(0.3_0.03_250)] rounded-lg text-[oklch(0.95_0.01_90)] focus:outline-none focus:border-[oklch(0.6_0.12_85)]"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 px-4 py-2 bg-[oklch(0.25_0.03_250)] text-[oklch(0.8_0.02_220)] font-medium rounded-lg hover:bg-[oklch(0.3_0.03_250)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[linear-gradient(in_oklch,oklch(0.65_0.15_85),oklch(0.55_0.14_75))] text-[oklch(0.15_0.02_85)] font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  {editingId ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Task List */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        {tasks.length === 0 ? (
          <div className="bg-[oklch(0.18_0.03_250)] rounded-2xl p-12 border border-[oklch(0.25_0.03_250)] text-center">
            <WendellWalrus size={100} />
            <h3 className="text-xl font-semibold text-[oklch(0.9_0.01_90)] mt-4 mb-2">
              No tasks yet!
            </h3>
            <p className="text-[oklch(0.6_0.03_220)] mb-4">
              Wendell is ready to help you track your year-end tasks.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-[linear-gradient(in_oklch,oklch(0.65_0.15_85),oklch(0.55_0.14_75))] text-[oklch(0.15_0.02_85)] font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-[oklch(0.18_0.03_250)] rounded-xl p-5 border border-[oklch(0.25_0.03_250)] hover:border-[oklch(0.35_0.05_250)] transition-colors ${
                  task.status === "done" ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold ${
                        task.status === "done" 
                          ? "text-[oklch(0.6_0.02_220)] line-through" 
                          : "text-[oklch(0.95_0.01_90)]"
                      }`}>
                        {task.title}
                      </h3>
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge status={task.status} />
                    </div>
                    
                    {task.description && (
                      <p className="text-[oklch(0.65_0.02_220)] text-sm mb-3">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-[oklch(0.55_0.02_220)]">
                      {task.assignee && (
                        <span className="flex items-center gap-1">
                          <span className="text-[oklch(0.5_0.02_220)]">👤</span>
                          {task.assignee}
                        </span>
                      )}
                      {task.deadline && (
                        <span className="flex items-center gap-1">
                          <span className="text-[oklch(0.5_0.02_220)]">📅</span>
                          {new Date(task.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.status !== "done" && (
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task, e.target.value)}
                        className="px-3 py-1.5 bg-[oklch(0.12_0.02_250)] border border-[oklch(0.3_0.03_250)] rounded-lg text-sm text-[oklch(0.85_0.01_90)] focus:outline-none focus:border-[oklch(0.6_0.12_85)]"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    )}
                    
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-2 text-[oklch(0.6_0.03_220)] hover:text-[oklch(0.8_0.02_220)] hover:bg-[oklch(0.25_0.03_250)] rounded-lg transition-colors"
                      title="Edit task"
                    >
                      ✏️
                    </button>
                    
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="p-2 text-[oklch(0.6_0.03_220)] hover:text-[oklch(0.6_0.15_25)] hover:bg-[oklch(0.25_0.05_15)] rounded-lg transition-colors"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="border-t border-[oklch(0.25_0.03_250)] py-6 mt-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-3 text-[oklch(0.5_0.02_220)] text-sm">
          <WendellWalrus size={30} />
          <span>Wendell wishes you a productive holiday season! ❄️</span>
        </div>
      </footer>
    </div>
  );
}