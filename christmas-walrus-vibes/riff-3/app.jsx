/*BUSINESS
name: Wally's Winter Wonderland
pitch: Complete festive tasks with Wally McTuskington, your jolly walrus companion, and unlock holiday achievements
customer: Families and holiday enthusiasts who want gamified festive fun
revenue: Free with optional donation for extra walrus costumes
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

const ACHIEVEMENTS = [
  { id: "first_task", name: "First Flipper", desc: "Complete your first task", points: 10, icon: "🌟" },
  { id: "streak_3", name: "Consistent Caroler", desc: "3-day streak", points: 50, icon: "🔥" },
  { id: "streak_7", name: "Week of Wonder", desc: "7-day streak", points: 150, icon: "❄️" },
  { id: "points_100", name: "Century Club", desc: "Earn 100 points", points: 0, icon: "💯" },
  { id: "tasks_10", name: "Task Master", desc: "Complete 10 tasks", points: 100, icon: "🎯" },
];

const FESTIVE_TASKS = [
  "Drink hot cocoa ☕",
  "Sing a carol 🎵",
  "Wrap a present 🎁",
  "Watch a holiday movie 🎬",
  "Bake cookies 🍪",
  "Send holiday wishes 💌",
  "Decorate something festive 🎄",
  "Do a random act of kindness ❤️",
];

function WallyCharacter({ mood, size = "large" }) {
  const sizeClasses = size === "large" ? "w-48 h-48" : "w-24 h-24";
  
  return (
    <svg viewBox="0 0 200 200" className={sizeClasses}>
      {/* Santa Hat */}
      <ellipse cx="100" cy="50" rx="50" ry="15" fill="oklch(0.45 0.2 25)" />
      <polygon points="100,10 60,50 140,50" fill="oklch(0.45 0.2 25)" />
      <circle cx="100" cy="10" r="12" fill="oklch(0.98 0.01 240)" />
      <rect x="50" y="45" width="100" height="15" fill="oklch(0.98 0.01 240)" />
      
      {/* Walrus Body */}
      <ellipse cx="100" cy="120" rx="70" ry="60" fill="oklch(0.55 0.08 50)" />
      
      {/* Face */}
      <ellipse cx="100" cy="110" rx="55" ry="45" fill="oklch(0.6 0.06 55)" />
      
      {/* Eyes */}
      <ellipse cx="75" cy="95" rx="12" ry="14" fill="oklch(0.98 0.01 240)" />
      <ellipse cx="125" cy="95" rx="12" ry="14" fill="oklch(0.98 0.01 240)" />
      <circle cx={mood === "happy" ? "78" : "75"} cy="95" r="6" fill="oklch(0.2 0.05 250)" />
      <circle cx={mood === "happy" ? "128" : "125"} cy="95" r="6" fill="oklch(0.2 0.05 250)" />
      {mood === "happy" && (
        <>
          <circle cx="80" cy="93" r="2" fill="oklch(0.98 0.01 240)" />
          <circle cx="130" cy="93" r="2" fill="oklch(0.98 0.01 240)" />
        </>
      )}
      
      {/* Snout */}
      <ellipse cx="100" cy="125" rx="30" ry="22" fill="oklch(0.65 0.08 60)" />
      <ellipse cx="90" cy="120" rx="6" ry="4" fill="oklch(0.3 0.05 50)" />
      <ellipse cx="110" cy="120" rx="6" ry="4" fill="oklch(0.3 0.05 50)" />
      
      {/* Tusks */}
      <path d="M 75 135 Q 70 165 75 180" stroke="oklch(0.95 0.02 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 125 135 Q 130 165 125 180" stroke="oklch(0.95 0.02 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
      
      {/* Whisker dots */}
      {[85, 90, 95, 105, 110, 115].map((x, i) => (
        <circle key={i} cx={x} cy={130 + (i % 2) * 3} r="2" fill="oklch(0.4 0.05 50)" />
      ))}
      
      {/* Blush for happy mood */}
      {mood === "happy" && (
        <>
          <ellipse cx="60" cy="110" rx="10" ry="6" fill="oklch(0.7 0.15 15)" opacity="0.5" />
          <ellipse cx="140" cy="110" rx="10" ry="6" fill="oklch(0.7 0.15 15)" opacity="0.5" />
        </>
      )}
      
      {/* Mouth */}
      {mood === "happy" ? (
        <path d="M 90 140 Q 100 150 110 140" stroke="oklch(0.3 0.05 50)" strokeWidth="3" fill="none" />
      ) : (
        <ellipse cx="100" cy="142" rx="8" ry="4" fill="oklch(0.3 0.05 50)" />
      )}
      
      {/* Flippers */}
      <ellipse cx="35" cy="140" rx="20" ry="35" fill="oklch(0.5 0.08 50)" transform="rotate(-20 35 140)" />
      <ellipse cx="165" cy="140" rx="20" ry="35" fill="oklch(0.5 0.08 50)" transform="rotate(20 165 140)" />
    </svg>
  );
}

function Snowflake({ style }) {
  return (
    <span className="absolute text-white opacity-60 pointer-events-none animate-pulse" style={style}>
      ❄️
    </span>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("wally-winter-wonderland");
  const [showAchievement, setShowAchievement] = useState(null);
  
  // Player stats document
  const { doc: stats, merge: mergeStats } = useDocument({ 
    _id: "player-stats",
    points: 0,
    streak: 0,
    lastCheckIn: null,
    totalTasks: 0,
    unlockedAchievements: []
  });
  
  // New task form
  const { doc: newTask, merge: mergeNewTask, submit: submitTask } = useDocument({
    type: "task",
    title: "",
    completed: false,
    createdAt: null
  });
  
  // Query tasks
  const { docs: tasks } = useLiveQuery("type", { key: "task" });
  
  const checkAchievements = (newStats) => {
    const newlyUnlocked = [];
    
    if (newStats.totalTasks >= 1 && !newStats.unlockedAchievements.includes("first_task")) {
      newlyUnlocked.push("first_task");
    }
    if (newStats.streak >= 3 && !newStats.unlockedAchievements.includes("streak_3")) {
      newlyUnlocked.push("streak_3");
    }
    if (newStats.streak >= 7 && !newStats.unlockedAchievements.includes("streak_7")) {
      newlyUnlocked.push("streak_7");
    }
    if (newStats.points >= 100 && !newStats.unlockedAchievements.includes("points_100")) {
      newlyUnlocked.push("points_100");
    }
    if (newStats.totalTasks >= 10 && !newStats.unlockedAchievements.includes("tasks_10")) {
      newlyUnlocked.push("tasks_10");
    }
    
    if (newlyUnlocked.length > 0) {
      const achievement = ACHIEVEMENTS.find(a => a.id === newlyUnlocked[0]);
      setShowAchievement(achievement);
      setTimeout(() => setShowAchievement(null), 3000);
      
      const bonusPoints = newlyUnlocked.reduce((sum, id) => {
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        return sum + (ach ? ach.points : 0);
      }, 0);
      
      return {
        unlockedAchievements: [...newStats.unlockedAchievements, ...newlyUnlocked],
        points: newStats.points + bonusPoints
      };
    }
    return {};
  };
  
  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;
    
    await submitTask({
      title: newTask.title,
      createdAt: Date.now()
    });
    
    mergeNewTask({ title: "" });
  };
  
  const handleCompleteTask = async (task) => {
    const { database } = useFireproof("wally-winter-wonderland");
    
    await database.put({ ...task, completed: true, completedAt: Date.now() });
    
    const today = new Date().toDateString();
    const lastCheckIn = stats.lastCheckIn ? new Date(stats.lastCheckIn).toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    let newStreak = stats.streak;
    if (lastCheckIn === yesterday) {
      newStreak = stats.streak + 1;
    } else if (lastCheckIn !== today) {
      newStreak = 1;
    }
    
    const newStats = {
      points: stats.points + 15,
      streak: newStreak,
      lastCheckIn: Date.now(),
      totalTasks: stats.totalTasks + 1
    };
    
    const achievementUpdates = checkAchievements({ ...stats, ...newStats });
    mergeStats({ ...newStats, ...achievementUpdates });
  };
  
  const handleDeleteTask = async (task) => {
    const { database } = useFireproof("wally-winter-wonderland");
    await database.del(task._id);
  };
  
  const addRandomTask = () => {
    const randomTask = FESTIVE_TASKS[Math.floor(Math.random() * FESTIVE_TASKS.length)];
    mergeNewTask({ title: randomTask });
  };
  
  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const wallyMood = stats.streak >= 3 || completedTasks.length > 0 ? "happy" : "neutral";
  
  // Snowflakes decoration
  const snowflakes = Array.from({ length: 12 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${12 + Math.random() * 16}px`,
    animationDelay: `${Math.random() * 2}s`
  }));

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.18_0.06_250),oklch(0.12_0.04_220))] p-4 relative overflow-hidden">
      {/* Snowflakes */}
      {snowflakes.map((style, i) => (
        <Snowflake key={i} style={style} />
      ))}
      
      {/* Achievement Popup */}
      {showAchievement && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-[oklch(0.25_0.08_85)] border-4 border-[oklch(0.75_0.15_85)] rounded-2xl p-8 text-center animate-bounce shadow-2xl">
            <div className="text-6xl mb-4">{showAchievement.icon}</div>
            <h2 className="text-2xl font-bold text-[oklch(0.95_0.02_85)]">Achievement Unlocked!</h2>
            <p className="text-xl text-[oklch(0.85_0.1_85)] mt-2">{showAchievement.name}</p>
            <p className="text-[oklch(0.7_0.05_85)]">{showAchievement.desc}</p>
            {showAchievement.points > 0 && (
              <p className="text-[oklch(0.75_0.15_85)] mt-2">+{showAchievement.points} points!</p>
            )}
          </div>
        </div>
      )}
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[oklch(0.98_0.01_240)] mb-2 drop-shadow-lg">
            🎄 Wally's Winter Wonderland 🎄
          </h1>
          <p className="text-[oklch(0.7_0.1_220)]">Complete festive tasks with your jolly walrus pal!</p>
        </header>
        
        {/* Stats Bar */}
        <div className="bg-[oklch(0.25_0.08_145)] rounded-xl p-4 mb-6 border-2 border-[oklch(0.45_0.15_145)]">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-3xl font-bold text-[oklch(0.75_0.15_85)]">⭐ {stats.points}</div>
              <div className="text-[oklch(0.7_0.1_145)] text-sm">Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[oklch(0.7_0.2_25)]">🔥 {stats.streak}</div>
              <div className="text-[oklch(0.7_0.1_145)] text-sm">Day Streak</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[oklch(0.7_0.1_220)]">✓ {stats.totalTasks}</div>
              <div className="text-[oklch(0.7_0.1_145)] text-sm">Completed</div>
            </div>
          </div>
        </div>
        
        {/* Wally */}
        <div className="flex justify-center mb-6">
          <div className="text-center">
            <WallyCharacter mood={wallyMood} />
            <p className="text-xl font-bold text-[oklch(0.85_0.05_55)] mt-2">Wally McTuskington</p>
            <p className="text-[oklch(0.6_0.08_220)] italic">
              {wallyMood === "happy" 
                ? "\"Ho ho ho! You're doing great!\" 🎅" 
                : "\"Let's spread some holiday cheer!\""}
            </p>
          </div>
        </div>
        
        {/* Add Task */}
        <div className="bg-[oklch(0.22_0.05_25)] rounded-xl p-4 mb-6 border-2 border-[oklch(0.45_0.2_25)]">
          <h2 className="text-xl font-bold text-[oklch(0.98_0.01_240)] mb-3">🎁 Add Festive Task</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => mergeNewTask({ title: e.target.value })}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              placeholder="What festive thing will you do?"
              className="flex-1 px-4 py-2 rounded-lg bg-[oklch(0.15_0.03_250)] border-2 border-[oklch(0.35_0.1_25)] text-[oklch(0.95_0.01_240)] placeholder-[oklch(0.5_0.05_250)] focus:outline-none focus:border-[oklch(0.55_0.2_25)]"
            />
            <button
              onClick={handleAddTask}
              className="px-6 py-2 bg-[oklch(0.45_0.2_25)] hover:bg-[oklch(0.55_0.2_25)] text-white font-bold rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <button
            onClick={addRandomTask}
            className="text-sm text-[oklch(0.7_0.15_85)] hover:text-[oklch(0.8_0.15_85)] transition-colors"
          >
            ✨ Suggest a random festive task
          </button>
        </div>
        
        {/* Tasks List */}
        <div className="bg-[oklch(0.2_0.04_220)] rounded-xl p-4 mb-6 border-2 border-[oklch(0.4_0.1_220)]">
          <h2 className="text-xl font-bold text-[oklch(0.98_0.01_240)] mb-3">📋 Your Tasks</h2>
          
          {incompleteTasks.length === 0 ? (
            <p className="text-[oklch(0.6_0.05_220)] text-center py-4">
              No tasks yet! Add some festive fun above 🎅
            </p>
          ) : (
            <ul className="space-y-2">
              {incompleteTasks.map((task) => (
                <li 
                  key={task._id}
                  className="flex items-center gap-3 bg-[oklch(0.25_0.05_220)] p-3 rounded-lg border border-[oklch(0.35_0.08_220)]"
                >
                  <button
                    onClick={() => handleCompleteTask(task)}
                    className="w-8 h-8 rounded-full border-2 border-[oklch(0.45_0.15_145)] hover:bg-[oklch(0.45_0.15_145)] transition-colors flex items-center justify-center text-[oklch(0.45_0.15_145)] hover:text-white"
                  >
                    ✓
                  </button>
                  <span className="flex-1 text-[oklch(0.9_0.02_240)]">{task.title}</span>
                  <span className="text-[oklch(0.75_0.15_85)] text-sm">+15⭐</span>
                  <button
                    onClick={() => handleDeleteTask(task)}
                    className="text-[oklch(0.5_0.1_25)] hover:text-[oklch(0.7_0.2_25)] transition-colors"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="bg-[oklch(0.18_0.04_145)] rounded-xl p-4 mb-6 border-2 border-[oklch(0.35_0.1_145)]">
            <h2 className="text-xl font-bold text-[oklch(0.8_0.1_145)] mb-3">✅ Completed ({completedTasks.length})</h2>
            <ul className="space-y-2">
              {completedTasks.slice(0, 5).map((task) => (
                <li 
                  key={task._id}
                  className="flex items-center gap-3 opacity-70"
                >
                  <span className="text-[oklch(0.6_0.15_145)]">✓</span>
                  <span className="text-[oklch(0.7_0.05_145)] line-through">{task.title}</span>
                </li>
              ))}
              {completedTasks.length > 5 && (
                <li className="text-[oklch(0.5_0.08_145)] text-sm">
                  ...and {completedTasks.length - 5} more!
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Achievements */}
        <div className="bg-[oklch(0.22_0.06_85)] rounded-xl p-4 border-2 border-[oklch(0.5_0.12_85)]">
          <h2 className="text-xl font-bold text-[oklch(0.9_0.08_85)] mb-3">🏆 Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((ach) => {
              const unlocked = stats.unlockedAchievements?.includes(ach.id);
              return (
                <div 
                  key={ach.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    unlocked 
                      ? "bg-[oklch(0.3_0.1_85)] border-[oklch(0.6_0.15_85)]" 
                      : "bg-[oklch(0.15_0.03_250)] border-[oklch(0.3_0.05_250)] opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-1">{unlocked ? ach.icon : "🔒"}</div>
                  <div className={`font-bold text-sm ${unlocked ? "text-[oklch(0.9_0.08_85)]" : "text-[oklch(0.5_0.03_250)]"}`}>
                    {ach.name}
                  </div>
                  <div className={`text-xs ${unlocked ? "text-[oklch(0.7_0.06_85)]" : "text-[oklch(0.4_0.03_250)]"}`}>
                    {ach.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-8 text-[oklch(0.5_0.05_220)]">
          <p>🦭 Wally wishes you happy holidays! 🎄</p>
        </footer>
      </div>
    </div>
  );
}