/*BUSINESS
name: Sir Blubbert's Arctic Weather Theatre
pitch: A theatrical walrus delivers dramatically absurd North Pole weather reports based on your festive sightings
customer: People who love quirky holiday humor and want a laugh during the Christmas season
revenue: Free with optional tip jar for Sir Blubbert's fish fund
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const WALRUS_RESPONSES = [
  "Ah yes, I foresaw this in the ancient ice crystals!",
  "*adjusts monocle* Most intriguing meteorological development!",
  "By my magnificent tusks! This changes EVERYTHING!",
  "The sardines predicted this, but nobody listens to sardines!",
  "*strokes whiskers thoughtfully* Fascinating, simply fascinating.",
  "I shall consult the Council of Arctic Elders about this!",
  "This reminds me of the Great Blizzard of '47... I was but a pup...",
  "*dramatic gasp* The prophecy is coming true!",
];

function WalrusSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto drop-shadow-2xl">
      {/* Body */}
      <ellipse cx="100" cy="130" rx="60" ry="50" fill="oklch(0.55 0.08 50)" />
      
      {/* Head */}
      <ellipse cx="100" cy="75" rx="50" ry="40" fill="oklch(0.6 0.08 50)" />
      
      {/* Cheeks/Muzzle */}
      <ellipse cx="100" cy="90" rx="35" ry="25" fill="oklch(0.7 0.06 50)" />
      
      {/* Eyes */}
      <ellipse cx="80" cy="65" rx="12" ry="14" fill="white" />
      <ellipse cx="120" cy="65" rx="12" ry="14" fill="white" />
      <circle cx="82" cy="67" r="6" fill="oklch(0.25 0.1 250)" />
      <circle cx="122" cy="67" r="6" fill="oklch(0.25 0.1 250)" />
      <circle cx="84" cy="65" r="2" fill="white" />
      <circle cx="124" cy="65" r="2" fill="white" />
      
      {/* Eyebrows - expressive! */}
      <path d="M68 52 Q80 48 92 54" stroke="oklch(0.35 0.05 50)" strokeWidth="3" fill="none" />
      <path d="M108 54 Q120 48 132 52" stroke="oklch(0.35 0.05 50)" strokeWidth="3" fill="none" />
      
      {/* Nose */}
      <ellipse cx="100" cy="82" rx="8" ry="6" fill="oklch(0.3 0.08 20)" />
      
      {/* Whisker dots */}
      {[75, 85, 95, 105, 115, 125].map((x, i) => (
        <circle key={i} cx={x} cy="95" r="3" fill="oklch(0.4 0.05 50)" />
      ))}
      
      {/* Magnificent whiskers */}
      <path d="M60 92 Q40 88 25 95" stroke="oklch(0.85 0.02 50)" strokeWidth="2" fill="none" />
      <path d="M60 97 Q38 100 20 105" stroke="oklch(0.85 0.02 50)" strokeWidth="2" fill="none" />
      <path d="M140 92 Q160 88 175 95" stroke="oklch(0.85 0.02 50)" strokeWidth="2" fill="none" />
      <path d="M140 97 Q162 100 180 105" stroke="oklch(0.85 0.02 50)" strokeWidth="2" fill="none" />
      
      {/* Tusks */}
      <path d="M80 105 Q75 135 78 155" stroke="oklch(0.95 0.02 80)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M120 105 Q125 135 122 155" stroke="oklch(0.95 0.02 80)" strokeWidth="8" strokeLinecap="round" fill="none" />
      
      {/* Santa Hat */}
      <path d="M50 55 Q100 -10 150 55 L140 60 Q100 15 60 60 Z" fill="oklch(0.5 0.22 25)" />
      <ellipse cx="100" cy="58" rx="55" ry="10" fill="oklch(0.95 0.02 100)" />
      <path d="M145 40 Q170 35 175 55" stroke="oklch(0.5 0.22 25)" strokeWidth="12" strokeLinecap="round" fill="none" />
      <circle cx="178" cy="58" r="10" fill="oklch(0.95 0.02 100)" />
      
      {/* Monocle */}
      <circle cx="120" cy="65" r="18" stroke="oklch(0.75 0.15 85)" strokeWidth="2" fill="none" />
      <path d="M138 65 L160 80" stroke="oklch(0.75 0.15 85)" strokeWidth="1.5" />
      
      {/* Flippers */}
      <ellipse cx="45" cy="140" rx="20" ry="12" fill="oklch(0.5 0.08 50)" transform="rotate(-20 45 140)" />
      <ellipse cx="155" cy="140" rx="20" ry="12" fill="oklch(0.5 0.08 50)" transform="rotate(20 155 140)" />
    </svg>
  );
}

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

function AuroraBorealis() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 left-0 w-full h-64 opacity-30"
        style={{
          background: 'linear-gradient(in oklch 180deg, oklch(0.5 0.2 300) 0%, oklch(0.4 0.15 180) 50%, transparent 100%)',
          filter: 'blur(40px)',
          animation: 'aurora 8s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes aurora {
          0%, 100% { transform: translateX(-10%) skewX(-5deg); }
          50% { transform: translateX(10%) skewX(5deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("riff-db");
  const [snowflakes, setSnowflakes] = useState([]);
  const [walrusMessage, setWalrusMessage] = useState("Welcome to my weather theatre! Report your festive sightings below!");
  
  const sightings = useLiveQuery((doc) => {
    if (doc.type === "sighting") {
      return doc.createdAt;
    }
  }, { descending: true });

  const [newSighting, setSighting, saveSighting] = useDocument({
    type: "sighting",
    phenomenon: "",
    location: "",
    createdAt: null,
    walrusComment: "",
  });

  useEffect(() => {
    const flakes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setSnowflakes(flakes);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newSighting.phenomenon.trim()) return;
    
    const comment = WALRUS_RESPONSES[Math.floor(Math.random() * WALRUS_RESPONSES.length)];
    
    setSighting({
      ...newSighting,
      createdAt: Date.now(),
      walrusComment: comment,
    });
    
    await saveSighting();
    setWalrusMessage(comment);
    
    setSighting({
      type: "sighting",
      phenomenon: "",
      location: "",
      createdAt: null,
      walrusComment: "",
    });
  };

  const deleteSighting = async (id) => {
    const { database } = useFireproof("riff-db");
    const doc = await database.get(id);
    await database.del(doc._id);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(in oklch 180deg, oklch(0.15 0.08 280) 0%, oklch(0.2 0.1 250) 50%, oklch(0.12 0.06 230) 100%)',
      }}
    >
      <AuroraBorealis />
      
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} style={flake} />
      ))}
      
      <div className="relative z-10 p-4 max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: 'oklch(0.85 0.15 85)' }}
          >
            ✨ Arctic Weather Theatre ✨
          </h1>
          <p 
            className="text-sm italic"
            style={{ color: 'oklch(0.7 0.1 200)' }}
          >
            Featuring Sir Blubbert McTuskington III
          </p>
          <p 
            className="text-xs"
            style={{ color: 'oklch(0.6 0.08 200)' }}
          >
            Royal Meteorologist of the Arctic Circle
          </p>
        </header>

        {/* Walrus Character */}
        <div className="mb-6">
          <WalrusSVG />
          <div 
            className="mt-4 p-4 rounded-2xl text-center relative mx-8"
            style={{ 
              background: 'oklch(0.95 0.02 200)',
              color: 'oklch(0.25 0.08 250)',
            }}
          >
            <div 
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderBottom: '12px solid oklch(0.95 0.02 200)',
              }}
            />
            <p className="font-serif italic text-lg">"{walrusMessage}"</p>
          </div>
        </div>

        {/* Sighting Form */}
        <form 
          onSubmit={handleSubmit}
          className="p-4 rounded-xl mb-6"
          style={{ 
            background: 'linear-gradient(in oklch 135deg, oklch(0.25 0.08 250) 0%, oklch(0.2 0.1 280) 100%)',
            border: '2px solid oklch(0.4 0.12 200)',
          }}
        >
          <h2 
            className="text-xl font-bold mb-4 text-center"
            style={{ color: 'oklch(0.85 0.12 85)' }}
          >
            📡 Report a Weather Phenomenon
          </h2>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="What did you witness? (e.g., 'Glowing reindeer tracks')"
              value={newSighting.phenomenon}
              onChange={(e) => setSighting({ ...newSighting, phenomenon: e.target.value })}
              className="w-full p-3 rounded-lg text-base"
              style={{ 
                background: 'oklch(0.15 0.05 250)',
                color: 'oklch(0.9 0.02 200)',
                border: '1px solid oklch(0.4 0.1 200)',
              }}
            />
            
            <input
              type="text"
              placeholder="Location (e.g., 'Near Santa's Workshop')"
              value={newSighting.location}
              onChange={(e) => setSighting({ ...newSighting, location: e.target.value })}
              className="w-full p-3 rounded-lg text-base"
              style={{ 
                background: 'oklch(0.15 0.05 250)',
                color: 'oklch(0.9 0.02 200)',
                border: '1px solid oklch(0.4 0.1 200)',
              }}
            />
            
            <button
              type="submit"
              className="w-full p-3 rounded-lg font-bold text-lg transition-all hover:scale-105 active:scale-95"
              style={{ 
                background: 'linear-gradient(in oklch 90deg, oklch(0.5 0.22 25) 0%, oklch(0.45 0.2 15) 100%)',
                color: 'oklch(0.95 0.02 80)',
                boxShadow: '0 4px 15px oklch(0.3 0.15 25 / 0.5)',
              }}
            >
              🎄 Submit to Sir Blubbert 🎄
            </button>
          </div>
        </form>

        {/* Sightings Feed */}
        <div className="space-y-4">
          <h2 
            className="text-xl font-bold text-center"
            style={{ color: 'oklch(0.7 0.15 200)' }}
          >
            📜 Weather Log 📜
          </h2>
          
          {sightings.docs.length === 0 ? (
            <p 
              className="text-center italic py-8"
              style={{ color: 'oklch(0.5 0.08 200)' }}
            >
              No sightings yet... The Arctic awaits your reports!
            </p>
          ) : (
            sightings.docs.map((sighting) => (
              <div
                key={sighting._id}
                className="p-4 rounded-xl relative"
                style={{ 
                  background: 'linear-gradient(in oklch 180deg, oklch(0.22 0.06 250) 0%, oklch(0.18 0.08 280) 100%)',
                  border: '1px solid oklch(0.35 0.1 200)',
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 
                      className="font-bold text-lg"
                      style={{ color: 'oklch(0.85 0.12 85)' }}
                    >
                      🌨️ {sighting.phenomenon}
                    </h3>
                    {sighting.location && (
                      <p 
                        className="text-sm"
                        style={{ color: 'oklch(0.6 0.1 200)' }}
                      >
                        📍 {sighting.location}
                      </p>
                    )}
                  </div>
                  <span 
                    className="text-xs"
                    style={{ color: 'oklch(0.5 0.05 200)' }}
                  >
                    {sighting.createdAt && new Date(sighting.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                
                <div 
                  className="mt-3 p-3 rounded-lg italic"
                  style={{ 
                    background: 'oklch(0.15 0.04 250)',
                    color: 'oklch(0.75 0.08 200)',
                    borderLeft: '3px solid oklch(0.5 0.15 300)',
                  }}
                >
                  🦭 Sir Blubbert says: "{sighting.walrusComment}"
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer 
          className="mt-8 text-center text-sm py-4"
          style={{ color: 'oklch(0.5 0.08 200)' }}
        >
          <p>🐟 Tip Sir Blubbert's Fish Fund 🐟</p>
          <p className="text-xs mt-1 italic">
            "Every sardine counts!" — Sir Blubbert McTuskington III
          </p>
        </footer>
      </div>
    </div>
  );
}