/*BUSINESS
name: Winslow's Cosmic Fish Fortune Machine
pitch: Feed a philosophical walrus cosmic fish and receive absurdist holiday wisdom from beyond the arctic void
customer: Seekers of unconventional holiday cheer who appreciate the weird and wonderful
revenue: Free with tip jar for extra cosmic fish bundles
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const WALRUS_NORMAL = `
     ___________
    /           \\
   |  ◉     ◉   |
   |      _      |
   |    /   \\    |
    \\  | ~~~ |  /
     \\ |_____| /
      \\       /
   ~~~~\\_____/~~~~
  ~~ WINSLOW ~~
`;

const WALRUS_HAPPY = `
     ___________
    /    🎄     \\
   |  ◉     ◉   |
   |      ω      |
   |    /   \\    |
    \\  | ≋≋≋ |  /
     \\ |_____| /
      \\  ✨   /
   ~~~~\\_____/~~~~
  ~~ WINSLOW ~~
`;

const WALRUS_THINKING = `
     ___________
    /     💭    \\
   |  ◉     ◑   |
   |      ~      |
   |    /   \\    |
    \\  | ∿∿∿ |  /
     \\ |_____| /
      \\   ?   /
   ~~~~\\_____/~~~~
  ~~ WINSLOW ~~
`;

const COSMIC_FORTUNES = [
  "The snowflake that questions its path melts into enlightenment. So too shall your holiday shopping list.",
  "In the void between gift wrap and chaos, the true present reveals itself: it was socks. It was always socks.",
  "The cosmic fish swims through frozen time. Your uncle's fruitcake exists in all dimensions simultaneously.",
  "When the aurora speaks, it says only this: 'The WiFi password is taped under the router.'",
  "A thousand Christmas lights blink in morse code: 'We are all but temporary ornaments on the tree of existence.'",
  "The penguin asked the walrus for directions. The walrus pointed to the stars. They both got frostbite.",
  "Your holiday spirit is like a quantum particle: simultaneously merry AND bright until someone observes the credit card bill.",
  "In the space between 'Happy Holidays' and 'Bah Humbug' lies the truth: we are all just vibing with seasonal depression.",
  "The wise elf knows that the toy factory is a metaphor. But a metaphor for what? The elves have signed NDAs.",
  "Three ghosts visit you tonight: Past regrets, Present anxiety, Future dread. They bring cookies.",
  "The North Pole is just a state of mind. Unfortunately, so is your heating bill.",
  "Rudolph's nose glows red from cosmic radiation. We do not speak of the experiments.",
  "Every snowman is a temporary sculpture of frozen tears. Build one anyway. Give it a carrot nose.",
  "The jingle bells ring in frequencies only walruses can hear. We have seen things. Festive things.",
  "Your New Year's resolution exists in a superposition until January 3rd collapses it into 'maybe next year.'",
  "The gingerbread house is a comment on the housing market. The icing is capitalism. Eat it anyway.",
];

const FISH_EMOJIS = ["🐟", "🐠", "🎣", "🦈", "🐡", "✨🐟✨", "🌟🐠🌟", "💫🐟💫"];

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("winslow-fortunes");
  const fortunes = useLiveQuery("type", { key: "fortune" });
  const [walrusState, setWalrusState] = useState("normal");
  const [glitchActive, setGlitchActive] = useState(false);
  const [showFortune, setShowFortune] = useState(null);
  const [fishAnimation, setFishAnimation] = useState(false);

  const [newFortune, setNewFortune, saveFortune] = useDocument({
    type: "fortune",
    text: "",
    favorite: false,
    fishType: "",
    createdAt: null,
  });

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  const feedCosmicFish = async () => {
    setFishAnimation(true);
    setWalrusState("thinking");
    
    const fishType = FISH_EMOJIS[Math.floor(Math.random() * FISH_EMOJIS.length)];
    const fortuneText = COSMIC_FORTUNES[Math.floor(Math.random() * COSMIC_FORTUNES.length)];
    
    setTimeout(async () => {
      setWalrusState("happy");
      setShowFortune(fortuneText);
      
      setNewFortune({
        type: "fortune",
        text: fortuneText,
        favorite: false,
        fishType: fishType,
        createdAt: new Date().toISOString(),
      });
      
      await saveFortune({
        type: "fortune",
        text: fortuneText,
        favorite: false,
        fishType: fishType,
        createdAt: new Date().toISOString(),
      });
      
      setFishAnimation(false);
      
      setTimeout(() => {
        setWalrusState("normal");
      }, 3000);
    }, 2000);
  };

  const toggleFavorite = async (fortune) => {
    const { useDocument: useDoc } = useFireproof("winslow-fortunes");
  };

  const deleteFortune = async (fortune) => {
    const { database } = useFireproof("winslow-fortunes");
  };

  const getWalrusArt = () => {
    switch (walrusState) {
      case "happy": return WALRUS_HAPPY;
      case "thinking": return WALRUS_THINKING;
      default: return WALRUS_NORMAL;
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.08_0.12_280),oklch(0.15_0.1_220),oklch(0.1_0.08_180))] p-4 overflow-hidden relative">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
        }}
      />
      
      {/* Aurora effect */}
      <div className="fixed top-0 left-0 right-0 h-64 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(180deg, oklch(0.5 0.2 160) 0%, oklch(0.4 0.25 330) 30%, transparent 100%)",
          filter: "blur(40px)",
          animation: "pulse 4s ease-in-out infinite"
        }}
      />
      
      {/* Floating snowflakes/stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[oklch(0.9_0.05_220)] animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${8 + Math.random() * 12}px`
            }}
          >
            {Math.random() > 0.5 ? "❄" : "✦"}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-mono font-bold text-[oklch(0.85_0.15_160)] mb-2 ${glitchActive ? 'translate-x-1 text-[oklch(0.7_0.25_330)]' : ''}`}
            style={{ textShadow: "0 0 20px oklch(0.5 0.2 160)" }}>
            🎅 WINSLOW'S 🎅
          </h1>
          <h2 className="text-xl md:text-2xl font-mono text-[oklch(0.75_0.2_330)]"
            style={{ textShadow: "0 0 15px oklch(0.5 0.25 330)" }}>
            Cosmic Fish Fortune Machine
          </h2>
          <p className="text-sm text-[oklch(0.6_0.1_220)] mt-2 font-mono">
            [ FEED THE WALRUS :: RECEIVE WISDOM ]
          </p>
        </header>

        {/* Walrus Display */}
        <div className="bg-[oklch(0.1_0.05_260)] border-2 border-[oklch(0.4_0.15_160)] rounded-lg p-4 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(in_oklch,transparent,oklch(0.2_0.1_160_/_0.1))]" />
          
          <pre className={`text-center text-[oklch(0.8_0.1_160)] font-mono text-xs md:text-sm whitespace-pre ${glitchActive ? 'text-[oklch(0.8_0.2_330)]' : ''}`}
            style={{ 
              textShadow: glitchActive ? "-2px 0 oklch(0.6 0.2 25), 2px 0 oklch(0.6 0.2 160)" : "0 0 10px oklch(0.4 0.15 160)",
              transform: glitchActive ? `translateX(${Math.random() * 4 - 2}px)` : 'none'
            }}>
            {getWalrusArt()}
          </pre>
          
          {/* Santa hat accent */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl">
            🎅
          </div>
          
          {/* Fish animation */}
          {fishAnimation && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl animate-bounce">
                {FISH_EMOJIS[Math.floor(Math.random() * FISH_EMOJIS.length)]}
              </span>
            </div>
          )}
        </div>

        {/* Feed Button */}
        <div className="text-center mb-6">
          <button
            onClick={feedCosmicFish}
            disabled={walrusState === "thinking"}
            className={`
              px-8 py-4 font-mono text-lg font-bold rounded-lg
              bg-[linear-gradient(in_oklch,oklch(0.45_0.2_25),oklch(0.55_0.18_40))]
              text-[oklch(0.95_0.02_60)] border-2 border-[oklch(0.6_0.15_50)]
              hover:bg-[linear-gradient(in_oklch,oklch(0.5_0.22_25),oklch(0.6_0.2_40))]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 transform hover:scale-105
              ${walrusState === "thinking" ? "animate-pulse" : ""}
            `}
            style={{ 
              boxShadow: "0 0 20px oklch(0.5 0.2 25 / 0.5)",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            {walrusState === "thinking" ? "🔮 CONSULTING THE VOID..." : "🐟 FEED COSMIC FISH 🐟"}
          </button>
        </div>

        {/* Current Fortune Display */}
        {showFortune && (
          <div className="bg-[oklch(0.12_0.08_280)] border border-[oklch(0.5_0.2_330)] rounded-lg p-6 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(in_oklch,oklch(0.5_0.2_160),oklch(0.6_0.25_330),oklch(0.5_0.2_25))]" />
            <p className="text-[oklch(0.85_0.1_330)] font-mono text-center italic leading-relaxed">
              "{showFortune}"
            </p>
            <p className="text-center text-[oklch(0.5_0.1_220)] text-xs mt-4 font-mono">
              — Winslow speaks from the frozen beyond —
            </p>
          </div>
        )}

        {/* Fortune History */}
        <div className="bg-[oklch(0.08_0.05_260)] border border-[oklch(0.3_0.1_220)] rounded-lg p-4">
          <h3 className="text-[oklch(0.7_0.15_160)] font-mono font-bold mb-4 flex items-center gap-2">
            <span>📜</span> FORTUNE ARCHIVE <span className="text-xs text-[oklch(0.5_0.1_220)]">({fortunes.docs.length} received)</span>
          </h3>
          
          {fortunes.docs.length === 0 ? (
            <p className="text-[oklch(0.5_0.08_220)] font-mono text-center py-8 text-sm">
              [ NO FORTUNES YET — FEED THE WALRUS ]
            </p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {fortunes.docs.slice().reverse().map((fortune) => (
                <div
                  key={fortune._id}
                  className="bg-[oklch(0.12_0.04_260)] border border-[oklch(0.25_0.08_220)] rounded p-3 group hover:border-[oklch(0.4_0.15_160)] transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{fortune.fishType}</span>
                    <p className="text-[oklch(0.75_0.05_220)] font-mono text-sm flex-1 leading-relaxed">
                      {fortune.text}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-[oklch(0.4_0.05_220)] font-mono">
                    <span>
                      {fortune.createdAt && new Date(fortune.createdAt).toLocaleString()}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {fortune.favorite ? "⭐" : "☆"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-[oklch(0.4_0.08_220)] font-mono text-xs">
          <p>[ TRANSMISSION FROM THE ARCTIC VOID ]</p>
          <p className="mt-1">v̷̢͝1̵̛.̶̨0̴͜.̵̛0̸̕ ̶̡͠:̵̢:̴̛ ̶̨W̵͜I̵̛N̴̕S̵̨L̴͠O̵͜W̴̛ ̵̨O̵͝P̵̛E̴͜R̵̨A̴͠T̵͜I̵̛N̵̨G̴͝ ̵͜S̵̨Y̴͝S̵̛T̵̨E̵͠M̴͜</p>
        </footer>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}