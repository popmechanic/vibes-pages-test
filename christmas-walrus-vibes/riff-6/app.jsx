/*BUSINESS
name: Waldo's Winter Wonderland Marketplace
pitch: Buy and sell festive treasures with Waldo the Wonderful Walrus, your jolly Arctic gift merchant
customer: Holiday shoppers and crafters looking for a fun, festive marketplace experience
revenue: 5% transaction fee on sales, premium "Golden Tusk" seller badges for $4.99/month
*/
import React, { useState } from "react";
import { useFireproof } from "use-fireproof";

function WaldoWalrus({ size = "large", mood = "happy" }) {
  const sizes = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32"
  };
  
  return (
    <svg viewBox="0 0 100 100" className={sizes[size]}>
      {/* Santa Hat */}
      <ellipse cx="50" cy="18" rx="8" ry="6" fill="oklch(0.95 0.02 200)" />
      <path d="M25 35 L50 5 L75 35 Z" fill="oklch(0.45 0.2 25)" />
      <ellipse cx="50" cy="35" rx="28" ry="6" fill="white" />
      
      {/* Walrus Head */}
      <ellipse cx="50" cy="55" rx="30" ry="25" fill="oklch(0.55 0.08 50)" />
      
      {/* Snout/Muzzle */}
      <ellipse cx="50" cy="65" rx="22" ry="15" fill="oklch(0.65 0.06 60)" />
      
      {/* Eyes */}
      <circle cx="38" cy="50" r="5" fill="oklch(0.15 0.02 260)" />
      <circle cx="62" cy="50" r="5" fill="oklch(0.15 0.02 260)" />
      <circle cx="39" cy="49" r="2" fill="white" />
      <circle cx="63" cy="49" r="2" fill="white" />
      
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="4" ry="3" fill="oklch(0.25 0.05 30)" />
      
      {/* Whisker dots */}
      <circle cx="35" cy="65" r="2" fill="oklch(0.45 0.05 50)" />
      <circle cx="30" cy="68" r="2" fill="oklch(0.45 0.05 50)" />
      <circle cx="33" cy="72" r="2" fill="oklch(0.45 0.05 50)" />
      <circle cx="65" cy="65" r="2" fill="oklch(0.45 0.05 50)" />
      <circle cx="70" cy="68" r="2" fill="oklch(0.45 0.05 50)" />
      <circle cx="67" cy="72" r="2" fill="oklch(0.45 0.05 50)" />
      
      {/* Tusks */}
      <path d="M38 70 L35 92 L40 90 Z" fill="oklch(0.92 0.03 85)" />
      <path d="M62 70 L65 92 L60 90 Z" fill="oklch(0.92 0.03 85)" />
      
      {/* Mouth - changes with mood */}
      {mood === "happy" && (
        <path d="M42 75 Q50 82 58 75" stroke="oklch(0.35 0.05 30)" strokeWidth="2" fill="none" />
      )}
      {mood === "excited" && (
        <ellipse cx="50" cy="76" rx="6" ry="4" fill="oklch(0.35 0.05 30)" />
      )}
    </svg>
  );
}

function Snowflake({ style }) {
  return (
    <span 
      className="absolute text-white/40 animate-pulse pointer-events-none select-none"
      style={style}
    >
      ❄️
    </span>
  );
}

export default function App() {
  const { useLiveQuery, useDocument } = useFireproof("waldos-marketplace");
  const [activeView, setActiveView] = useState("browse");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { docs: listings } = useLiveQuery("type", { key: "listing" });
  const [newListing, setNewListing, saveNewListing] = useDocument({ 
    type: "listing",
    title: "",
    description: "",
    price: "",
    category: "toys",
    seller: "",
    createdAt: null
  });

  const categories = [
    { id: "all", name: "All Treasures", icon: "🎁" },
    { id: "toys", name: "Toys & Games", icon: "🧸" },
    { id: "decorations", name: "Decorations", icon: "🎄" },
    { id: "treats", name: "Treats & Goodies", icon: "🍪" },
    { id: "handmade", name: "Handcrafted", icon: "🧶" },
    { id: "clothing", name: "Cozy Clothing", icon: "🧣" }
  ];

  const filteredListings = selectedCategory === "all" 
    ? listings 
    : listings.filter(l => l.category === selectedCategory);

  const handleSubmitListing = async () => {
    if (!newListing.title || !newListing.price || !newListing.seller) return;
    
    setNewListing({ 
      ...newListing, 
      createdAt: Date.now() 
    });
    await saveNewListing();
    setNewListing({
      type: "listing",
      title: "",
      description: "",
      price: "",
      category: "toys",
      seller: "",
      createdAt: null
    });
    setActiveView("browse");
  };

  const handlePurchase = async (listing) => {
    const confirmed = window.confirm(
      `🎅 Ho ho ho! Ready to purchase "${listing.title}" for ${listing.price} snowflakes?`
    );
    if (confirmed) {
      alert(`✨ Waldo says: "Wonderful choice! ${listing.title} is on its way to you! Happy Holidays!" 🎁`);
    }
  };

  const snowflakes = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 12 + 8}px`,
    animationDelay: `${Math.random() * 3}s`
  }));

  return (
    <div className="min-h-screen bg-[linear-gradient(in_oklch,oklch(0.12_0.06_260),oklch(0.22_0.08_230))] p-4 relative overflow-hidden">
      {/* Floating Snowflakes */}
      {snowflakes.map((style, i) => (
        <Snowflake key={i} style={style} />
      ))}
      
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <div className="bg-[linear-gradient(in_oklch,oklch(0.42_0.18_25),oklch(0.48_0.16_15))] rounded-3xl p-6 shadow-2xl border-4 border-[oklch(0.75_0.15_85)]">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <WaldoWalrus size="large" mood="happy" />
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[oklch(0.95_0.02_85)] drop-shadow-lg">
                🎄 Waldo's Winter Wonderland 🎄
              </h1>
              <p className="text-[oklch(0.9_0.04_200)] text-lg mt-1">
                ✨ Your Jolly Arctic Marketplace ✨
              </p>
            </div>
            <WaldoWalrus size="large" mood="excited" />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-4xl mx-auto mb-6">
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => setActiveView("browse")}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
              activeView === "browse"
                ? "bg-[oklch(0.5_0.15_145)] text-white shadow-lg"
                : "bg-[oklch(0.9_0.03_200)] text-[oklch(0.3_0.05_145)]"
            }`}
          >
            🛍️ Browse Treasures
          </button>
          <button
            onClick={() => setActiveView("sell")}
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
              activeView === "sell"
                ? "bg-[oklch(0.5_0.15_145)] text-white shadow-lg"
                : "bg-[oklch(0.9_0.03_200)] text-[oklch(0.3_0.05_145)]"
            }`}
          >
            📦 Sell Something
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto">
        {activeView === "browse" && (
          <>
            {/* Categories */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max justify-center">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-[oklch(0.75_0.15_85)] text-[oklch(0.2_0.05_85)] shadow-md"
                        : "bg-[oklch(0.25_0.05_230)] text-[oklch(0.85_0.03_200)] hover:bg-[oklch(0.3_0.06_230)]"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Waldo's Welcome */}
            {filteredListings.length === 0 && (
              <div className="text-center py-12 bg-[oklch(0.2_0.04_230)] rounded-3xl border-2 border-[oklch(0.4_0.08_230)]">
                <WaldoWalrus size="large" mood="happy" />
                <p className="text-[oklch(0.85_0.03_200)] text-xl mt-4">
                  🎅 "Ho ho ho! My marketplace is waiting for treasures!"
                </p>
                <p className="text-[oklch(0.65_0.03_200)] mt-2">
                  Be the first to list something magical!
                </p>
                <button
                  onClick={() => setActiveView("sell")}
                  className="mt-4 px-6 py-3 bg-[oklch(0.45_0.2_25)] text-white rounded-full font-bold hover:bg-[oklch(0.5_0.22_25)] transition-all"
                >
                  ✨ Start Selling
                </button>
              </div>
            )}

            {/* Listings Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map(listing => (
                <div
                  key={listing._id}
                  className="bg-[linear-gradient(in_oklch,oklch(0.95_0.02_200),oklch(0.9_0.03_180))] rounded-2xl p-5 shadow-xl border-4 border-[oklch(0.5_0.15_145)] transform hover:scale-102 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-2xl">
                      {categories.find(c => c.id === listing.category)?.icon || "🎁"}
                    </span>
                    <span className="bg-[oklch(0.45_0.2_25)] text-white px-3 py-1 rounded-full text-sm font-bold">
                      ❄️ {listing.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[oklch(0.25_0.05_230)] mb-2">
                    {listing.title}
                  </h3>
                  {listing.description && (
                    <p className="text-[oklch(0.4_0.03_230)] text-sm mb-3 line-clamp-2">
                      {listing.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[oklch(0.5_0.03_230)]">
                      🧑‍🎄 {listing.seller}
                    </span>
                    <button
                      onClick={() => handlePurchase(listing)}
                      className="bg-[oklch(0.5_0.15_145)] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[oklch(0.55_0.17_145)] transition-all"
                    >
                      🛒 Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeView === "sell" && (
          <div className="bg-[oklch(0.92_0.02_200)] rounded-3xl p-6 shadow-2xl border-4 border-[oklch(0.75_0.15_85)]">
            <div className="text-center mb-6">
              <WaldoWalrus size="medium" mood="excited" />
              <h2 className="text-2xl font-bold text-[oklch(0.3_0.05_230)] mt-2">
                🎁 List Your Holiday Treasure!
              </h2>
              <p className="text-[oklch(0.5_0.03_230)]">
                Waldo will help you find the perfect buyer!
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-[oklch(0.35_0.05_230)] font-medium mb-1">
                  ✨ Item Name
                </label>
                <input
                  type="text"
                  value={newListing.title}
                  onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                  placeholder="What are you selling?"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[oklch(0.5_0.15_145)] focus:border-[oklch(0.45_0.2_25)] focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-[oklch(0.35_0.05_230)] font-medium mb-1">
                  📝 Description
                </label>
                <textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                  placeholder="Tell us about your treasure..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[oklch(0.5_0.15_145)] focus:border-[oklch(0.45_0.2_25)] focus:outline-none bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[oklch(0.35_0.05_230)] font-medium mb-1">
                    ❄️ Price (Snowflakes)
                  </label>
                  <input
                    type="number"
                    value={newListing.price}
                    onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                    placeholder="25"
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[oklch(0.5_0.15_145)] focus:border-[oklch(0.45_0.2_25)] focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[oklch(0.35_0.05_230)] font-medium mb-1">
                    📂 Category
                  </label>
                  <select
                    value={newListing.category}
                    onChange={(e) => setNewListing({ ...newListing, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[oklch(0.5_0.15_145)] focus:border-[oklch(0.45_0.2_25)] focus:outline-none bg-white"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[oklch(0.35_0.05_230)] font-medium mb-1">
                  🧑‍🎄 Your Name
                </label>
                <input
                  type="text"
                  value={newListing.seller}
                  onChange={(e) => setNewListing({ ...newListing, seller: e.target.value })}
                  placeholder="Who's selling?"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[oklch(0.5_0.15_145)] focus:border-[oklch(0.45_0.2_25)] focus:outline-none bg-white"
                />
              </div>

              <button
                onClick={handleSubmitListing}
                disabled={!newListing.title || !newListing.price || !newListing.seller}
                className="w-full py-4 bg-[linear-gradient(in_oklch,oklch(0.45_0.2_25),oklch(0.5_0.18_15))] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                🎄 List My Treasure! 🎄
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-12 text-center">
        <div className="flex justify-center items-center gap-2 text-[oklch(0.6_0.05_200)]">
          <span>Made with</span>
          <span className="text-[oklch(0.55_0.2_25)]">❤️</span>
          <span>by Waldo the Wonderful Walrus</span>
          <WaldoWalrus size="small" mood="happy" />
        </div>
        <p className="text-[oklch(0.5_0.03_230)] text-sm mt-2">
          🎅 "Every treasure deserves a happy home!" - Waldo
        </p>
      </footer>
    </div>
  );
}