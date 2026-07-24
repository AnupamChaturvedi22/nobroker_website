import { useState } from 'react';
import Brand from '../components/Brand';
import { ArrowRight } from '../components/PropertyIcons';
import { propertyOptions } from '../data/propertyOptions';

const filterConfig = {
  Rent: { priceLabel: 'Monthly rent', prices: ['Any monthly rent', 'Under 20,000', '20,000 - 40,000', '40,000+'], typeLabel: 'Furnishing', types: ['Any furnishing', 'Fully furnished', 'Semi furnished', 'Unfurnished'] },
  Buy: { priceLabel: 'Property price', prices: ['Any price', 'Under 75 Lakh', '75 Lakh - 1 Cr', '1 Cr+'], typeLabel: 'Property type', types: ['All property types', 'Apartment', 'Independent house', 'Villa'] },
  Commercial: { priceLabel: 'Monthly rent', prices: ['Any monthly rent', 'Under 30,000', '30,000 - 75,000', '75,000+'], typeLabel: 'Space type', types: ['All commercial spaces', 'Office', 'Shop', 'Warehouse'] },
};

export default function BrowsingPage({ onLogin, onRegister }) {
  const [tab, setTab] = useState('Rent');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(filterConfig.Rent.prices[0]);
  const [bhk, setBhk] = useState('Any BHK');
  const [propertyType, setPropertyType] = useState(filterConfig.Rent.types[0]);
  const [notice, setNotice] = useState('');
  const notify = text => { setNotice(text); window.setTimeout(() => setNotice(''), 2600); };
  const changeTab = nextTab => { setTab(nextTab); setPrice(filterConfig[nextTab].prices[0]); setPropertyType(filterConfig[nextTab].types[0]); };
  const selectCategory = action => {
    if (action === 'List') return notify('Start listing your property - it is free.');
    changeTab(action);
    document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const search = () => notify(`Searching ${tab.toLowerCase()} homes${location ? ` near ${location}` : ''}.`);

  return <>
    <header className="nav"><a href="#top" aria-label="NoBroker home"><Brand /></a><nav><a href="#journey">Rent</a><a href="#journey">Buy</a><a href="#owners">Commercial</a></nav><div className="nav-actions"><button className="login" onClick={onLogin}>Login</button><button className="register" onClick={onRegister}>Register</button><button className="post" onClick={() => selectCategory('List')}>Post Your Property</button></div></header>
    <main id="top">
      <section className="hero"><div className="hero-content"><p className="kicker">INDIA'S NO.1 PROPERTY PLATFORM</p><h1>Find your next home with <em>zero brokerage.</em></h1><p>Explore verified properties and connect directly with owners.</p><div className="search-box" id="search"><div className="tabs">{['Rent', 'Buy', 'Commercial'].map(option => <button className={tab === option ? 'active' : ''} onClick={() => changeTab(option)} key={option}>{option}</button>)}</div><div className="search-row"><label><span>Location</span><input value={location} onChange={event => setLocation(event.target.value)} placeholder="Search city, locality or landmark" /></label><button onClick={search}>Search properties</button></div></div><div className="stats"><span><b>10,000+</b> verified homes</span><span><b>0</b> brokerage fee</span><span><b>4.7/5</b> customer rating</span></div></div></section>
      <section className="filter-wrap" aria-label={`${tab} filters`}><div className="filters"><strong>{tab} filters</strong><label className="filter-label">{filterConfig[tab].priceLabel}<select value={price} onChange={event => setPrice(event.target.value)}>{filterConfig[tab].prices.map(option => <option key={option}>{option}</option>)}</select></label>{tab !== 'Commercial' && <label className="filter-label">BHK<select value={bhk} onChange={event => setBhk(event.target.value)}>{['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4 BHK+'].map(option => <option key={option}>{option}</option>)}</select></label>}<label className="filter-label">{filterConfig[tab].typeLabel}<select value={propertyType} onChange={event => setPropertyType(event.target.value)}>{filterConfig[tab].types.map(option => <option key={option}>{option}</option>)}</select></label><button className="clear" onClick={() => { setLocation(''); setPrice(filterConfig[tab].prices[0]); setBhk('Any BHK'); setPropertyType(filterConfig[tab].types[0]); }}>Clear all</button></div></section>
      <section className="journey-section" id="journey"><div className="section-heading"><div><p className="kicker">START YOUR JOURNEY</p><h2>What brings you here?</h2></div></div><div className="category-grid">{propertyOptions.map(option => <button className="category-card" onClick={() => selectCategory(option.action)} key={option.title}><span className="category-icon">{option.icon}</span><h3>{option.title}</h3><p>{option.text}</p><span className="arrow"><ArrowRight /></span></button>)}</div></section>
      <section className="owner-banner" id="owners"><div><p className="kicker">ARE YOU A PROPERTY OWNER?</p><h2>Your property deserves the right audience.</h2><p>List your property for free and connect directly with genuine seekers.</p><button onClick={() => selectCategory('List')}>List your property <ArrowRight /></button></div><div className="banner-art">HOME</div></section>
    </main>
    <footer><Brand /><p>India's property platform connecting owners and seekers directly.</p><div className="footer-links"><a>About us</a><a>Careers</a><a>Help center</a><a>Terms and privacy</a></div><small>Copyright 2026 NoBroker-inspired UI demo.</small></footer>
    {notice && <div className="toast">{notice}</div>}
  </>;
}
