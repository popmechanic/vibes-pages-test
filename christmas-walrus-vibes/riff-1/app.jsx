/*BUSINESS
name: Wally's Wish Workshop
pitch: Send heartfelt holiday wishes delivered by Wally Whiskers, the festive walrus
customer: People wanting to create and share simple, charming holiday greetings
revenue: Free with optional tip jar for supporting Wally's fish fund
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

function WallyWalrus({ size = 120, mood = "happy" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
      {/* Santa Hat */}
      <path d="M25 35 L50 5 L75 35 Z" fill="oklch(0.45 0.18 25)" />
      <ellipse cx="50" cy="35" rx="28" ry="8" fill="oklch(0.95 0.02 90)" />
      <circle cx="50" cy="8" r="6" fill="oklch(0.95 0.02 90)" />
      
      {/* Walrus Face */}
      <ellipse cx="50" cy="60" rx="35" ry="30" fill="oklch(0.6 0.06 50)" />
      
      {/* Cheeks */}
      <ellipse cx="30" cy="65" rx="12" ry="10" fill="oklch(0.65 0.05 50)" />
      <ellipse cx="70" cy="65" rx="12" ry="10" fill="oklch(0.65 0.05 50)" />
      
      {/* Snout */}
      <ellipse cx="50" cy="70" rx="18" ry="12" fill="oklch(0.7 0.08 60)" />
      
      {/* Whisker dots */}
      {[35, 42, 58, 65].map((x, i) => (
        <circle key={i} cx={x} cy="68" r="2.5" fill="oklch(0.4 0.03 50)" />
      ))}
      
      {/* Eyes */}
      <circle cx="38" cy="52" r="5" fill="oklch(0.2 0.02 250)" />
      <circle cx="62" cy="52" r="5" fill="oklch(0.2 0.02 250)" />
      <circle cx="39" cy="51" r="2" fill="oklch(0.95 0.02 90)" />
      <circle cx="63" cy="51" r="2" fill="oklch(0.95 0.02 90)" />
      
      {/* Tusks */}
      <path d="M38 75 Q36 90 40 95" stroke="oklch(0.92 0.03 90)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M62 75 Q64 90 60 95" stroke="oklch(0.92 0.03 90)" strokeWidth="4" fill="none" strokeLinecap="round" />
      
      {/* Rosy cheeks */}
      <circle cx="28" cy="62" r="4" fill="oklch(0.7 0.12 20)" opacity="0.5" />
      <circle cx="72" cy="62" r="4" fill="oklch(0.7 0.12 20)" opacity="0.5" />
      
      {/* Smile based on mood */}
      {mood === "happy" && (
        <path d="M44 78 Q50 82 56 78" stroke="oklch(0.4 0.03 50)" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}

function Snowflake({ className }) {
  return (
    <span className={`text-[oklch(0.9_0.02_250)] opacity-40 ${className}`}>❄</span>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("wally-wishes");
  const [editingId, setEditingId] = useState(null);
  
  const wishes = useLiveQuery("type", { key: "wish" });
  
  const [newWish, setNewWish, saveNewWish] = useDocument({
    type: "wish",
    recipient: "",
    message: "",
    createdAt: null
  });

  const handleSave = async () => {
    if (!newWish.recipient.trim() || !newWish.message.trim()) return;
    await saveNewWish({ ...newWish, createdAt: Date.now() });
    setNewWish({ type: "wish", recipient: "", message: "", createdAt: null });
  };

  const handleDelete = async (wish) => {
    const { database } = useFireproof("wally-wishes");
    await database.del(wish._id);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.18_0.04_250),oklch(0.12_0.02_220))] p-6">
      {/* Subtle snowflakes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Snowflake className="absolute top-[10%] left-[15%] text-2xl" />
        <Snowflake className="absolute top-[25%] right-[20%] text-lg" />
        <Snowflake className="absolute bottom-[30%] left-[10%] text-xl" />
        <Snowflake className="absolute top-[60%] right-[12%] text-2xl" />
      </div>

      <div className="max-w-lg mx-auto relative">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <WallyWalrus size={100} />
          </div>
          <h1 className="text-2xl font-light text-[oklch(0.95_0.02_90)] tracking-wide">
            Wally's Wish Workshop
          </h1>
          <p className="text-sm text-[oklch(0.7_0.02_250)] mt-1">
            Holiday wishes, delivered with whiskers
          </p>
        </header>

        {/* Create Wish Form */}
        <div className="bg-[oklch(0.2_0.03_250)] rounded-2xl p-5 mb-6 border border-[oklch(0.3_0.02_250)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[oklch(0.75_0.15_85)]">★</span>
            <h2 className="text-[oklch(0.9_0.02_90)] font-medium">Create a Wish</h2>
          </div>
          
          <input
            type="text"
            placeholder="To whom?"
            value={newWish.recipient}
            onChange={(e) => setNewWish({ ...newWish, recipient: e.target.value })}
            className="w-full bg-[oklch(0.15_0.02_250)] text-[oklch(0.9_0.02_90)] placeholder-[oklch(0.5_0.02_250)] rounded-lg px-4 py-3 mb-3 border border-[oklch(0.25_0.02_250)] focus:border-[oklch(0.45_0.18_25)] focus:outline-none transition-colors"
          />
          
          <textarea
            placeholder="Your holiday message..."
            value={newWish.message}
            onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
            rows={3}
            className="w-full bg-[oklch(0.15_0.02_250)] text-[oklch(0.9_0.02_90)] placeholder-[oklch(0.5_0.02_250)] rounded-lg px-4 py-3 mb-4 border border-[oklch(0.25_0.02_250)] focus:border-[oklch(0.45_0.18_25)] focus:outline-none transition-colors resize-none"
          />
          
          <button
            onClick={handleSave}
            disabled={!newWish.recipient.trim() || !newWish.message.trim()}
            className="w-full bg-[oklch(0.45_0.18_25)] hover:bg-[oklch(0.5_0.2_25)] disabled:bg-[oklch(0.3_0.05_25)] disabled:cursor-not-allowed text-[oklch(0.95_0.02_90)] font-medium py-3 rounded-lg transition-colors"
          >
            Send with Wally 🎁
          </button>
        </div>

        {/* Wishes List */}
        <div className="space-y-3">
          {wishes.docs.length === 0 ? (
            <div className="text-center py-12 text-[oklch(0.5_0.02_250)]">
              <p className="text-sm">No wishes yet.</p>
              <p className="text-xs mt-1">Wally is waiting to deliver your first one!</p>
            </div>
          ) : (
            wishes.docs
              .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
              .map((wish) => (
                <div
                  key={wish._id}
                  className="bg-[oklch(0.18_0.02_250)] rounded-xl p-4 border border-[oklch(0.25_0.02_250)] group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[oklch(0.5_0.15_145)]">●</span>
                      <span className="text-[oklch(0.85_0.02_90)] font-medium">
                        To: {wish.recipient}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(wish)}
                      className="opacity-0 group-hover:opacity-100 text-[oklch(0.5_0.02_250)] hover:text-[oklch(0.7_0.15_25)] text-sm transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[oklch(0.75_0.02_250)] text-sm leading-relaxed pl-5">
                    "{wish.message}"
                  </p>
                  <div className="flex items-center gap-1 mt-3 pl-5">
                    <span className="text-xs text-[oklch(0.45_0.02_250)]">
                      Delivered by Wally
                    </span>
                    <span className="text-xs">🦭</span>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-[oklch(0.4_0.02_250)] text-xs">
          <p>Made with ❄️ by Wally Whiskers</p>
        </footer>
      </div>
    </div>
  );
}