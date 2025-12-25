/*BUSINESS
name: Waldo's Nice List Ledger
pitch: Track your holiday good deeds and earn the approval of Waldo Whiskersworth III, the most distinguished walrus this side of the North Pole
customer: Families and individuals seeking a whimsical way to celebrate holiday kindness
revenue: Free with optional "Platinum Tusks" upgrade for extra Waldo reactions ($2.99)
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const WALDO_REACTIONS = [
  "By my magnificent tusks! Most commendable!",
  "Splendid! Simply splendid, I declare!",
  "Harrumph! Even I couldn't have done better... well, perhaps I could.",
  "My whiskers are aquiver with delight!",
  "Capital! This shall be noted in the Great Ledger!",
  "Extraordinary! You've warmed my blubber!",
  "Tally-ho! A deed worthy of the Nice List indeed!",
  "By the Northern Lights! Such generosity!",
  "*adjusts monocle* Most impressive, dear human!",
  "Egads! My heart grows three sizes!"
];

const WALDO_DISAPPROVAL = [
  "I say! Removing a good deed? Most irregular!",
  "*clutches pearls* The audacity! The AUDACITY!",
  "Harrumph! Santa shall hear of this!",
  "My tusks droop with disappointment..."
];

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("waldo-nice-list");
  const deeds = useLiveQuery("type", { key: "deed" });
  const [doc, setDoc, saveDoc] = useDocument({ type: "deed", text: "", points: 1, createdAt: null });
  const [waldoSays, setWaldoSays] = useState("Greetings, dear friend! I am Waldo Whiskersworth III, Keeper of the Nice List. Log your good deeds and earn my distinguished approval!");
  const [isExcited, setIsExcited] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 10 + Math.random() * 15
    }));
    setSnowflakes(flakes);
  }, []);

  const totalPoints = deeds.docs.reduce((sum, d) => sum + (d.points || 1), 0);
  const niceLevel = totalPoints < 10 ? "Novice Nice" : totalPoints < 25 ? "Certified Kind" : totalPoints < 50 ? "Master of Merry" : totalPoints < 100 ? "Supreme Sweetheart" : "LEGENDARY PHILANTHROPIST";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doc.text.trim()) return;
    
    await saveDoc({ ...doc, createdAt: Date.now() });
    setDoc({ type: "deed", text: "", points: 1, createdAt: null });
    
    setWaldoSays(WALDO_REACTIONS[Math.floor(Math.random() * WALDO_REACTIONS.length)]);
    setIsExcited(true);
    setTimeout(() => setIsExcited(false), 2000);
  };

  const handleDelete = async (deed) => {
    const { database } = useFireproof("waldo-nice-list");
    await database.del(deed._id);
    setWaldoSays(WALDO_DISAPPROVAL[Math.floor(Math.random() * WALDO_DISAPPROVAL.length)]);
    setIsExcited(true);
    setTimeout(() => setIsExcited(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.06_260)] relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-[linear-gradient(in_oklch_45deg,oklch(0.15_0.1_280),oklch(0.18_0.12_180),oklch(0.12_0.08_220))] opacity-80" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-[linear-gradient(in_oklch_to_bottom,oklch(0.25_0.15_150)_0%,transparent_100%)] opacity-30" />
      
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute text-white pointer-events-none animate-pulse"
          style={{
            left: `${flake.left}%`,
            top: '-20px',
            fontSize: `${flake.size}px`,
            animation: `fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            opacity: 0.6
          }}
        >
          ❄
        </div>
      ))}
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-center text-4xl font-bold mb-2 text-[oklch(0.85_0.12_200)] drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
          ✨ Waldo's Nice List Ledger ✨
        </h1>
        <p className="text-center text-[oklch(0.7_0.08_200)] mb-6 italic">Est. 1847 • North Pole Branch</p>

        {/* Waldo The Walrus */}
        <div className={`flex flex-col items-center mb-8 transition-transform duration-300 ${isExcited ? 'scale-110' : ''}`} style={{ animation: 'wobble 3s ease-in-out infinite' }}>
          {/* Speech Bubble */}
          <div className="relative bg-[oklch(0.95_0.02_200)] rounded-2xl p-4 mb-4 max-w-md shadow-xl border-2 border-[oklch(0.75_0.18_85)]">
            <p className="text-[oklch(0.25_0.05_250)] text-center text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              "{waldoSays}"
            </p>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[oklch(0.95_0.02_200)]" />
          </div>
          
          {/* Waldo ASCII/Emoji Art */}
          <pre className="text-2xl leading-tight select-none" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            <span className="text-[oklch(0.55_0.25_25)]">{"      🎅      "}</span>{"\n"}
            <span className="text-[oklch(0.55_0.25_25)]">{"     /🔴\\     "}</span>{"\n"}
            <span className="text-[oklch(0.55_0.08_50)]">{"    ╭─────╮   "}</span>{"\n"}
            <span className="text-[oklch(0.55_0.08_50)]">{"   ╱"}<span className="text-white">◉</span>{"   "}<span className="text-white">◉</span>{"╲  "}</span>{"\n"}
            <span className="text-[oklch(0.55_0.08_50)]">{"  ╱"}<span className="text-[oklch(0.9_0.02_100)]">{"  ┃┃┃  "}</span>{"╲ "}</span>{"\n"}
            <span className="text-[oklch(0.55_0.08_50)]">{"  ▏"}<span className="text-[oklch(0.85_0.1_50)]">{"  ═══  "}</span>{"▕ "}</span>{"\n"}
            <span className="text-[oklch(0.55_0.08_50)]">{"  ╰───────╯  "}</span>{"\n"}
            <span className="text-[oklch(0.65_0.08_50)]">{"   ╱╲   ╱╲   "}</span>{"\n"}
          </pre>
          <p className="text-[oklch(0.75_0.18_85)] font-bold text-xl mt-2" style={{ fontFamily: 'Georgia, serif' }}>
            Waldo Whiskersworth III
          </p>
          <p className="text-[oklch(0.6_0.1_200)] text-sm italic">Distinguished Keeper of the Nice List</p>
        </div>

        {/* Points Display */}
        <div className="bg-[oklch(0.2_0.08_250)] rounded-xl p-6 mb-6 border border-[oklch(0.4_0.15_200)] shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[oklch(0.7_0.08_200)]">Nice List Points:</span>
            <span className="text-4xl font-bold text-[oklch(0.75_0.18_85)]" style={{ animation: isExcited ? 'sparkle 0.5s ease-in-out' : 'none' }}>
              ⭐ {totalPoints}
            </span>
          </div>
          <div className="h-4 bg-[oklch(0.15_0.05_250)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[linear-gradient(in_oklch_90deg,oklch(0.55_0.25_25),oklch(0.65_0.2_150),oklch(0.75_0.18_85))] transition-all duration-500"
              style={{ width: `${Math.min(totalPoints, 100)}%` }}
            />
          </div>
          <p className="text-center mt-3 text-[oklch(0.85_0.12_200)] font-semibold text-lg">
            🎖️ {niceLevel} 🎖️
          </p>
        </div>

        {/* Add Deed Form */}
        <form onSubmit={handleSubmit} className="bg-[oklch(0.18_0.06_250)] rounded-xl p-6 mb-6 border border-[oklch(0.3_0.1_200)]">
          <h2 className="text-[oklch(0.85_0.12_200)] text-xl mb-4 font-semibold">📜 Record a Good Deed</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={doc.text}
              onChange={(e) => setDoc({ ...doc, text: e.target.value })}
              placeholder="What kind deed did you perform?"
              className="w-full p-3 rounded-lg bg-[oklch(0.12_0.04_250)] border border-[oklch(0.4_0.1_200)] text-[oklch(0.9_0.05_200)] placeholder-[oklch(0.5_0.05_200)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.2_150)]"
            />
            <div className="flex gap-4 items-center">
              <label className="text-[oklch(0.7_0.08_200)]">Points:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 5].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDoc({ ...doc, points: p })}
                    className={`w-10 h-10 rounded-full font-bold transition-all ${
                      doc.points === p 
                        ? 'bg-[oklch(0.55_0.25_25)] text-white scale-110' 
                        : 'bg-[oklch(0.25_0.08_250)] text-[oklch(0.7_0.08_200)] hover:bg-[oklch(0.35_0.1_250)]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <span className="text-[oklch(0.5_0.05_200)] text-sm ml-2">(bigger deeds = more points!)</span>
            </div>
            <button
              type="submit"
              className="bg-[oklch(0.65_0.2_150)] hover:bg-[oklch(0.55_0.22_150)] text-white font-bold py-3 px-6 rounded-lg transition-all hover:scale-105 shadow-lg"
            >
              🎁 Submit to the Ledger
            </button>
          </div>
        </form>

        {/* Deeds List */}
        <div className="bg-[oklch(0.16_0.05_250)] rounded-xl p-6 border border-[oklch(0.3_0.08_200)]">
          <h2 className="text-[oklch(0.85_0.12_200)] text-xl mb-4 font-semibold">📖 The Ledger of Kind Acts</h2>
          {deeds.docs.length === 0 ? (
            <p className="text-[oklch(0.5_0.05_200)] text-center py-8 italic">
              The ledger awaits your first good deed...
            </p>
          ) : (
            <div className="space-y-3">
              {deeds.docs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).map(deed => (
                <div 
                  key={deed._id} 
                  className="flex items-center justify-between p-4 bg-[oklch(0.2_0.06_250)] rounded-lg border border-[oklch(0.35_0.08_200)] hover:border-[oklch(0.5_0.12_150)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <p className="text-[oklch(0.9_0.05_200)]">{deed.text}</p>
                      <p className="text-[oklch(0.5_0.05_200)] text-sm">
                        {deed.createdAt ? new Date(deed.createdAt).toLocaleDateString() : 'Timeless'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[oklch(0.75_0.18_85)] font-bold">+{deed.points || 1} ⭐</span>
                    <button
                      onClick={() => handleDelete(deed)}
                      className="text-[oklch(0.5_0.1_25)] hover:text-[oklch(0.65_0.2_25)] transition-colors text-xl"
                      title="Remove deed (Waldo won't be pleased!)"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[oklch(0.4_0.05_200)] mt-8 text-sm">
          🎄 Certified by the Arctic Council of Distinguished Walruses 🎄
        </p>
      </div>
    </div>
  );
}