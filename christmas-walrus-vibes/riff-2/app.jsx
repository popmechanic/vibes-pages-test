/*BUSINESS
name: Walrus Wishes
pitch: Share holiday cheer through your festive walrus persona in this cozy Arctic community
customer: Families and friends wanting a fun, unique way to exchange holiday greetings
revenue: Free with optional premium walrus accessories ($0.99 - $2.99 per item)
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

const WALRUS_NAMES = [
  "Wally Claus",
  "Sir Tusks-a-Lot", 
  "Snowflake McFlippers",
  "Captain Blubber Bells",
  "Jingle Whiskers",
  "Frosty Flippers",
  "Cocoa Tuskington",
  "Mittens McWalrus",
  "Tinsel Blubber",
  "Holly Whiskerface"
];

const PERSONALITIES = [
  "Jolly & Generous",
  "Cozy & Cuddly",
  "Mischievous & Merry",
  "Wise & Warm",
  "Playful & Peppy"
];

const REACTIONS = ["❄️", "🎄", "⭐", "🎁", "❤️"];

function WalrusSVG({ color = "#8B6914", hatColor = "#c41e3a" }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Santa Hat */}
      <path d="M25 35 L50 5 L85 35 Z" fill={hatColor} />
      <ellipse cx="50" cy="5" rx="8" ry="8" fill="white" />
      <rect x="20" y="32" width="70" height="8" rx="4" fill="white" />
      
      {/* Walrus Body */}
      <ellipse cx="50" cy="65" rx="35" ry="30" fill={color} />
      
      {/* Face */}
      <ellipse cx="50" cy="55" rx="25" ry="20" fill="#d4a574" />
      
      {/* Eyes */}
      <circle cx="40" cy="48" r="5" fill="white" />
      <circle cx="60" cy="48" r="5" fill="white" />
      <circle cx="41" cy="49" r="3" fill="#333" />
      <circle cx="61" cy="49" r="3" fill="#333" />
      <circle cx="42" cy="48" r="1" fill="white" />
      <circle cx="62" cy="48" r="1" fill="white" />
      
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="8" ry="5" fill="#333" />
      <ellipse cx="48" cy="57" rx="2" ry="1" fill="#666" />
      
      {/* Whisker dots */}
      <circle cx="35" cy="60" r="2" fill="#c4956a" />
      <circle cx="30" cy="58" r="2" fill="#c4956a" />
      <circle cx="32" cy="63" r="2" fill="#c4956a" />
      <circle cx="65" cy="60" r="2" fill="#c4956a" />
      <circle cx="70" cy="58" r="2" fill="#c4956a" />
      <circle cx="68" cy="63" r="2" fill="#c4956a" />
      
      {/* Tusks */}
      <path d="M38 65 Q36 80 40 90" stroke="ivory" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M62 65 Q64 80 60 90" stroke="ivory" strokeWidth="5" fill="none" strokeLinecap="round" />
      
      {/* Flippers */}
      <ellipse cx="20" cy="75" rx="12" ry="8" fill={color} transform="rotate(-30 20 75)" />
      <ellipse cx="80" cy="75" rx="12" ry="8" fill={color} transform="rotate(30 80 75)" />
    </svg>
  );
}

function Snowflakes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white/30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
            animationDelay: `${Math.random() * 3}s`
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("walrus-wishes");
  const [view, setView] = useState("feed");
  const [editingWish, setEditingWish] = useState(null);
  
  const wishes = useLiveQuery("type", { key: "wish" });
  const profiles = useLiveQuery("type", { key: "profile" });
  
  const [newWish, setNewWish, saveNewWish] = useDocument({ 
    type: "wish",
    message: "",
    authorName: "",
    authorPersonality: "",
    reactions: {},
    createdAt: null
  });
  
  const [profile, setProfile, saveProfile] = useDocument({
    type: "profile",
    walrusName: "",
    personality: "",
    color: "#8B6914",
    hatColor: "#c41e3a",
    isSetup: false
  });

  const handleCreateWish = async () => {
    if (!newWish.message.trim()) return;
    
    await saveNewWish({
      ...newWish,
      authorName: profile.walrusName,
      authorPersonality: profile.personality,
      authorColor: profile.color,
      authorHatColor: profile.hatColor,
      createdAt: Date.now()
    });
    
    setNewWish({
      type: "wish",
      message: "",
      authorName: "",
      authorPersonality: "",
      reactions: {},
      createdAt: null
    });
  };

  const handleReaction = async (wish, emoji) => {
    const updatedReactions = { ...wish.reactions };
    updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
    
    const { useLiveQuery: _, useDocument: __, ...wishData } = wish;
    await useFireproof("walrus-wishes").database.put({
      ...wishData,
      reactions: updatedReactions
    });
  };

  const handleDeleteWish = async (wish) => {
    await useFireproof("walrus-wishes").database.del(wish._id);
  };

  const handleSetupProfile = async () => {
    if (!profile.walrusName) {
      setProfile({ 
        ...profile, 
        walrusName: WALRUS_NAMES[Math.floor(Math.random() * WALRUS_NAMES.length)] 
      });
    }
    if (!profile.personality) {
      setProfile({ 
        ...profile, 
        personality: PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)] 
      });
    }
    await saveProfile({ ...profile, isSetup: true });
    setView("feed");
  };

  const myProfile = profiles.docs.find(p => p.isSetup);

  if (!myProfile && view !== "setup") {
    return (
      <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.15_0.05_250),oklch(0.08_0.03_220))] p-4">
        <Snowflakes />
        <div className="max-w-md mx-auto pt-20 text-center relative z-10">
          <div className="w-40 h-40 mx-auto mb-6">
            <WalrusSVG />
          </div>
          <h1 className="text-4xl font-bold text-[oklch(0.98_0.01_250)] mb-4">
            🎄 Walrus Wishes 🎄
          </h1>
          <p className="text-[oklch(0.8_0.05_230)] mb-8">
            Create your festive walrus persona and share holiday cheer with the Arctic community!
          </p>
          <button
            onClick={() => setView("setup")}
            className="px-8 py-4 bg-[linear-gradient(in_oklch,oklch(0.45_0.25_25),oklch(0.35_0.2_15))] text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            🦭 Create Your Walrus
          </button>
        </div>
      </div>
    );
  }

  if (view === "setup") {
    return (
      <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.15_0.05_250),oklch(0.08_0.03_220))] p-4">
        <Snowflakes />
        <div className="max-w-md mx-auto pt-8 relative z-10">
          <h2 className="text-3xl font-bold text-[oklch(0.98_0.01_250)] text-center mb-8">
            🎅 Design Your Walrus
          </h2>
          
          <div className="bg-[oklch(0.2_0.03_250)] rounded-3xl p-6 shadow-2xl border border-[oklch(0.3_0.05_250)]">
            <div className="w-32 h-32 mx-auto mb-6">
              <WalrusSVG color={profile.color} hatColor={profile.hatColor} />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[oklch(0.8_0.05_230)] mb-2 font-medium">
                  Walrus Name
                </label>
                <input
                  type="text"
                  value={profile.walrusName}
                  onChange={(e) => setProfile({ ...profile, walrusName: e.target.value })}
                  placeholder={WALRUS_NAMES[0]}
                  className="w-full px-4 py-3 rounded-xl bg-[oklch(0.15_0.02_250)] border border-[oklch(0.3_0.05_250)] text-white placeholder-[oklch(0.5_0.03_250)] focus:border-[oklch(0.6_0.15_145)] focus:outline-none"
                />
                <button
                  onClick={() => setProfile({ 
                    ...profile, 
                    walrusName: WALRUS_NAMES[Math.floor(Math.random() * WALRUS_NAMES.length)] 
                  })}
                  className="mt-2 text-sm text-[oklch(0.7_0.15_145)] hover:text-[oklch(0.8_0.2_145)]"
                >
                  ✨ Generate Random Name
                </button>
              </div>

              <div>
                <label className="block text-[oklch(0.8_0.05_230)] mb-2 font-medium">
                  Personality
                </label>
                <select
                  value={profile.personality}
                  onChange={(e) => setProfile({ ...profile, personality: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[oklch(0.15_0.02_250)] border border-[oklch(0.3_0.05_250)] text-white focus:border-[oklch(0.6_0.15_145)] focus:outline-none"
                >
                  <option value="">Select a personality...</option>
                  {PERSONALITIES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[oklch(0.8_0.05_230)] mb-2 font-medium">
                  Fur Color
                </label>
                <div className="flex gap-2">
                  {["#8B6914", "#5c4a1f", "#a67c52", "#4a3c2a", "#6b5344"].map(c => (
                    <button
                      key={c}
                      onClick={() => setProfile({ ...profile, color: c })}
                      className={`w-10 h-10 rounded-full border-2 transition-transform ${
                        profile.color === c ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[oklch(0.8_0.05_230)] mb-2 font-medium">
                  Hat Color
                </label>
                <div className="flex gap-2">
                  {["#c41e3a", "#228B22", "#4169E1", "#9932CC", "#FFD700"].map(c => (
                    <button
                      key={c}
                      onClick={() => setProfile({ ...profile, hatColor: c })}
                      className={`w-10 h-10 rounded-full border-2 transition-transform ${
                        profile.hatColor === c ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSetupProfile}
              disabled={!profile.walrusName || !profile.personality}
              className="w-full mt-6 px-6 py-4 bg-[linear-gradient(in_oklch,oklch(0.4_0.15_145),oklch(0.3_0.12_135))] text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
            >
              🎄 Join the Arctic Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.15_0.05_250),oklch(0.08_0.03_220))]">
      <Snowflakes />
      
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[oklch(0.12_0.04_250)]/90 backdrop-blur-lg border-b border-[oklch(0.25_0.05_250)]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <WalrusSVG color={myProfile?.color} hatColor={myProfile?.hatColor} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[oklch(0.98_0.01_250)]">Walrus Wishes</h1>
              <p className="text-xs text-[oklch(0.6_0.05_230)]">{myProfile?.walrusName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[oklch(0.7_0.1_85)]">🦭 {profiles.docs.length}</span>
            <span className="text-[oklch(0.7_0.15_25)]">❤️ {wishes.docs.reduce((acc, w) => acc + Object.values(w.reactions || {}).reduce((a, b) => a + b, 0), 0)}</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 relative z-10">
        {/* New Wish Composer */}
        <div className="bg-[oklch(0.18_0.03_250)] rounded-2xl p-4 mb-6 border border-[oklch(0.25_0.05_250)] shadow-xl">
          <div className="flex gap-3">
            <div className="w-12 h-12 flex-shrink-0">
              <WalrusSVG color={myProfile?.color} hatColor={myProfile?.hatColor} />
            </div>
            <div className="flex-1">
              <textarea
                value={newWish.message}
                onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                placeholder="Share your holiday wish with the Arctic community... 🎄"
                className="w-full px-4 py-3 rounded-xl bg-[oklch(0.12_0.02_250)] border border-[oklch(0.25_0.04_250)] text-white placeholder-[oklch(0.5_0.03_250)] focus:border-[oklch(0.5_0.15_145)] focus:outline-none resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2 text-lg">
                  {["🎄", "❄️", "🎁", "⭐", "🦭"].map(e => (
                    <button 
                      key={e}
                      onClick={() => setNewWish({ ...newWish, message: newWish.message + e })}
                      className="hover:scale-125 transition-transform"
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCreateWish}
                  disabled={!newWish.message.trim()}
                  className="px-5 py-2 bg-[linear-gradient(in_oklch,oklch(0.45_0.25_25),oklch(0.35_0.2_15))] text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  Send Wish ✨
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wishes Feed */}
        <div className="space-y-4">
          {wishes.docs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🦭</div>
              <p className="text-[oklch(0.6_0.05_230)]">
                Be the first to share a holiday wish!
              </p>
            </div>
          ) : (
            wishes.docs
              .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
              .map((wish) => (
                <div 
                  key={wish._id} 
                  className="bg-[oklch(0.18_0.03_250)] rounded-2xl p-4 border border-[oklch(0.25_0.05_250)] shadow-lg hover:border-[oklch(0.35_0.08_145)] transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="w-12 h-12 flex-shrink-0">
                      <WalrusSVG color={wish.authorColor} hatColor={wish.authorHatColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[oklch(0.95_0.02_250)]">
                          {wish.authorName}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.25_0.08_145)] text-[oklch(0.8_0.1_145)]">
                          {wish.authorPersonality}
                        </span>
                      </div>
                      <p className="text-[oklch(0.85_0.03_250)] whitespace-pre-wrap break-words">
                        {wish.message}
                      </p>
                      
                      {/* Reactions */}
                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        <div className="flex gap-1">
                          {REACTIONS.map(emoji => (
                            <button
                              key={emoji}
                              onClick={() => handleReaction(wish, emoji)}
                              className={`px-2 py-1 rounded-full text-sm transition-all hover:scale-110 ${
                                wish.reactions?.[emoji] 
                                  ? "bg-[oklch(0.3_0.1_250)]" 
                                  : "bg-[oklch(0.15_0.03_250)] hover:bg-[oklch(0.25_0.05_250)]"
                              }`}
                            >
                              {emoji} {wish.reactions?.[emoji] || ""}
                            </button>
                          ))}
                        </div>
                        
                        {wish.authorName === myProfile?.walrusName && (
                          <button
                            onClick={() => handleDeleteWish(wish)}
                            className="ml-auto text-xs text-[oklch(0.5_0.1_25)] hover:text-[oklch(0.7_0.2_25)]"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      
                      {wish.createdAt && (
                        <p className="text-xs text-[oklch(0.5_0.03_250)] mt-2">
                          {new Date(wish.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Community Stats */}
        {wishes.docs.length > 0 && (
          <div className="mt-8 bg-[linear-gradient(in_oklch,oklch(0.2_0.08_145),oklch(0.15_0.05_135))] rounded-2xl p-6 border border-[oklch(0.3_0.1_145)]">
            <h3 className="text-lg font-bold text-[oklch(0.95_0.02_250)] mb-4 flex items-center gap-2">
              🎄 Arctic Community Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-[oklch(0.75_0.18_85)]">
                  {wishes.docs.length}
                </div>
                <div className="text-xs text-[oklch(0.7_0.05_230)]">Wishes Shared</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[oklch(0.7_0.2_25)]">
                  {wishes.docs.reduce((acc, w) => acc + Object.values(w.reactions || {}).reduce((a, b) => a + b, 0), 0)}
                </div>
                <div className="text-xs text-[oklch(0.7_0.05_230)]">Reactions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[oklch(0.7_0.15_230)]">
                  {profiles.docs.length}
                </div>
                <div className="text-xs text-[oklch(0.7_0.05_230)]">Walruses</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-[oklch(0.5_0.03_250)] text-sm">
        <p>🦭 Spreading holiday cheer, one wish at a time 🎄</p>
      </footer>
    </div>
  );
}