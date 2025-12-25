/*BUSINESS
name: Wally's Wish Workshop
pitch: Track your holiday gift-giving and wishes with help from Wally Whiskersworth, your festive walrus friend
customer: Holiday enthusiasts who want to organize their Christmas gift lists
revenue: Free with optional tip jar for Wally's fish fund
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

// Wally the Walrus SVG Component
function WallyWalrus({ size = 120, mood = "happy" }) {
  const mouthPath = mood === "happy" 
    ? "M 35 75 Q 50 85 65 75" 
    : mood === "excited" 
    ? "M 35 72 Q 50 88 65 72" 
    : "M 35 78 Q 50 78 65 78";
  
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
      {/* Santa Hat */}
      <polygon points="50,2 75,35 25,35" fill="oklch(0.5 0.2 25)" />
      <ellipse cx="50" cy="35" rx="28" ry="8" fill="oklch(0.95 0.01 250)" />
      <circle cx="50" cy="5" r="6" fill="oklch(0.95 0.01 250)" />
      
      {/* Walrus Face */}
      <ellipse cx="50" cy="58" rx="35" ry="30" fill="oklch(0.6 0.08 50)" />
      
      {/* Snout/Mustache area */}
      <ellipse cx="50" cy="68" rx="25" ry="18" fill="oklch(0.7 0.06 60)" />
      
      {/* Whisker dots */}
      {[35, 42, 58, 65].map((x, i) => (
        <circle key={i} cx={x} cy={70} r="3" fill="oklch(0.5 0.05 50)" />
      ))}
      
      {/* Eyes */}
      <ellipse cx="38" cy="50" rx="6" ry="7" fill="oklch(0.98 0 0)" />
      <ellipse cx="62" cy="50" rx="6" ry="7" fill="oklch(0.98 0 0)" />
      <circle cx="39" cy="49" r="3" fill="oklch(0.15 0 0)" />
      <circle cx="63" cy="49" r="3" fill="oklch(0.15 0 0)" />
      <circle cx="40" cy="48" r="1" fill="oklch(0.98 0 0)" />
      <circle cx="64" cy="48" r="1" fill="oklch(0.98 0 0)" />
      
      {/* Rosy cheeks */}
      <ellipse cx="30" cy="60" rx="6" ry="4" fill="oklch(0.7 0.12 15)" opacity="0.6" />
      <ellipse cx="70" cy="60" rx="6" ry="4" fill="oklch(0.7 0.12 15)" opacity="0.6" />
      
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="5" ry="4" fill="oklch(0.35 0.08 30)" />
      
      {/* Tusks */}
      <path d="M 38 72 Q 36 90 40 95" stroke="oklch(0.92 0.02 80)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 62 72 Q 64 90 60 95" stroke="oklch(0.92 0.02 80)" strokeWidth="5" fill="none" strokeLinecap="round" />
      
      {/* Mouth */}
      <path d={mouthPath} stroke="oklch(0.35 0.08 30)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Snowflake component
function Snowflake({ style }) {
  return (
    <div 
      className="absolute text-white/30 animate-pulse pointer-events-none select-none"
      style={style}
    >
      ❄
    </div>
  );
}

// Gift item component
function GiftItem({ gift, onToggle, onDelete }) {
  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-xl mb-2 transition-all duration-300
      ${gift.completed 
        ? 'bg-[oklch(0.35_0.12_145)]/40 opacity-75' 
        : 'bg-[oklch(0.95_0.01_250)]/10 hover:bg-[oklch(0.95_0.01_250)]/20'}
      border border-[oklch(0.95_0.01_250)]/20
    `}>
      <button
        onClick={() => onToggle(gift)}
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
          ${gift.completed 
            ? 'bg-[oklch(0.35_0.15_145)] border-[oklch(0.45_0.15_145)] text-white' 
            : 'border-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/20'}
        `}
      >
        {gift.completed && '✓'}
      </button>
      <div className="flex-1">
        <p className={`text-[oklch(0.95_0.01_250)] ${gift.completed ? 'line-through opacity-60' : ''}`}>
          {gift.name}
        </p>
        {gift.recipient && (
          <p className="text-sm text-[oklch(0.75_0.15_85)]">
            🎁 For: {gift.recipient}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(gift)}
        className="text-[oklch(0.55_0.2_25)] hover:text-[oklch(0.65_0.25_25)] transition-colors p-1"
      >
        ✕
      </button>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument, database } = useFireproof("wally-wishes");
  const [activeTab, setActiveTab] = useState("gifts");
  
  // Form state using useDocument
  const [formDoc, setFormDoc, saveForm] = useDocument({ 
    _id: "draft-gift",
    type: "draft",
    name: "", 
    recipient: "",
    isWish: false 
  });
  
  // Query gifts and wishes
  const { docs: allItems } = useLiveQuery("type", { key: "gift" });
  
  const gifts = allItems.filter(item => !item.isWish);
  const wishes = allItems.filter(item => item.isWish);
  
  // Calculate days until Christmas
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25);
  if (today > christmas) christmas.setFullYear(christmas.getFullYear() + 1);
  const daysUntilChristmas = Math.ceil((christmas - today) / (1000 * 60 * 60 * 24));
  
  // Wally's mood based on completion
  const completedGifts = gifts.filter(g => g.completed).length;
  const wallyMood = completedGifts >= gifts.length && gifts.length > 0 ? "excited" : gifts.length > 0 ? "happy" : "neutral";
  
  // Wally's messages
  const wallyMessages = {
    excited: "Ho ho ho! All gifts ready! You're a star! 🌟",
    happy: `Keep going! ${gifts.length - completedGifts} gifts left to prepare!`,
    neutral: "Add some gifts to get started, friend!"
  };
  
  async function handleAddItem(e) {
    e.preventDefault();
    if (!formDoc.name.trim()) return;
    
    await database.put({
      type: "gift",
      name: formDoc.name,
      recipient: formDoc.recipient,
      isWish: activeTab === "wishes",
      completed: false,
      createdAt: Date.now()
    });
    
    // Reset form
    setFormDoc({ ...formDoc, name: "", recipient: "" });
  }
  
  async function toggleComplete(gift) {
    await database.put({ ...gift, completed: !gift.completed });
  }
  
  async function deleteItem(gift) {
    await database.del(gift._id);
  }
  
  // Generate snowflakes
  const snowflakes = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${12 + Math.random() * 16}px`,
    animationDelay: `${Math.random() * 3}s`
  }));

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.12_0.06_260),oklch(0.2_0.1_280))] p-4 relative overflow-hidden">
      {/* Snowflakes */}
      {snowflakes.map((style, i) => (
        <Snowflake key={i} style={style} />
      ))}
      
      {/* Aurora glow effect */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-[linear-gradient(in_oklch,oklch(0.3_0.1_160)_0%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="max-w-md mx-auto relative z-10">
        {/* Header with Wally */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="animate-[bounce_3s_ease-in-out_infinite]">
              <WallyWalrus size={100} mood={wallyMood} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[oklch(0.95_0.01_250)] mb-1">
            Wally's Wish Workshop
          </h1>
          <p className="text-[oklch(0.75_0.15_85)] text-sm italic">
            "{wallyMessages[wallyMood]}"
          </p>
        </div>
        
        {/* Christmas Countdown */}
        <div className="bg-[oklch(0.55_0.2_25)]/20 border border-[oklch(0.55_0.2_25)]/40 rounded-2xl p-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🎄</span>
            <span className="text-3xl font-bold text-[oklch(0.95_0.01_250)]">
              {daysUntilChristmas}
            </span>
            <span className="text-2xl">🎄</span>
          </div>
          <p className="text-[oklch(0.8_0.08_220)] text-sm">
            days until Christmas!
          </p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("gifts")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
              activeTab === "gifts"
                ? "bg-[oklch(0.35_0.15_145)] text-[oklch(0.95_0.01_250)]"
                : "bg-[oklch(0.95_0.01_250)]/10 text-[oklch(0.95_0.01_250)]/70 hover:bg-[oklch(0.95_0.01_250)]/20"
            }`}
          >
            🎁 Gifts to Give ({gifts.length})
          </button>
          <button
            onClick={() => setActiveTab("wishes")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
              activeTab === "wishes"
                ? "bg-[oklch(0.55_0.2_25)] text-[oklch(0.95_0.01_250)]"
                : "bg-[oklch(0.95_0.01_250)]/10 text-[oklch(0.95_0.01_250)]/70 hover:bg-[oklch(0.95_0.01_250)]/20"
            }`}
          >
            ⭐ My Wishes ({wishes.length})
          </button>
        </div>
        
        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="mb-6">
          <div className="bg-[oklch(0.95_0.01_250)]/5 border border-[oklch(0.95_0.01_250)]/20 rounded-2xl p-4">
            <input
              type="text"
              placeholder={activeTab === "gifts" ? "What gift are you giving?" : "What do you wish for?"}
              value={formDoc.name}
              onChange={(e) => setFormDoc({ ...formDoc, name: e.target.value })}
              className="w-full bg-[oklch(0.95_0.01_250)]/10 border border-[oklch(0.95_0.01_250)]/20 rounded-xl px-4 py-3 text-[oklch(0.95_0.01_250)] placeholder-[oklch(0.95_0.01_250)]/40 focus:outline-none focus:border-[oklch(0.75_0.15_85)] mb-3"
            />
            {activeTab === "gifts" && (
              <input
                type="text"
                placeholder="Who is it for?"
                value={formDoc.recipient}
                onChange={(e) => setFormDoc({ ...formDoc, recipient: e.target.value })}
                className="w-full bg-[oklch(0.95_0.01_250)]/10 border border-[oklch(0.95_0.01_250)]/20 rounded-xl px-4 py-3 text-[oklch(0.95_0.01_250)] placeholder-[oklch(0.95_0.01_250)]/40 focus:outline-none focus:border-[oklch(0.75_0.15_85)] mb-3"
              />
            )}
            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                activeTab === "gifts"
                  ? "bg-[oklch(0.35_0.15_145)] hover:bg-[oklch(0.4_0.15_145)] text-[oklch(0.95_0.01_250)]"
                  : "bg-[oklch(0.55_0.2_25)] hover:bg-[oklch(0.6_0.2_25)] text-[oklch(0.95_0.01_250)]"
              }`}
            >
              {activeTab === "gifts" ? "🎁 Add Gift" : "⭐ Add Wish"}
            </button>
          </div>
        </form>
        
        {/* Items List */}
        <div className="space-y-2">
          {(activeTab === "gifts" ? gifts : wishes).length === 0 ? (
            <div className="text-center py-8 text-[oklch(0.95_0.01_250)]/50">
              <p className="text-4xl mb-2">{activeTab === "gifts" ? "🎁" : "⭐"}</p>
              <p>No {activeTab} yet!</p>
              <p className="text-sm">Wally is waiting to help you organize!</p>
            </div>
          ) : (
            (activeTab === "gifts" ? gifts : wishes)
              .sort((a, b) => a.completed - b.completed || b.createdAt - a.createdAt)
              .map(item => (
                <GiftItem
                  key={item._id}
                  gift={item}
                  onToggle={toggleComplete}
                  onDelete={deleteItem}
                />
              ))
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-[oklch(0.95_0.01_250)]/30 text-xs">
          <p>Made with ❤️ by Wally Whiskersworth</p>
          <p className="mt-1">🐟 Feed Wally: donate to his fish fund! 🐟</p>
        </div>
      </div>
    </div>
  );
}