import { useMemo, useState } from "react";
import Brand from "../components/Brand";
import "./BuyHomePage.css";

const listings = [
  { img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", badge: "Verified", price: "₹2.4 Cr", priceLakhs: 240, addr: "Whitefield, Bengaluru", beds: 4, baths: 3, area: "3,200 sqft", type: "Villa", verified: true },
  { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", badge: "New", price: "₹85 L", priceLakhs: 85, addr: "Baner, Pune", beds: 2, baths: 2, area: "1,150 sqft", type: "Apartment", verified: false },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", badge: "Verified", price: "₹1.6 Cr", priceLakhs: 160, addr: "Malviya Nagar, Jaipur", beds: 3, baths: 3, area: "2,100 sqft", type: "Independent house", verified: true },
  { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", badge: "Ready to move", price: "₹3.1 Cr", priceLakhs: 310, addr: "Bandra West, Mumbai", beds: 4, baths: 4, area: "2,850 sqft", type: "Villa", verified: true },
  { img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80", badge: "Verified", price: "₹62 L", priceLakhs: 62, addr: "Sector 62, Noida", beds: 2, baths: 2, area: "1,050 sqft", type: "Apartment", verified: true },
  { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", badge: "New launch", price: "₹1.95 Cr", priceLakhs: 195, addr: "Jubilee Hills, Hyderabad", beds: 3, baths: 3, area: "2,400 sqft", type: "Independent house", verified: false },
];

const chips = ["All homes", "Villas", "Apartments", "New launches", "Verified owner", "Ready to move"];
const typeOptions = ["Any type", "Villa", "Apartment", "Independent house", "Plot"];
const budgetOptions = ["Any budget", "Under ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹2Cr", "₹2Cr+"];

function matchesBudget(priceLakhs, budget) {
  if (budget === "Under ₹50L") return priceLakhs < 50;
  if (budget === "₹50L – ₹1Cr") return priceLakhs >= 50 && priceLakhs <= 100;
  if (budget === "₹1Cr – ₹2Cr") return priceLakhs > 100 && priceLakhs <= 200;
  if (budget === "₹2Cr+") return priceLakhs > 200;
  return true;
}

function matchesChip(listing, chip) {
  if (chip === "All homes") return true;
  if (chip === "Villas") return listing.type === "Villa";
  if (chip === "Apartments") return listing.type === "Apartment";
  if (chip === "Verified owner") return listing.verified;
  if (chip === "Ready to move") return listing.badge === "Ready to move";
  if (chip === "New launches") return listing.badge === "New" || listing.badge === "New launch";
  return true;
}

export default function BuyHomePage({ onBack }) {
  const [activeChip, setActiveChip] = useState("All homes");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState(typeOptions[0]);
  const [budget, setBudget] = useState(budgetOptions[0]);
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (location && !l.addr.toLowerCase().includes(location.toLowerCase())) return false;
      if (propertyType !== typeOptions[0] && l.type !== propertyType) return false;
      if (!matchesBudget(l.priceLakhs, budget)) return false;
      if (!matchesChip(l, activeChip)) return false;
      return true;
    });
  }, [location, propertyType, budget, activeChip]);

  function clearFilters() {
    setLocation("");
    setPropertyType(typeOptions[0]);
    setBudget(budgetOptions[0]);
    setActiveChip("All homes");
  }

  function toggleFavorite(i, event) {
    event.stopPropagation();
    setFavorites((current) => (current.includes(i) ? current.filter((x) => x !== i) : [...current, i]));
  }

  return (
    <div className="buy-home-page">
      <header className="bh-header">
        <Brand />
        <button className="bh-back" onClick={onBack}>
          ← Back to home
        </button>
      </header>

      <section className="bh-hero">
        <div className="bh-hero-ring" aria-hidden="true"></div>
        <div className="bh-hero-inner">
          <p className="bh-eyebrow">Your property journey</p>
          <h1>
            Find a place to <em>own</em>, at your pace
          </h1>
          <p className="bh-sub">Browse verified listings and connect directly with owners. No noise, no middlemen.</p>

          <div className="bh-searchbar">
            <div className="bh-field">
              <label>Location</label>
              <input
                type="text"
                placeholder="City, neighborhood, or ZIP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="bh-field">
              <label>Property type</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                {typeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="bh-field">
              <label>Budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                {budgetOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <button className="bh-search-btn" onClick={clearFilters}>
              Clear all
            </button>
          </div>

          <div className="bh-chips">
            {chips.map((chip) => (
              <div
                key={chip}
                className={`bh-chip ${activeChip === chip ? "active" : ""}`}
                onClick={() => setActiveChip(chip)}
              >
                {chip}
              </div>
            ))}
          </div>

          <div className="bh-stats">
            <span>
              <b>10,000+</b> verified homes
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

      <div className="bh-results-bar">
        <h2>Homes for you</h2>
        <span>{filtered.length} verified listings</span>
      </div>

      {filtered.length === 0 ? (
        <div className="bh-empty">
          <p>No homes match those filters.</p>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="bh-grid">
          {filtered.map((l, i) => (
            <div
              className="bh-listing"
              key={i}
              onClick={() => alert("Wire this up to your property detail route.")}
            >
              <div className="bh-img-wrap">
                <img src={l.img} alt={l.addr} />
                <div className="bh-badge">{l.badge}</div>
                <button
                  className={`bh-fav ${favorites.includes(i) ? "active" : ""}`}
                  onClick={(event) => toggleFavorite(i, event)}
                  aria-label="Save property"
                >
                  {favorites.includes(i) ? "♥" : "♡"}
                </button>
              </div>
              <div className="bh-body">
                <div className="bh-price">{l.price}</div>
                <div className="bh-addr">{l.addr}</div>
                <div className="bh-meta">
                  <span>{l.beds} beds</span>
                  <span>{l.baths} baths</span>
                  <span>{l.area}</span>
                </div>
                <span className="bh-view">
                  View details <span className="bh-view-arrow">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="bh-footer">
        <Brand />
        <p>Verified homes, direct owner connections.</p>
      </footer>
    </div>
  );
}