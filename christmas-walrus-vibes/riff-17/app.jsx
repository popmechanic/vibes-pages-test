/*BUSINESS
name: Bartholomew's Wish Tribunal
pitch: Submit your Christmas wishes to be judged by a pompous Victorian walrus wearing a Santa hat
customer: Holiday enthusiasts who appreciate absurdist humor and whimsical interactions
revenue: Free with optional "Platinum Blubber Membership" for extra pompous responses
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const VERDICTS = [
  { verdict: "SUPREMELY WORTHY", score: 100, color: "oklch(0.75 0.18 85)" },
  { verdict: "ADEQUATELY FESTIVE", score: 75, color: "oklch(0.65 0.15 145)" },
  { verdict: "QUESTIONABLE MERIT", score: 50, color: "oklch(0.65 0.12 60)" },
  { verdict: "REQUIRES RECONSIDERATION", score: 25, color: "oklch(0.55 0.15 25)" },
  { verdict: "PREPOSTEROUS BALDERDASH", score: 0, color: "oklch(0.45 0.18 15)" },
];

const COMMENTARY = [
  "Most irregular, yet I find myself intrigued by its festive audacity!",
  "Hmph! In my forty years of wish adjudication, I've rarely seen such... enthusiasm.",
  "The council of arctic elders shall hear of this peculiar request forthwith!",
  "I shall consult my monocle for further clarity on this matter.",
  "By the great glaciers of the North! What manner of wish is this?",
  "My whiskers positively tingle with yuletide anticipation!",
  "I must retire to my ice floe to ponder this most unusual petition.",
  "Reminds me of the great Wish Tribunal of 1847. Capital times, capital times.",
  "The blubber council has convened and rendered their solemn judgment!",
  "I say, this wish has the distinct aroma of holiday mischief!",
];

const WalrusASCII = () => (
  <pre className="text-center text-[oklch(0.85_0.08_200)] text-xs sm:text-sm leading-tight font-mono select-none">
{`
       🎅
      .-"""-.
     /        \\
    |  O    O  |
    |    __    |
     \\  \\__/  /
    _| |||||| |_
   / |_\\    /_| \\
  |   \\_\\||/_/   |
   \\     ^^     /
    '-........-'
  ~*~ BARTHOLOMEW ~*~
  ~BLUBBERSWORTH III~
`}
  </pre>
);

const Snowflake = ({ style }) => (
  <span 
    className="absolute text-[oklch(0.95_0.02_220)] opacity-60 pointer-events-none animate-pulse"
    style={style}
  >
    ❄️
  </span>
);

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("bartholomew-tribunal");
  const wishes = useLiveQuery("type", { key: "wish" });
  const [newWish, setNewWish, saveNewWish] = useDocument({ type: "wish", text: "", verdict: null, score: null, commentary: null, timestamp: null });
  const [isJudging, setIsJudging] = useState(false);
  const [showWalrus, setShowWalrus] = useState(true);

  const snowflakes = Array.from({ length: 12 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 1.5 + 0.5}rem`,
    animationDelay: `${Math.random() * 3}s`,
  }));

  const submitWish = async () => {
    if (!newWish.text.trim()) return;
    
    setIsJudging(true);
    setShowWalrus(true);
    
    // Dramatic pause for the tribunal
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const verdictIndex = Math.floor(Math.random() * VERDICTS.length);
    const selectedVerdict = VERDICTS[verdictIndex];
    const selectedCommentary = COMMENTARY[Math.floor(Math.random() * COMMENTARY.length)];
    
    await saveNewWish({
      ...newWish,
      verdict: selectedVerdict.verdict,
      score: selectedVerdict.score,
      verdictColor: selectedVerdict.color,
      commentary: selectedCommentary,
      timestamp: Date.now(),
    });
    
    setIsJudging(false);
    setNewWish({ type: "wish", text: "", verdict: null, score: null, commentary: null, timestamp: null });
  };

  const deleteWish = async (wish) => {
    const { database } = useFireproof("bartholomew-tribunal");
    await database.del(wish._id);
  };

  const sortedWishes = [...(wishes.docs || [])].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch_180deg,oklch(0.12_0.06_240),oklch(0.18_0.08_200),oklch(0.15_0.07_180))] p-4 relative overflow-hidden">
      {/* Floating Snowflakes */}
      {snowflakes.map((style, i) => (
        <Snowflake key={i} style={style} />
      ))}
      
      {/* Header */}
      <header className="text-center mb-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[oklch(0.95_0.02_60)] mb-2 drop-shadow-lg">
          🎄 The Wish Tribunal 🎄
        </h1>
        <p className="text-[oklch(0.75_0.1_175)] italic text-lg">
          ✧ Presided by the Honorable Bartholomew Blubbersworth III ✧
        </p>
      </header>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Walrus Display */}
        {showWalrus && (
          <div className="bg-[oklch(0.2_0.05_220)] border-2 border-[oklch(0.4_0.1_175)] rounded-2xl p-6 mb-6 shadow-2xl">
            <WalrusASCII />
            <div className="text-center mt-4">
              {isJudging ? (
                <p className="text-[oklch(0.85_0.12_85)] text-lg animate-pulse font-serif italic">
                  *adjusts monocle contemplatively* 🧐
                </p>
              ) : (
                <p className="text-[oklch(0.75_0.08_200)] font-serif">
                  "Present your Christmas wish, petitioner, and I shall render judgment most fair!"
                </p>
              )}
            </div>
          </div>
        )}

        {/* Wish Submission */}
        <div className="bg-[oklch(0.22_0.04_200)] border-2 border-[oklch(0.35_0.08_175)] rounded-xl p-6 mb-6 shadow-xl">
          <h2 className="text-xl font-bold text-[oklch(0.85_0.1_85)] mb-4 flex items-center gap-2">
            📜 Submit Your Petition
          </h2>
          <textarea
            value={newWish.text}
            onChange={(e) => setNewWish({ ...newWish, text: e.target.value })}
            placeholder="State your Christmas wish for the tribunal..."
            className="w-full p-4 rounded-lg bg-[oklch(0.15_0.03_220)] border border-[oklch(0.35_0.06_200)] text-[oklch(0.9_0.02_200)] placeholder-[oklch(0.5_0.04_200)] focus:outline-none focus:border-[oklch(0.6_0.12_175)] resize-none h-24 font-serif"
            disabled={isJudging}
          />
          <button
            onClick={submitWish}
            disabled={isJudging || !newWish.text.trim()}
            className="mt-4 w-full py-3 px-6 bg-[linear-gradient(in_oklch_90deg,oklch(0.45_0.18_15),oklch(0.5_0.2_30))] hover:bg-[linear-gradient(in_oklch_90deg,oklch(0.5_0.2_15),oklch(0.55_0.22_30))] disabled:opacity-50 disabled:cursor-not-allowed text-[oklch(0.95_0.02_60)] font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isJudging ? (
              <>⏳ The Tribunal Deliberates...</>
            ) : (
              <>🔨 Submit for Judgment</>
            )}
          </button>
        </div>

        {/* Previous Judgments */}
        {sortedWishes.length > 0 && (
          <div className="bg-[oklch(0.18_0.04_210)] border-2 border-[oklch(0.3_0.06_200)] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-[oklch(0.85_0.08_175)] mb-4 flex items-center gap-2">
              📋 Previous Judgments ({sortedWishes.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sortedWishes.map((wish) => (
                <div
                  key={wish._id}
                  className="bg-[oklch(0.14_0.03_220)] border border-[oklch(0.28_0.05_200)] rounded-lg p-4 relative group"
                >
                  <button
                    onClick={() => deleteWish(wish)}
                    className="absolute top-2 right-2 text-[oklch(0.5_0.1_15)] hover:text-[oklch(0.65_0.18_15)] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                  <p className="text-[oklch(0.85_0.04_200)] font-serif mb-3 pr-6">
                    "{wish.text}"
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ backgroundColor: wish.verdictColor, color: "oklch(0.1 0.02 220)" }}
                    >
                      {wish.verdict}
                    </span>
                    <span className="text-[oklch(0.7_0.1_85)]">
                      Score: {wish.score}/100
                    </span>
                  </div>
                  <p className="text-[oklch(0.65_0.06_175)] text-sm mt-3 italic font-serif">
                    — "{wish.commentary}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-8 text-[oklch(0.5_0.04_200)] text-sm">
          <p>🦭 Est. 1847 • Arctic Circle Court of Festive Appeals 🦭</p>
          <p className="mt-1 opacity-70">All judgments are final and legally binding in the realm of Christmas cheer.</p>
        </footer>
      </div>
    </div>
  );
}