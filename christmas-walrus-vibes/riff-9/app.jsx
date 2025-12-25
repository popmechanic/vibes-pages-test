/*BUSINESS
name: Barnaby's Secret Wish Registry
pitch: Submit your strangest Christmas wishes to a distinguished walrus gentleman who operates a clandestine holiday fulfillment bureau
customer: Whimsical adults who appreciate absurdist humor and unconventional holiday traditions
revenue: Free tier with premium "Priority Tusk Processing" subscription at $4.99/month
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

const BARNABY_ASCII = `
      ___________
     /           \\
    |  ◉     ◉   |🎅
    |     ▼      |
    |  ╰─────╯   |
     \\  ═══════ /
      \\_________/
        │││││││
      ~~~~~~~~~~
   ✧ BARNABY TUSKSWORTH III ✧
     Esq. of the North Pole
`;

const QUIRKY_RATINGS = [
  "Delightfully Peculiar",
  "Magnificently Absurd", 
  "Exquisitely Unusual",
  "Wonderfully Bizarre",
  "Supremely Eccentric"
];

const STATUS_OPTIONS = [
  { value: "pending", label: "🔮 Under Mystical Review", color: "oklch(0.6 0.15 280)" },
  { value: "processing", label: "🦭 Tusk Processing", color: "oklch(0.65 0.12 85)" },
  { value: "fulfilled", label: "✨ Granted by Barnaby", color: "oklch(0.5 0.15 145)" },
  { value: "impossible", label: "🎭 Too Whimsical Even for Barnaby", color: "oklch(0.5 0.15 15)" }
];

function SnowflakeDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <span 
          key={i}
          className="absolute text-[oklch(0.9_0.02_85)] opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
            animationDelay: `${Math.random() * 3}s`
          }}
        >
          {['❄', '✧', '⁂', '☆', '◈'][Math.floor(Math.random() * 5)]}
        </span>
      ))}
    </div>
  );
}

function WalrusBadge({ rating }) {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[oklch(0.75_0.12_85)] text-[oklch(0.15_0.05_280)] text-xs font-bold">
      <span>🦭</span>
      <span>{rating}</span>
    </div>
  );
}

function WishCard({ wish, onUpdate, onDelete }) {
  const status = STATUS_OPTIONS.find(s => s.value === wish.status) || STATUS_OPTIONS[0];
  
  return (
    <div className="relative p-4 rounded-lg bg-[linear-gradient(in_oklch,oklch(0.25_0.08_15),oklch(0.18_0.05_280))] border border-[oklch(0.75_0.12_85)]/30 shadow-lg">
      <div className="absolute -top-2 -right-2 text-2xl">🎅</div>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[oklch(0.92_0.03_85)] font-serif text-lg font-bold pr-8">
          {wish.title}
        </h3>
      </div>
      
      <p className="text-[oklch(0.75_0.05_85)] text-sm mb-3 italic">
        "{wish.description}"
      </p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <WalrusBadge rating={wish.quirkRating} />
        <span 
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: status.color,
            color: 'oklch(0.95 0.02 85)'
          }}
        >
          {status.label}
        </span>
      </div>
      
      <div className="flex gap-2 pt-2 border-t border-[oklch(0.75_0.12_85)]/20">
        <select
          value={wish.status}
          onChange={(e) => onUpdate({ ...wish, status: e.target.value })}
          className="flex-1 bg-[oklch(0.15_0.05_280)] text-[oklch(0.85_0.03_85)] text-xs p-2 rounded border border-[oklch(0.75_0.12_85)]/30"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-[oklch(0.35_0.15_15)] text-[oklch(0.92_0.03_85)] rounded text-xs hover:bg-[oklch(0.45_0.18_15)] transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument, database } = useFireproof("barnaby-wishes");
  
  const wishes = useLiveQuery("type", { key: "wish" });
  
  const [newWish, setNewWish, saveNewWish] = useDocument({
    _id: `draft-${Date.now()}`,
    type: "draft",
    title: "",
    description: "",
    quirkRating: QUIRKY_RATINGS[0],
    status: "pending"
  });
  
  const [showForm, setShowForm] = useState(false);

  const handleSubmitWish = async () => {
    if (!newWish.title.trim() || !newWish.description.trim()) return;
    
    await database.put({
      type: "wish",
      title: newWish.title,
      description: newWish.description,
      quirkRating: newWish.quirkRating,
      status: "pending",
      createdAt: new Date().toISOString()
    });
    
    setNewWish({
      _id: `draft-${Date.now()}`,
      type: "draft", 
      title: "",
      description: "",
      quirkRating: QUIRKY_RATINGS[0],
      status: "pending"
    });
    setShowForm(false);
  };

  const handleUpdateWish = async (wish) => {
    await database.put(wish);
  };

  const handleDeleteWish = async (wish) => {
    await database.del(wish._id);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.12_0.04_280),oklch(0.18_0.06_145))] p-4">
      <SnowflakeDecor />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <pre className="text-[oklch(0.75_0.12_85)] text-xs sm:text-sm font-mono leading-tight inline-block">
            {BARNABY_ASCII}
          </pre>
          <h1 className="text-[oklch(0.92_0.03_85)] font-serif text-2xl sm:text-3xl font-bold mt-4 tracking-wide">
            ✧ The Secret Wish Registry ✧
          </h1>
          <p className="text-[oklch(0.6_0.08_85)] text-sm mt-2 italic">
            "Submit your most peculiar holiday desires, and I shall review them with utmost discretion."
          </p>
          <p className="text-[oklch(0.5_0.05_85)] text-xs mt-1">
            — B.T. III, Grand Tusker of the Polar Bureau
          </p>
        </header>

        {/* New Wish Button/Form */}
        <div className="mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full p-4 rounded-lg border-2 border-dashed border-[oklch(0.75_0.12_85)]/50 text-[oklch(0.75_0.12_85)] hover:bg-[oklch(0.75_0.12_85)]/10 transition-colors font-serif text-lg"
            >
              📜 Submit a Wish to Barnaby
            </button>
          ) : (
            <div className="p-6 rounded-lg bg-[linear-gradient(in_oklch,oklch(0.2_0.05_145),oklch(0.15_0.04_280))] border border-[oklch(0.75_0.12_85)]/40">
              <h2 className="text-[oklch(0.92_0.03_85)] font-serif text-xl mb-4 flex items-center gap-2">
                <span>📜</span> Official Wish Submission Form
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[oklch(0.75_0.12_85)] text-sm mb-1 font-medium">
                    Wish Title (be specific yet mysterious)
                  </label>
                  <input
                    type="text"
                    value={newWish.title}
                    onChange={(e) => setNewWish({ ...newWish, title: e.target.value })}
                    placeholder="e.g., A singing cheese wheel"
                    className="w-full p-3 rounded bg-[oklch(0.1_0.03_280)] text-[oklch(0.92_0.03_85)] border border-[oklch(0.75_0.12_85)]/30 placeholder:text-[oklch(0.4_0.03_85)]"
                  />
                </div>
                
                <div>
                  <label className="block text-[oklch(0.75_0.12_85)] text-sm mb-1 font-medium">
                    Elaborate Description (the stranger, the better)
                  </label>
                  <textarea
                    value={newWish.description}
                    onChange={(e) => setNewWish({ ...newWish, description: e.target.value })}
                    placeholder="Describe your wish in vivid, peculiar detail..."
                    rows={3}
                    className="w-full p-3 rounded bg-[oklch(0.1_0.03_280)] text-[oklch(0.92_0.03_85)] border border-[oklch(0.75_0.12_85)]/30 placeholder:text-[oklch(0.4_0.03_85)]"
                  />
                </div>
                
                <div>
                  <label className="block text-[oklch(0.75_0.12_85)] text-sm mb-1 font-medium">
                    Self-Assessed Quirkiness Rating
                  </label>
                  <select
                    value={newWish.quirkRating}
                    onChange={(e) => setNewWish({ ...newWish, quirkRating: e.target.value })}
                    className="w-full p-3 rounded bg-[oklch(0.1_0.03_280)] text-[oklch(0.92_0.03_85)] border border-[oklch(0.75_0.12_85)]/30"
                  >
                    {QUIRKY_RATINGS.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSubmitWish}
                    className="flex-1 p-3 rounded bg-[oklch(0.75_0.12_85)] text-[oklch(0.15_0.05_280)] font-bold hover:bg-[oklch(0.8_0.14_85)] transition-colors"
                  >
                    🦭 Submit to Barnaby
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-4 p-3 rounded bg-[oklch(0.25_0.05_280)] text-[oklch(0.7_0.03_85)] hover:bg-[oklch(0.3_0.05_280)] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wishes List */}
        <div className="space-y-4">
          <h2 className="text-[oklch(0.75_0.12_85)] font-serif text-lg flex items-center gap-2">
            <span>📋</span> Active Registry ({wishes.docs.length} wishes under review)
          </h2>
          
          {wishes.docs.length === 0 ? (
            <div className="text-center p-8 rounded-lg bg-[oklch(0.15_0.04_280)]/50 border border-[oklch(0.75_0.12_85)]/20">
              <p className="text-[oklch(0.6_0.05_85)] italic">
                "The registry awaits your first peculiar submission..."
              </p>
              <p className="text-[oklch(0.5_0.03_85)] text-sm mt-2">
                — Barnaby adjusts his monocle patiently
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {wishes.docs.map(wish => (
                <WishCard
                  key={wish._id}
                  wish={wish}
                  onUpdate={handleUpdateWish}
                  onDelete={() => handleDeleteWish(wish)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-6 border-t border-[oklch(0.75_0.12_85)]/20">
          <p className="text-[oklch(0.5_0.05_85)] text-xs">
            🦭 Est. 1847 at the North Pole • All wishes handled with utmost confidentiality
          </p>
          <p className="text-[oklch(0.4_0.03_85)] text-xs mt-1">
            "Neither snow nor sleet nor existential absurdity shall stay these tusks from their appointed rounds."
          </p>
        </footer>
      </div>
    </div>
  );
}