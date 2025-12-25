/*BUSINESS
name: Bartholomew's Arctic Wish Emporium
pitch: Submit your Christmas wishes to a distinguished Victorian walrus who rates them with impeccable taste
customer: Whimsical holiday enthusiasts seeking absurdist joy
revenue: Free tier with premium "Golden Tusk" wish priority at $2.99
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

const WALRUS_RESPONSES = [
  "Ah, most splendid! I shall dispatch my finest arctic elves posthaste!",
  "Hmm, rather pedestrian, but I shall see what can be arranged.",
  "By my magnificent tusks! This wish shows exceptional taste!",
  "I say, how delightfully peculiar. Consider it noted in the Tusk Archives.",
  "Exquisite! This shall receive priority handling via penguin express.",
  "Jolly good! Though I must consult with the Council of Seals first.",
  "How wonderfully absurd! I approve most enthusiastically!",
  "Capital! I shall freeze this wish in the finest glacier for safekeeping.",
];

const TUSK_RATINGS = ["🦭", "🦭🦭", "🦭🦭🦭", "🦭🦭🦭🦭", "🦭🦭🦭🦭🦭"];

function Snowflake({ style }) {
  return (
    <div 
      className="absolute text-white/30 animate-pulse pointer-events-none select-none"
      style={style}
    >
      ❄
    </div>
  );
}

function WalrusCharacter({ mood }) {
  const expressions = {
    idle: "◕",
    happy: "◠",
    thinking: "◔",
    excited: "★",
  };
  
  const eye = expressions[mood] || expressions.idle;
  
  return (
    <div className="text-center mb-8 select-none">
      {/* Santa Hat */}
      <div className="text-4xl mb-[-20px] relative z-10">
        <span className="inline-block animate-bounce" style={{ animationDuration: '3s' }}>🎅</span>
      </div>
      
      {/* Walrus Face - ASCII/Emoji Hybrid */}
      <div className="bg-[oklch(0.45_0.08_50)] rounded-full w-48 h-36 mx-auto relative overflow-hidden shadow-2xl border-4 border-[oklch(0.35_0.06_50)]">
        {/* Monocle */}
        <div className="absolute top-6 right-8 w-8 h-8 rounded-full border-2 border-[oklch(0.85_0.15_85)] bg-white/20">
          <div className="absolute -right-4 top-3 w-6 h-0.5 bg-[oklch(0.85_0.15_85)]" />
        </div>
        
        {/* Eyes */}
        <div className="flex justify-center gap-12 pt-6">
          <div className="text-2xl text-[oklch(0.2_0.05_250)]">{eye}</div>
          <div className="text-2xl text-[oklch(0.2_0.05_250)]">{eye}</div>
        </div>
        
        {/* Magnificent Whiskers/Mustache */}
        <div className="flex justify-center mt-2">
          <div className="text-[oklch(0.9_0.05_200)] text-xl tracking-widest">
            ≋≋≋ • ≋≋≋
          </div>
        </div>
        
        {/* Tusks */}
        <div className="flex justify-center gap-6 mt-1">
          <div className="w-3 h-12 bg-[oklch(0.95_0.02_80)] rounded-b-full transform -rotate-12 shadow-lg" />
          <div className="w-3 h-12 bg-[oklch(0.95_0.02_80)] rounded-b-full transform rotate-12 shadow-lg" />
        </div>
      </div>
      
      {/* Name Plate */}
      <div className="mt-4 inline-block bg-[oklch(0.25_0.05_250)] px-6 py-2 rounded-lg border border-[oklch(0.85_0.15_85)]">
        <p className="text-[oklch(0.85_0.15_85)] font-serif text-lg tracking-wide">
          Bartholomew Tuskington III
        </p>
        <p className="text-[oklch(0.7_0.1_195)] text-xs italic">
          Chief Wish Evaluator & Distinguished Pinniped
        </p>
      </div>
    </div>
  );
}

function WishCard({ wish, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-[linear-gradient(in_oklch,oklch(0.25_0.08_200),oklch(0.2_0.06_220))] 
                 rounded-xl p-4 border border-[oklch(0.5_0.1_195)]/30 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[oklch(0.85_0.15_85)] text-sm">
          {wish.tuskRating}
        </span>
        <button
          onClick={() => onDelete(wish._id)}
          className="text-[oklch(0.5_0.15_25)] hover:text-[oklch(0.7_0.2_25)] transition-colors"
        >
          ✕
        </button>
      </div>
      
      <p className="text-[oklch(0.95_0.02_250)] mb-3 font-medium">
        "{wish.text}"
      </p>
      
      <div className="border-t border-[oklch(0.5_0.1_195)]/20 pt-3 mt-3">
        <p className="text-[oklch(0.7_0.1_195)] text-sm italic font-serif">
          🎩 "{wish.response}"
        </p>
      </div>
      
      <div className="text-[oklch(0.5_0.08_250)] text-xs mt-2">
        Submitted: {new Date(wish.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument, database } = useFireproof("bartholomews-emporium");
  const wishes = useLiveQuery("createdAt", { descending: true });
  const [doc, setDoc, saveDoc] = useDocument({ text: "", type: "wish" });
  const [walrusMood, setWalrusMood] = useState("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);
  
  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setSnowflakes(flakes);
  }, []);
  
  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!doc.text.trim()) return;
    
    setIsProcessing(true);
    setWalrusMood("thinking");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = WALRUS_RESPONSES[Math.floor(Math.random() * WALRUS_RESPONSES.length)];
    const rating = TUSK_RATINGS[Math.floor(Math.random() * TUSK_RATINGS.length)];
    
    setWalrusMood("excited");
    
    await database.put({
      text: doc.text,
      response: response,
      tuskRating: rating,
      createdAt: Date.now(),
      type: "wish",
    });
    
    setDoc({ text: "", type: "wish" });
    
    setTimeout(() => {
      setWalrusMood("happy");
      setIsProcessing(false);
    }, 500);
    
    setTimeout(() => setWalrusMood("idle"), 3000);
  };
  
  const handleDeleteWish = async (id) => {
    await database.del(id);
  };
  
  const wishDocs = wishes.docs.filter(d => d.type === "wish");
  
  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch_180deg,oklch(0.12_0.06_280),oklch(0.08_0.04_250),oklch(0.15_0.08_200))] p-4 relative overflow-hidden">
      {/* Aurora Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(in_oklch_45deg,transparent,oklch(0.3_0.15_150)/10,oklch(0.4_0.2_280)/10,transparent)] pointer-events-none" />
      
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
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-serif text-[oklch(0.95_0.02_250)] mb-2">
            ❄ Arctic Wish Emporium ❄
          </h1>
          <p className="text-[oklch(0.7_0.1_195)] italic">
            "Where Distinguished Pinnipeds Process Your Holiday Dreams"
          </p>
        </div>
        
        {/* Walrus Character */}
        <WalrusCharacter mood={walrusMood} />
        
        {/* Wish Input Form */}
        <form onSubmit={handleSubmitWish} className="mb-8">
          <div className="bg-[oklch(0.2_0.05_250)]/80 backdrop-blur-sm rounded-xl p-6 border border-[oklch(0.5_0.1_195)]/30">
            <label className="block text-[oklch(0.85_0.15_85)] font-serif mb-3">
              Submit Your Christmas Wish for Evaluation:
            </label>
            <textarea
              value={doc.text}
              onChange={(e) => setDoc({ ...doc, text: e.target.value })}
              placeholder="I wish for..."
              className="w-full bg-[oklch(0.15_0.04_250)] text-[oklch(0.95_0.02_250)] 
                         rounded-lg p-4 border border-[oklch(0.4_0.1_195)]/30 
                         focus:border-[oklch(0.85_0.15_85)] focus:outline-none
                         placeholder:text-[oklch(0.5_0.05_250)] resize-none"
              rows={3}
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={isProcessing || !doc.text.trim()}
              className="mt-4 w-full bg-[linear-gradient(in_oklch,oklch(0.5_0.2_25),oklch(0.4_0.18_15))] 
                         text-white font-serif py-3 px-6 rounded-lg
                         hover:bg-[linear-gradient(in_oklch,oklch(0.55_0.22_25),oklch(0.45_0.2_15))]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 transform hover:scale-[1.02]
                         border border-[oklch(0.6_0.2_25)]/30"
            >
              {isProcessing ? "🎩 Evaluating Your Wish..." : "🦭 Submit for Tusk Approval"}
            </button>
          </div>
        </form>
        
        {/* Wishes Grid */}
        <div className="space-y-4">
          <h2 className="text-[oklch(0.85_0.15_85)] font-serif text-xl flex items-center gap-2">
            <span>📜</span> The Tusk Archives
            <span className="text-sm text-[oklch(0.6_0.08_250)]">
              ({wishDocs.length} wishes evaluated)
            </span>
          </h2>
          
          {wishDocs.length === 0 ? (
            <div className="text-center py-12 text-[oklch(0.6_0.08_250)]">
              <p className="font-serif italic">
                "The archives await your first wish, dear visitor."
              </p>
              <p className="text-sm mt-2">— Bartholomew</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {wishDocs.map(wish => (
                <WishCard 
                  key={wish._id} 
                  wish={wish} 
                  onDelete={handleDeleteWish}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-[oklch(0.5_0.05_250)] text-sm">
          <p>Est. 1847 • Operated from the Finest Arctic Ice Floe</p>
          <p className="mt-1">🎄 Merry Christmas from the Emporium 🎄</p>
        </div>
      </div>
    </div>
  );
}