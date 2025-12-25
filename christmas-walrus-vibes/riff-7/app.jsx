/*BUSINESS
name: Wally's Winter Workshop
pitch: Learn festive facts with Professor Wally Whiskers, your jolly walrus tutor
customer: Families and students who want fun, holiday-themed educational content
revenue: Freemium with premium card packs for $2.99 each
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

function WallyAvatar({ mood = "happy", size = "large" }) {
  const sizeClass = size === "large" ? "w-48 h-48" : "w-24 h-24";
  return (
    <svg viewBox="0 0 200 200" className={sizeClass}>
      {/* Santa Hat */}
      <ellipse cx="100" cy="45" rx="55" ry="15" fill="oklch(0.45 0.2 25)" />
      <path d="M45 45 Q100 -20 155 45 L130 45 Q100 10 70 45 Z" fill="oklch(0.45 0.2 25)" />
      <circle cx="155" cy="25" r="12" fill="oklch(0.98 0.01 250)" />
      <rect x="40" y="40" width="120" height="15" rx="7" fill="oklch(0.98 0.01 250)" />
      
      {/* Walrus Face */}
      <ellipse cx="100" cy="110" rx="60" ry="50" fill="oklch(0.65 0.08 40)" />
      
      {/* Cheeks */}
      <ellipse cx="60" cy="120" rx="25" ry="20" fill="oklch(0.7 0.1 35)" />
      <ellipse cx="140" cy="120" rx="25" ry="20" fill="oklch(0.7 0.1 35)" />
      
      {/* Eyes */}
      <ellipse cx="75" cy="95" rx="12" ry="14" fill="oklch(0.98 0.01 250)" />
      <ellipse cx="125" cy="95" rx="12" ry="14" fill="oklch(0.98 0.01 250)" />
      <circle cx="77" cy="97" r="6" fill="oklch(0.2 0.05 260)" />
      <circle cx="127" cy="97" r="6" fill="oklch(0.2 0.05 260)" />
      <circle cx="79" cy="94" r="2" fill="oklch(0.98 0.01 250)" />
      <circle cx="129" cy="94" r="2" fill="oklch(0.98 0.01 250)" />
      
      {/* Glasses */}
      <circle cx="75" cy="95" r="18" fill="none" stroke="oklch(0.35 0.05 50)" strokeWidth="3" />
      <circle cx="125" cy="95" r="18" fill="none" stroke="oklch(0.35 0.05 50)" strokeWidth="3" />
      <path d="M93 95 L107 95" stroke="oklch(0.35 0.05 50)" strokeWidth="3" />
      
      {/* Snout/Whisker Area */}
      <ellipse cx="100" cy="130" rx="35" ry="25" fill="oklch(0.75 0.06 45)" />
      
      {/* Nose */}
      <ellipse cx="100" cy="118" rx="8" ry="6" fill="oklch(0.25 0.05 20)" />
      
      {/* Whisker Dots */}
      {[0, 1, 2].map(i => (
        <React.Fragment key={i}>
          <circle cx={70 + i * 8} cy={130 + (i === 1 ? 5 : 0)} r="3" fill="oklch(0.5 0.05 40)" />
          <circle cx={122 + i * 8} cy={130 + (i === 1 ? 5 : 0)} r="3" fill="oklch(0.5 0.05 40)" />
        </React.Fragment>
      ))}
      
      {/* Tusks */}
      <path d="M75 145 Q70 175 75 190" stroke="oklch(0.95 0.02 90)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M125 145 Q130 175 125 190" stroke="oklch(0.95 0.02 90)" strokeWidth="8" strokeLinecap="round" fill="none" />
      
      {/* Scarf */}
      <path d="M40 155 Q100 175 160 155 Q165 165 160 175 Q100 195 40 175 Q35 165 40 155" fill="oklch(0.4 0.15 145)" />
      <rect x="90" y="170" width="20" height="30" rx="3" fill="oklch(0.4 0.15 145)" />
      <rect x="85" y="170" width="30" height="8" rx="2" fill="oklch(0.45 0.2 25)" />
      
      {/* Mouth expression based on mood */}
      {mood === "happy" && (
        <path d="M85 140 Q100 150 115 140" stroke="oklch(0.3 0.05 20)" strokeWidth="2" fill="none" />
      )}
      {mood === "thinking" && (
        <ellipse cx="100" cy="142" rx="5" ry="4" fill="oklch(0.3 0.05 20)" />
      )}
      {mood === "celebrating" && (
        <path d="M80 138 Q100 155 120 138" stroke="oklch(0.3 0.05 20)" strokeWidth="3" fill="none" />
      )}
    </svg>
  );
}

function Snowflakes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white opacity-60 animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${10 + Math.random() * 15}px`,
          }}
        >
          ❄
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall { animation: fall linear infinite; }
      `}</style>
    </div>
  );
}

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? "text-[oklch(0.75_0.15_85)]" : "text-[oklch(0.4_0.02_250)]"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("wally-workshop");
  const [mode, setMode] = useState("home");
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cards = useLiveQuery("type", { key: "flashcard" });
  const stats = useLiveQuery("type", { key: "stats" });

  const [newCard, setNewCard, saveNewCard] = useDocument({
    _id: `card-${Date.now()}`,
    type: "flashcard",
    question: "",
    answer: "",
    category: "winter",
    created: new Date().toISOString(),
  });

  const [userStats, setUserStats, saveUserStats] = useDocument(() => ({
    _id: "user-stats",
    type: "stats",
    totalQuizzes: 0,
    correctAnswers: 0,
    streak: 0,
    lastPlayed: null,
  }));

  const categories = [
    { id: "winter", label: "❄️ Winter Facts", color: "oklch(0.6 0.1 220)" },
    { id: "animals", label: "🦭 Arctic Animals", color: "oklch(0.5 0.12 180)" },
    { id: "holidays", label: "🎄 Holiday Traditions", color: "oklch(0.45 0.15 145)" },
    { id: "science", label: "🔬 Winter Science", color: "oklch(0.55 0.1 280)" },
  ];

  const filteredCards = selectedCategory === "all" 
    ? cards.docs 
    : cards.docs.filter(c => c.category === selectedCategory);

  const handleSaveCard = async () => {
    if (newCard.question && newCard.answer) {
      await saveNewCard();
      setNewCard({
        _id: `card-${Date.now()}`,
        type: "flashcard",
        question: "",
        answer: "",
        category: "winter",
        created: new Date().toISOString(),
      });
    }
  };

  const handleDeleteCard = async (card) => {
    const { useDocument: getDoc } = useFireproof("wally-workshop");
    await useFireproof("wally-workshop").database.del(card._id);
  };

  const startQuiz = () => {
    if (filteredCards.length > 0) {
      setMode("quiz");
      setQuizIndex(0);
      setShowAnswer(false);
      setQuizScore(0);
    }
  };

  const handleQuizAnswer = async (correct) => {
    if (correct) setQuizScore(s => s + 1);
    
    if (quizIndex < filteredCards.length - 1) {
      setQuizIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      const finalScore = correct ? quizScore + 1 : quizScore;
      setUserStats({
        ...userStats,
        totalQuizzes: (userStats.totalQuizzes || 0) + 1,
        correctAnswers: (userStats.correctAnswers || 0) + finalScore,
        streak: finalScore === filteredCards.length ? (userStats.streak || 0) + 1 : 0,
        lastPlayed: new Date().toISOString(),
      });
      await saveUserStats();
      setMode("results");
    }
  };

  const currentCard = filteredCards[quizIndex];

  const wallyMood = mode === "results" && quizScore === filteredCards.length 
    ? "celebrating" 
    : mode === "quiz" 
      ? "thinking" 
      : "happy";

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.12_0.04_260),oklch(0.18_0.06_240)_50%,oklch(0.15_0.05_200))] p-4 relative overflow-hidden">
      <Snowflakes />
      
      {/* Header */}
      <header className="relative z-10 text-center mb-6">
        <div className="flex items-center justify-center gap-4">
          <WallyAvatar mood={wallyMood} size="large" />
          <div>
            <h1 className="text-4xl font-bold text-[oklch(0.95_0.02_90)] drop-shadow-lg">
              🎄 Wally's Winter Workshop 🎄
            </h1>
            <p className="text-[oklch(0.85_0.08_220)] text-lg mt-1">
              Learn with Professor Wally Whiskers!
            </p>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="mt-4 flex justify-center gap-6 text-[oklch(0.9_0.03_250)]">
          <div className="bg-[oklch(0.2_0.05_250)]/50 px-4 py-2 rounded-full">
            📚 {cards.docs.length} Cards
          </div>
          <div className="bg-[oklch(0.2_0.05_250)]/50 px-4 py-2 rounded-full">
            🎯 {userStats.correctAnswers || 0} Correct
          </div>
          <div className="bg-[oklch(0.2_0.05_250)]/50 px-4 py-2 rounded-full">
            🔥 {userStats.streak || 0} Streak
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-center gap-4 mb-6">
        {["home", "create", "study"].map(tab => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              mode === tab || (mode === "quiz" && tab === "study") || (mode === "results" && tab === "study")
                ? "bg-[oklch(0.45_0.2_25)] text-white shadow-lg"
                : "bg-[oklch(0.25_0.05_250)] text-[oklch(0.85_0.05_250)] hover:bg-[oklch(0.3_0.06_250)]"
            }`}
          >
            {tab === "home" && "🏠 Home"}
            {tab === "create" && "✏️ Create"}
            {tab === "study" && "📖 Study"}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto">
        
        {/* Home Mode */}
        {mode === "home" && (
          <div className="space-y-6">
            <div className="bg-[linear-gradient(in_oklch,oklch(0.95_0.02_250),oklch(0.9_0.03_220))] rounded-3xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <WallyAvatar mood="happy" size="small" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[oklch(0.25_0.05_250)] mb-2">
                    Welcome to Winter Learning!
                  </h2>
                  <p className="text-[oklch(0.4_0.05_250)]">
                    Ho ho ho! I'm Professor Wally Whiskers, and I'm here to make learning 
                    as fun as a snowball fight! Create flashcards, test your knowledge, 
                    and earn stars along the way. Let's get started!
                  </p>
                </div>
              </div>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-2 gap-4">
              {categories.map(cat => {
                const catCards = cards.docs.filter(c => c.category === cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setMode("study");
                    }}
                    className="p-4 rounded-2xl text-left transition-all transform hover:scale-105 hover:shadow-xl"
                    style={{ backgroundColor: cat.color }}
                  >
                    <div className="text-2xl mb-2">{cat.label}</div>
                    <div className="text-white/80">{catCards.length} cards</div>
                  </button>
                );
              })}
            </div>

            {/* Recent Activity */}
            {cards.docs.length > 0 && (
              <div className="bg-[oklch(0.2_0.06_250)]/80 rounded-2xl p-4">
                <h3 className="text-[oklch(0.9_0.03_250)] font-semibold mb-3">📚 Recent Cards</h3>
                <div className="space-y-2">
                  {cards.docs.slice(-3).reverse().map(card => (
                    <div key={card._id} className="bg-[oklch(0.25_0.05_250)] p-3 rounded-xl text-[oklch(0.85_0.05_250)]">
                      <span className="mr-2">{categories.find(c => c.id === card.category)?.label.split(" ")[0]}</span>
                      {card.question}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Mode */}
        {mode === "create" && (
          <div className="bg-[linear-gradient(in_oklch,oklch(0.95_0.02_250),oklch(0.9_0.03_220))] rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <WallyAvatar mood="happy" size="small" />
              <div>
                <h2 className="text-2xl font-bold text-[oklch(0.25_0.05_250)]">
                  Create a New Flashcard
                </h2>
                <p className="text-[oklch(0.5_0.05_250)]">
                  Share your winter wisdom!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[oklch(0.35_0.05_250)] font-semibold mb-2">
                  📂 Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setNewCard({ ...newCard, category: cat.id })}
                      className={`px-4 py-2 rounded-full transition-all ${
                        newCard.category === cat.id
                          ? "text-white shadow-md"
                          : "bg-[oklch(0.85_0.03_250)] text-[oklch(0.4_0.05_250)]"
                      }`}
                      style={newCard.category === cat.id ? { backgroundColor: cat.color } : {}}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[oklch(0.35_0.05_250)] font-semibold mb-2">
                  ❓ Question
                </label>
                <textarea
                  value={newCard.question}
                  onChange={e => setNewCard({ ...newCard, question: e.target.value })}
                  placeholder="What would you like to learn about?"
                  className="w-full p-4 rounded-xl border-2 border-[oklch(0.8_0.05_250)] focus:border-[oklch(0.45_0.2_25)] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-[oklch(0.35_0.05_250)] font-semibold mb-2">
                  💡 Answer
                </label>
                <textarea
                  value={newCard.answer}
                  onChange={e => setNewCard({ ...newCard, answer: e.target.value })}
                  placeholder="The answer to your question..."
                  className="w-full p-4 rounded-xl border-2 border-[oklch(0.8_0.05_250)] focus:border-[oklch(0.4_0.15_145)] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSaveCard}
                disabled={!newCard.question || !newCard.answer}
                className="w-full py-4 bg-[oklch(0.4_0.15_145)] text-white font-bold text-lg rounded-xl hover:bg-[oklch(0.45_0.17_145)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                🎁 Add to Workshop
              </button>
            </div>
          </div>
        )}

        {/* Study Mode */}
        {mode === "study" && (
          <div className="space-y-6">
            <div className="bg-[oklch(0.2_0.06_250)]/80 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[oklch(0.9_0.03_250)]">
                  📚 Your Flashcards
                </h2>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="bg-[oklch(0.25_0.05_250)] text-[oklch(0.9_0.03_250)] px-4 py-2 rounded-xl"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {filteredCards.length === 0 ? (
                <div className="text-center py-8 text-[oklch(0.7_0.05_250)]">
                  <p className="text-4xl mb-4">📝</p>
                  <p>No flashcards yet! Create some to get started.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {filteredCards.map(card => (
                      <div
                        key={card._id}
                        className="bg-[oklch(0.25_0.05_250)] p-4 rounded-xl"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-sm px-2 py-1 rounded-full mr-2" 
                              style={{ backgroundColor: categories.find(c => c.id === card.category)?.color }}>
                              {categories.find(c => c.id === card.category)?.label.split(" ")[0]}
                            </span>
                            <p className="text-[oklch(0.9_0.03_250)] font-medium mt-2">{card.question}</p>
                            <p className="text-[oklch(0.6_0.05_250)] text-sm mt-1">{card.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={startQuiz}
                    className="w-full py-4 bg-[oklch(0.45_0.2_25)] text-white font-bold text-lg rounded-xl hover:bg-[oklch(0.5_0.22_25)] transition-all transform hover:scale-[1.02]"
                  >
                    🎯 Start Quiz ({filteredCards.length} cards)
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Quiz Mode */}
        {mode === "quiz" && currentCard && (
          <div className="bg-[linear-gradient(in_oklch,oklch(0.95_0.02_250),oklch(0.9_0.03_220))] rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[oklch(0.5_0.05_250)]">
                Card {quizIndex + 1} of {filteredCards.length}
              </span>
              <span className="text-[oklch(0.4_0.15_145)] font-bold">
                Score: {quizScore}/{quizIndex}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-[oklch(0.85_0.03_250)] rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-[linear-gradient(90deg,oklch(0.45_0.2_25),oklch(0.4_0.15_145))] transition-all"
                style={{ width: `${((quizIndex + 1) / filteredCards.length) * 100}%` }}
              />
            </div>

            <div className="text-center">
              <div className="mb-4">
                <WallyAvatar mood="thinking" size="small" />
              </div>
              
              <div className="bg-[oklch(0.98_0.01_250)] p-6 rounded-2xl shadow-inner mb-6">
                <p className="text-xl text-[oklch(0.25_0.05_250)] font-medium">
                  {currentCard.question}
                </p>
              </div>

              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-8 py-4 bg-[oklch(0.6_0.1_220)] text-white font-bold rounded-xl hover:bg-[oklch(0.55_0.12_220)] transition-all"
                >
                  🔮 Reveal Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[oklch(0.4_0.15_145)]/20 p-6 rounded-2xl border-2 border-[oklch(0.4_0.15_145)]">
                    <p className="text-lg text-[oklch(0.3_0.1_145)] font-medium">
                      {currentCard.answer}
                    </p>
                  </div>
                  
                  <p className="text-[oklch(0.5_0.05_250)]">Did you get it right?</p>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleQuizAnswer(false)}
                      className="px-8 py-3 bg-[oklch(0.45_0.2_25)] text-white font-bold rounded-xl hover:bg-[oklch(0.5_0.22_25)] transition-all"
                    >
                      ❌ Not quite
                    </button>
                    <button
                      onClick={() => handleQuizAnswer(true)}
                      className="px-8 py-3 bg-[oklch(0.4_0.15_145)] text-white font-bold rounded-xl hover:bg-[oklch(0.45_0.17_145)] transition-all"
                    >
                      ✅ Got it!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Mode */}
        {mode === "results" && (
          <div className="bg-[linear-gradient(in_oklch,oklch(0.95_0.02_250),oklch(0.9_0.03_220))] rounded-3xl p-6 shadow-xl text-center">
            <WallyAvatar mood={quizScore === filteredCards.length ? "celebrating" : "happy"} size="large" />
            
            <h2 className="text-3xl font-bold text-[oklch(0.25_0.05_250)] mt-4 mb-2">
              {quizScore === filteredCards.length ? "🎉 Perfect Score! 🎉" : "Great Effort!"}
            </h2>
            
            <p className="text-6xl font-bold text-[oklch(0.4_0.15_145)] my-6">
              {quizScore} / {filteredCards.length}
            </p>
            
            <div className="flex justify-center mb-6">
              <StarRating count={Math.round((quizScore / filteredCards.length) * 5)} />
            </div>

            <p className="text-[oklch(0.5_0.05_250)] mb-6">
              {quizScore === filteredCards.length
                ? "Outstanding! You're a true winter scholar! Professor Wally is so proud!"
                : quizScore >= filteredCards.length / 2
                  ? "Well done! Keep practicing and you'll master these soon!"
                  : "Don't give up! Every snowflake starts as a tiny crystal. Try again!"}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setMode("study")}
                className="px-6 py-3 bg-[oklch(0.25_0.05_250)] text-[oklch(0.9_0.03_250)] font-bold rounded-xl hover:bg-[oklch(0.3_0.06_250)] transition-all"
              >
                📚 Back to Cards
              </button>
              <button
                onClick={startQuiz}
                className="px-6 py-3 bg-[oklch(0.45_0.2_25)] text-white font-bold rounded-xl hover:bg-[oklch(0.5_0.22_25)] transition-all"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center mt-8 text-[oklch(0.6_0.05_250)]">
        <p>Made with 💙 by Professor Wally Whiskers</p>
        <p className="text-sm mt-1">🎄 Happy Holidays from the Winter Workshop! 🎄</p>
      </footer>
    </div>
  );
}