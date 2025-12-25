/*BUSINESS
name: Winslow's Winter Prophecies
pitch: Seek mystical Christmas wisdom from Winslow the Wise Walrus, an arctic oracle who delivers cryptic holiday fortunes
customer: People seeking whimsical holiday entertainment and shareable festive fortunes
revenue: Free with optional "Golden Tusk" donations for extra prophecy styles
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const PROPHECIES = [
  "The gift you seek lies not under the tree, but within the warmth of shared cocoa...",
  "Beware the third candy cane from the left. It knows what you did last Christmas.",
  "A mysterious package approaches. Its contents? Socks. But magical socks.",
  "The snow whispers your name, but only to the squirrels. They are planning something.",
  "Your holiday sweater shall bring unexpected luck on the eve of the 24th moon.",
  "The reindeer council has reviewed your file. They are... amused.",
  "Tinsel is your ally this season. Do not question why.",
  "A relative will ask about your life choices. Answer only in song lyrics.",
  "The fruitcake prophecy remains sealed. You are not ready.",
  "Your Christmas miracle awaits at exactly 11:11. Keep your eyes on the ornaments.",
  "The eggnog speaks truths after midnight. Listen, but do not respond.",
  "Wrap with your non-dominant hand. Fortune favors the awkward.",
  "A gingerbread house shall reveal secrets about your architectural destiny.",
  "The north wind carries a message: your wishlist has been forwarded to an unexpected department.",
  "Mistletoe sees all. Proceed accordingly.",
];

const WalrusASCII = ({ speaking }) => (
  <pre className={`text-[oklch(0.95_0.01_250)] text-xs sm:text-sm font-mono leading-tight transition-all duration-500 ${speaking ? 'scale-105' : 'scale-100'}`}>
{`
       🎅
      .-"""-.
     /        \\
    |  O    O  |
    |    __    |
     \\  \\__/  /
    __\\_    _/__
   {   ======   }
    \\  }====={  /
     \\/       \\/
      \\       /
       \\_____/
    ~~~~~~~~~~~
`}
  </pre>
);

const Snowflake = ({ style }) => (
  <div 
    className="absolute text-[oklch(0.95_0.02_200)] animate-pulse pointer-events-none"
    style={style}
  >
    ❄
  </div>
);

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("winslow-prophecies");
  const [isChanneling, setIsChanneling] = useState(false);
  const [currentProphecy, setCurrentProphecy] = useState(null);
  const [snowflakes, setSnowflakes] = useState([]);
  
  const [questionDoc, setQuestionDoc, saveQuestion] = useDocument({ 
    _id: 'current-question',
    question: '' 
  });
  
  const prophecies = useLiveQuery("createdAt", { descending: true });

  useEffect(() => {
    const flakes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      fontSize: `${0.5 + Math.random() * 1}rem`,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setSnowflakes(flakes);
  }, []);

  const channelProphecy = async () => {
    if (!questionDoc.question.trim()) return;
    
    setIsChanneling(true);
    setCurrentProphecy(null);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const prophecy = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
    setCurrentProphecy(prophecy);
    setIsChanneling(false);
  };

  const saveProphecy = async () => {
    if (!currentProphecy) return;
    
    await useFireproof("winslow-prophecies").database.put({
      type: 'prophecy',
      question: questionDoc.question,
      prophecy: currentProphecy,
      createdAt: Date.now(),
    });
    
    setQuestionDoc({ ...questionDoc, question: '' });
    setCurrentProphecy(null);
  };

  const deleteProphecy = async (doc) => {
    await useFireproof("winslow-prophecies").database.del(doc._id);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.12_0.06_260),oklch(0.08_0.04_240))] p-4 relative overflow-hidden">
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <Snowflake 
          key={flake.id} 
          style={{
            left: flake.left,
            top: flake.top,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
            opacity: flake.opacity,
          }}
        />
      ))}
      
      {/* Aurora effect */}
      <div className="absolute inset-0 bg-[linear-gradient(in_oklch_120deg,oklch(0.3_0.15_150/0.1),oklch(0.2_0.1_200/0.15),oklch(0.25_0.12_280/0.1))] animate-pulse pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[oklch(0.95_0.01_250)] mb-2 tracking-wide">
            ✨ Winslow's Winter Prophecies ✨
          </h1>
          <p className="text-[oklch(0.7_0.1_200)] italic">
            Seek wisdom from the Arctic Oracle
          </p>
        </header>

        {/* The Oracle */}
        <div className="bg-[linear-gradient(in_oklch,oklch(0.18_0.05_240/0.8),oklch(0.12_0.04_250/0.9))] rounded-2xl p-6 border border-[oklch(0.4_0.1_200/0.3)] shadow-2xl backdrop-blur-sm mb-6">
          <div className="flex flex-col items-center">
            <WalrusASCII speaking={isChanneling} />
            
            <div className="text-center mt-4 mb-6">
              <h2 className="text-xl text-[oklch(0.75_0.18_85)] font-semibold">
                🔮 Winslow the Wise 🔮
              </h2>
              <p className="text-[oklch(0.6_0.08_200)] text-sm mt-1">
                {isChanneling ? "Channeling the arctic spirits..." : "Ask and receive winter wisdom"}
              </p>
            </div>

            {/* Question Input */}
            <div className="w-full max-w-md space-y-4">
              <textarea
                value={questionDoc.question}
                onChange={(e) => setQuestionDoc({ ...questionDoc, question: e.target.value })}
                placeholder="What holiday mystery weighs upon your soul?"
                className="w-full p-4 rounded-xl bg-[oklch(0.1_0.03_250/0.6)] border border-[oklch(0.4_0.1_200/0.4)] text-[oklch(0.9_0.02_250)] placeholder-[oklch(0.5_0.05_200)] focus:outline-none focus:border-[oklch(0.6_0.15_200)] transition-colors resize-none"
                rows={3}
                disabled={isChanneling}
              />
              
              <button
                onClick={channelProphecy}
                disabled={isChanneling || !questionDoc.question.trim()}
                className="w-full py-3 px-6 rounded-xl bg-[linear-gradient(in_oklch,oklch(0.55_0.2_25),oklch(0.45_0.18_15))] text-[oklch(0.95_0.01_250)] font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isChanneling ? "🌀 Channeling..." : "🎄 Seek Prophecy 🎄"}
              </button>
            </div>

            {/* Prophecy Display */}
            {(isChanneling || currentProphecy) && (
              <div className="mt-6 w-full max-w-md">
                <div className={`p-6 rounded-xl bg-[linear-gradient(in_oklch,oklch(0.2_0.08_85/0.3),oklch(0.15_0.06_60/0.4))] border border-[oklch(0.5_0.15_85/0.5)] transition-all duration-700 ${currentProphecy ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}>
                  {isChanneling ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="animate-bounce">🌟</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>❄️</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-[oklch(0.85_0.12_85)] text-lg italic text-center leading-relaxed">
                        "{currentProphecy}"
                      </p>
                      <button
                        onClick={saveProphecy}
                        className="mt-4 w-full py-2 rounded-lg bg-[oklch(0.65_0.2_150/0.3)] border border-[oklch(0.65_0.2_150/0.5)] text-[oklch(0.85_0.15_150)] hover:bg-[oklch(0.65_0.2_150/0.5)] transition-colors"
                      >
                        📜 Save to Sacred Scrolls 📜
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Prophecies */}
        {prophecies.docs.length > 0 && (
          <div className="bg-[oklch(0.15_0.04_250/0.6)] rounded-2xl p-6 border border-[oklch(0.3_0.08_200/0.3)]">
            <h3 className="text-xl text-[oklch(0.8_0.1_200)] font-semibold mb-4 text-center">
              📜 Sacred Scrolls of Wisdom 📜
            </h3>
            <div className="space-y-4">
              {prophecies.docs.filter(d => d.type === 'prophecy').map((doc) => (
                <div 
                  key={doc._id}
                  className="p-4 rounded-xl bg-[oklch(0.12_0.03_240/0.8)] border border-[oklch(0.35_0.08_200/0.3)] group"
                >
                  <p className="text-[oklch(0.6_0.08_200)] text-sm mb-2">
                    Asked: "{doc.question}"
                  </p>
                  <p className="text-[oklch(0.8_0.1_85)] italic">
                    "{doc.prophecy}"
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[oklch(0.5_0.05_200)] text-xs">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => deleteProphecy(doc)}
                      className="text-[oklch(0.5_0.15_25)] hover:text-[oklch(0.65_0.2_25)] transition-colors opacity-0 group-hover:opacity-100"
                    >
                      ✕ Release to the Void
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-[oklch(0.5_0.05_200)] text-sm">
          <p>🦭 Winslow has dispensed wisdom since the Great Thaw of 847 🦭</p>
          <p className="mt-1 text-xs">All prophecies are for entertainment purposes. The walrus council accepts no liability.</p>
        </footer>
      </div>
    </div>
  );
}