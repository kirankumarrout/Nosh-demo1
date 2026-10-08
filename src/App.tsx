import { useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useCinematicMotion } from './animations';

const image = (name: string) => `./assets/${name}.webp`;

const plates = [
  {
    image: 'sizzled-fish',
    title: 'Stirred Egg',
    copy: 'This might be the most common Chinese family dish. The egg is easy to cook, fluffy and cozy to share with family.',
  },
  {
    image: 'kung-pao',
    title: 'Kung Pao Chicken',
    copy: 'When tempers are sweet and spicy, this plate is perfect for sharing with your favourite people.',
  },
  {
    image: 'pork-chops',
    title: 'Sweet Pork Chops',
    copy: 'Sweet and sour slices prepared among Chinese families. A bright, comforting weekend treat.',
  },
];

function IngredientCloud({ section }: { section: string }) {
  return (
    <div className={`ingredient-cloud ${section}`} aria-hidden="true">
      <span className="ingredient ingredient-spices">● ◐</span>
      <span className="ingredient ingredient-leaves">✦</span>
      <span className="ingredient ingredient-tomato">●</span>
      <span className="ingredient ingredient-radish">◉</span>
      <span className="ingredient ingredient-herb">✽</span>
      <span className="ingredient ingredient-pepper">◆</span>
    </div>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="video-header">
      <a className="video-logo" href="#top" onClick={close}>luscious</a>
      <nav className={open ? 'video-nav open' : 'video-nav'} aria-label="Main navigation">
        <a href="#dumplings" onClick={close}>Dumplings</a>
        <a href="#recipes" onClick={close}>Recipes</a>
        <a href="#menu" onClick={close}>Food Menu</a>
        <a href="#newsletter" onClick={close}>Order Now</a>
        <button onClick={onMenu}>Login</button>
      </nav>
      <button className="mobile-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close navigation' : 'Open navigation'}>
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="video-hero" id="top">
      <IngredientCloud section="hero-ingredients" />
      <div className="hero-content" data-reveal>
        <p className="micro-label">Dumplings · made slowly</p>
        <h1>Take a taste<br />Come join us.</h1>
        <p className="hero-subtitle">Life is so endlessly delicious. Dumplings are a little pocket of joy, folded with care and shared with people you love.</p>
        <a className="orange-pill" href="#menu">Explore Now <ArrowRight size={14} /></a>
      </div>
      <div className="hero-food" data-reveal>
        <img src={image('hero-dumplings')} alt="Steamed dumplings with chili sauce" />
      </div>
      <span className="hero-scroll"><ChevronDown size={14} /> Scroll to taste</span>
    </section>
  );
}

function PlateCard({ plate, index }: { plate: (typeof plates)[number]; index: number }) {
  return (
    <article className="plate-card" data-reveal>
      <div className="plate-image"><img src={image(plate.image)} alt={plate.title} /></div>
      <h3>{plate.title}</h3>
      <p>{plate.copy}</p>
      <span className="plate-number">0{index + 1}</span>
    </article>
  );
}

function MenuSection() {
  return (
    <section className="video-section menu-section" id="menu">
      <IngredientCloud section="menu-ingredients" />
      <div className="center-heading" data-reveal>
        <p className="micro-label">A little something for everyone</p>
        <h2>What’s on our Plate</h2>
        <p>Please savour yourself without any hesitation.</p>
        <div className="menu-tabs"><button className="active">Appetizers</button><button>Main Dish</button><button>Dessert</button></div>
      </div>
      <div className="plate-grid">{plates.map((plate, index) => <PlateCard key={plate.title} plate={plate} index={index} />)}</div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="video-section story-section" id="recipes">
      <IngredientCloud section="story-ingredients" />
      <div className="story-food" data-reveal><img src={image('noodles')} alt="Bowl of glossy noodles with fresh basil" /></div>
      <div className="story-copy" data-reveal>
        <p className="micro-label">A bowl with a story</p>
        <h2>Let’s see what other says</h2>
        <p className="story-lede">Please savor yourself without any hesitation.</p>
        <blockquote>“If currently on the tour with Paola Abdul and while we were eating it come to the same room, once our choices make the people...”</blockquote>
        <div className="story-avatars"><span>●</span><span className="avatar-active">✽</span><span>●</span></div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section className="video-section newsletter" id="newsletter">
      <IngredientCloud section="newsletter-ingredients" />
      <div className="newsletter-copy" data-reveal>
        <p className="micro-label">A note from our kitchen</p>
        <h2>Easy recipes will send to your inbox</h2>
        <p>Get weekly updates on the newest choice recipes in your mailbox!</p>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your email address" aria-label="Email address" required />
          <button className="orange-pill" type="submit">{sent ? 'Subscribed' : 'Subscribe'} <ArrowRight size={14} /></button>
        </form>
      </div>
      <div className="newsletter-bowl" aria-hidden="true"><span>🥬</span></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="video-footer">
      <div className="footer-brand"><a className="video-logo" href="#top">luscious</a><p>Food that makes ordinary days feel special.</p></div>
      <div><h4>Get Cooking</h4><a href="#recipes">Easy Asian Takeout</a><a href="#menu">Recipe Gallery</a><a href="#menu">Ingredients Guide</a><a href="#menu">Weekly Meal Plans</a><a href="#menu">Pantry Tour</a></div>
      <div><h4>Information</h4><a href="#top">About</a><a href="#recipes">Disclosures</a><a href="#top">Privacy Policy</a><a href="#top">Giveaway Winners</a><a href="#top">Contact</a></div>
      <div><h4>Follow Us</h4><a href="#top">RSS Feeds</a><a href="#top">Facebook</a><a href="#top">Instagram</a><a href="#top">Pinterest</a><a href="#top">YouTube</a></div>
    </footer>
  );
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useCinematicMotion(root, paused);
  return <div ref={root} className="video-site"><Header onMenu={() => setPaused((value) => !value)} /><main><Hero /><MenuSection /><StorySection /><Newsletter /></main><Footer /><button className="motion-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Enable motion' : 'Pause motion'}>{paused ? 'Play motion' : 'Pause motion'}</button></div>;
}
