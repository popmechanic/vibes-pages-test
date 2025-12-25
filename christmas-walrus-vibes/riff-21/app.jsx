/*BUSINESS
name: Cornelius's Cosmic Christmas Wish Emporium
pitch: Submit your holiday wishes to Cornelius Tusksgiving McFlipperton III, the interdimensional walrus sage
customer: People seeking absurdist holiday joy and cryptic walrus wisdom
revenue: Free tier with 3 wishes/day, Premium Blubber Membership $4.99/month for unlimited cosmic guidance
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const WALRUS_RESPONSES = [
  "The ice flows as the stars align... your wish echoes in the cosmic blubber.",
  "Ork ork! The northern lights have received your transmission. Patience, land-dweller.",
  "In my 3,000 years of flippered existence, I have seen such wishes granted... eventually.",
  "The sardines of destiny swim in your favor. But beware the penguin of doubt!",
  "Ho ho HONK! Your wish has been filed in the Eternal Glacier Archives.",
  "The tusks of time point toward your happiness. Or possibly Tuesday. Same thing.",
  "My whiskers detect genuine holiday spirit. Cosmic wish processing: INITIATED.",
  "Ork! The Kringle Dimension vibrates with your request. Stand by for aurora confirmation.",
  "I have consulted the Ancient Fish. They said 'blub blub' which is very promising.",
  "Your wish joins the great migration of hopes. I shall flop upon it with cosmic intent.",
];

const CorneliusASCII = ({ speaking }) => (
  <pre className="text-[oklch(0.9_0.02_240)] font-mono text-xs sm:text-sm leading-tight select-none">
    {`
          🎅
       .-"""-.
      /        \\
     |  O    O  |
     |    __    |  ${speaking ? "💬" : ""}
     |   /  \\   |
      \\  ====  /
       '-.____.-'
      /|   ||   |\\
     (_|   ||   |_)
        \\      /
         \\    /
          \\  /
           \\/
    `}
  </pre>
);

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("cornelius-wishes-db");
  const wishes = useLiveQuery("type", { key: "wish" });
  const [doc, setDoc, saveDoc] = useDocument({ type: "wish", text: "", response: "", timestamp: null, status: "pending" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const submitWish = async () => {
    if (!doc.text.trim()) return;
    setIsProcessing(true);
    
    const response = WALRUS_RESPONSES[Math.floor(Math.random() * WALRUS_RESPONSES.length)];
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await saveDoc({
      ...doc,
      response,
      timestamp: Date.now(),
      status: "granted"
    });
    
    setDoc({ type: "wish", text: "", response: "", timestamp: null, status: "pending" });
    setIsProcessing(false);
  };

  const deleteWish = async (wish) => {
    const { database } = useFireproof("cornelius-wishes-db");
    await database.del(wish._id);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.06_260)] p-4 relative overflow-hidden">
      {/* Aurora background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-64 bg-[linear-gradient(in_oklch_180deg,oklch(0.4_0.2_180),oklch(0.3_0.15_280),oklch(0.2_0.1_320),transparent)]" />
        <div className="absolute top-20 right-0 w-3/4 h-48 bg-[linear-gradient(in_oklch_135deg,oklch(0.35_0.18_150),oklch(0.25_0.12_200),transparent)] blur-xl" />
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(0.5_0_0)_2px,oklch(0.5_0_0)_4px)]" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className={`text-2xl sm:text-4xl font-bold mb-2 ${glitchText ? "text-[oklch(0.7_0.25_25)]" : "text-[oklch(0.75_0.2_30)]"} transition-colors duration-100`}>
            ❄️ CORNELIUS'S ❄️
          </h1>
          <h2 className="text-lg sm:text-2xl text-[oklch(0.85_0.15_85)] font-mono tracking-wider">
            COSMIC CHRISTMAS WISH EMPORIUM
          </h2>
          <p className="text-[oklch(0.6_0.1_200)] text-sm mt-2 font-mono">
            EST. 3000 BCE • INTERDIMENSIONAL • FLIPPER-CERTIFIED
          </p>
        </header>

        {/* Cornelius Display */}
        <div className="bg-[oklch(0.12_0.04_250)] border-2 border-[oklch(0.4_0.15_200)] rounded-lg p-4 mb-6 shadow-[0_0_30px_oklch(0.3_0.15_200)]">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <CorneliusASCII speaking={isProcessing} />
            <div className="text-center sm:text-left">
              <h3 className="text-[oklch(0.9_0.18_85)] font-bold text-lg">
                Cornelius Tusksgiving McFlipperton III
              </h3>
              <p className="text-[oklch(0.6_0.08_200)] text-sm font-mono">
                Walrus Sage • Wish Facilitator • Part-time Fish Enthusiast
              </p>
              <div className="mt-2 flex gap-2 justify-center sm:justify-start">
                <span className="px-2 py-1 bg-[oklch(0.25_0.12_150)] text-[oklch(0.8_0.15_150)] text-xs rounded-full">🎄 HOLIDAY MODE</span>
                <span className="px-2 py-1 bg-[oklch(0.25_0.1_280)] text-[oklch(0.8_0.12_280)] text-xs rounded-full">✨ ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wish Input */}
        <div className="bg-[oklch(0.1_0.03_240)] border border-[oklch(0.3_0.1_200)] rounded-lg p-4 mb-6">
          <label className="block text-[oklch(0.8_0.1_200)] font-mono mb-2 text-sm">
            📝 TRANSMIT YOUR HOLIDAY WISH:
          </label>
          <textarea
            value={doc.text}
            onChange={(e) => setDoc({ ...doc, text: e.target.value })}
            placeholder="Dear Cornelius, I wish for..."
            className="w-full h-24 bg-[oklch(0.05_0.02_240)] text-[oklch(0.9_0.02_240)] border border-[oklch(0.3_0.08_200)] rounded p-3 font-mono text-sm placeholder:text-[oklch(0.4_0.05_200)] focus:outline-none focus:border-[oklch(0.5_0.2_180)] focus:shadow-[0_0_15px_oklch(0.3_0.15_180)]"
            disabled={isProcessing}
          />
          <button
            onClick={submitWish}
            disabled={isProcessing || !doc.text.trim()}
            className="mt-3 w-full py-3 bg-[linear-gradient(in_oklch_90deg,oklch(0.45_0.2_25),oklch(0.5_0.22_40))] hover:bg-[linear-gradient(in_oklch_90deg,oklch(0.5_0.22_25),oklch(0.55_0.24_40))] disabled:opacity-50 text-white font-bold rounded-lg transition-all duration-200 shadow-[0_0_20px_oklch(0.4_0.2_25)] hover:shadow-[0_0_30px_oklch(0.5_0.25_25)]"
          >
            {isProcessing ? "🌀 PROCESSING THROUGH COSMIC BLUBBER..." : "🐋 SUBMIT TO CORNELIUS"}
          </button>
        </div>

        {/* Wish Archive */}
        <div className="bg-[oklch(0.1_0.03_250)] border border-[oklch(0.25_0.08_200)] rounded-lg p-4">
          <h3 className="text-[oklch(0.85_0.15_85)] font-mono text-lg mb-4 flex items-center gap-2">
            📜 WISH ARCHIVE <span className="text-xs text-[oklch(0.5_0.1_200)]">({wishes.docs.length} transmissions)</span>
          </h3>
          
          {wishes.docs.length === 0 ? (
            <p className="text-[oklch(0.5_0.08_200)] text-center py-8 font-mono text-sm">
              No wishes yet... Cornelius awaits your transmission! 🌟
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {wishes.docs.sort((a, b) => b.timestamp - a.timestamp).map((wish) => (
                <div
                  key={wish._id}
                  className="bg-[oklch(0.08_0.04_260)] border border-[oklch(0.2_0.06_200)] rounded-lg p-4 relative group"
                >
                  <button
                    onClick={() => deleteWish(wish)}
                    className="absolute top-2 right-2 text-[oklch(0.4_0.1_25)] hover:text-[oklch(0.6_0.2_25)] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                  <div className="mb-3">
                    <span className="text-[oklch(0.5_0.08_200)] text-xs font-mono">YOUR WISH:</span>
                    <p className="text-[oklch(0.85_0.02_240)] mt-1">{wish.text}</p>
                  </div>
                  <div className="border-t border-[oklch(0.2_0.05_200)] pt-3">
                    <span className="text-[oklch(0.6_0.15_150)] text-xs font-mono">🐋 CORNELIUS RESPONDS:</span>
                    <p className="text-[oklch(0.75_0.1_180)] mt-1 italic">{wish.response}</p>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-[oklch(0.4_0.05_200)] text-xs font-mono">
                      {new Date(wish.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-[oklch(0.4_0.06_200)] text-xs font-mono">
          <p>⚠️ Wishes may take 1-∞ cosmic cycles to manifest</p>
          <p className="mt-1">Cornelius is not responsible for wishes involving penguins</p>
          <p className="mt-2">🎄 Happy Holidays from the Arctic Dimension 🎄</p>
        </footer>
      </div>
    </div>
  );
}