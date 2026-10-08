import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  Phone,
  Menu as MenuIcon,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Instagram,
  Pause,
  Play,
  Check,
  Copy,
  Navigation,
  Flower2,
  UtensilsCrossed,
} from 'lucide-react';
import { gsap } from 'gsap';
import { useCinematicMotion } from './animations';
import {
  restaurant,
  categories,
  menuItems,
  gallery,
  reviews,
  guestFavourites,
  type Category,
} from './data';

const asset = (name: string) => `./assets/${name}.webp`;

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      <span className="eyebrow-line" />
      {children}
    </span>
  );
}

function Photo({
  name,
  alt,
  className = '',
  eager = false,
  sizes = '(max-width: 760px) 100vw, 60vw',
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
      srcSet={`${asset(name + '-sm')} 720w, ${asset(name)} 1920w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

function Header({ onReserve }: { onReserve: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const close = () => setOpen(false);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'nav-open' : ''}`}>
      <a href="#home" className="wordmark" aria-label="Nosh home" onClick={close}>
        nosh<span>.</span>
      </a>
      <nav
        className={open ? 'main-nav is-open' : 'main-nav'}
        id="main-navigation"
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            close();
            toggle.current?.focus();
          }
        }}
      >
        <a href="#menu" onClick={close}>
          The menu
        </a>
        <a href="#our-space" onClick={close}>
          Our space
        </a>
        <a href="#kitchen" onClick={close}>
          From the kitchen
        </a>
        <a href="#visit" onClick={close}>
          Find us <ArrowUpRight size={13} />
        </a>
      </nav>
      <button
        className="header-reserve"
        onClick={() => {
          close();
          onReserve();
        }}
      >
        A table for you <ArrowUpRight size={16} />
      </button>
      <button
        ref={toggle}
        className="menu-toggle icon-button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-controls="main-navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <MenuIcon />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="entrance" id="home" aria-label="Step inside Nosh">
      <div className="entrance-stage">
        <div className="exterior-layer">
          <Photo
            name="exterior"
            alt="Nosh's entrance at House of Lords, Kalinga Nagar"
            eager
            sizes="100vw"
          />
          <div className="hero-shade" />
        </div>
        <div className="interior-layer" aria-hidden="true">
          <Photo name="interior" alt="" eager sizes="100vw" />
          <div className="interior-shade" />
        </div>
        <div className="door-shadow" aria-hidden="true" />
        <div className="hero-copy">
          <Eyebrow light>KALINGA NAGAR · BHUBANESWAR</Eyebrow>
          <h1>
            Step inside.
            <br />
            <em>Feel at home.</em>
          </h1>
          <p>
            A little flavour. A little laughter.
            <br />A place that feels like yours.
          </p>
          <a className="button button-cream" href="#menu">
            Explore the menu <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="hero-bottom">
          <a href="#welcome" className="scroll-cue">
            <span className="scroll-circle">
              <ArrowDown size={18} />
            </span>
            <span>SCROLL TO STEP INSIDE</span>
          </a>
          <span className="hero-caption">GOOD FOOD. WARM CONVERSATIONS.</span>
          <span className="hero-index">
            01 <span>/</span> 07
          </span>
        </div>
        <div className="inside-copy" aria-hidden="true">
          <Eyebrow light>COME ON IN</Eyebrow>
          <h2>
            Your kind
            <br />
            of <em>place.</em>
          </h2>
          <p>Find your seat. Make yourself at home.</p>
        </div>
        <div className="plate-portal" aria-hidden="true" />
        <img
          className="transition-platter"
          src={asset('platter-cutout')}
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function Botanical({ className }: { className: string }) {
  return (
    <svg className={`botanical ${className}`} viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <path d="M38 172C52 117 70 80 103 22" stroke="currentColor" strokeWidth="2" />
      <path
        d="M64 107C24 110 10 83 10 64C46 65 66 80 64 107ZM82 75C50 65 49 40 53 25C80 35 89 52 82 75ZM77 87C112 92 127 76 136 57C106 52 87 64 77 87ZM49 143C85 147 103 129 108 112C79 108 59 124 49 143ZM95 47C89 25 104 7 118 1C124 24 112 41 95 47Z"
        fill="currentColor"
        opacity=".75"
      />
    </svg>
  );
}

function Taste() {
  return (
    <section className="taste section-pad" id="welcome">
      <div className="taste-heading" data-reveal>
        <Eyebrow>A LITTLE TASTE OF NOSH</Eyebrow>
        <h2>
          Good food.
          <br />
          <em>Better company.</em>
        </h2>
        <p>
          Some plans are best made around a table.
          <br />
          Come hungry. Bring your favourite people.
        </p>
        <a className="text-link" href="#menu">
          Find your next favourite <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="taste-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <img
          className="taste-platter"
          src={asset('platter-cutout')}
          alt="Nosh's photographed golden bites with a creamy drizzle and sauce, isolated for presentation"
          loading="lazy"
        />
        <Botanical className="herb-one" />
        <Botanical className="herb-two" />
        <div className="food-stamp">
          <Flower2 size={26} />
          <span>
            GOOD FOOD
            <br />
            GOOD MOOD
          </span>
        </div>
        <span className="plate-caption">A little crunch. A lot to love.</span>
      </div>
      <div className="taste-footer">
        <span>MADE FOR LONG CONVERSATIONS</span>
        <Flower2 size={20} />
        <span>AND SECOND HELPINGS</span>
      </div>
    </section>
  );
}

function FoodStrip() {
  return (
    <section className="food-strip section-pad" aria-label="Food at Nosh">
      <div className="food-strip-heading" data-reveal>
        <p>
          For the table.
          <br />
          <em>For the memories.</em>
        </p>
        <span>
          Take your time.
          <br />
          There’s plenty to love.
        </span>
      </div>
      <div className="food-grid">
        {[
          [
            'sandwich',
            'Something to share.',
            '01 / THE FIRST BITE',
            'Grilled sandwiches served at Nosh',
          ],
          [
            'chicken',
            'Big on flavour.',
            '02 / THE GOOD STUFF',
            'A golden, sauced Nosh dish with peppers',
          ],
          [
            'bread',
            'One more, please.',
            '03 / A LITTLE MORE',
            'Warm flatbread in a basket at Nosh',
          ],
        ].map(([name, title, label, alt], index) => (
          <article className={`food-card food-card-${index}`} key={name} data-reveal>
            <div className="food-image">
              <Photo name={name} alt={alt} sizes="(max-width: 700px) 90vw, 33vw" />
              <span className="food-image-index">0{index + 1}</span>
            </div>
            <span className="small-label">{label}</span>
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function MenuSection({ onViewMenu }: { onViewMenu: () => void }) {
  const [category, setCategory] = useState<Category>('All dishes');
  const list = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const visible =
    category === 'All dishes' ? menuItems : menuItems.filter((item) => item.category === category);
  useLayoutEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.motion === 'paused'
    )
      return;
    const context = gsap.context(() => {
      gsap.from('.menu-row', {
        opacity: 0,
        y: 12,
        stagger: 0.025,
        duration: 0.32,
        clearProps: 'all',
      });
    }, list);
    return () => context.revert();
  }, [category]);
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % categories.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + categories.length) % categories.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = categories.length - 1;
    else return;
    event.preventDefault();
    setCategory(categories[next]);
    buttons.current[next]?.focus();
  };
  return (
    <section className="menu-section section-pad" id="menu">
      <div className="section-top" data-reveal>
        <Eyebrow>THE MENU</Eyebrow>
        <span className="section-number">02 / EXPLORE</span>
      </div>
      <div className="menu-heading" data-reveal>
        <h2>
          Rooted in flavour.
          <br />
          <em>Made for you.</em>
        </h2>
        <div className="menu-intro">
          <p>
            Explore our Chhadakhai special selection — a taste of Odisha, from fish favourites to
            something sweet.
          </p>
          <button className="text-link" onClick={onViewMenu}>
            View the original menu <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
      <div className="special-notice">
        <Flower2 size={19} />
        <p>
          <strong>Chhadakhai special menu</strong>
          <span>
            The supplied promotion says “This Friday, Saturday & Sunday only.” Please call for
            current availability and prices.
          </span>
        </p>
        <a href={restaurant.phoneLink} aria-label="Call to check menu availability">
          <Phone size={19} />
        </a>
      </div>
      <div className="menu-tabs" role="tablist" aria-label="Filter special menu by category">
        {categories.map((name, index) => (
          <button
            key={name}
            id={`tab-${index}`}
            ref={(el) => {
              buttons.current[index] = el;
            }}
            role="tab"
            aria-selected={category === name}
            aria-controls="menu-panel"
            tabIndex={category === name ? 0 : -1}
            onKeyDown={(event) => onTabKey(event, index)}
            onClick={() => setCategory(name)}
          >
            {name}
            {category === name && <span className="tab-dot" />}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="menu-panel"
        aria-labelledby={`tab-${categories.indexOf(category)}`}
        tabIndex={0}
      >
        <div className="menu-list" ref={list}>
          {visible.map((item) => (
            <article className="menu-row" key={item.name}>
              <div>
                <span className="menu-category">{item.category}</span>
                <h3>{item.name}</h3>
              </div>
              <span className="menu-price">₹{item.price}</span>
            </article>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        {visible.length} dishes shown in {category}.
      </p>
      <div className="menu-footnote">
        <span>₹200–400 per person · indicative dining spend</span>
        <a href={restaurant.phoneLink}>
          Ask about today’s menu <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="favourites" data-reveal>
        <span className="small-label">ALSO LOVED BY OUR GUESTS</span>
        <div>
          {guestFavourites.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <p>From guest mentions · ask us what’s available today.</p>
      </div>
    </section>
  );
}

function Kitchen({ paused }: { paused: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  useEffect(() => {
    if (paused) video.current?.pause();
  }, [paused]);
  const toggleVideo = async () => {
    if (!video.current) return;
    if (video.current.paused) {
      try {
        await video.current.play();
      } catch {
        setVideoPlaying(false);
      }
    } else video.current.pause();
  };
  return (
    <section className="kitchen" id="kitchen">
      <div className="sauce-marker" aria-hidden="true">
        <span />
      </div>
      <div className="kitchen-inner">
        <div className="kitchen-background">
          {restaurant.kitchenVideo ? (
            <video
              ref={video}
              src={restaurant.kitchenVideo}
              poster={asset('chicken')}
              muted
              loop
              playsInline
              preload="none"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            />
          ) : (
            <Photo
              name="chicken"
              alt="Close-up of one of Nosh's dishes, finished with peppers and sauce"
              sizes="100vw"
            />
          )}
        </div>
        <div className="kitchen-shade" />
        <div className="kitchen-copy section-pad">
          <div className="section-top">
            <Eyebrow light>FROM OUR KITCHEN</Eyebrow>
            <span className="section-number">03 / THE FLAVOUR</span>
          </div>
          <h2>
            A little sizzle.
            <br />
            <em>A lot of soul.</em>
          </h2>
          <p>
            From the first bite to the last little scoop.
            <br />
            This is the part you came for.
          </p>
          <a href="#visit" className="button button-outline">
            Come taste for yourself <ArrowUpRight size={18} />
          </a>
          {restaurant.kitchenVideo && (
            <button className="video-toggle" onClick={toggleVideo}>
              {videoPlaying ? <Pause size={16} /> : <Play size={16} />}
              {videoPlaying ? 'Pause film' : 'Play kitchen film'}
            </button>
          )}
          <div className="kitchen-notes">
            <span>
              <i>01</i> The flavour.
            </span>
            <span>
              <i>02</i> The finishing touch.
            </span>
            <span>
              <i>03</i> Your first bite.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Space({ onPhoto }: { onPhoto: (index: number) => void }) {
  return (
    <section className="space section-pad" id="our-space">
      <div className="section-top" data-reveal>
        <Eyebrow>THE NOSH FEELING</Eyebrow>
        <span className="section-number">04 / STAY A LITTLE</span>
      </div>
      <div className="space-heading" data-reveal>
        <h2>
          More than a meal.
          <br />
          <em>A moment.</em>
        </h2>
        <p>
          Warm corners. Familiar faces. Something delicious on the table. Settle into our little
          corner of Kalinga Nagar.
        </p>
      </div>
      <div className="gallery-grid">
        {gallery.map((photo, index) => (
          <button
            className={`gallery-item gallery-item-${index}`}
            key={photo.src}
            onClick={() => onPhoto(index)}
            aria-label={`View photo: ${photo.alt}`}
          >
            <div className="gallery-photo">
              <Photo name={photo.src} alt={photo.alt} sizes="(max-width: 760px) 90vw, 55vw" />
              <span className="gallery-expand">
                <Plus size={20} />
              </span>
            </div>
            <div className="gallery-caption">
              <span>{photo.caption}</span>
              <small>{photo.kind}</small>
            </div>
          </button>
        ))}
      </div>
      <a className="instagram-link" href={restaurant.instagram} target="_blank" rel="noreferrer">
        <Instagram size={19} />
        <span>
          More little moments <strong>@n_o_s_h_25</strong>
        </span>
        <ArrowUpRight size={20} />
      </a>
    </section>
  );
}

function Reviews() {
  const [index, setIndex] = useState(0);
  return (
    <section className="reviews section-pad" aria-label="Guest reviews">
      <div className="review-aside">
        <Eyebrow>WORD AROUND THE TABLE</Eyebrow>
        <div className="rating">
          4.5<span>/ 5</span>
        </div>
        <div className="stars" aria-label="4.5 out of 5 rating">
          {Array.from({ length: 4 }, (_, i) => (
            <Star key={i} size={15} fill="currentColor" />
          ))}
          <span className="half-star" aria-hidden="true">
            <Star size={15} />
            <span>
              <Star size={15} fill="currentColor" />
            </span>
          </span>
        </div>
        <p>250 Google reviews</p>
        <small>From the supplied listing</small>
      </div>
      <div className="review-main">
        <span className="quotation" aria-hidden="true">
          “
        </span>
        <div className="review-content" key={index} aria-live="polite" aria-atomic="true">
          <blockquote>{reviews[index].quote}</blockquote>
          <p className="review-author">
            {reviews[index].author}
            <span>{reviews[index].detail}</span>
          </p>
        </div>
        <div className="review-controls">
          <span>
            0{index + 1} <i>/ 03</i>
          </span>
          <button
            className="round-button"
            aria-label="Previous review"
            onClick={() => setIndex((index + reviews.length - 1) % reviews.length)}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="round-button"
            aria-label="Next review"
            onClick={() => setIndex((index + 1) % reviews.length)}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Visit({ onReserve }: { onReserve: () => void }) {
  return (
    <section className="visit" id="visit">
      <div className="reservation-banner">
        <Photo name="dining-room" alt="Set tables and warm lights inside Nosh" sizes="100vw" />
        <div className="reservation-shade" />
        <div className="reservation-content" data-reveal>
          <Eyebrow light>THERE’S A PLACE FOR YOU HERE</Eyebrow>
          <h2>
            Your table
            <br />
            <em>is waiting.</em>
          </h2>
          <p>Good food tastes better together.</p>
          <button className="button button-cream" onClick={onReserve}>
            Let’s make a plan <ArrowUpRight size={18} />
          </button>
          <a className="reservation-phone" href={restaurant.phoneLink}>
            <Phone size={15} /> {restaurant.phone}
          </a>
        </div>
      </div>
      <div className="contact-section section-pad">
        <div className="contact-title">
          <Eyebrow>COME FIND US</Eyebrow>
          <h2>
            Your next
            <br />
            <em>favourite corner.</em>
          </h2>
        </div>
        <div className="contact-details">
          <div>
            <MapPin size={20} />
            <p>
              <strong>House of Lords, Kalinga Nagar</strong>
              <span>
                K8/906, Shampur, Bhubaneswar
                <br />
                Odisha 751029
              </span>
            </p>
          </div>
          <div>
            <UtensilsCrossed size={20} />
            <p>
              <strong>However you like to dine.</strong>
              <span>
                Dine-in · Kerbside pickup
                <br />
                No-contact delivery
              </span>
            </p>
          </div>
          <div>
            <Phone size={20} />
            <p>
              <a href={restaurant.phoneLink}>
                <strong>{restaurant.phone}</strong>
              </a>
              <span>Call for hours, availability & reservations.</span>
            </p>
          </div>
          <a
            className="button button-dark"
            href={restaurant.directions}
            target="_blank"
            rel="noreferrer"
          >
            Get directions <Navigation size={17} />
          </a>
        </div>
        <a
          className="location-card"
          href={restaurant.directions}
          target="_blank"
          rel="noreferrer"
          aria-label="Open directions to Nosh in Google Maps"
        >
          <Photo
            name="exterior"
            alt="The Nosh sign and restaurant entrance"
            sizes="(max-width: 760px) 90vw, 30vw"
          />
          <span>
            <span>
              <MapPin size={15} /> KALINGA NAGAR
            </span>
            <ArrowUpRight size={20} />
          </span>
        </a>
      </div>
    </section>
  );
}

function Footer({ paused, onMotion }: { paused: boolean; onMotion: () => void }) {
  return (
    <footer className="footer section-pad">
      <div className="footer-top">
        <a className="wordmark footer-wordmark" href="#home" aria-label="Back to Nosh home">
          nosh<span>.</span>
        </a>
        <p>
          Where every bite
          <br />
          <em>feels like home.</em>
        </p>
        <a className="footer-back" href="#home">
          Back to the top <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Nosh. All good things, shared.</span>
        <a href={restaurant.instagram} target="_blank" rel="noreferrer">
          Instagram <ArrowUpRight size={13} />
        </a>
        <button onClick={onMotion} aria-pressed={paused}>
          {paused ? <Play size={13} /> : <Pause size={13} />}
          {paused ? 'Enable motion' : 'Pause motion'}
        </button>
        <span>BHUBANESWAR, ODISHA</span>
      </div>
    </footer>
  );
}

function Dialog({
  children,
  onClose,
  label,
  className = '',
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-label={label}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const box = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            onClose();
        }
      }}
    >
      <button className="dialog-close icon-button" aria-label="Close dialog" onClick={onClose}>
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}

function GalleryDialog({
  index,
  setIndex,
  onClose,
}: {
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'ArrowRight') setIndex((index + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setIndex((index - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, setIndex]);
  return (
    <Dialog onClose={onClose} label="Nosh photo gallery" className="gallery-dialog">
      <img src={asset(gallery[index].src)} alt={gallery[index].alt} />
      <div className="lightbox-bottom">
        <p>
          {gallery[index].caption}
          <span>
            {index + 1} / {gallery.length}
          </span>
        </p>
        <div>
          <button
            className="round-button"
            aria-label="Previous photo"
            onClick={() => setIndex((index - 1 + gallery.length) % gallery.length)}
          >
            <ChevronLeft />
          </button>
          <button
            className="round-button"
            aria-label="Next photo"
            onClick={() => setIndex((index + 1) % gallery.length)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function ReservationDialog({ onClose }: { onClose: () => void }) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const summary = `Hello Nosh, I'd like to request a table for ${guests} ${guests === 1 ? 'guest' : 'guests'}${date ? ` on ${new Date(date + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}${time ? ` at ${time}` : ''}${name.trim() ? `. My name is ${name.trim()}` : ''}. Please confirm availability. Thank you!`;
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <Dialog onClose={onClose} label="Plan your visit to Nosh" className="reservation-dialog">
      <Eyebrow>A TABLE FOR YOU</Eyebrow>
      <h2>
        Good plans
        <br />
        start <em>here.</em>
      </h2>
      <p className="reservation-explanation">
        Choose your preferences, then call us to confirm your table. This planner does not submit a
        booking.
      </p>
      <div className="guest-picker">
        <span>Your people</span>
        <div>
          <button
            className="round-button"
            aria-label="Remove one guest"
            disabled={guests === 1}
            onClick={() => {
              setGuests(guests - 1);
              setCopied(false);
            }}
          >
            <Minus size={17} />
          </button>
          <output aria-live="polite">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </output>
          <button
            className="round-button"
            aria-label="Add one guest"
            disabled={guests === 20}
            onClick={() => {
              setGuests(guests + 1);
              setCopied(false);
            }}
          >
            <Plus size={17} />
          </button>
        </div>
      </div>
      <div className="visit-fields">
        <label>
          Your name <span>(optional)</span>
          <input
            autoComplete="given-name"
            value={name}
            maxLength={60}
            placeholder="What should we call you?"
            onChange={(event) => {
              setName(event.target.value);
              setCopied(false);
            }}
          />
        </label>
        <label>
          Preferred date
          <input
            type="date"
            min={today}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setCopied(false);
            }}
          />
        </label>
        <label>
          Preferred time
          <input
            type="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
              setCopied(false);
            }}
          />
        </label>
      </div>
      <p className="booking-summary">{summary}</p>
      <div className="reservation-actions">
        <a className="button button-dark" href={restaurant.phoneLink}>
          Call to confirm <Phone size={17} />
        </a>
        <button className="copy-button" onClick={copyRequest}>
          {copied ? <Check size={17} /> : <Copy size={17} />}
          {copied ? 'Copied' : 'Copy request'}
        </button>
      </div>
      <p className="copy-status" role="status">
        {copyError
          ? 'Copy is unavailable in this browser. You can select the request text above, or call us directly.'
          : copied
            ? 'Your request is copied. Please call Nosh to arrange and confirm your table.'
            : 'Preferences stay in this browser session. Nothing is sent automatically.'}
      </p>
    </Dialog>
  );
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [reservation, setReservation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  useCinematicMotion(root, paused);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'enabled';
  }, [paused]);
  return (
    <div ref={root} className={`app ${paused ? 'motion-paused' : ''}`}>
      <a className="skip-link" href="#menu">
        Skip to the menu
      </a>
      <div className="page-progress" aria-hidden="true" />
      <Header onReserve={() => setReservation(true)} />
      <main>
        <Hero />
        <Taste />
        <FoodStrip />
        <MenuSection onViewMenu={() => setMenuOpen(true)} />
        <Kitchen paused={paused} />
        <Space onPhoto={setPhotoIndex} />
        <Reviews />
        <Visit onReserve={() => setReservation(true)} />
      </main>
      <Footer paused={paused} onMotion={() => setPaused(!paused)} />
      <a href={restaurant.phoneLink} className="mobile-call">
        <Phone size={16} /> Reserve a table <ArrowUpRight size={16} />
      </a>
      {reservation && <ReservationDialog onClose={() => setReservation(false)} />}
      {menuOpen && (
        <Dialog
          onClose={() => setMenuOpen(false)}
          label="Original Chhadakhai special menu"
          className="menu-dialog"
        >
          <div className="menu-dialog-heading">
            <Eyebrow>THE ORIGINAL MENU</Eyebrow>
            <h2>Chhadakhai special</h2>
            <p>Supplied promotion · call for current availability and prices.</p>
          </div>
          <img
            src={asset('special-menu')}
            alt="Nosh Chhadakhai special menu: Friday, Saturday and Sunday only. Fish, mutton, rice and dessert selections. All dishes and supplied prices are transcribed in the menu section."
          />
          <a className="button button-dark" href={restaurant.phoneLink}>
            Ask about today’s menu <Phone size={17} />
          </a>
        </Dialog>
      )}
      {photoIndex !== null && (
        <GalleryDialog
          index={photoIndex}
          setIndex={setPhotoIndex}
          onClose={() => setPhotoIndex(null)}
        />
      )}
    </div>
  );
}
