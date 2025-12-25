/*BUSINESS
name: Wally's Wish Workshop
pitch: Let Wally Whiskers McTusk, the North Pole's jolliest walrus, help you organize your Christmas wishes
customer: Families and kids who want a fun, festive way to create and track holiday wishes
revenue: Free during holiday season, premium "Walrus Wonderland" themes for $2.99
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

function WallyWalrus({ mood = "happy", size = "large" }) {
  const sizeClass = size === "large" ? "w-48 h-48" : "w-24 h-24";
  const eyeExpression = mood === "excited" ? "animate-bounce" : "";
  
  return (
    <svg viewBox="0 0 200 200" className={`${sizeClass} drop-shadow-2xl`}>
      {/* Santa Hat */}
      <ellipse cx="100" cy="45" rx="55" ry="15" fill="oklch(0.95 0.01 0)" />
      <path d="M45 45 L100 -20 L155 45 Z" fill="oklch(0.5 0.22 25)" />
      <circle cx="100" cy="-15" r="12" fill="oklch(0.95 0.01 0)" />
      <path d="M60 45 Q100 60 140 45" fill="oklch(0.5 0.22 25)" stroke="oklch(0.95 0.01 0)" strokeWidth="8" />
      
      {/* Walrus Body */}
      <ellipse cx="100" cy="130" rx="70" ry="55" fill="oklch(0.55 0.08 45)" />
      
      {/* Face */}
      <ellipse cx="100" cy="100" rx="55" ry="45" fill="oklch(0.6 0.07 50)" />
      
      {/* Snout/Whisker Pad */}
      <ellipse cx="100" cy="115" rx="35" ry="25" fill="oklch(0.7 0.05 55)" />
      
      {/* Eyes */}
      <g className={eyeExpression}>
        <circle cx="75" cy="85" r="12" fill="oklch(0.98 0 0)" />
        <circle cx="125" cy="85" r="12" fill="oklch(0.98 0 0)" />
        <circle cx="77" cy="83" r="6" fill="oklch(0.15 0.05 260)" />
        <circle cx="127" cy="83" r="6" fill="oklch(0.15 0.05 260)" />
        <circle cx="79" cy="81" r="2" fill="oklch(0.98 0 0)" />
        <circle cx="129" cy="81" r="2" fill="oklch(0.98 0 0)" />
      </g>
      
      {/* Rosy Cheeks */}
      <ellipse cx="60" cy="105" rx="10" ry="7" fill="oklch(0.7 0.15 15)" opacity="0.6" />
      <ellipse cx="140" cy="105" rx="10" ry="7" fill="oklch(0.7 0.15 15)" opacity="0.6" />
      
      {/* Nose */}
      <ellipse cx="100" cy="100" rx="8" ry="6" fill="oklch(0.25 0.05 30)" />
      
      {/* Tusks */}
      <path d="M80 120 Q75 160 80 175" stroke="oklch(0.95 0.02 85)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M120 120 Q125 160 120 175" stroke="oklch(0.95 0.02 85)" strokeWidth="8" strokeLinecap="round" fill="none" />
      
      {/* Whiskers */}
      <g stroke="oklch(0.75 0.03 60)" strokeWidth="2" strokeLinecap="round">
        <line x1="65" y1="110" x2="35" y2="105" />
        <line x1="65" y1="118" x2="30" y2="120" />
        <line x1="65" y1="126" x2="35" y2="135" />
        <line x1="135" y1="110" x2="165" y2="105" />
        <line x1="135" y1="118" x2="170" y2="120" />
        <line x1="135" y1="126" x2="165" y2="135" />
      </g>
      
      {/* Smile */}
      <path d="M85 130 Q100 145 115 130" stroke="oklch(0.3 0.05 30)" strokeWidth="3" fill="none" strokeLinecap="round" />
      
      {/* Flippers */}
      <ellipse cx="35" cy="140" rx="20" ry="12" fill="oklch(0.5 0.08 45)" transform="rotate(-20 35 140)" />
      <ellipse cx="165" cy="140" rx="20" ry="12" fill="oklch(0.5 0.08 45)" transform="rotate(20 165 140)" />
    </svg>
  );
}

function Snowflake({ style }) {
  return (
    <div 
      className="absolute text-2xl animate-pulse pointer-events-none opacity-70"
      style={style}
    >
      ❄️
    </div>
  );
}

function WishCard({ wish, onToggle, onDelete }) {
  return (
    <div 
      className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 ${
        wish.granted 
          ? "bg-[oklch(0.35_0.12_145)] border-[oklch(0.5_0.15_145)]" 
          : "bg-[oklch(0.25_0.08_260)] border-[oklch(0.4_0.1_260)]"
      }`}
    >
      {wish.granted && (
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎁</div>
      )}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(wish)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            wish.granted 
              ? "bg-[oklch(0.6_0.2_145)] border-[oklch(0.7_0.2_145)]" 
              : "border-[oklch(0.6_0.1_260)] hover:border-[oklch(0.7_0.15_85)]"
          }`}
        >
          {wish.granted && <span className="text-white text-sm">✓</span>}
        </button>
        <div className="flex-1">
          <p className={`text-lg ${wish.granted ? "line-through opacity-60" : ""} text-[oklch(0.95_0.02_260)]`}>
            {wish.text}
          </p>
          <p className="text-sm text-[oklch(0.7_0.05_260)] mt-1">
            {wish.forWho ? `For: ${wish.forWho}` : "For myself"} {wish.priority === "high" && "⭐"}
          </p>
        </div>
        <button
          onClick={() => onDelete(wish)}
          className="text-[oklch(0.6_0.15_25)] hover:text-[oklch(0.7_0.2_25)] transition-colors text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument, database } = useFireproof("wally-wishes");
  const [showForm, setShowForm] = useState(false);
  
  const wishes = useLiveQuery("type", { key: "wish" });
  
  const [newWish, setNewWish, saveWish] = useDocument({
    _id: `wish-${Date.now()}`,
    type: "wish",
    text: "",
    forWho: "",
    priority: "normal",
    granted: false,
    createdAt: new Date().toISOString()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newWish.text.trim()) return;
    
    await saveWish();
    setShowForm(false);
    setNewWish({
      _id: `wish-${Date.now()}`,
      type: "wish",
      text: "",
      forWho: "",
      priority: "normal",
      granted: false,
      createdAt: new Date().toISOString()
    });
  };

  const toggleGranted = async (wish) => {
    await database.put({ ...wish, granted: !wish.granted });
  };

  const deleteWish = async (wish) => {
    await database.del(wish._id);
  };

  const grantedCount = wishes.docs.filter(w => w.granted).length;
  const totalCount = wishes.docs.length;

  const snowflakes = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`
  }));

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.12_0.06_260),oklch(0.18_0.08_280),oklch(0.15_0.05_200))] p-4 relative overflow-hidden">
      {/* Snowflakes */}
      {snowflakes.map((style, i) => (
        <Snowflake key={i} style={style} />
      ))}
      
      {/* Aurora effect */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-[linear-gradient(in_oklch,oklch(0.3_0.15_145)_0%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <WallyWalrus mood={showForm ? "excited" : "happy"} size="large" />
          </div>
          <h1 className="text-4xl font-bold text-[oklch(0.95_0.02_85)] mb-2 drop-shadow-lg">
            🎄 Wally's Wish Workshop 🎄
          </h1>
          <p className="text-[oklch(0.8_0.05_200)] text-lg italic">
            "Arf arf! I'm Wally Whiskers McTusk, your festive friend!"
          </p>
          
          {/* Progress */}
          {totalCount > 0 && (
            <div className="mt-4 bg-[oklch(0.2_0.05_260)] rounded-full p-1 max-w-xs mx-auto">
              <div 
                className="h-4 rounded-full bg-[linear-gradient(in_oklch,oklch(0.5_0.2_25),oklch(0.55_0.18_35))] transition-all duration-500 flex items-center justify-center"
                style={{ width: `${Math.max(10, (grantedCount / totalCount) * 100)}%` }}
              >
                <span className="text-xs text-white font-bold">
                  {grantedCount}/{totalCount}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Add Wish Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mb-6 p-4 rounded-2xl bg-[linear-gradient(in_oklch,oklch(0.5_0.2_25),oklch(0.45_0.22_15))] text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-102 transition-all border-2 border-[oklch(0.6_0.15_25)] flex items-center justify-center gap-3"
          >
            <span className="text-2xl">✨</span>
            Make a Wish!
            <span className="text-2xl">✨</span>
          </button>
        )}

        {/* Wish Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-6 rounded-2xl bg-[oklch(0.2_0.05_260)] border-2 border-[oklch(0.35_0.1_145)] shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <WallyWalrus mood="excited" size="small" />
              <p className="text-[oklch(0.85_0.05_200)] italic">
                "Tell me your holiday wish!"
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[oklch(0.8_0.05_85)] mb-2 font-medium">
                  🌟 Your Wish
                </label>
                <input
                  type="text"
                  value={newWish.text}
                  onChange={(e) => setNewWish({ ...newWish, text: e.target.value })}
                  placeholder="I wish for..."
                  className="w-full p-3 rounded-xl bg-[oklch(0.15_0.03_260)] border-2 border-[oklch(0.3_0.08_260)] text-[oklch(0.95_0.02_260)] placeholder-[oklch(0.5_0.03_260)] focus:border-[oklch(0.5_0.15_145)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[oklch(0.8_0.05_85)] mb-2 font-medium">
                  🎁 Who is this for?
                </label>
                <input
                  type="text"
                  value={newWish.forWho}
                  onChange={(e) => setNewWish({ ...newWish, forWho: e.target.value })}
                  placeholder="Myself, Mom, Dad, etc."
                  className="w-full p-3 rounded-xl bg-[oklch(0.15_0.03_260)] border-2 border-[oklch(0.3_0.08_260)] text-[oklch(0.95_0.02_260)] placeholder-[oklch(0.5_0.03_260)] focus:border-[oklch(0.5_0.15_145)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[oklch(0.8_0.05_85)] mb-2 font-medium">
                  ⭐ Priority
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setNewWish({ ...newWish, priority: "normal" })}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                      newWish.priority === "normal"
                        ? "bg-[oklch(0.35_0.12_145)] border-[oklch(0.5_0.15_145)]"
                        : "bg-[oklch(0.15_0.03_260)] border-[oklch(0.3_0.08_260)]"
                    } text-[oklch(0.9_0.03_260)]`}
                  >
                    Nice to Have
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewWish({ ...newWish, priority: "high" })}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                      newWish.priority === "high"
                        ? "bg-[oklch(0.45_0.18_85)] border-[oklch(0.6_0.2_85)]"
                        : "bg-[oklch(0.15_0.03_260)] border-[oklch(0.3_0.08_260)]"
                    } text-[oklch(0.9_0.03_260)]`}
                  >
                    ⭐ Really Want!
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 p-3 rounded-xl bg-[oklch(0.25_0.05_260)] border-2 border-[oklch(0.4_0.08_260)] text-[oklch(0.8_0.03_260)] hover:bg-[oklch(0.3_0.06_260)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 p-3 rounded-xl bg-[linear-gradient(in_oklch,oklch(0.45_0.18_145),oklch(0.4_0.15_160))] border-2 border-[oklch(0.55_0.15_145)] text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Add to Wally's List! 🎄
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Wishes List */}
        <div className="space-y-4">
          {wishes.docs.length === 0 ? (
            <div className="text-center p-8 rounded-2xl bg-[oklch(0.18_0.04_260)] border-2 border-dashed border-[oklch(0.3_0.08_260)]">
              <p className="text-[oklch(0.7_0.05_260)] text-lg mb-2">
                No wishes yet!
              </p>
              <p className="text-[oklch(0.6_0.04_260)]">
                Click "Make a Wish" to add your first holiday wish ✨
              </p>
            </div>
          ) : (
            <>
              {wishes.docs
                .sort((a, b) => (b.priority === "high" ? 1 : 0) - (a.priority === "high" ? 1 : 0))
                .map(wish => (
                  <WishCard 
                    key={wish._id} 
                    wish={wish} 
                    onToggle={toggleGranted}
                    onDelete={deleteWish}
                  />
                ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-[oklch(0.6_0.05_260)]">
          <p className="flex items-center justify-center gap-2">
            <span>Made with</span>
            <span className="text-[oklch(0.6_0.2_25)]">❤️</span>
            <span>at the North Pole</span>
          </p>
          <p className="text-sm mt-1">🦭 Wally Whiskers McTusk, Official Wish Keeper 🦭</p>
        </div>
      </div>
    </div>
  );
}