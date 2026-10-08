import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { useCinematicMotion } from './animations';
import {
  categories,
  gallery,
  guestFavourites,
  menuItems,
  restaurant,
  reviews,
  type Category,
} from './data';

const asset = (name: string) => `./assets/${name}.webp`;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </span>
  );
}

function FoodPhoto({
  name,
  alt,
  className = '',
  eager = false,
  sizes = '(max-width: 700px) 92vw, 48vw',
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <img
      className={className}
      src={asset(name)}
      srcSet={`${asset(`${name}-sm`)} 720w, ${asset(name)} 1920w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

function Header({ onReserve }: { onReserve: () => void }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="editorial-header">
      <a className="wordmark" href="#home" onClick={close} aria-label="Nosh home">
        nosh<span>·</span>
      </a>
      <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
        <a href="#menu" onClick={close}>Menu</a>
        <a href="#space" onClick={close}>The space</a>
        <a href="#story" onClick={close}>Our story</a>
        <a href="#visit" onClick={close}>Visit us</a>
      </nav>
      <div className="header-actions">
        <a className="header-instagram" href={restaurant.instagram} target="_blank" rel="noreferrer" aria-label="Nosh on Instagram">
          <Instagram size={16} strokeWidth={1.6} />
        </a>
        <button className="header-reserve" onClick={onReserve}>A table for you <ArrowUpRight size={16} /></button>
        <button className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>
    </header>
  );
}

function Ingredient({ className, children }: { className: string; children: ReactNode }) {
  return <span className={`ingredient ${className}`} aria-hidden="true">{children}</span>;
}

function Hero({ onReserve }: { onReserve: () => void }) {
  return (
    <section className="hero-pin" id="home">
      <div className="hero-stage">
        <div className="hero-copy" data-reveal>
          <Eyebrow>Welcome to Nosh</Eyebrow>
          <h1>Life is so<br /><em>endlessly</em><br />delicious.</h1>
          <p>Chic bites, big flavour, and a table that always feels a little like home.</p>
          <div className="hero-actions">
            <a className="round-link" href="#menu">Take a taste <ArrowDown size={17} /></a>
            <button className="text-link" onClick={onReserve}>Book your table <ArrowUpRight size={16} /></button>
          </div>
        </div>
        <div className="hero-art" data-reveal>
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <FoodPhoto className="hero-dish" name="platter-cutout" alt="Colourful Nosh platter with fresh garnish" eager sizes="(max-width: 700px) 82vw, 51vw" />
          <Ingredient className="ingredient-tomato">●</Ingredient>
          <Ingredient className="ingredient-leaf">✦</Ingredient>
          <Ingredient className="ingredient-chilli">⌁</Ingredient>
          <Ingredient className="ingredient-spice">✳</Ingredient>
          <Ingredient className="ingredient-garlic">◌</Ingredient>
        </div>
        <div className="hero-page">01 <span>/</span> 04</div>
        <a className="hero-scroll" href="#menu"><span>Scroll to explore</span><ArrowDown size={16} /></a>
      </div>
    </section>
  );
}

function DishCard({ image, title, description, index }: { image: string; title: string; description: string; index: string }) {
  return (
    <article className="dish-card" data-reveal>
      <div className="dish-card-image"><FoodPhoto name={image} alt={title} /></div>
      <div className="dish-card-meta"><span>{index}</span><span>{title}</span></div>
      <p>{description}</p>
      <a href="#menu" className="arrow-circle" aria-label={`Explore ${title}`}><ArrowUpRight size={17} /></a>
    </article>
  );
}

function MenuSection({ onMenu }: { onMenu: () => void }) {
  const [category, setCategory] = useState<Category>('All dishes');
  const visible = category === 'All dishes' ? menuItems : menuItems.filter((item) => item.category === category);
  return (
    <section className="paper-section menu-section" id="menu">
      <div className="section-heading" data-reveal>
        <div><Eyebrow>Made for sharing</Eyebrow><h2>What’s on<br /><em>our plate.</em></h2></div>
        <p>Every plate is a small celebration. Come hungry, leave happy, and take a little Nosh home with you.</p>
      </div>
      <div className="dish-grid">
        <DishCard index="01" image="sandwich" title="Little bites" description="Crisp, golden and made for the middle of the table." />
        <DishCard index="02" image="chicken" title="Big flavour" description="Smoky grills and bright spices with a Nosh twist." />
        <DishCard index="03" image="bread" title="Sweet finish" description="A soft landing for every delicious evening." />
      </div>
      <div className="menu-introduction" data-reveal>
        <div><Eyebrow>Something special</Eyebrow><h3>A menu that keeps<br /><em>you curious.</em></h3></div>
        <button className="outline-button" onClick={onMenu}>View the original menu <ArrowUpRight size={16} /></button>
      </div>
      <div className="menu-filter-wrap" data-reveal>
        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {categories.map((item, index) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} onKeyDown={(event) => { if (event.key === 'Home') { event.preventDefault(); setCategory(categories[0]); } if (event.key === 'End') { event.preventDefault(); setCategory(categories[categories.length - 1]); } if (event.key === 'ArrowRight') { event.preventDefault(); setCategory(categories[(index + 1) % categories.length]); } if (event.key === 'ArrowLeft') { event.preventDefault(); setCategory(categories[(index - 1 + categories.length) % categories.length]); } }}>{item}</button>)}
        </div>
        <div className="menu-list" role="tabpanel" aria-label={`${category} menu`}>
          {visible.map((item) => <article className="menu-list-row" key={item.name}><div><h4>{item.name}</h4><p>{item.note}</p></div><strong>₹{item.price}</strong></article>)}
        </div>
      </div>
    </section>
  );
}

function DishStory() {
  return (
    <section className="dish-story paper-section" id="story">
      <div className="story-art" data-reveal>
        <div className="story-orbit" />
        <FoodPhoto className="story-plate" name="platters" alt="Nosh platters with colourful food and sauces" />
        <Ingredient className="story-ingredient story-leaf">✦</Ingredient>
        <Ingredient className="story-ingredient story-chilli">⌁</Ingredient>
      </div>
      <div className="story-copy" data-reveal>
        <Eyebrow>From the table</Eyebrow>
        <h2>Let’s see what<br /><em>others say.</em></h2>
        <blockquote>“The ambience is cozy, chill, and very aesthetically pleasing — perfect for a relaxed outing.”</blockquote>
        <p className="story-author">Aleeva Rath <span>· Google review</span></p>
        <div className="story-favourites"><span>Guest favourites</span>{guestFavourites.slice(0, 3).map((item) => <b key={item}>{item}</b>)}</div>
      </div>
    </section>
  );
}

function SpaceSection({ onPhoto }: { onPhoto: (index: number) => void }) {
  return (
    <section className="space-section paper-section" id="space">
      <div className="space-heading" data-reveal><Eyebrow>The Nosh feeling</Eyebrow><h2>A little room<br /><em>for a lot of life.</em></h2><p>Orange arches, soft light, and enough space for the stories that happen between the first bite and the last.</p></div>
      <div className="space-collage">
        {gallery.slice(0, 3).map((photo, index) => <button className={`space-photo space-photo-${index + 1}`} key={photo.src} onClick={() => onPhoto(index)} aria-label={`View photo: ${photo.alt}`} data-reveal><FoodPhoto name={photo.src} alt={photo.alt} /><span>{photo.kind}</span></button>)}
      </div>
    </section>
  );
}

function Reviews() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  return (
    <section className="reviews-section paper-section" aria-label="Guest reviews">
      <div className="review-mark"><Star size={19} fill="currentColor" /> <span>4.5 / 5 on Google</span></div>
      <div className="review-quote" data-reveal><span className="quote-mark">“</span><blockquote>{review.quote}</blockquote><p>{review.author} <span>{review.detail}</span></p></div>
      <div className="review-controls"><button onClick={() => setIndex((index - 1 + reviews.length) % reviews.length)} aria-label="Previous review"><ChevronLeft /></button><span>0{index + 1} <i>/</i> 0{reviews.length}</span><button onClick={() => setIndex((index + 1) % reviews.length)} aria-label="Next review"><ChevronRight /></button></div>
    </section>
  );
}

function VisitSection({ onReserve }: { onReserve: () => void }) {
  return (
    <section className="visit-section paper-section" id="visit">
      <div className="visit-card" data-reveal>
        <div className="visit-card-copy"><Eyebrow>Come as you are</Eyebrow><h2>Your table<br /><em>is waiting.</em></h2><p>Find us in Kalinga Nagar for an easy evening, a long lunch, or a very good reason to order dessert.</p><button className="dark-button" onClick={onReserve}>Reserve your table <ArrowUpRight size={17} /></button></div>
        <div className="visit-card-art"><FoodPhoto name="interior" alt="Nosh interior with warm arches and plants" /></div>
      </div>
      <div className="visit-details" data-reveal><div><MapPin size={17} /><p>{restaurant.address}</p></div><div><Phone size={17} /><a href={restaurant.phoneLink}>{restaurant.phone}</a></div><a className="text-link" href={restaurant.directions} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a></div>
    </section>
  );
}

function Footer() {
  return <footer className="editorial-footer"><div className="footer-logo">nosh<span>·</span></div><p>Where every bite feels like home.</p><div className="footer-links"><a href="#menu">Menu</a><a href="#space">The space</a><a href={restaurant.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={`mailto:hello@noshbhubaneswar.com`}>Say hello</a></div><small>© {new Date().getFullYear()} Nosh, Bhubaneswar</small></footer>;
}

function Dialog({ open, onClose, title, children, className = '' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; if (!dialog) return; if (open && !dialog.open) dialog.showModal(); if (!open && dialog.open) dialog.close(); }, [open]);
  useEffect(() => { const dialog = ref.current; if (!dialog) return; const handle = () => onClose(); dialog.addEventListener('close', handle); return () => dialog.removeEventListener('close', handle); }, [onClose]);
  return <dialog ref={ref} className={`site-dialog ${className}`} onCancel={onClose} aria-label={title}><div className="dialog-inner"><div className="dialog-top"><Eyebrow>{title}</Eyebrow><button onClick={onClose} aria-label="Close dialog"><X size={19} /></button></div>{children}</div></dialog>;
}

function ReservationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const request = `My name is ${name || 'a Nosh guest'}. I’d like to reserve a table for ${guests} guests. Please confirm availability and a time that works for you.`;
  const copy = async () => { try { await navigator.clipboard?.writeText(request); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } };
  return <Dialog open={open} onClose={onClose} title="Plan your visit to Nosh" className="reservation-dialog"><h2>Make it<br /><em>a Nosh night.</em></h2><p>Share your details below and we’ll help you find a table. This planner does not submit a booking.</p><label>Your name<input placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} /></label><div className="guest-picker"><span>Number of guests</span><div><button onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Remove one guest"><Minus size={15} /></button><b>{guests}</b><button onClick={() => setGuests(Math.min(12, guests + 1))} aria-label="Add one guest"><Plus size={15} /></button></div></div><div className="dialog-actions"><button className="dark-button" onClick={copy}>{copied ? 'Request copied' : 'Copy request'} <Copy size={16} /></button><a className="outline-button" href={restaurant.phoneLink}>Call to confirm <Phone size={15} /></a></div></Dialog>;
}

function MenuDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <Dialog open={open} onClose={onClose} title="Original Chhadakhai special menu" className="menu-dialog"><FoodPhoto name="special-menu" alt="Original Nosh Chhadakhai special menu" eager sizes="(max-width: 760px) 92vw, 720px" /><p>Please call for current availability and prices.</p><a className="dark-button" href={restaurant.phoneLink}>Call Nosh <Phone size={15} /></a></Dialog>;
}

function GalleryDialog({ open, onClose, index, setIndex }: { open: boolean; onClose: () => void; index: number; setIndex: (index: number) => void }) {
  const photo = gallery[index];
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setIndex((index + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setIndex((index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, setIndex]);
  return <Dialog open={open} onClose={onClose} title="Nosh photo gallery" className="gallery-dialog"><FoodPhoto name={photo.src} alt={photo.alt} eager sizes="(max-width: 760px) 92vw, 760px" /><div className="gallery-caption"><p>{photo.caption}</p><span>{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></div><div className="gallery-controls"><button onClick={() => setIndex((index - 1 + gallery.length) % gallery.length)} aria-label="Previous photo"><ChevronLeft /></button><button onClick={() => setIndex((index + 1) % gallery.length)} aria-label="Next photo"><ChevronRight /></button></div></Dialog>;
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  useCinematicMotion(root, paused);
  useEffect(() => { document.documentElement.dataset.motion = paused ? 'paused' : 'running'; return () => { delete document.documentElement.dataset.motion; }; }, [paused]);
  return <div ref={root} className="site-shell"><div className="page-progress" /><Header onReserve={() => setReservationOpen(true)} /><main><Hero onReserve={() => setReservationOpen(true)} /><MenuSection onMenu={() => setMenuOpen(true)} /><DishStory /><SpaceSection onPhoto={(index) => { setGalleryIndex(index); setGalleryOpen(true); }} /><Reviews /><VisitSection onReserve={() => setReservationOpen(true)} /></main><Footer /><button className="motion-switch" aria-pressed={paused} aria-label={paused ? 'Enable motion' : 'Pause motion'} onClick={() => setPaused((value) => !value)}><span>{paused ? 'Motion paused' : 'Pause motion'}</span><Utensils size={15} /></button><div className="mobile-reserve"><button onClick={() => setReservationOpen(true)}>Reserve a table <ArrowUpRight size={16} /></button></div><ReservationDialog open={reservationOpen} onClose={() => setReservationOpen(false)} /><MenuDialog open={menuOpen} onClose={() => setMenuOpen(false)} /><GalleryDialog open={galleryOpen} onClose={() => setGalleryOpen(false)} index={galleryIndex} setIndex={setGalleryIndex} /></div>;
}
