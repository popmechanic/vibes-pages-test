/*BUSINESS
name: Bartholomew's Wish Granting Bureau
pitch: Submit your Christmas wishes to an eccentric aristocratic walrus for pompous evaluation and potential fulfillment
customer: Whimsical holiday enthusiasts who appreciate absurdist humor
revenue: Free tier with 3 wishes, Premium "Platinum Tusk" membership $4.99/month for unlimited wishes
*/
import React, { useState, useEffect } from "react";
import { useFireproof } from "use-fireproof";

function BartholomewWalrus({ mood, onClick }) {
  const moodExpressions = {
    pleased: "M 60 75 Q 75 85 90 75",
    pondering: "M 60 78 L 90 78",
    delighted: "M 55 70 Q 75 90 95 70",
    skeptical: "M 60 80 Q 75 72 90 80"
  };

  return (
    <svg 
      viewBox="0 0 150 180" 
      className="w-48 h-56 cursor-pointer transition-transform hover:scale-105 active:scale-95"
      onClick={onClick}
    >
      {/* Body */}
      <ellipse cx="75" cy="140" rx="55" ry="35" fill="oklch(0.45 0.08 200)" />
      
      {/* Head */}
      <ellipse cx="75" cy="85" rx="45" ry="40" fill="oklch(0.5 0.1 200)" />
      
      {/* Snout/Nose area */}
      <ellipse cx="75" cy="95" rx="30" ry="20" fill="oklch(0.55 0.08 200)" />
      
      {/* Nose */}
      <ellipse cx="75" cy="88" rx="8" ry="6" fill="oklch(0.25 0.05 20)" />
      
      {/* Whisker dots */}
      {[55, 65, 85, 95].map((x, i) => (
        <circle key={i} cx={x} cy="98" r="3" fill="oklch(0.35 0.05 200)" />
      ))}
      {[50, 60, 90, 100].map((x, i) => (
        <circle key={i} cx={x} cy="105" r="2.5" fill="oklch(0.35 0.05 200)" />
      ))}
      
      {/* Fancy curled mustache whiskers */}
      <path d="M 45 100 Q 30 95 25 105 Q 20 115 30 112" stroke="oklch(0.3 0.05 200)" strokeWidth="2" fill="none" />
      <path d="M 105 100 Q 120 95 125 105 Q 130 115 120 112" stroke="oklch(0.3 0.05 200)" strokeWidth="2" fill="none" />
      
      {/* Tusks */}
      <path d="M 55 105 Q 50 135 55 155" stroke="oklch(0.85 0.12 85)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 95 105 Q 100 135 95 155" stroke="oklch(0.85 0.12 85)" strokeWidth="8" strokeLinecap="round" fill="none" />
      
      {/* Eyes */}
      <circle cx="55" cy="70" r="8" fill="white" />
      <circle cx="95" cy="70" r="8" fill="white" />
      <circle cx="57" cy="70" r="4" fill="oklch(0.2 0.05 250)" />
      <circle cx="97" cy="70" r="4" fill="oklch(0.2 0.05 250)" />
      <circle cx="58" cy="68" r="1.5" fill="white" />
      <circle cx="98" cy="68" r="1.5" fill="white" />
      
      {/* Monocle */}
      <circle cx="95" cy="70" r="12" stroke="oklch(0.7 0.15 85)" strokeWidth="2" fill="none" />
      <line x1="107" y1="70" x2="120" y2="90" stroke="oklch(0.7 0.15 85)" strokeWidth="1.5" />
      
      {/* Eyebrows */}
      <path d="M 45 60 Q 55 55 65 60" stroke="oklch(0.3 0.05 200)" strokeWidth="2" fill="none" />
      <path d="M 85 60 Q 95 55 105 60" stroke="oklch(0.3 0.05 200)" strokeWidth="2" fill="none" />
      
      {/* Mouth based on mood */}
      <path d={moodExpressions[mood] || moodExpressions.pleased} stroke="oklch(0.3 0.05 200)" strokeWidth="2" fill="none" />
      
      {/* Santa Hat */}
      <path d="M 30 55 Q 75 -10 120 55" fill="oklch(0.5 0.22 25)" />
      <ellipse cx="75" cy="55" rx="50" ry="8" fill="oklch(0.95 0.02 100)" />
      <circle cx="115" cy="10" r="10" fill="oklch(0.95 0.02 100)" />
      
      {/* Top hat ON the Santa hat (eccentric!) */}
      <rect x="60" y="15" width="30" height="25" fill="oklch(0.15 0.02 250)" />
      <rect x="55" y="38" width="40" height="5" fill="oklch(0.15 0.02 250)" />
      <rect x="60" y="35" width="30" height="5" fill="oklch(0.5 0.22 25)" />
      
      {/* Flippers/arms */}
      <ellipse cx="25" cy="130" rx="12" ry="25" fill="oklch(0.45 0.08 200)" transform="rotate(-20 25 130)" />
      <ellipse cx="125" cy="130" rx="12" ry="25" fill="oklch(0.45 0.08 200)" transform="rotate(20 125 130)" />
    </svg>
  );
}

function Snowflake({ style }) {
  return (
    <div 
      className="absolute text-white opacity-70 pointer-events-none animate-pulse"
      style={style}
    >
      ❄
    </div>
  );
}

function WishCard({ wish, onProcess, onDelete }) {
  const statusColors = {
    pending: "oklch(0.7 0.15 85)",
    approved: "oklch(0.6 0.2 145)",
    pondering: "oklch(0.6 0.18 280)",
    denied: "oklch(0.5 0.18 25)"
  };

  const statusEmoji = {
    pending: "📜",
    approved: "✨",
    pondering: "🧐",
    denied: "🎭"
  };

  return (
    <div 
      className="relative p-4 rounded-lg border-2 transition-all hover:scale-102"
      style={{
        background: "linear-gradient(in oklch, oklch(0.95 0.03 85), oklch(0.9 0.04 60))",
        borderColor: statusColors[wish.status] || statusColors.pending,
        boxShadow: `0 4px 20px ${statusColors[wish.status]}40`
      }}
    >
      <div className="absolute -top-3 -right-3 text-2xl">{statusEmoji[wish.status]}</div>
      
      <h3 className="font-serif text-lg font-bold" style={{ color: "oklch(0.25 0.05 250)" }}>
        {wish.title}
      </h3>
      
      <p className="mt-2 text-sm italic" style={{ color: "oklch(0.35 0.03 250)" }}>
        "{wish.description}"
      </p>
      
      {wish.bartholomewSays && (
        <div className="mt-3 p-2 rounded text-sm" style={{ background: "oklch(0.2 0.08 250)", color: "oklch(0.9 0.02 100)" }}>
          <span className="font-bold">Bartholomew decrees:</span> {wish.bartholomewSays}
        </div>
      )}
      
      <div className="mt-3 flex gap-2 flex-wrap">
        {wish.status === "pending" && (
          <>
            <button 
              onClick={() => onProcess(wish, "approved")}
              className="px-3 py-1 rounded text-xs font-bold transition-colors"
              style={{ background: "oklch(0.5 0.2 145)", color: "white" }}
            >
              Approve
            </button>
            <button 
              onClick={() => onProcess(wish, "pondering")}
              className="px-3 py-1 rounded text-xs font-bold transition-colors"
              style={{ background: "oklch(0.5 0.18 280)", color: "white" }}
            >
              Ponder
            </button>
            <button 
              onClick={() => onProcess(wish, "denied")}
              className="px-3 py-1 rounded text-xs font-bold transition-colors"
              style={{ background: "oklch(0.45 0.15 25)", color: "white" }}
            >
              Deny
            </button>
          </>
        )}
        <button 
          onClick={() => onDelete(wish)}
          className="px-3 py-1 rounded text-xs transition-colors"
          style={{ background: "oklch(0.3 0.05 250)", color: "oklch(0.8 0.02 100)" }}
        >
          Archive
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument, database } = useFireproof("bartholomew-wishes");
  
  const wishes = useLiveQuery("type", { key: "wish" });
  
  const [newWish, setNewWish, saveNewWish] = useDocument({ 
    title: "", 
    description: "", 
    type: "wish",
    status: "pending",
    bartholomewSays: "",
    createdAt: null
  });
  
  const [walrusMood, setWalrusMood] = useState("pleased");
  const [walrusQuote, setWalrusQuote] = useState("Welcome to my Bureau of Wish Fulfillment, dear supplicant!");
  const [snowflakes, setSnowflakes] = useState([]);

  const bartholomewResponses = {
    approved: [
      "Splendid! This wish has earned my distinguished approval. Consider it granted, posthaste!",
      "By my magnificent tusks, what a delightful request! Approved with great pleasure!",
      "Hmm, yes, quite acceptable. My elves shall see to this immediately!",
      "A wish worthy of my attention! Rubber-stamped with my finest ink!"
    ],
    pondering: [
      "Most curious... I must consult my ancient scrolls of wish precedent.",
      "Fascinating request. Let me adjust my monocle and deliberate further.",
      "This requires additional contemplation over a cup of Arctic tea.",
      "Intriguing! But I must ponder the metaphysical implications..."
    ],
    denied: [
      "I'm afraid this conflicts with Section 42-B of the Wish Codex. Denied!",
      "My dear fellow, even a walrus of my magnificence has limits. Regrettably denied.",
      "The Christmas spirits have whispered 'no' into my finely-tuned ears.",
      "Perhaps next year, when the stars align more favorably. Denied with sympathy!"
    ],
    click: [
      "Arf arf! Oh, pardon me. I meant to say 'Good day, citizen!'",
      "Please refrain from poking the aristocracy!",
      "These whiskers are not for touching, I'll have you know!",
      "Magnificent, isn't it? I wax my tusks daily.",
      "The monocle? A gift from the Penguin Emperor of Antarctica!",
      "My top hat upon a Santa hat? Fashion is about BOLDNESS!"
    ]
  };

  useEffect(() => {
    const flakes = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`
    }));
    setSnowflakes(flakes);
  }, []);

  const handleWalrusClick = () => {
    const quotes = bartholomewResponses.click;
    setWalrusQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const moods = ["pleased", "pondering", "delighted", "skeptical"];
    setWalrusMood(moods[Math.floor(Math.random() * moods.length)]);
  };

  const handleSubmitWish = async () => {
    if (!newWish.title.trim()) return;
    
    await saveNewWish({
      ...newWish,
      createdAt: Date.now()
    });
    
    setWalrusMood("delighted");
    setWalrusQuote("Ah, a new petition! Let me examine this with my keenest monocled eye...");
    
    setNewWish({ 
      title: "", 
      description: "", 
      type: "wish",
      status: "pending",
      bartholomewSays: "",
      createdAt: null
    });
  };

  const handleProcessWish = async (wish, newStatus) => {
    const responses = bartholomewResponses[newStatus];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    await database.put({
      ...wish,
      status: newStatus,
      bartholomewSays: response
    });
    
    setWalrusMood(newStatus === "approved" ? "delighted" : newStatus === "denied" ? "skeptical" : "pondering");
    setWalrusQuote(response);
  };

  const handleDeleteWish = async (wish) => {
    await database.del(wish._id);
    setWalrusQuote("Into the archives it goes! *stamps with official seal*");
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(in oklch 180deg, oklch(0.12 0.08 250), oklch(0.18 0.1 280), oklch(0.15 0.12 200))"
      }}
    >
      {/* Aurora effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(in oklch 45deg, oklch(0.4 0.2 160) 0%, transparent 40%, oklch(0.35 0.18 300) 60%, transparent 100%)"
        }}
      />
      
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <Snowflake key={flake.id} style={flake} />
      ))}
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 
            className="text-4xl font-serif font-bold mb-2"
            style={{ 
              color: "oklch(0.9 0.12 85)",
              textShadow: "0 2px 10px oklch(0.7 0.15 85 / 0.5)"
            }}
          >
            ✨ Bartholomew's Wish Granting Bureau ✨
          </h1>
          <p style={{ color: "oklch(0.8 0.08 200)" }} className="italic">
            "Where Distinguished Walrus Aristocracy Meets Christmas Magic"
          </p>
        </header>

        {/* Bartholomew Section */}
        <div className="flex flex-col items-center mb-8">
          <BartholomewWalrus mood={walrusMood} onClick={handleWalrusClick} />
          
          <div 
            className="mt-4 p-4 rounded-lg max-w-md text-center"
            style={{ 
              background: "oklch(0.2 0.05 250 / 0.8)",
              border: "2px solid oklch(0.7 0.15 85)"
            }}
          >
            <p 
              className="font-serif italic"
              style={{ color: "oklch(0.9 0.02 100)" }}
            >
              "{walrusQuote}"
            </p>
            <p 
              className="text-xs mt-2"
              style={{ color: "oklch(0.6 0.05 200)" }}
            >
              — Bartholomew Blubbersworth III, Esq.
            </p>
          </div>
        </div>

        {/* Wish Submission Form */}
        <div 
          className="p-6 rounded-xl mb-8"
          style={{
            background: "linear-gradient(in oklch, oklch(0.25 0.08 250), oklch(0.2 0.06 230))",
            border: "2px solid oklch(0.5 0.15 85)"
          }}
        >
          <h2 
            className="text-xl font-serif font-bold mb-4"
            style={{ color: "oklch(0.9 0.1 85)" }}
          >
            📜 Submit a Wish for Consideration
          </h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Wish Title (e.g., 'A Magnificent Sled')"
              value={newWish.title}
              onChange={(e) => setNewWish({ ...newWish, title: e.target.value })}
              className="w-full p-3 rounded-lg font-serif"
              style={{
                background: "oklch(0.95 0.03 85)",
                color: "oklch(0.2 0.05 250)",
                border: "2px solid oklch(0.7 0.1 85)"
              }}
            />
            
            <textarea
              placeholder="Describe your wish in detail. Bartholomew appreciates eloquence..."
              value={newWish.description}
              onChange={(e) => setNewWish({ ...newWish, description: e.target.value })}
              rows={3}
              className="w-full p-3 rounded-lg font-serif resize-none"
              style={{
                background: "oklch(0.95 0.03 85)",
                color: "oklch(0.2 0.05 250)",
                border: "2px solid oklch(0.7 0.1 85)"
              }}
            />
            
            <button
              onClick={handleSubmitWish}
              className="w-full p-3 rounded-lg font-bold font-serif transition-all hover:scale-102"
              style={{
                background: "linear-gradient(in oklch, oklch(0.5 0.22 25), oklch(0.45 0.2 30))",
                color: "white",
                boxShadow: "0 4px 15px oklch(0.5 0.2 25 / 0.4)"
              }}
            >
              🎄 Submit to the Bureau 🎄
            </button>
          </div>
        </div>

        {/* Wishes Grid */}
        <div>
          <h2 
            className="text-xl font-serif font-bold mb-4"
            style={{ color: "oklch(0.9 0.1 85)" }}
          >
            📋 Wishes Under Review ({wishes.docs.length})
          </h2>
          
          {wishes.docs.length === 0 ? (
            <div 
              className="text-center p-8 rounded-lg"
              style={{ background: "oklch(0.2 0.05 250 / 0.5)" }}
            >
              <p style={{ color: "oklch(0.7 0.05 200)" }} className="italic">
                No wishes yet. The Bureau awaits your petition!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {wishes.docs.map(wish => (
                <WishCard
                  key={wish._id}
                  wish={wish}
                  onProcess={handleProcessWish}
                  onDelete={handleDeleteWish}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p 
            className="text-sm"
            style={{ color: "oklch(0.5 0.05 200)" }}
          >
            🦭 Est. 1847 • "Excellence in Wish Evaluation Since the Great Iceberg Migration" 🦭
          </p>
        </footer>
      </div>
    </div>
  );
}