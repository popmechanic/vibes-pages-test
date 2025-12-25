/*BUSINESS
name: Bartholomew's Arctic Oracle
pitch: Seek mystical Christmas wisdom from Bartholomew Tuskington III, the philosophical walrus sage
customer: Whimsical souls seeking absurd holiday guidance and festive fortune
revenue: Free tier with 3 daily fortunes, $2.99/month for unlimited cosmic walrus wisdom
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const FORTUNES = [
  "The candy cane you seek bends toward the light of your inner chimney.",
  "Like a penguin at a formal dinner, your elegance goes unnoticed by those who cannot waddle.",
  "The ornament does not choose the tree. The tree does not choose the ornament. Only the cat decides.",
  "Your stocking hangs heavy with the weight of unspoken compliments.",
  "The reindeer flies not because it believes, but because gravity forgot to check the guest list.",
  "In the great blizzard of life, be the snowflake that lands on a warm tongue.",
  "The fruitcake returns each year because it seeks enlightenment through rejection.",
  "Your wrapping paper reveals more about the wrapper than the gift.",
  "The mistletoe waits patiently. So should you. But perhaps not under mistletoe.",
  "When the eggnog speaks, the wise walrus pretends not to understand.",
  "The sleigh bell's song is silence between the jingles.",
  "You cannot rush the defrosting of a frozen turkey or a frozen heart.",
  "The tinsel tangles itself. This is its purpose. Accept it.",
  "Like snow upon a warm roof, your worries shall become mysterious ceiling drips.",
];

function Snowfall() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white opacity-60 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 12 + 6}px`,
            animation: `fall ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          ❄
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function WalrusOracle({ speaking }) {
  return (
    <div className={`text-center transition-all duration-500 ${speaking ? 'scale-110' : 'scale-100'}`}>
      <pre className="text-[oklch(0.85_0.05_190)] text-xs sm:text-sm leading-tight inline-block text-left font-mono">
{`
           🎅
          ████
         ██████
        ████████
       ┌──────────┐
      ╱            ╲
     │  ◉      ◉   │
     │    ╰──╯     │
     │  ═══════════│
     │ ╱ ╲      ╱ ╲│
      ╲  ◢████◣   ╱
       ╲  ████   ╱
        ╲ ████  ╱
         ╲    ╱
          ╲  ╱
`}
      </pre>
      <div className="mt-2 text-[oklch(0.8_0.12_85)] text-lg font-serif italic">
        ✨ Bartholomew Tuskington III ✨
      </div>
      <div className="text-[oklch(0.6_0.08_190)] text-xs">
        Sage of the Frozen North • Keeper of Festive Mysteries
      </div>
    </div>
  );
}

function CrystalBall({ children, glowing }) {
  return (
    <div className={`relative mx-auto max-w-md transition-all duration-700 ${glowing ? 'scale-105' : 'scale-100'}`}>
      <div className={`
        absolute inset-0 rounded-full blur-xl transition-opacity duration-700
        bg-[linear-gradient(in_oklch,oklch(0.5_0.2_280),oklch(0.4_0.15_200))]
        ${glowing ? 'opacity-60' : 'opacity-20'}
      `} />
      <div className="relative bg-[oklch(0.15_0.05_250)] border-4 border-[oklch(0.4_0.1_190)] rounded-3xl p-6 shadow-2xl">
        <div className="absolute top-2 left-4 text-2xl">🔮</div>
        <div className="absolute top-2 right-4 text-2xl">🔮</div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("bartholomew-oracle");
  const fortunes = useLiveQuery("type", { key: "fortune" });
  const [questionDoc, setQuestionDoc, saveQuestion] = useDocument({ type: "draft", question: "" });
  const [revealing, setRevealing] = useState(false);
  const [currentFortune, setCurrentFortune] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  const seekWisdom = async () => {
    if (!questionDoc.question.trim()) return;
    
    setRevealing(true);
    setSpeaking(true);
    
    // Mystical delay
    await new Promise(r => setTimeout(r, 2000));
    
    const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    setCurrentFortune(fortune);
    
    // Save to database
    await saveQuestion({
      type: "fortune",
      question: questionDoc.question,
      wisdom: fortune,
      timestamp: Date.now(),
    });
    
    // Reset form
    setQuestionDoc({ type: "draft", question: "" });
    
    setTimeout(() => {
      setSpeaking(false);
      setRevealing(false);
    }, 3000);
  };

  const deleteFortune = async (fortune) => {
    const { useDocument: getDoc } = useFireproof("bartholomew-oracle");
    await fortune._deleted;
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch_180deg,oklch(0.12_0.06_260),oklch(0.08_0.04_220),oklch(0.15_0.08_280))] p-4 relative overflow-hidden">
      <Snowfall />
      
      {/* Aurora effect */}
      <div className="fixed top-0 left-0 right-0 h-64 opacity-30 pointer-events-none bg-[linear-gradient(in_oklch_90deg,oklch(0.4_0.2_150),oklch(0.3_0.15_200),oklch(0.4_0.2_280),oklch(0.3_0.15_320))] blur-3xl" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pt-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[oklch(0.95_0.02_250)] mb-2 tracking-wide">
            🎄 The Arctic Oracle 🎄
          </h1>
          <p className="text-[oklch(0.7_0.08_190)] text-sm">
            Seek the festive wisdom of the ages
          </p>
        </header>

        {/* The Walrus */}
        <WalrusOracle speaking={speaking} />

        {/* Question Input */}
        <CrystalBall glowing={revealing}>
          {currentFortune && revealing ? (
            <div className="text-center py-8 animate-pulse">
              <div className="text-[oklch(0.9_0.12_85)] text-lg font-serif italic leading-relaxed">
                "{currentFortune}"
              </div>
              <div className="mt-4 text-[oklch(0.6_0.1_25)] text-sm">
                🦭 *adjusts Santa hat sagely* 🎅
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-[oklch(0.8_0.06_190)] text-center font-serif">
                What troubles your festive spirit, seeker?
              </label>
              <textarea
                value={questionDoc.question}
                onChange={(e) => setQuestionDoc({ ...questionDoc, question: e.target.value })}
                placeholder="Ask about gifts, gatherings, or the great mysteries of tinsel..."
                className="w-full p-4 rounded-xl bg-[oklch(0.1_0.04_250)] border-2 border-[oklch(0.3_0.08_190)] text-[oklch(0.9_0.02_250)] placeholder-[oklch(0.4_0.05_190)] focus:outline-none focus:border-[oklch(0.5_0.15_85)] transition-colors resize-none"
                rows={3}
              />
              <button
                onClick={seekWisdom}
                disabled={!questionDoc.question.trim() || revealing}
                className="w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-[linear-gradient(in_oklch_90deg,oklch(0.45_0.18_25),oklch(0.5_0.2_35))] text-[oklch(0.95_0.02_250)] hover:scale-105 hover:shadow-lg hover:shadow-[oklch(0.5_0.2_25)/30%] active:scale-95"
              >
                {revealing ? "🔮 Consulting the Cosmic Currents..." : "🦭 Seek Bartholomew's Wisdom"}
              </button>
            </div>
          )}
        </CrystalBall>

        {/* Past Fortunes */}
        {fortunes.docs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[oklch(0.85_0.08_85)] text-center mb-4 flex items-center justify-center gap-2">
              <span>📜</span> Scrolls of Past Wisdom <span>📜</span>
            </h2>
            <div className="space-y-3">
              {fortunes.docs
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 10)
                .map((fortune) => (
                  <div
                    key={fortune._id}
                    className="bg-[oklch(0.15_0.04_240)] border border-[oklch(0.25_0.06_190)] rounded-xl p-4 group hover:bg-[oklch(0.18_0.05_240)] transition-colors"
                  >
                    <div className="text-[oklch(0.6_0.06_190)] text-sm mb-2">
                      You asked: "{fortune.question}"
                    </div>
                    <div className="text-[oklch(0.85_0.1_85)] font-serif italic">
                      "{fortune.wisdom}"
                    </div>
                    <div className="text-[oklch(0.4_0.04_190)] text-xs mt-2 flex justify-between items-center">
                      <span>🎄 {new Date(fortune.timestamp).toLocaleDateString()}</span>
                      <span className="opacity-50">— Bartholomew</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-[oklch(0.4_0.05_190)] text-xs pb-8">
          <div className="mb-2">🦭 ❄️ 🎅 ❄️ 🦭</div>
          <p>Bartholomew has dispensed wisdom since the Great Frost of '47</p>
          <p className="italic">"The tusks of truth point in all directions"</p>
        </footer>
      </div>
    </div>
  );
}