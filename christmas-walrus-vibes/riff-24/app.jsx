/*BUSINESS
name: Bartholomew's Wish Emporium
pitch: Submit your Christmas wishes to a distinguished aristocratic walrus who dramatically deliberates and delivers festive verdicts
customer: Whimsical souls seeking unconventional holiday magic
revenue: Free with optional tip jar for Bartholomew's fish fund
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const VERDICTS = [
  "Ah yes, splendid! Consider it GRANTED, my dear fellow!",
  "Hmm, rather ambitious... but 'tis the season! APPROVED!",
  "My whiskers tingle with approval! GRANTED with extra tinsel!",
  "*adjusts monocle* A most refined request. BESTOWED!",
  "By my magnificent tusks! This wish has MERIT!",
  "The aurora speaks... and it says YES, DARLING!",
  "How delightfully peculiar! GRANTED, with a flourish!",
  "*strokes magnificent mustache* Most acceptable. APPROVED!",
  "The ancient walrus council convenes... WISH GRANTED!",
  "Elementary, my dear wisher! Consider it DONE!",
];

const DELIBERATIONS = [
  "Consulting the northern lights...",
  "Polishing monocle thoughtfully...",
  "Conferring with arctic ancestors...",
  "Stroking magnificent whiskers...",
  "Reviewing the Nice List archives...",
  "Summoning festive spirits...",
];

function Snowflake({ style }) {
  return (
    <div
      className="absolute text-white opacity-60 animate-fall pointer-events-none"
      style={style}
    >
      ❄
    </div>
  );
}

function BartholomewSVG({ isDeliberating }) {
  return (
    <svg viewBox="0 0 200 200" className={`w-48 h-48 ${isDeliberating ? 'animate-wiggle' : ''}`}>
      {/* Walrus body */}
      <ellipse cx="100" cy="130" rx="60" ry="45" fill="oklch(0.55 0.08 50)" />
      
      {/* Walrus head */}
      <circle cx="100" cy="85" r="45" fill="oklch(0.6 0.07 50)" />
      
      {/* Snout/nose area */}
      <ellipse cx="100" cy="105" rx="30" ry="20" fill="oklch(0.65 0.06 50)" />
      
      {/* Nose */}
      <ellipse cx="100" cy="95" rx="8" ry="6" fill="oklch(0.25 0.05 20)" />
      
      {/* Whisker dots */}
      {[75, 85, 95, 105, 115, 125].map((x, i) => (
        <circle key={i} cx={x} cy="105" r="2" fill="oklch(0.3 0.02 50)" />
      ))}
      
      {/* Magnificent mustache */}
      <path
        d="M70 108 Q60 115 50 110 M130 108 Q140 115 150 110"
        stroke="oklch(0.35 0.05 50)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Tusks */}
      <path d="M80 115 Q75 145 78 160" stroke="oklch(0.95 0.02 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M120 115 Q125 145 122 160" stroke="oklch(0.95 0.02 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
      
      {/* Eyes */}
      <circle cx="80" cy="75" r="8" fill="oklch(0.98 0 0)" />
      <circle cx="120" cy="75" r="8" fill="oklch(0.98 0 0)" />
      <circle cx="82" cy="74" r="4" fill="oklch(0.2 0 0)" />
      <circle cx="122" cy="74" r="4" fill="oklch(0.2 0 0)" />
      
      {/* Monocle */}
      <circle cx="120" cy="75" r="12" stroke="oklch(0.75 0.15 85)" strokeWidth="2" fill="none" />
      <line x1="132" y1="75" x2="145" y2="90" stroke="oklch(0.75 0.15 85)" strokeWidth="1.5" />
      
      {/* Eyebrow */}
      <path d="M72 65 Q80 60 88 65" stroke="oklch(0.35 0.05 50)" strokeWidth="2" fill="none" />
      <path d="M112 65 Q120 60 128 65" stroke="oklch(0.35 0.05 50)" strokeWidth="2" fill="none" />
      
      {/* Santa Hat */}
      <path
        d="M55 70 Q100 20 145 70 L140 75 Q100 35 60 75 Z"
        fill="oklch(0.5 0.22 25)"
      />
      <ellipse cx="100" cy="72" rx="48" ry="8" fill="oklch(0.95 0.01 0)" />
      <circle cx="145" cy="35" r="10" fill="oklch(0.95 0.01 0)" />
      <path
        d="M140 70 Q160 30 145 35"
        stroke="oklch(0.5 0.22 25)"
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Flippers */}
      <ellipse cx="45" cy="140" rx="15" ry="25" fill="oklch(0.5 0.08 50)" transform="rotate(-20 45 140)" />
      <ellipse cx="155" cy="140" rx="15" ry="25" fill="oklch(0.5 0.08 50)" transform="rotate(20 155 140)" />
    </svg>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("bartholomew-wishes");
  const wishes = useLiveQuery("type", { key: "wish" });
  const [newWish, setNewWish, saveWish] = useDocument({ type: "wish", text: "", verdict: "", status: "pending", createdAt: null });
  const [isDeliberating, setIsDeliberating] = useState(false);
  const [deliberationText, setDeliberationText] = useState("");
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4,
      animationDelay: Math.random() * 5,
      fontSize: 10 + Math.random() * 20,
    }));
    setSnowflakes(flakes);
  }, []);

  const submitWish = async () => {
    if (!newWish.text.trim()) return;
    
    setIsDeliberating(true);
    
    // Deliberation sequence
    for (let i = 0; i < 3; i++) {
      setDeliberationText(DELIBERATIONS[Math.floor(Math.random() * DELIBERATIONS.length)]);
      await new Promise(r => setTimeout(r, 1000));
    }
    
    const verdict = VERDICTS[Math.floor(Math.random() * VERDICTS.length)];
    
    await saveWish({
      ...newWish,
      verdict,
      status: "granted",
      createdAt: Date.now(),
    });
    
    setIsDeliberating(false);
    setDeliberationText("");
    setNewWish({ type: "wish", text: "", verdict: "", status: "pending", createdAt: null });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch_180deg,oklch(0.15_0.08_280),oklch(0.2_0.1_200),oklch(0.15_0.12_150))] p-4 overflow-hidden relative">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes aurora {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fall { animation: fall linear infinite; }
        .animate-wiggle { animation: wiggle 0.3s ease-in-out infinite; }
        .animate-aurora { animation: aurora 4s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <Snowflake
          key={flake.id}
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.fontSize}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
          }}
        />
      ))}

      {/* Aurora effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.5_0.2_150_/_0.2),transparent_50%)] animate-aurora pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.5_0.15_280_/_0.15),transparent_50%)] animate-aurora pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[oklch(0.95_0.02_80)] mb-2 drop-shadow-lg">
            🎄 Bartholomew's Wish Emporium 🎄
          </h1>
          <p className="text-[oklch(0.8_0.1_195)] italic">
            "Where distinguished tusks meet festive dreams"
          </p>
        </div>

        {/* Bartholomew */}
        <div className="flex flex-col items-center mb-8">
          <div className="animate-float">
            <BartholomewSVG isDeliberating={isDeliberating} />
          </div>
          <div className="bg-[oklch(0.2_0.05_240_/_0.8)] backdrop-blur rounded-lg px-4 py-2 mt-2 border border-[oklch(0.6_0.15_195_/_0.5)]">
            <p className="text-[oklch(0.9_0.05_195)] text-center font-serif italic">
              {isDeliberating 
                ? deliberationText 
                : "Bartholomew Tuskington III, Esq. — at your service!"
              }
            </p>
          </div>
        </div>

        {/* Wish Input */}
        <div className="bg-[oklch(0.18_0.04_240_/_0.9)] backdrop-blur-lg rounded-2xl p-6 mb-8 border-2 border-[oklch(0.75_0.15_85_/_0.5)] shadow-2xl">
          <h2 className="text-xl font-bold text-[oklch(0.85_0.12_85)] mb-4 flex items-center gap-2">
            ✨ Submit Your Christmas Wish ✨
          </h2>
          <textarea
            value={newWish.text}
            onChange={(e) => setNewWish({ ...newWish, text: e.target.value })}
            placeholder="Dear Bartholomew, for Christmas I wish for..."
            className="w-full p-4 rounded-xl bg-[oklch(0.12_0.03_240)] text-[oklch(0.9_0.02_195)] placeholder-[oklch(0.5_0.05_195)] border border-[oklch(0.4_0.1_195)] focus:border-[oklch(0.7_0.15_85)] focus:outline-none resize-none h-32 font-serif"
            disabled={isDeliberating}
          />
          <button
            onClick={submitWish}
            disabled={isDeliberating || !newWish.text.trim()}
            className="mt-4 w-full py-3 rounded-xl bg-[linear-gradient(in_oklch_90deg,oklch(0.5_0.22_25),oklch(0.55_0.2_35))] text-white font-bold text-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {isDeliberating ? "🔮 Bartholomew Deliberates..." : "🎁 Present Wish to Bartholomew"}
          </button>
        </div>

        {/* Wish History */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[oklch(0.85_0.1_150)] text-center mb-4">
            📜 The Grand Wish Archive 📜
          </h2>
          {wishes.docs.length === 0 ? (
            <p className="text-center text-[oklch(0.6_0.08_195)] italic py-8">
              No wishes yet... Bartholomew awaits your first request!
            </p>
          ) : (
            wishes.docs.sort((a, b) => b.createdAt - a.createdAt).map((wish) => (
              <div
                key={wish._id}
                className="bg-[oklch(0.15_0.05_200_/_0.85)] backdrop-blur rounded-xl p-5 border border-[oklch(0.5_0.1_195_/_0.4)] shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🦭</span>
                  <div className="flex-1">
                    <p className="text-[oklch(0.85_0.05_80)] font-serif mb-3 text-lg">
                      "{wish.text}"
                    </p>
                    <div className="bg-[oklch(0.2_0.08_150_/_0.6)] rounded-lg p-3 border-l-4 border-[oklch(0.65_0.2_150)]">
                      <p className="text-[oklch(0.9_0.1_150)] font-serif italic">
                        {wish.verdict}
                      </p>
                    </div>
                    <p className="text-[oklch(0.5_0.05_195)] text-sm mt-2">
                      {new Date(wish.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-[oklch(0.5_0.08_195)] text-sm">
          <p>🐟 Tip Bartholomew's Fish Fund 🐟</p>
          <p className="mt-1 italic">"A satisfied walrus is a generous walrus"</p>
        </footer>
      </div>
    </div>
  );
}