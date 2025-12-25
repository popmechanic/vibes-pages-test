/*BUSINESS
name: Wadsworth's Festive Compliment Dispensary
pitch: Feed a distinguished walrus fish and receive elaborate holiday compliments in return
customer: Anyone seeking absurd holiday joy and validation from a monocled walrus
revenue: Freemium with premium fish varieties and exclusive compliment categories
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const COMPLIMENTS = [
  "My dear friend, your magnificence rivals the northern lights themselves!",
  "By my glorious tusks, you possess the warmth of a thousand yule logs!",
  "Your kindness, dear soul, could melt even the coldest arctic ice!",
  "Splendid human! You shine brighter than Rudolph's noble nose!",
  "I declare, your generosity would make Santa himself weep with joy!",
  "Extraordinary! Your spirit sparkles like fresh-fallen snow at dawn!",
  "My whiskers tingle with delight at your remarkable presence!",
  "You, magnificent creature, are the sugar plum of humanity's dreams!",
  "By the great glaciers! Your heart is as vast as the Arctic Ocean!",
  "Stupendous! You radiate more cheer than my finest holiday sardine!",
];

const ELABORATE_COMPLIMENTS = [
  "Hear me, treasured benefactor! In my 847 years upon these frozen shores, never have I encountered a soul so resplendently festive. The elves speak of you in hushed, reverent tones!",
  "Most distinguished guest! Your benevolence has moved me to compose a sonnet in your honor. Ahem: 'O radiant one, with fish so fine / Your holiday spirit outshines mine!'",
  "By the sacred blubber of my ancestors! You have achieved what philosophers only dream of - perfect holiday magnificence!",
];

function Snowflake({ style }) {
  return (
    <div 
      className="absolute text-white opacity-60 animate-pulse pointer-events-none"
      style={style}
    >
      ❄
    </div>
  );
}

function WalrusSVG({ isHappy, fishCount }) {
  const bounce = isHappy ? "animate-bounce" : "";
  const blush = fishCount > 5 ? "opacity-100" : "opacity-0";
  
  return (
    <div className={`relative ${bounce} transition-all duration-300`}>
      <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto drop-shadow-2xl">
        {/* Body */}
        <ellipse cx="100" cy="130" rx="70" ry="50" fill="oklch(0.5 0.08 30)" />
        
        {/* Head */}
        <circle cx="100" cy="80" r="50" fill="oklch(0.55 0.08 35)" />
        
        {/* Cheek blush */}
        <circle cx="65" cy="90" r="12" fill="oklch(0.7 0.15 15)" className={`transition-opacity duration-500 ${blush}`} />
        <circle cx="135" cy="90" r="12" fill="oklch(0.7 0.15 15)" className={`transition-opacity duration-500 ${blush}`} />
        
        {/* Snout/muzzle bump */}
        <ellipse cx="100" cy="100" rx="30" ry="20" fill="oklch(0.6 0.07 35)" />
        
        {/* Whisker dots */}
        {[70, 80, 90, 110, 120, 130].map((x, i) => (
          <circle key={i} cx={x} cy={105} r="3" fill="oklch(0.3 0.05 30)" />
        ))}
        
        {/* Tusks */}
        <path d="M 80 105 Q 75 140 70 160" stroke="oklch(0.95 0.02 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 120 105 Q 125 140 130 160" stroke="oklch(0.95 0.02 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
        
        {/* Eyes */}
        <circle cx="75" cy="70" r="10" fill="white" />
        <circle cx="125" cy="70" r="10" fill="white" />
        <circle cx="77" cy="70" r="5" fill="oklch(0.2 0.05 250)" />
        <circle cx="127" cy="70" r="5" fill="oklch(0.2 0.05 250)" />
        <circle cx="79" cy="68" r="2" fill="white" />
        <circle cx="129" cy="68" r="2" fill="white" />
        
        {/* Monocle */}
        <circle cx="125" cy="70" r="14" stroke="oklch(0.75 0.12 85)" strokeWidth="2" fill="none" />
        <line x1="139" y1="70" x2="150" y2="85" stroke="oklch(0.75 0.12 85)" strokeWidth="1" />
        
        {/* Santa Hat */}
        <path d="M 55 50 Q 100 -10 145 50 L 100 35 Z" fill="oklch(0.5 0.22 25)" />
        <ellipse cx="100" cy="50" rx="50" ry="10" fill="oklch(0.95 0.02 240)" />
        <circle cx="145" cy="30" r="10" fill="oklch(0.95 0.02 240)" />
        
        {/* Flippers */}
        <ellipse cx="40" cy="140" rx="20" ry="12" fill="oklch(0.45 0.08 30)" transform="rotate(-20 40 140)" />
        <ellipse cx="160" cy="140" rx="20" ry="12" fill="oklch(0.45 0.08 30)" transform="rotate(20 160 140)" />
        
        {/* Nose */}
        <ellipse cx="100" cy="95" rx="8" ry="6" fill="oklch(0.25 0.08 20)" />
        
        {/* Mouth - happy or neutral */}
        {isHappy ? (
          <path d="M 85 115 Q 100 130 115 115" stroke="oklch(0.25 0.05 20)" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <line x1="90" y1="115" x2="110" y2="115" stroke="oklch(0.25 0.05 20)" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
      
      {/* Name plate */}
      <div className="text-center mt-2">
        <div className="inline-block bg-[oklch(0.25_0.08_85)] px-4 py-1 rounded-lg border-2 border-[oklch(0.7_0.15_85)]">
          <span className="text-[oklch(0.9_0.1_85)] font-serif text-sm italic">
            Wadsworth P. Tuskington III
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("walrus-dispensary");
  
  const [stats, setStats, saveStats] = useDocument({ _id: "walrus-stats", fishFed: 0, type: "stats" });
  const complimentsQuery = useLiveQuery("type", { key: "compliment" });
  
  const [isHappy, setIsHappy] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState("");
  const [showCompliment, setShowCompliment] = useState(false);
  const [snowflakes] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  );
  
  const fishFed = stats?.fishFed || 0;
  const totalCompliments = complimentsQuery?.docs?.length || 0;
  
  const feedFish = async () => {
    const newCount = fishFed + 1;
    setStats({ ...stats, fishFed: newCount });
    await saveStats({ ...stats, fishFed: newCount });
    
    setIsHappy(true);
    
    // Select compliment based on fish count
    let compliment;
    if (newCount % 10 === 0) {
      compliment = ELABORATE_COMPLIMENTS[Math.floor(Math.random() * ELABORATE_COMPLIMENTS.length)];
    } else {
      compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    }
    
    setCurrentCompliment(compliment);
    setShowCompliment(true);
    
    // Save compliment to history
    const { database } = useFireproof("walrus-dispensary");
    await database?.put({
      type: "compliment",
      text: compliment,
      timestamp: Date.now(),
    });
    
    setTimeout(() => {
      setIsHappy(false);
      setShowCompliment(false);
    }, 4000);
  };
  
  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.15_0.12_280),oklch(0.2_0.1_220),oklch(0.25_0.08_195))] p-4 overflow-hidden relative">
      {/* Aurora effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-64 bg-[oklch(0.5_0.2_160)] opacity-20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute top-10 right-1/4 w-80 h-48 bg-[oklch(0.6_0.25_280)] opacity-20 blur-3xl rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-5 left-1/2 w-72 h-56 bg-[oklch(0.55_0.2_120)] opacity-15 blur-3xl rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <Snowflake 
          key={flake.id}
          style={{
            left: `${flake.left}%`,
            top: `${flake.top}%`,
            fontSize: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
      
      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-[oklch(0.9_0.1_85)] drop-shadow-lg">
          ✨ Wadsworth's Festive Compliment Dispensary ✨
        </h1>
        <p className="text-[oklch(0.8_0.05_195)] mt-2 font-serif italic">
          "Where Distinguished Walruses Dispense Holiday Wisdom"
        </p>
      </div>
      
      {/* Stats */}
      <div className="relative z-10 flex justify-center gap-6 mb-6">
        <div className="bg-[oklch(0.2_0.08_220)] backdrop-blur-sm px-4 py-2 rounded-lg border border-[oklch(0.4_0.1_195)]">
          <span className="text-[oklch(0.7_0.1_195)]">🐟 Fish Fed:</span>
          <span className="text-[oklch(0.9_0.15_85)] ml-2 font-bold">{fishFed}</span>
        </div>
        <div className="bg-[oklch(0.2_0.08_220)] backdrop-blur-sm px-4 py-2 rounded-lg border border-[oklch(0.4_0.1_195)]">
          <span className="text-[oklch(0.7_0.1_195)]">💬 Compliments:</span>
          <span className="text-[oklch(0.9_0.15_85)] ml-2 font-bold">{totalCompliments}</span>
        </div>
      </div>
      
      {/* Walrus */}
      <div className="relative z-10">
        <WalrusSVG isHappy={isHappy} fishCount={fishFed} />
      </div>
      
      {/* Compliment bubble */}
      {showCompliment && (
        <div className="relative z-20 max-w-md mx-auto mt-4 animate-fade-in">
          <div className="bg-[oklch(0.95_0.02_240)] p-4 rounded-2xl shadow-xl border-2 border-[oklch(0.7_0.15_85)] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[oklch(0.95_0.02_240)]" />
            <p className="text-[oklch(0.25_0.05_250)] font-serif text-center italic">
              "{currentCompliment}"
            </p>
            <p className="text-[oklch(0.5_0.05_250)] text-xs text-right mt-2">
              — W.P.T. III
            </p>
          </div>
        </div>
      )}
      
      {/* Feed button */}
      <div className="relative z-10 text-center mt-8">
        <button
          onClick={feedFish}
          disabled={isHappy}
          className={`
            px-8 py-4 rounded-full font-serif text-xl
            bg-[linear-gradient(in_oklch,oklch(0.55_0.22_25),oklch(0.45_0.2_15))]
            text-[oklch(0.95_0.02_80)] 
            border-2 border-[oklch(0.7_0.15_85)]
            shadow-lg hover:shadow-xl
            transform hover:scale-105 active:scale-95
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isHappy ? "" : "hover:bg-[linear-gradient(in_oklch,oklch(0.6_0.22_25),oklch(0.5_0.2_15))]"}
          `}
        >
          🐟 Feed Wadsworth a Fish 🐟
        </button>
        <p className="text-[oklch(0.6_0.08_195)] text-sm mt-3 font-serif italic">
          (Every 10th fish yields an especially elaborate compliment!)
        </p>
      </div>
      
      {/* Recent compliments */}
      {totalCompliments > 0 && (
        <div className="relative z-10 max-w-lg mx-auto mt-10">
          <h2 className="text-[oklch(0.85_0.1_85)] font-serif text-xl text-center mb-4">
            📜 Recent Dispensations 📜
          </h2>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {complimentsQuery.docs.slice(-5).reverse().map((doc, i) => (
              <div 
                key={doc._id}
                className="bg-[oklch(0.15_0.06_250)] backdrop-blur-sm p-3 rounded-lg border border-[oklch(0.3_0.08_250)]"
              >
                <p className="text-[oklch(0.8_0.05_195)] text-sm font-serif italic">
                  "{doc.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="relative z-10 text-center mt-10 text-[oklch(0.5_0.05_250)] text-xs">
        <p>🎄 Merry Christmas from the Arctic! 🎄</p>
        <p className="mt-1">Est. 1847 • "Dignified Compliments for Discerning Humans"</p>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}