import { useMemo, useState } from "react";
import Brand from "../components/Brand";
import "./RentHomePage.css";

const listings = [
  { img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", badge: "Verified", price: "₹28,000 /mo", rent: 28000, addr: "Koramangala, Bengaluru", beds: 2, baths: 2, area: "1,100 sqft", type: "Fully furnished", verified: true, petFriendly: false },
  { img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", badge: "Furnished", price: "₹35,000 /mo", rent: 35000, addr: "Kothrud, Pune", beds: 3, baths: 2, area: "1,450 sqft", type: "Fully furnished", verified: false, petFriendly: true },
  { img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80", badge: "Verified", price: "₹18,500 /mo", rent: 18500, addr: "Vaishali Nagar, Jaipur", beds: 2, baths: 2, area: "1,000 sqft", type: "Semi furnished", verified: true, petFriendly: false },
  { img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", badge: "Ready to move", price: "₹52,000 /mo", rent: 52000, addr: "Powai, Mumbai", beds: 3, baths: 3, area: "1,700 sqft", type: "Fully furnished", verified: true, petFriendly: true },
  { img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", badge: "Semi furnished", price: "₹22,000 /mo", rent: 22000, addr: "Sector 50, Noida", beds: 2, baths: 2, area: "1,050 sqft", type: "Semi furnished", verified: false, petFriendly: false },
  { img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80", badge: "Verified", price: "₹40,000 /mo", rent: 40000, addr: "Gachibowli, Hyderabad", beds: 3, baths: 2, area: "1,500 sqft", type: "Unfurnished", verified: true, petFriendly: false },
];

const chips = ["All homes", "Fully furnished", "Semi furnished", "Unfurnished", "Verified owner", "Pet friendly"];
const furnishingOptions = ["Any furnishing", "Fully furnished", "Semi furnished", "Unfurnished"];
const budgetOptions = ["Any monthly rent", "Under ₹20,000", "₹20,000 – ₹40,000", "₹40,000+"];

function matchesBudget(rent, budget) {
  if (budget === "Under ₹20,000") return rent < 20000;
  if (budget === "₹20,000 – ₹40,000") return rent >= 20000 && rent <= 40000;
  if (budget === "₹40,000+") return rent > 40000;
  return true;
}

export default function RentHomePage({ onBack }) {
  const [activeChip, setActiveChip] = useState("All homes");
  const [location, setLocation] = useState("");
  const [furnishing, setFurnishing] = useState(furnishingOptions[0]);
  const [budget, setBudget] = useState(budgetOptions[0]);
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (location && !l.addr.toLowerCase().includes(location.toLowerCase())) return false;
      if (furnishing !== furnishingOptions[0] && l.type !== furnishing) return false;
      if (!matchesBudget(l.rent, budget)) return false;
      if (activeChip === "Verified owner" && !l.verified) return false;
      if (activeChip === "Pet friendly" && !l.petFriendly) return false;
      if (["Fully furnished", "Semi furnished", "Unfurnished"].includes(activeChip) && l.type !== activeChip) return false;
      return true;
    });
  }, [location, furnishing, budget, activeChip]);

  function clearFilters() {
    setLocation("");
    setFurnishing(furnishingOptions[0]);
    setBudget(budgetOptions[0]);
    setActiveChip("All homes");
  }

  function toggleFavorite(i, event) {
    event.stopPropagation();
    setFavorites((current) => (current.includes(i) ? current.filter((x) => x !== i) : [...current, i]));
  }

  return (
    <div className="rh-page">
      <header className="rh-header">
        <Brand />
        <button className="rh-back" onClick={onBack}>
          ← Back to home
        </button>
      </header>

      <section className="rh-hero">
        <div className="rh-hero-ring" aria-hidden="true"></div>
        <div className="rh-hero-inner">
          <p className="rh-eyebrow">Your property journey</p>
          <h1>
            Move into a home you will <em>love</em>
          </h1>
          <p className="rh-sub">Browse verified rentals and connect directly with owners. No noise, no middlemen.</p>

          <div className="rh-searchbar">
            <div className="rh-field">
              <label>Location</label>
              <input
                type="text"
                placeholder="City, neighborhood, or ZIP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="rh-field">
              <label>Furnishing</label>
              <select value={furnishing} onChange={(e) => setFurnishing(e.target.value)}>
                {furnishingOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="rh-field">
              <label>Monthly rent</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                {budgetOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <button className="rh-search-btn" onClick={clearFilters}>
              Clear all
            </button>
          </div>

          <div className="rh-chips">
            {chips.map((chip) => (
              <div
                key={chip}
                className={`rh-chip ${activeChip === chip ? "active" : ""}`}
                onClick={() => setActiveChip(chip)}
              >
                {chip}
              </div>
            ))}
          </div>

          <div className="rh-stats">
            <span>
              <b>8,500+</b> verified rentals
            </span>
            <span>
              <b>0</b> brokerage fee
            </span>
            <span>
              <b>4.7/5</b> customer rating
            </span>
          </div>
        </div>
      </section>

      <div className="rh-results-bar">
        <h2>Homes for you</h2>
        <span>{filtered.length} verified listings</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rh-empty">
          <p>No rentals match those filters.</p>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="rh-grid">
          {filtered.map((l, i) => (
            <div
              className="rh-listing"
              key={i}
              onClick={() => alert("Wire this up to your property detail route.")}
            >
              <div className="rh-img-wrap">
                <img src={l.img} alt={l.addr} />
                <div className="rh-badge">{l.badge}</div>
                <button
                  className={`rh-fav ${favorites.includes(i) ? "active" : ""}`}
                  onClick={(event) => toggleFavorite(i, event)}
                  aria-label="Save property"
                >
                  {favorites.includes(i) ? "♥" : "♡"}
                </button>
              </div>
              <div className="rh-body">
                <div className="rh-price">{l.price}</div>
                <div className="rh-addr">{l.addr}</div>
                <div className="rh-meta">
                  <span>{l.beds} beds</span>
                  <span>{l.baths} baths</span>
                  <span>{l.area}</span>
                </div>
                <span className="rh-view">
                  View details <span className="rh-view-arrow">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="rh-footer">
        <Brand />
        <p>Verified homes, direct owner connections.</p>
      </footer>
    </div>
  );
}