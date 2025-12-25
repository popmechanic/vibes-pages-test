/*BUSINESS
name: Blubbert's Holiday Wisdom Grotto
pitch: Receive absurdist philosophical guidance from a monocled Arctic sage walrus this Christmas
customer: Adults seeking whimsical holiday entertainment and unconventional inspiration
revenue: Free with optional "Golden Tusk" donations for premium wisdom categories
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const WISDOMS = [
  "The candy cane is straight, yet twisted. Much like holiday family dinners.",
  "A walrus with a Santa hat is still a walrus. But a happier one.",
  "The North Pole is just the South Pole's optimistic cousin.",
  "Tinsel exists to remind us that chaos can be decorative.",
  "The true gift is not the present, but the awkward thank-you face.",
  "Snow falls equally on the just and the unjust. Both get cold.",
  "A fruitcake's journey is long, often spanning multiple Christmases.",
  "The jingle bell asks not for whom it jingles. It jingles for thee.",
  "Eggnog is just a breakfast smoothie that made different life choices.",
  "The reindeer flies not because physics allows, but because magic insists.",
  "Wrapping paper teaches us: beauty is temporary, scissors are forever.",
  "The Christmas tree stands tall, hiding its insecurities beneath ornaments.",
  "Mittens are just gloves that gave up on individuality.",
  "The snowman dreams of summer, unaware of the irony.",
  "Hot cocoa is just bean water with holiday aspirations.",
];

const WalrusCharacter = ({ mood, speaking }) => (
  <svg viewBox="0 0 200 200" className={`w-48 h-48 ${speaking ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }}>
    {/* Santa Hat */}
    <ellipse cx="100" cy="35" rx="45" ry="12" fill="oklch(0.95 0.02 240)" />
    <path d="M55 35 Q100 -20 145 35" fill="oklch(0.55 0.22 25)" />
    <circle cx="100" cy="0" r="10" fill="oklch(0.95 0.02 240)" />
    
    {/* Walrus Face */}
    <ellipse cx="100" cy="100" rx="70" ry="55" fill="oklch(0.5 0.08 50)" />
    
    {/* Snout/Whisker Pad */}
    <ellipse cx="100" cy="120" rx="45" ry="30" fill="oklch(0.6 0.06 60)" />
    
    {/* Eyes */}
    <circle cx="70" cy="85" r="12" fill="oklch(0.95 0.02 240)" />
    <circle cx="130" cy="85" r="12" fill="oklch(0.95 0.02 240)" />
    <circle cx={mood === 'happy' ? "73" : mood === 'thinking' ? "67" : "70"} cy="85" r="6" fill="oklch(0.15 0.05 240)" />
    <circle cx={mood === 'happy' ? "133" : mood === 'thinking' ? "127" : "130"} cy="85" r="6" fill="oklch(0.15 0.05 240)" />
    
    {/* Monocle */}
    <circle cx="130" cy="85" r="16" fill="none" stroke="oklch(0.8 0.18 85)" strokeWidth="3" />
    <line x1="146" y1="85" x2="160" y2="110" stroke="oklch(0.8 0.18 85)" strokeWidth="2" />
    
    {/* Eyebrows */}
    <path d={mood === 'thinking' ? "M55 70 Q70 60 85 70" : "M55 72 Q70 68 85 72"} stroke="oklch(0.3 0.05 50)" strokeWidth="3" fill="none" />
    <path d={mood === 'thinking' ? "M115 70 Q130 60 145 70" : "M115 72 Q130 68 145 72"} stroke="oklch(0.3 0.05 50)" strokeWidth="3" fill="none" />
    
    {/* Nose */}
    <ellipse cx="100" cy="105" rx="8" ry="6" fill="oklch(0.25 0.08 20)" />
    
    {/* Whisker Dots */}
    {[0,1,2,3,4,5].map(i => (
      <circle key={i} cx={70 + (i % 3) * 15} cy={115 + Math.floor(i / 3) * 12} r="4" fill="oklch(0.45 0.06 50)" />
    ))}
    {[0,1,2,3,4,5].map(i => (
      <circle key={`r${i}`} cx={115 + (i % 3) * 15} cy={115 + Math.floor(i / 3) * 12} r="4" fill="oklch(0.45 0.06 50)" />
    ))}
    
    {/* Whiskers with animation */}
    <g className={speaking ? "animate-pulse" : ""}>
      <line x1="45" y1="115" x2="15" y2="105" stroke="oklch(0.3 0.05 50)" strokeWidth="2" />
      <line x1="45" y1="125" x2="10" y2="125" stroke="oklch(0.3 0.05 50)" strokeWidth="2" />
      <line x1="45" y1="135" x2="15" y2="145" stroke="oklch(0.3 0.05 50)" strokeWidth="2" />
      <line x1="155" y1="115" x2="185" y2="105" stroke="oklch(0.3 0.05 50)" strokeWidth="2" />
      <line x1="155" y1="125" x2="190" y2="125" stroke="oklch(0.3 0.05 50)" strokeWidth="2" />
      <line x1="155" y1="135" x2="185" y2="145" stroke="oklch(0.3 0.05 50)" strokeWidth="2" />
    </g>
    
    {/* Tusks */}
    <path d="M75 130 Q70 170 75 190" fill="oklch(0.92 0.03 85)" stroke="oklch(0.7 0.05 85)" strokeWidth="2" />
    <path d="M125 130 Q130 170 125 190" fill="oklch(0.92 0.03 85)" stroke="oklch(0.7 0.05 85)" strokeWidth="2" />
    
    {/* Mouth */}
    <path d={mood === 'happy' ? "M85 140 Q100 155 115 140" : "M85 145 Q100 150 115 145"} fill="none" stroke="oklch(0.3 0.05 20)" strokeWidth="3" />
  </svg>
);

const FallingWalrusFace = ({ style }) => (
  <div className="absolute text-2xl animate-bounce pointer-events-none" style={style}>
    🦭
  </div>
);

const AuroraParticle = ({ delay }) => (
  <div 
    className="absolute w-2 h-2 rounded-full opacity-60 animate-pulse"
    style={{
      background: `oklch(${0.5 + Math.random() * 0.3} 0.2 ${170 + Math.random() * 130})`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }}
  />
);

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("blubbert-wisdom-db");
  const [currentWisdom, setCurrentWisdom] = useState(null);
  const [mood, setMood] = useState('neutral');
  const [speaking, setSpeaking] = useState(false);
  const [particles, setParticles] = useState([]);
  const [fallingFaces, setFallingFaces] = useState([]);

  const wisdoms = useLiveQuery("type", { key: "wisdom" });
  const [newReaction, setNewReaction, saveReaction] = useDocument({ type: "reaction", wisdomId: "", rating: 0 });

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => i));
    const faceInterval = setInterval(() => {
      setFallingFaces(prev => {
        const newFace = {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 5 + Math.random() * 5
        };
        return [...prev.slice(-10), newFace];
      });
    }, 2000);
    return () => clearInterval(faceInterval);
  }, []);

  const dispenseWisdom = () => {
    setSpeaking(true);
    setMood('thinking');
    
    setTimeout(() => {
      const wisdom = WISDOMS[Math.floor(Math.random() * WISDOMS.length)];
      setCurrentWisdom(wisdom);
      setMood('happy');
      
      setTimeout(() => {
        setSpeaking(false);
        setMood('neutral');
      }, 2000);
    }, 1500);
  };

  const saveWisdom = async () => {
    if (!currentWisdom) return;
    
    const doc = {
      type: "wisdom",
      text: currentWisdom,
      savedAt: Date.now(),
      profoundness: Math.floor(Math.random() * 5) + 1
    };
    
    const { useLiveQuery: _, useDocument: __, ...db } = useFireproof("blubbert-wisdom-db");
    await db.put(doc);
    setMood('happy');
  };

  const rateWisdom = async (wisdomId, rating) => {
    setNewReaction({ ...newReaction, wisdomId, rating });
    await saveReaction({ ...newReaction, wisdomId, rating, ratedAt: Date.now() });
  };

  const deleteWisdom = async (id) => {
    const { useLiveQuery: _, useDocument: __, ...db } = useFireproof("blubbert-wisdom-db");
    await db.del(id);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[linear-gradient(in_oklch,oklch(0.15_0.08_240),oklch(0.25_0.12_280),oklch(0.2_0.1_200))]">
      {/* Aurora Particles */}
      {particles.map(i => (
        <AuroraParticle key={i} delay={i * 0.3} />
      ))}
      
      {/* Falling Walrus Faces */}
      {fallingFaces.map(face => (
        <FallingWalrusFace 
          key={face.id} 
          style={{ 
            left: `${face.left}%`, 
            top: '-50px',
            animation: `fall ${face.duration}s linear forwards`
          }} 
        />
      ))}
      
      <style>{`
        @keyframes fall {
          to { transform: translateY(120vh) rotate(360deg); }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(-1deg) translateY(0); }
          50% { transform: rotate(1deg) translateY(-5px); }
        }
      `}</style>
      
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-[linear-gradient(in_oklch,oklch(0.85_0.15_170),oklch(0.8_0.18_85))] bg-clip-text text-transparent">
            ✨ Blubbert's Holiday Wisdom Grotto ✨
          </h1>
          <p className="text-[oklch(0.7_0.08_240)] italic">
            "Philosophical guidance from the monocled sage of the Arctic"
          </p>
        </div>
        
        {/* Main Walrus Display */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <WalrusCharacter mood={mood} speaking={speaking} />
            <div className="absolute -top-2 -right-2 text-3xl animate-pulse">🎄</div>
            <div className="absolute -top-2 -left-2 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
          </div>
          
          <h2 className="text-2xl font-bold text-[oklch(0.92_0.03_85)] mt-4">
            Blubbert McTuskington III
          </h2>
          <p className="text-[oklch(0.6_0.1_170)] text-sm">
            Esq. • Arctic Philosopher • Tusk Enthusiast
          </p>
        </div>
        
        {/* Wisdom Display */}
        <div className="bg-[oklch(0.2_0.06_250)] rounded-3xl p-6 mb-6 border-2 border-[oklch(0.4_0.15_170)] shadow-2xl" style={{ animation: currentWisdom ? 'wobble 3s ease-in-out infinite' : 'none' }}>
          {currentWisdom ? (
            <div className="text-center">
              <p className="text-2xl text-[oklch(0.95_0.02_240)] mb-4 font-serif italic">
                "{currentWisdom}"
              </p>
              <button
                onClick={saveWisdom}
                className="px-6 py-2 bg-[oklch(0.55_0.22_25)] text-white rounded-full hover:bg-[oklch(0.6_0.25_25)] transition-all transform hover:scale-105"
              >
                🦭 Collect This Wisdom
              </button>
            </div>
          ) : (
            <p className="text-center text-[oklch(0.6_0.08_240)] text-xl">
              The walrus awaits your inquiry...
            </p>
          )}
        </div>
        
        {/* Dispense Button */}
        <div className="text-center mb-8">
          <button
            onClick={dispenseWisdom}
            disabled={speaking}
            className="px-8 py-4 bg-[linear-gradient(in_oklch,oklch(0.5_0.2_300),oklch(0.4_0.18_250))] text-white text-xl rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait border-2 border-[oklch(0.7_0.15_300)]"
          >
            {speaking ? "🔮 Consulting the Cosmic Clam..." : "🎅 Seek Holiday Wisdom"}
          </button>
        </div>
        
        {/* Collected Wisdoms */}
        {wisdoms.docs.length > 0 && (
          <div className="bg-[oklch(0.18_0.05_240)] rounded-2xl p-6 border border-[oklch(0.3_0.1_170)]">
            <h3 className="text-xl font-bold text-[oklch(0.85_0.15_170)] mb-4 flex items-center gap-2">
              📜 Your Wisdom Collection
              <span className="text-sm font-normal text-[oklch(0.6_0.08_240)]">
                ({wisdoms.docs.length} pearls of wisdom)
              </span>
            </h3>
            
            <div className="space-y-4">
              {wisdoms.docs.map((wisdom) => (
                <div 
                  key={wisdom._id} 
                  className="bg-[oklch(0.25_0.07_250)] rounded-xl p-4 border border-[oklch(0.35_0.08_200)] hover:border-[oklch(0.5_0.15_85)] transition-all"
                  style={{ animation: 'wobble 4s ease-in-out infinite', animationDelay: `${Math.random()}s` }}
                >
                  <p className="text-[oklch(0.9_0.02_240)] mb-3 font-serif">
                    "{wisdom.text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[oklch(0.6_0.08_240)] text-sm mr-2">Profoundness:</span>
                      {[1,2,3,4,5].map(star => (
                        <button
                          key={star}
                          onClick={() => rateWisdom(wisdom._id, star)}
                          className="text-xl hover:scale-125 transition-transform"
                        >
                          {star <= (wisdom.profoundness || 0) ? '🦭' : '⚪'}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => deleteWisdom(wisdom._id)}
                      className="text-[oklch(0.5_0.15_25)] hover:text-[oklch(0.6_0.2_25)] transition-colors"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-8 text-[oklch(0.5_0.06_240)] text-sm">
          <p>🎄 Season's Greetings from the Arctic Philosophical Society 🎄</p>
          <p className="mt-1 text-xs">
            "Where every tusk tells a tale, and every whisker whispers wisdom"
          </p>
        </div>
      </div>
    </div>
  );
}