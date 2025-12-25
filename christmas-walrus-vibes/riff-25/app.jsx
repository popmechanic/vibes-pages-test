/*BUSINESS
name: Björk's Existential Christmas Haikus
pitch: A philosophical walrus channels holiday wisdom through unconventional haikus
customer: Adults who enjoy absurdist humor and contemplative holiday moments
revenue: Free with optional "Feed Björk" donations for extra haiku inspiration
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const haikuStarters = [
  { line1: "Snow falls on my tusks", line2: "Santa forgot my address", line3: "Fish are eternal" },
  { line1: "Jingle bells echo", line2: "In the void of arctic night", line3: "I am the darkness" },
  { line1: "Wrapped gifts mock my flippers", line2: "How does one tie a ribbon", line3: "When one is walrus" },
  { line1: "Christmas tree so tall", line2: "I cannot reach the star top", line3: "Neither can my dreams" },
  { line1: "Hot cocoa steams up", line2: "My whiskers drip with longing", line3: "For sardine eggnog" },
  { line1: "Reindeer fly above", line2: "I sink beneath the cold waves", line3: "We are not the same" },
  { line1: "Mistletoe hangs there", line2: "No one kisses a walrus", line3: "Except the moonlight" },
  { line1: "Stockings by the fire", line2: "Mine would need custom tailors", line3: "Flippers are unique" },
  { line1: "Silent night they sing", line2: "But have you heard ice cracking", line3: "That is my music" },
  { line1: "Gingerbread houses", line2: "Cannot withstand my hunger", line3: "Nor my ennui" },
];

const bjorkWisdom = [
  "The fish you save today feeds the soul tomorrow.",
  "In the arctic, every moment is both midnight and noon.",
  "A walrus without wonder is just a very wet dog.",
  "Christmas is not about gifts. It is about the spaces between the ice.",
  "My tusks have seen a thousand moons. Each one asked the same question.",
  "To be a walrus is to know the weight of existence... and blubber.",
];

function BjorkSVG({ mood }) {
  const eyeStyle = mood === "thinking" ? "animate-pulse" : "";
  const hatTilt = mood === "happy" ? -5 : mood === "thinking" ? 5 : 0;
  
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto drop-shadow-[0_0_15px_oklch(0.5_0.15_195)]">
      {/* Aurora glow behind */}
      <defs>
        <radialGradient id="auroraGlow">
          <stop offset="0%" stopColor="oklch(0.5 0.18 145)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.25 0.08 240)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.55 0.22 25)" />
          <stop offset="100%" stopColor="oklch(0.4 0.18 25)" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#auroraGlow)" />
      
      {/* Walrus body */}
      <ellipse cx="100" cy="130" rx="60" ry="50" fill="oklch(0.45 0.05 50)" />
      
      {/* Walrus face */}
      <ellipse cx="100" cy="100" rx="50" ry="45" fill="oklch(0.5 0.06 55)" />
      
      {/* Snout/whisker area */}
      <ellipse cx="100" cy="115" rx="35" ry="25" fill="oklch(0.55 0.05 60)" />
      
      {/* Nose */}
      <ellipse cx="100" cy="105" rx="12" ry="8" fill="oklch(0.5 0.12 350)" />
      
      {/* Whisker dots */}
      {[[-20, 115], [-12, 120], [-18, 125], [20, 115], [12, 120], [18, 125]].map(([x, y], i) => (
        <circle key={i} cx={100 + x} cy={y} r="3" fill="oklch(0.35 0.04 50)" />
      ))}
      
      {/* Eyes */}
      <g className={eyeStyle}>
        <circle cx="80" cy="85" r="8" fill="oklch(0.15 0.02 240)" />
        <circle cx="120" cy="85" r="8" fill="oklch(0.15 0.02 240)" />
        <circle cx="82" cy="83" r="3" fill="oklch(0.95 0.02 90)" />
        <circle cx="122" cy="83" r="3" fill="oklch(0.95 0.02 90)" />
      </g>
      
      {/* Tusks */}
      <path d="M 75 125 Q 70 160, 72 175" stroke="oklch(0.92 0.03 85)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 125 125 Q 130 160, 128 175" stroke="oklch(0.92 0.03 85)" strokeWidth="8" fill="none" strokeLinecap="round" />
      
      {/* Santa hat */}
      <g transform={`rotate(${hatTilt} 100 60)`}>
        <path d="M 55 70 Q 100 20, 145 70 L 140 80 Q 100 55, 60 80 Z" fill="url(#hatGradient)" />
        <path d="M 140 65 Q 160 40, 155 25" stroke="oklch(0.55 0.2 25)" strokeWidth="12" fill="none" strokeLinecap="round" />
        <circle cx="155" cy="22" r="10" fill="oklch(0.95 0.02 90)" />
        <ellipse cx="100" cy="78" rx="48" ry="8" fill="oklch(0.95 0.02 90)" />
      </g>
      
      {/* Blush marks when happy */}
      {mood === "happy" && (
        <>
          <ellipse cx="65" cy="100" rx="8" ry="5" fill="oklch(0.65 0.1 350)" opacity="0.5" />
          <ellipse cx="135" cy="100" rx="8" ry="5" fill="oklch(0.65 0.1 350)" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

function Snowflakes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white/30 animate-[fall_linear_infinite]"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${10 + Math.random() * 15}px`,
          }}
        >
          ❄
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function FishRating({ rating, onRate }) {
  return (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((fish) => (
        <button
          key={fish}
          onClick={() => onRate(fish)}
          className={`text-2xl transition-all hover:scale-125 ${
            fish <= rating ? "opacity-100" : "opacity-30"
          }`}
        >
          🐟
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("bjork-haikus");
  const [mood, setMood] = useState("neutral");
  const [wisdom, setWisdom] = useState("");
  const [isChanneling, setIsChanneling] = useState(false);
  
  const savedHaikus = useLiveQuery("type", { key: "haiku" });
  
  const [currentHaiku, setCurrentHaiku, saveHaiku] = useDocument({
    _id: `haiku-draft-${Date.now()}`,
    type: "haiku",
    line1: "",
    line2: "",
    line3: "",
    rating: 0,
    savedAt: null,
  });
  
  const channelHaiku = () => {
    setIsChanneling(true);
    setMood("thinking");
    
    setTimeout(() => {
      const randomHaiku = haikuStarters[Math.floor(Math.random() * haikuStarters.length)];
      setCurrentHaiku({
        ...currentHaiku,
        _id: `haiku-${Date.now()}`,
        line1: randomHaiku.line1,
        line2: randomHaiku.line2,
        line3: randomHaiku.line3,
        rating: 0,
        savedAt: null,
      });
      setMood("happy");
      setWisdom(bjorkWisdom[Math.floor(Math.random() * bjorkWisdom.length)]);
      setIsChanneling(false);
    }, 2000);
  };
  
  const handleSave = async () => {
    if (currentHaiku.line1) {
      await saveHaiku({
        ...currentHaiku,
        savedAt: new Date().toISOString(),
      });
      setMood("happy");
      // Reset for new haiku
      setCurrentHaiku({
        _id: `haiku-draft-${Date.now()}`,
        type: "haiku",
        line1: "",
        line2: "",
        line3: "",
        rating: 0,
        savedAt: null,
      });
    }
  };
  
  const handleRate = (rating) => {
    setCurrentHaiku({ ...currentHaiku, rating });
    if (rating >= 4) setMood("happy");
  };
  
  const deleteHaiku = async (haiku) => {
    const { database } = useFireproof("bjork-haikus");
    await database.del(haiku._id);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.15_0.06_260),oklch(0.2_0.08_200),oklch(0.18_0.1_280))] p-4 relative overflow-hidden">
      <Snowflakes />
      
      {/* Aurora effect */}
      <div className="fixed top-0 left-0 right-0 h-64 bg-[linear-gradient(in_oklch,oklch(0.3_0.15_145)_0%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[oklch(0.95_0.02_90)] mb-2 drop-shadow-[0_0_10px_oklch(0.5_0.15_195)]">
            ✨ Björk's Existential Christmas Haikus ✨
          </h1>
          <p className="text-[oklch(0.7_0.1_195)] italic">
            "I am but a walrus, pondering the infinite fish..." — Björk
          </p>
        </header>
        
        {/* Björk the Walrus */}
        <div className="mb-8">
          <BjorkSVG mood={mood} />
          <p className="text-center text-[oklch(0.8_0.08_195)] mt-4 font-serif italic text-lg min-h-[3rem]">
            {isChanneling ? "✨ Channeling the arctic muse... ✨" : wisdom || "Click below to receive wisdom..."}
          </p>
        </div>
        
        {/* Haiku Display/Generator */}
        <div className="bg-[oklch(0.2_0.04_240)] border border-[oklch(0.4_0.1_195)] rounded-xl p-6 mb-8 shadow-[0_0_30px_oklch(0.3_0.1_195)]">
          <div className="text-center space-y-3 mb-6 font-mono">
            {currentHaiku.line1 ? (
              <>
                <p className="text-[oklch(0.9_0.05_90)] text-xl">{currentHaiku.line1}</p>
                <p className="text-[oklch(0.85_0.08_145)] text-xl">{currentHaiku.line2}</p>
                <p className="text-[oklch(0.9_0.05_90)] text-xl">{currentHaiku.line3}</p>
              </>
            ) : (
              <p className="text-[oklch(0.5_0.05_195)] text-lg py-8">
                The haiku awaits in the frozen depths...
              </p>
            )}
          </div>
          
          {currentHaiku.line1 && (
            <div className="mb-4">
              <p className="text-center text-[oklch(0.6_0.05_195)] text-sm mb-2">Rate with fish:</p>
              <FishRating rating={currentHaiku.rating} onRate={handleRate} />
            </div>
          )}
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={channelHaiku}
              disabled={isChanneling}
              className="px-6 py-3 bg-[linear-gradient(in_oklch,oklch(0.5_0.15_195),oklch(0.4_0.12_220))] text-[oklch(0.95_0.02_90)] rounded-lg font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_oklch(0.4_0.1_195)]"
            >
              {isChanneling ? "🌀 Channeling..." : "🔮 Channel Haiku"}
            </button>
            
            {currentHaiku.line1 && (
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[linear-gradient(in_oklch,oklch(0.55_0.18_25),oklch(0.45_0.15_30))] text-[oklch(0.95_0.02_90)] rounded-lg font-bold hover:scale-105 transition-all shadow-[0_0_15px_oklch(0.4_0.15_25)]"
              >
                📜 Save to Ice Journal
              </button>
            )}
          </div>
        </div>
        
        {/* Saved Haikus */}
        {savedHaikus.docs.length > 0 && (
          <div className="bg-[oklch(0.18_0.03_250)] border border-[oklch(0.35_0.08_195)] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[oklch(0.85_0.1_145)] mb-4 text-center">
              📖 The Ice Journal
            </h2>
            <div className="space-y-4">
              {savedHaikus.docs.filter(h => h.savedAt).map((haiku) => (
                <div
                  key={haiku._id}
                  className="bg-[oklch(0.22_0.04_240)] p-4 rounded-lg border border-[oklch(0.3_0.06_195)] hover:border-[oklch(0.5_0.1_195)] transition-colors"
                >
                  <div className="font-mono text-center space-y-1 mb-2">
                    <p className="text-[oklch(0.85_0.04_90)]">{haiku.line1}</p>
                    <p className="text-[oklch(0.8_0.06_145)]">{haiku.line2}</p>
                    <p className="text-[oklch(0.85_0.04_90)]">{haiku.line3}</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-0.5">
                      {[...Array(haiku.rating || 0)].map((_, i) => (
                        <span key={i} className="text-sm">🐟</span>
                      ))}
                    </div>
                    <span className="text-[oklch(0.5_0.05_195)] text-xs">
                      {haiku.savedAt && new Date(haiku.savedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="text-center mt-8 text-[oklch(0.5_0.05_195)] text-sm">
          <p>🦭 Björk the Blustery wishes you existential peace this holiday season 🦭</p>
        </footer>
      </div>
    </div>
  );
}