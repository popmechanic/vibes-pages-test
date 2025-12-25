/*BUSINESS
name: Waldo's Wisdom Workshop
pitch: Get absurdist holiday wisdom from a mystical Arctic walrus oracle
customer: People seeking unconventional holiday cheer and shareable weird fortunes
revenue: Free with optional "Premium Prophecies" unlock for $2.99
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const wisdomParts = {
  openings: [
    "When the candy cane bends backward,",
    "If your stockings whisper secrets,",
    "As the tinsel dreams of summer,",
    "Should the eggnog achieve sentience,",
    "When Rudolf's nose flickers thrice,",
    "If the ornaments start humming,",
    "As the fruitcake gains wisdom,",
    "When snowflakes forget to fall,",
  ],
  middles: [
    "you must dance with invisible reindeer",
    "consider befriending a confused penguin",
    "your socks will reveal the truth",
    "the answer lies in yesterday's wrapping paper",
    "trust the judgment of festive cheese",
    "your reflection knows what gifts to give",
    "the jingle bells are merely suggestions",
    "embrace the chaos of tangled lights",
  ],
  endings: [
    "and prosperity shall rain like glitter.",
    "but only on alternate Tuesdays.",
    "until the yule log speaks otherwise.",
    "for that is the way of the Arctic.",
    "and the cookies will forgive you.",
    "as foretold by the ancient baubles.",
    "but remember: the snowman watches.",
    "and your mittens will thank you.",
  ],
};

function generateWisdom() {
  const opening = wisdomParts.openings[Math.floor(Math.random() * wisdomParts.openings.length)];
  const middle = wisdomParts.middles[Math.floor(Math.random() * wisdomParts.middles.length)];
  const ending = wisdomParts.endings[Math.floor(Math.random() * wisdomParts.endings.length)];
  return `${opening} ${middle} ${ending}`;
}

function WaldoWalrus({ speaking }) {
  return (
    <svg viewBox="0 0 200 200" className={`w-64 h-64 ${speaking ? 'animate-pulse' : ''}`}>
      {/* Aurora glow behind Waldo */}
      <defs>
        <radialGradient id="auroraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.7 0.2 180)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.25 0.15 290)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="santaHat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.5 0.2 25)" />
          <stop offset="100%" stopColor="oklch(0.4 0.25 15)" />
        </linearGradient>
        <linearGradient id="walrusBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.55 0.08 50)" />
          <stop offset="100%" stopColor="oklch(0.4 0.1 45)" />
        </linearGradient>
      </defs>
      
      {/* Glow effect */}
      <circle cx="100" cy="110" r="80" fill="url(#auroraGlow)" />
      
      {/* Walrus body */}
      <ellipse cx="100" cy="130" rx="55" ry="45" fill="url(#walrusBody)" />
      
      {/* Walrus face */}
      <ellipse cx="100" cy="100" rx="45" ry="40" fill="oklch(0.6 0.07 55)" />
      
      {/* Snout/nose area */}
      <ellipse cx="100" cy="115" rx="30" ry="20" fill="oklch(0.65 0.06 60)" />
      
      {/* Nostrils */}
      <ellipse cx="92" cy="110" rx="4" ry="3" fill="oklch(0.3 0.05 40)" />
      <ellipse cx="108" cy="110" rx="4" ry="3" fill="oklch(0.3 0.05 40)" />
      
      {/* Whisker dots */}
      {[85, 92, 99, 101, 108, 115].map((x, i) => (
        <circle key={i} cx={x} cy={118 + (i % 2) * 3} r="2" fill="oklch(0.4 0.05 50)" />
      ))}
      
      {/* Tusks */}
      <path d="M 85 125 Q 80 155 78 170" stroke="oklch(0.95 0.02 90)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 115 125 Q 120 155 122 170" stroke="oklch(0.95 0.02 90)" strokeWidth="8" strokeLinecap="round" fill="none" />
      
      {/* Eyes */}
      <ellipse cx="80" cy="85" rx="10" ry="12" fill="oklch(0.98 0 0)" />
      <ellipse cx="120" cy="85" rx="10" ry="12" fill="oklch(0.98 0 0)" />
      <circle cx="82" cy="85" r="5" fill="oklch(0.2 0.15 290)" />
      <circle cx="122" cy="85" r="5" fill="oklch(0.2 0.15 290)" />
      <circle cx="84" cy="83" r="2" fill="white" />
      <circle cx="124" cy="83" r="2" fill="white" />
      
      {/* Mystical third eye (wildcard element!) */}
      <circle cx="100" cy="70" r="6" fill="oklch(0.7 0.25 180)" opacity="0.8" className="animate-ping" style={{ animationDuration: '3s' }} />
      <circle cx="100" cy="70" r="4" fill="oklch(0.85 0.15 180)" />
      
      {/* Santa hat */}
      <path d="M 55 75 Q 100 20 145 75 L 140 85 Q 100 50 60 85 Z" fill="url(#santaHat)" />
      <ellipse cx="100" cy="82" rx="48" ry="8" fill="oklch(0.95 0.02 90)" />
      
      {/* Hat pompom */}
      <circle cx="145" cy="45" r="10" fill="oklch(0.95 0.02 90)" />
      
      {/* Hat curve to pompom */}
      <path d="M 130 55 Q 150 40 145 45" stroke="url(#santaHat)" strokeWidth="12" fill="none" strokeLinecap="round" />
      
      {/* Sparkles around Waldo */}
      {speaking && (
        <>
          <text x="40" y="50" fontSize="16" className="animate-bounce">✨</text>
          <text x="150" y="60" fontSize="14" className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</text>
          <text x="35" y="140" fontSize="12" className="animate-bounce" style={{ animationDelay: '0.4s' }}>❄️</text>
          <text x="160" y="150" fontSize="14" className="animate-bounce" style={{ animationDelay: '0.3s' }}>🌟</text>
        </>
      )}
    </svg>
  );
}

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

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("riff-db");
  const [speaking, setSpeaking] = useState(false);
  const [currentWisdom, setCurrentWisdom] = useState("");
  const [snowflakes, setSnowflakes] = useState([]);
  
  const wisdoms = useLiveQuery("type", { key: "wisdom" });
  
  const [newWisdom, setNewWisdom, saveWisdom] = useDocument({
    type: "wisdom",
    text: "",
    rating: 0,
    createdAt: null,
  });

  useEffect(() => {
    const flakes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 3}s`,
      fontSize: `${10 + Math.random() * 14}px`,
    }));
    setSnowflakes(flakes);
  }, []);

  const consultWaldo = async () => {
    setSpeaking(true);
    setCurrentWisdom("");
    
    await new Promise(r => setTimeout(r, 500));
    
    const wisdom = generateWisdom();
    setCurrentWisdom(wisdom);
    setNewWisdom({ ...newWisdom, text: wisdom, createdAt: Date.now(), _id: undefined });
    
    setTimeout(() => setSpeaking(false), 2000);
  };

  const saveCurrentWisdom = async () => {
    if (currentWisdom) {
      await saveWisdom({ ...newWisdom, text: currentWisdom, createdAt: Date.now() });
      setCurrentWisdom("");
    }
  };

  const deleteWisdom = async (doc) => {
    const { useDocument: useDoc } = useFireproof("riff-db");
  };

  const rateWisdom = async (doc, rating) => {
    const { database } = useFireproof("riff-db");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch_150deg,oklch(0.15_0.12_290),oklch(0.25_0.15_200),oklch(0.2_0.18_320))] p-4 overflow-hidden relative">
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        @keyframes glitch {
          0%, 100% { text-shadow: 2px 0 oklch(0.7 0.25 180), -2px 0 oklch(0.65 0.25 350); }
          50% { text-shadow: -2px 0 oklch(0.7 0.25 180), 2px 0 oklch(0.65 0.25 350); }
        }
        .glitch-text {
          animation: glitch 0.3s infinite;
        }
      `}</style>
      
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <Snowflake 
          key={flake.id} 
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
          }}
        />
      ))}
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[oklch(0.85_0.15_180)] mb-2 glitch-text">
            🔮 Waldo's Wisdom Workshop 🎄
          </h1>
          <p className="text-[oklch(0.7_0.1_320)] italic">
            Seek guidance from the mystical Arctic oracle
          </p>
        </div>
        
        {/* Waldo the Walrus */}
        <div className="flex flex-col items-center mb-8">
          <WaldoWalrus speaking={speaking} />
          
          <div className="mt-4 text-center">
            <p className="text-[oklch(0.6_0.08_50)] text-sm mb-2">
              ✦ Waldo the Whimsical Walrus ✦
            </p>
            <p className="text-[oklch(0.5_0.1_200)] text-xs italic">
              Keeper of Absurd Truths • Third Eye Certified
            </p>
          </div>
        </div>
        
        {/* Consult Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={consultWaldo}
            disabled={speaking}
            className="px-8 py-4 rounded-full bg-[linear-gradient(in_oklch_90deg,oklch(0.5_0.2_25),oklch(0.55_0.25_350))] text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[oklch(0.7_0.15_180)]"
          >
            {speaking ? "🌀 Channeling..." : "🔮 Seek Waldo's Wisdom"}
          </button>
        </div>
        
        {/* Current Wisdom Display */}
        {currentWisdom && (
          <div className="bg-[oklch(0.2_0.1_290)]/80 backdrop-blur rounded-2xl p-6 mb-8 border border-[oklch(0.5_0.2_180)] shadow-[0_0_30px_oklch(0.5_0.2_180)]">
            <p className="text-[oklch(0.9_0.1_180)] text-xl text-center italic leading-relaxed">
              "{currentWisdom}"
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={saveCurrentWisdom}
                className="px-4 py-2 rounded-lg bg-[oklch(0.4_0.15_140)] text-white hover:bg-[oklch(0.5_0.15_140)] transition-colors"
              >
                📜 Save to Scroll
              </button>
              <button
                onClick={consultWaldo}
                className="px-4 py-2 rounded-lg bg-[oklch(0.3_0.1_290)] text-[oklch(0.8_0.1_180)] hover:bg-[oklch(0.35_0.1_290)] transition-colors border border-[oklch(0.5_0.15_180)]"
              >
                🎲 Another!
              </button>
            </div>
          </div>
        )}
        
        {/* Saved Wisdoms */}
        {wisdoms.docs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[oklch(0.75_0.15_350)] mb-4 text-center">
              📜 Sacred Scroll of Saved Wisdoms 📜
            </h2>
            <div className="space-y-3">
              {wisdoms.docs.map((doc) => (
                <div 
                  key={doc._id}
                  className="bg-[oklch(0.18_0.08_250)]/70 backdrop-blur rounded-xl p-4 border border-[oklch(0.4_0.1_290)] hover:border-[oklch(0.6_0.15_180)] transition-colors group"
                >
                  <p className="text-[oklch(0.8_0.05_200)] italic">"{doc.text}"</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[oklch(0.5_0.1_180)] text-xs">
                      {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : "Ancient Times"}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star}
                          className={`cursor-pointer transition-all hover:scale-125 ${
                            star <= (doc.rating || 0) 
                              ? 'text-[oklch(0.8_0.2_90)]' 
                              : 'text-[oklch(0.4_0.05_250)]'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-12 text-[oklch(0.4_0.1_200)] text-sm">
          <p>🌊 From the depths of the Arctic wisdom pools 🌊</p>
          <p className="mt-1 text-xs opacity-60">Waldo has been dispensing wisdom since the Great Frost of '47</p>
        </div>
      </div>
    </div>
  );
}