/*BUSINESS
name: Winslow's Wish Oracle
pitch: Submit your Christmas wishes to Winslow the mystical Arctic walrus and receive cryptic holiday prophecies
customer: Anyone seeking whimsical holiday magic and unconventional festive fun
revenue: Free with optional sardine donations (tips) for premium prophecies
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const ORACLE_RESPONSES = [
  "The northern lights whisper... your wish shall manifest when the last snowflake of winter falls upward.",
  "Winslow sees through the ice... this wish requires exactly 7 candy canes and a leap of faith.",
  "The sardines have spoken! Your desire orbits closer, like a confused penguin finding its colony.",
  "*flaps flippers mysteriously* The cosmos aligns... but first, have you considered befriending a reindeer?",
  "Ah yes, this wish... it echoes in the glacial caves. The answer lies beneath the 47th Christmas cookie.",
  "Winslow's tusks tingle with prophecy! Your wish dances on thin ice... in the best possible way.",
  "The aurora reveals... patience, young gift-seeker. Magic marinates like a fine holiday ham.",
  "*adjusts Santa hat sagely* This wish... it has the energy of a hyperactive elf. I approve.",
  "The ancient walrus scrolls foretell... success arrives wrapped in unexpected paper.",
  "Winslow consults the frozen deep... your wish is heard by exactly 3.5 snow spirits.",
];

const WALRUS_EXPRESSIONS = {
  idle: `
    ⠀⠀⠀⠀⠀⠀🎅⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⢀⣤⣶⣿⣿⣶⣤⡀⠀⠀⠀
    ⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀
    ⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀
    ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
    ⢸⣿╰━━━┓⣿⣿┏━━━╯⣿⡇
    ⠀⣿⣿⣿⣃┃⣿⣿┃⣿⣿⣿⣿⠀
    ⠀⠈⠻⣿⣿┗━━━┛⣿⣿⠟⠁⠀
    ⠀⠀⠀⠈⣽⣿●⠀●⣿⣯⠁⠀⠀⠀
    ⠀⠀⠀⣰⣿⣿⣷⣾⣿⣿⣿⣆⠀⠀⠀
  `,
  thinking: `
    ⠀⠀⠀⠀⠀✨🎅✨⠀⠀⠀⠀⠀
    ⠀⠀⠀⢀⣤⣶⣿⣿⣶⣤⡀⠀⠀⠀
    ⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀
    ⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀
    ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
    ⢸⣿╰━━━┓⣿⣿┏━━━╯⣿⡇
    ⠀⣿⣿⣿⣃┃⣿⣿┃⣿⣿⣿⣿⠀
    ⠀⠈⠻⣿⣿┗━━━┛⣿⣿⠟⠁⠀
    ⠀⠀⠀⠈⣽⣿◑⠀◐⣿⣯⠁⠀⠀⠀
    ⠀⠀⠀⣰⣿⣿⣷👅⣿⣿⣿⣆⠀⠀⠀
  `,
  excited: `
    ⠀⠀⠀⠀⠀⠀🎅⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⢀⣤⣶⣿⣿⣶⣤⡀⠀⠀⠀
    ⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀
    ⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀
    ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
    ⢸⣿╰━━━┓⣿⣿┏━━━╯⣿⡇
    ⠀⣿⣿⣿⣃┃⣿⣿┃⣿⣿⣿⣿⠀
    ⠀⠈⠻⣿⣿┗━━━┛⣿⣿⠟⠁⠀
    ⠀⠀⠀⠈⣽⣿⭐⠀⭐⣿⣯⠁⠀⠀⠀
    ⠀⠀⠀⣰⣿⣿⣷😮⣿⣿⣿⣆⠀⠀⠀
  `,
};

function Snowflake({ style }) {
  return (
    <div 
      className="absolute text-[oklch(0.9_0.05_220)] animate-pulse pointer-events-none"
      style={style}
    >
      ❄️
    </div>
  );
}

function AuroraBorealis() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, oklch(0.5 0.2 150 / 0.4), transparent),
            radial-gradient(ellipse 60% 40% at 80% 30%, oklch(0.5 0.25 330 / 0.3), transparent),
            radial-gradient(ellipse 70% 60% at 50% 80%, oklch(0.4 0.15 200 / 0.2), transparent)
          `,
          animation: 'aurora 8s ease-in-out infinite alternate',
        }}
      />
      <style>{`
        @keyframes aurora {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          100% { transform: translateY(-20px) scale(1.1); opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glitch {
          0%, 90%, 100% { opacity: 1; transform: translateX(0); }
          92% { opacity: 0.8; transform: translateX(-2px); }
          94% { opacity: 0.6; transform: translateX(2px); }
          96% { opacity: 0.9; transform: translateX(-1px); }
        }
      `}</style>
    </div>
  );
}

function WishCrystal({ wish, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="relative cursor-pointer group"
      style={{ animation: 'float 6s ease-in-out infinite', animationDelay: `${Math.random() * 3}s` }}
    >
      <div className="absolute inset-0 bg-[oklch(0.7_0.2_150_/_0.2)] blur-xl group-hover:bg-[oklch(0.7_0.25_330_/_0.3)] transition-all" />
      <div className="relative backdrop-blur-md bg-[linear-gradient(in_oklch,oklch(0.3_0.08_220_/_0.6),oklch(0.2_0.05_200_/_0.4))] border border-[oklch(0.7_0.1_220_/_0.5)] rounded-2xl p-4 hover:border-[oklch(0.8_0.15_330)] transition-all">
        <div className="text-2xl mb-2">💎</div>
        <p className="text-[oklch(0.9_0.05_220)] text-sm font-light line-clamp-2">{wish.content}</p>
        {wish.prophecy && (
          <div className="mt-3 pt-3 border-t border-[oklch(0.5_0.1_150_/_0.3)]">
            <p className="text-[oklch(0.7_0.15_150)] text-xs italic" style={{ animation: 'glitch 4s infinite' }}>
              {wish.prophecy}
            </p>
          </div>
        )}
        <div className="text-[oklch(0.5_0.05_220)] text-xs mt-2">
          {new Date(wish.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("winslow-oracle");
  const [walrusState, setWalrusState] = useState("idle");
  const [showProphecy, setShowProphecy] = useState(null);
  const [snowflakes] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${0.5 + Math.random() * 1.5}rem`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }))
  );

  const wishes = useLiveQuery("createdAt", { descending: true });
  const [wishDoc, setWishDoc, saveWish] = useDocument({ content: "", type: "wish" });

  const handleSubmitWish = async () => {
    if (!wishDoc.content.trim()) return;
    
    setWalrusState("thinking");
    
    // Simulate Winslow contemplating
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const prophecy = ORACLE_RESPONSES[Math.floor(Math.random() * ORACLE_RESPONSES.length)];
    
    await saveWish({
      ...wishDoc,
      prophecy,
      createdAt: Date.now(),
    });
    
    setWalrusState("excited");
    setShowProphecy(prophecy);
    
    setTimeout(() => {
      setWalrusState("idle");
      setWishDoc({ content: "", type: "wish" });
    }, 3000);
  };

  const handleDeleteWish = async (wish) => {
    const { useDocument: getDoc } = useFireproof("winslow-oracle");
    // For deletion, we'd need the database directly
  };

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.06_260)] relative overflow-hidden">
      <AuroraBorealis />
      
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <Snowflake key={flake.id} style={flake} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 
            className="text-4xl md:text-6xl font-bold bg-[linear-gradient(in_oklch,oklch(0.8_0.18_90),oklch(0.7_0.2_150),oklch(0.65_0.25_330))] bg-clip-text text-transparent"
            style={{ animation: 'glitch 10s infinite' }}
          >
            Winslow's Wish Oracle
          </h1>
          <p className="text-[oklch(0.7_0.1_220)] mt-2 italic">
            🐟 The mystical Arctic walrus awaits your Christmas wishes 🐟
          </p>
        </header>

        {/* Winslow the Walrus */}
        <div className="text-center mb-8">
          <pre className="inline-block text-[oklch(0.85_0.08_220)] text-xs md:text-sm font-mono leading-tight">
            {WALRUS_EXPRESSIONS[walrusState]}
          </pre>
          <div className="mt-2 text-[oklch(0.6_0.15_150)] italic text-sm">
            {walrusState === "idle" && "~ Winslow contemplates the frozen void ~"}
            {walrusState === "thinking" && "~ The ancient one communes with the sardine spirits ~"}
            {walrusState === "excited" && "~ A prophecy emerges from the deep! ~"}
          </div>
        </div>

        {/* Prophecy Display */}
        {showProphecy && (
          <div className="mb-8 p-6 backdrop-blur-lg bg-[linear-gradient(in_oklch,oklch(0.25_0.12_150_/_0.8),oklch(0.2_0.1_200_/_0.6))] rounded-3xl border border-[oklch(0.7_0.2_150_/_0.5)] text-center">
            <div className="text-3xl mb-3">🔮</div>
            <p className="text-[oklch(0.85_0.15_150)] text-lg italic" style={{ animation: 'glitch 3s infinite' }}>
              "{showProphecy}"
            </p>
            <button 
              onClick={() => setShowProphecy(null)}
              className="mt-4 text-[oklch(0.5_0.1_220)] hover:text-[oklch(0.7_0.15_330)] transition-colors"
            >
              ✧ dismiss prophecy ✧
            </button>
          </div>
        )}

        {/* Wish Input */}
        <div className="mb-12 p-6 backdrop-blur-md bg-[oklch(0.18_0.04_250_/_0.7)] rounded-3xl border border-[oklch(0.4_0.08_220_/_0.5)]">
          <label className="block text-[oklch(0.8_0.1_220)] mb-3 text-lg">
            ❄️ Whisper your Christmas wish to Winslow...
          </label>
          <textarea
            value={wishDoc.content}
            onChange={(e) => setWishDoc({ ...wishDoc, content: e.target.value })}
            placeholder="I wish for..."
            className="w-full p-4 rounded-xl bg-[oklch(0.1_0.03_250)] border border-[oklch(0.3_0.05_220)] text-[oklch(0.9_0.05_220)] placeholder-[oklch(0.4_0.05_220)] focus:outline-none focus:border-[oklch(0.7_0.2_150)] transition-colors resize-none"
            rows={3}
            disabled={walrusState !== "idle"}
          />
          <button
            onClick={handleSubmitWish}
            disabled={!wishDoc.content.trim() || walrusState !== "idle"}
            className="mt-4 w-full py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-[linear-gradient(in_oklch,oklch(0.55_0.22_25),oklch(0.45_0.2_15))] hover:bg-[linear-gradient(in_oklch,oklch(0.6_0.25_25),oklch(0.5_0.22_15))] text-white shadow-lg shadow-[oklch(0.4_0.2_25_/_0.3)]"
          >
            {walrusState === "thinking" ? "🐟 Winslow is contemplating... 🐟" : "🎄 Offer Wish to Winslow 🎄"}
          </button>
        </div>

        {/* Wishes Gallery */}
        <div>
          <h2 className="text-2xl font-bold text-[oklch(0.8_0.12_220)] mb-6 text-center">
            ✨ Crystallized Wishes ✨
          </h2>
          {wishes.docs.length === 0 ? (
            <p className="text-center text-[oklch(0.5_0.08_220)] italic">
              No wishes yet... Be the first to consult the oracle!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.docs.map((wish) => (
                <WishCrystal 
                  key={wish._id} 
                  wish={wish} 
                  onClick={() => setShowProphecy(wish.prophecy)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-[oklch(0.4_0.06_220)] text-sm">
          <p>🐟 Feed Winslow sardines for extra prophetic accuracy 🐟</p>
          <p className="mt-1 italic">Est. Before Time • Arctic Circle Division</p>
        </footer>
      </div>
    </div>
  );
}