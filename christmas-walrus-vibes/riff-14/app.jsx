/*BUSINESS
name: Blubbert's Holiday Oracle
pitch: Seek festive wisdom from Blubbert Kringle, the mystical Christmas walrus who sees all through the northern lights
customer: Anyone seeking whimsical holiday guidance and a dose of arctic magic
revenue: Free with optional "golden tusk" premium fortunes
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const FORTUNES = [
  "The candy cane you seek is already in your pocket. Look closer.",
  "A surprise gift approaches from the direction of the setting sun.",
  "Your holiday sweater holds powers you haven't yet discovered.",
  "The one who shares their cookies shall receive infinite warmth.",
  "Beware the elf who speaks in riddles... but heed their message.",
  "Your mittens have memories. Wear the blue ones tomorrow.",
  "A snowflake will whisper your true wish. Listen at midnight.",
  "The fruitcake is a metaphor. Accept it gracefully.",
  "Joy multiplies when divided. Share your laughter with three strangers.",
  "The North Star has noticed you. Good things are aligning.",
  "Your hot cocoa temperature reveals your emotional state. Add more marshmallows.",
  "A reindeer dreams of you tonight. This is significant.",
  "The ornament that falls but doesn't break brings seven years of wonder.",
  "You will find exactly $3.47 in unexpected places this week.",
  "The ghost of holidays past wants you to call your grandmother.",
  "Your gingerbread house predicts your future architecture career.",
];

const ADVICE = [
  "Embrace the chaos of tangled lights",
  "Dance like the nutcracker is watching",
  "Befriend a snowman today",
  "Your eggnog needs more nutmeg",
  "Sing carols to houseplants",
  "Trust the magic of ugly sweaters",
  "Nap like a hibernating walrus",
  "Compliment a stranger's socks",
];

function BlubbertWalrus({ isThinking, magicLevel }) {
  return (
    <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
      {/* Aurora glow behind walrus */}
      <defs>
        <radialGradient id="auroraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.6 0.2 160)" stopOpacity="0.4">
            <animate attributeName="stopOpacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="oklch(0.5 0.25 300)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="santaHat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.55 0.22 25)" />
          <stop offset="100%" stopColor="oklch(0.45 0.2 20)" />
        </linearGradient>
        <linearGradient id="walrusBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.5 0.08 50)" />
          <stop offset="100%" stopColor="oklch(0.4 0.06 45)" />
        </linearGradient>
      </defs>
      
      {/* Magic glow */}
      <circle cx="100" cy="110" r="80" fill="url(#auroraGlow)" />
      
      {/* Santa Hat */}
      <path d="M60 70 Q100 20 140 70 L130 75 Q100 35 70 75 Z" fill="url(#santaHat)" />
      <ellipse cx="100" cy="75" rx="45" ry="8" fill="oklch(0.95 0.02 220)" />
      <circle cx="145" cy="35" r="10" fill="oklch(0.95 0.02 220)">
        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Walrus head */}
      <ellipse cx="100" cy="120" rx="55" ry="45" fill="url(#walrusBody)" />
      
      {/* Cheeks/whisker area */}
      <ellipse cx="75" cy="135" rx="22" ry="18" fill="oklch(0.55 0.07 50)" />
      <ellipse cx="125" cy="135" rx="22" ry="18" fill="oklch(0.55 0.07 50)" />
      
      {/* Eyes */}
      <g className={isThinking ? "animate-pulse" : ""}>
        <ellipse cx="80" cy="110" rx="12" ry="14" fill="oklch(0.98 0.01 220)" />
        <ellipse cx="120" cy="110" rx="12" ry="14" fill="oklch(0.98 0.01 220)" />
        <circle cx="82" cy="108" r="6" fill="oklch(0.2 0.05 260)">
          {isThinking && <animate attributeName="cy" values="108;112;108" dur="1s" repeatCount="indefinite" />}
        </circle>
        <circle cx="122" cy="108" r="6" fill="oklch(0.2 0.05 260)">
          {isThinking && <animate attributeName="cy" values="108;112;108" dur="1s" repeatCount="indefinite" />}
        </circle>
        <circle cx="84" cy="106" r="2" fill="oklch(0.95 0.02 220)" />
        <circle cx="124" cy="106" r="2" fill="oklch(0.95 0.02 220)" />
      </g>
      
      {/* Nose */}
      <ellipse cx="100" cy="128" rx="8" ry="6" fill="oklch(0.35 0.08 30)" />
      
      {/* Whisker dots */}
      {[65, 75, 85, 115, 125, 135].map((x, i) => (
        <circle key={i} cx={x} cy={138 + (i % 3) * 4} r="3" fill="oklch(0.4 0.05 40)" />
      ))}
      
      {/* Magnificent tusks */}
      <path d="M80 145 Q75 175 78 190" stroke="oklch(0.92 0.03 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M120 145 Q125 175 122 190" stroke="oklch(0.92 0.03 80)" strokeWidth="8" fill="none" strokeLinecap="round" />
      
      {/* Magic sparkles when high magic level */}
      {magicLevel > 3 && [
        { x: 45, y: 90, delay: 0 },
        { x: 155, y: 95, delay: 0.5 },
        { x: 50, y: 150, delay: 1 },
        { x: 150, y: 145, delay: 1.5 },
      ].map((spark, i) => (
        <g key={i}>
          <circle cx={spark.x} cy={spark.y} r="3" fill="oklch(0.85 0.15 80)">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${spark.delay}s`} repeatCount="indefinite" />
            <animate attributeName="r" values="2;4;2" dur="2s" begin={`${spark.delay}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function Snowflake({ style }) {
  return (
    <div className="absolute text-[oklch(0.95_0.03_220)] opacity-60 pointer-events-none animate-bounce" style={style}>
      ❄
    </div>
  );
}

function MagicStars({ count }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-2xl transition-all duration-300 ${
            i < count ? "text-[oklch(0.8_0.15_80)] scale-110" : "text-[oklch(0.3_0.05_260)] scale-100"
          }`}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("blubbert-oracle");
  const [isThinking, setIsThinking] = useState(false);
  const [currentFortune, setCurrentFortune] = useState(null);
  const [snowflakes, setSnowflakes] = useState([]);
  
  const savedFortunes = useLiveQuery("type", { key: "fortune" });
  const [newQuestion, setNewQuestion, saveQuestion] = useDocument({ type: "question", text: "" });

  useEffect(() => {
    const flakes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      fontSize: `${12 + Math.random() * 16}px`,
    }));
    setSnowflakes(flakes);
  }, []);

  const consultOracle = async () => {
    if (!newQuestion.text.trim()) return;
    
    setIsThinking(true);
    setCurrentFortune(null);
    
    // Mystical contemplation time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));
    
    const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    const advice = ADVICE[Math.floor(Math.random() * ADVICE.length)];
    const magicLevel = Math.floor(Math.random() * 5) + 1;
    
    const result = {
      type: "fortune",
      question: newQuestion.text,
      fortune,
      advice,
      magicLevel,
      timestamp: Date.now(),
    };
    
    setCurrentFortune(result);
    setIsThinking(false);
    setNewQuestion({ type: "question", text: "" });
  };

  const saveFortune = async () => {
    if (!currentFortune) return;
    const { useLiveQuery: _, useDocument: __, ...fortuneData } = currentFortune;
    await saveQuestion({ ...fortuneData, saved: true });
    setCurrentFortune(null);
  };

  const deleteFortune = async (fortune) => {
    const { database } = useFireproof("blubbert-oracle");
    // We'd need access to the database directly - for now we'll just filter
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.12_0.08_270),oklch(0.08_0.05_240))] p-4 relative overflow-hidden">
      {/* Floating snowflakes */}
      {snowflakes.map(flake => (
        <Snowflake
          key={flake.id}
          style={{
            left: flake.left,
            top: "-20px",
            fontSize: flake.fontSize,
            animation: `fall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
      
      {/* Aurora effect at top */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-[linear-gradient(in_oklch_90deg,oklch(0.4_0.15_160)_0%,oklch(0.35_0.2_300)_50%,oklch(0.4_0.15_160)_100%)] opacity-30 blur-3xl" />
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>
      
      <div className="max-w-lg mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[oklch(0.92_0.03_220)] mb-1 tracking-wide">
            ✧ BLUBBERT'S ✧
          </h1>
          <h2 className="text-xl text-[oklch(0.7_0.12_160)] font-light">
            Holiday Oracle
          </h2>
          <p className="text-sm text-[oklch(0.6_0.08_260)] mt-2 italic">
            "From the frozen depths, wisdom rises..."
          </p>
        </div>
        
        {/* The Great Blubbert */}
        <div className="relative">
          <BlubbertWalrus 
            isThinking={isThinking} 
            magicLevel={currentFortune?.magicLevel || 0}
          />
          {isThinking && (
            <p className="text-center text-[oklch(0.7_0.15_300)] animate-pulse mt-2">
              ✨ Blubbert gazes into the northern lights... ✨
            </p>
          )}
        </div>
        
        {/* Question Input */}
        <div className="bg-[oklch(0.18_0.05_260)] rounded-2xl p-4 mb-6 border border-[oklch(0.3_0.1_260)]">
          <label className="block text-[oklch(0.8_0.05_220)] text-sm mb-2">
            Whisper your holiday question to Blubbert...
          </label>
          <textarea
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            placeholder="What does my holiday season hold?"
            className="w-full bg-[oklch(0.12_0.04_260)] text-[oklch(0.9_0.02_220)] placeholder-[oklch(0.5_0.05_260)] rounded-xl p-3 border border-[oklch(0.25_0.08_260)] focus:border-[oklch(0.5_0.15_160)] focus:outline-none resize-none"
            rows={2}
            disabled={isThinking}
          />
          <button
            onClick={consultOracle}
            disabled={isThinking || !newQuestion.text.trim()}
            className="w-full mt-3 py-3 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-[linear-gradient(in_oklch_90deg,oklch(0.5_0.18_160),oklch(0.45_0.2_200))] text-[oklch(0.95_0.02_220)] hover:brightness-110 active:scale-98"
          >
            {isThinking ? "🔮 Consulting the Aurora..." : "✦ Seek Wisdom ✦"}
          </button>
        </div>
        
        {/* Current Fortune */}
        {currentFortune && (
          <div className="bg-[linear-gradient(in_oklch,oklch(0.22_0.08_280),oklch(0.18_0.06_260))] rounded-2xl p-5 mb-6 border border-[oklch(0.4_0.15_300)] animate-fadeIn">
            <MagicStars count={currentFortune.magicLevel} />
            <p className="text-[oklch(0.5_0.1_160)] text-xs mt-3 mb-1 uppercase tracking-wider">
              You asked:
            </p>
            <p className="text-[oklch(0.75_0.05_220)] italic mb-4">
              "{currentFortune.question}"
            </p>
            <p className="text-[oklch(0.5_0.1_80)] text-xs uppercase tracking-wider">
              Blubbert reveals:
            </p>
            <p className="text-[oklch(0.92_0.03_220)] text-lg my-3 leading-relaxed">
              {currentFortune.fortune}
            </p>
            <p className="text-[oklch(0.65_0.12_160)] text-sm italic mt-4 border-t border-[oklch(0.3_0.1_260)] pt-3">
              💫 Advice: {currentFortune.advice}
            </p>
            <button
              onClick={saveFortune}
              className="w-full mt-4 py-2 rounded-lg bg-[oklch(0.3_0.1_80)] text-[oklch(0.9_0.05_80)] hover:bg-[oklch(0.35_0.12_80)] transition-colors"
            >
              ⭐ Save This Wisdom
            </button>
          </div>
        )}
        
        {/* Saved Fortunes */}
        {savedFortunes.docs.length > 0 && (
          <div className="mt-8">
            <h3 className="text-[oklch(0.75_0.1_160)] text-lg mb-4 flex items-center gap-2">
              <span>📜</span> Your Collected Wisdoms
            </h3>
            <div className="space-y-3">
              {savedFortunes.docs.map((fortune, i) => (
                <div
                  key={fortune._id}
                  className="bg-[oklch(0.15_0.04_260)] rounded-xl p-4 border border-[oklch(0.25_0.06_260)]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <MagicStars count={fortune.magicLevel} />
                    <span className="text-xs text-[oklch(0.5_0.05_260)]">
                      {new Date(fortune.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[oklch(0.85_0.03_220)] text-sm">
                    {fortune.fortune}
                  </p>
                  <p className="text-[oklch(0.6_0.1_160)] text-xs mt-2 italic">
                    ✨ {fortune.advice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-10 pb-6">
          <p className="text-[oklch(0.45_0.08_260)] text-xs">
            🦭 Blubbert Kringle has been dispensing arctic wisdom since the last ice age 🦭
          </p>
        </div>
      </div>
    </div>
  );
}