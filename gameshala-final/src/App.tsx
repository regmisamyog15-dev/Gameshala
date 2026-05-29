import { useEffect, useState, useRef, useCallback } from "react";
import {
  MapPin, Phone, Clock, Instagram, Facebook,
  Gamepad2, Trophy, Disc3,
  ChevronDown, Zap, Shield, Menu, X, ShoppingBag, Star,
  MessageCircle, Truck, CalendarCheck, Users, ChevronLeft, ChevronRight
} from "lucide-react";

const BUSINESS = {
  name: "Gameshala Gaming Lounge",
  phone: "9802854558",
  phoneFormatted: "+977 980-2854558",
  address: "2nd Floor, Opposite Bishal Bazar (Palikhe Chowk side), Mahendrapool, Pokhara, Nepal",
  hours: { open: 8, close: 21, label: "Daily 8:00 AM – 9:00 PM" },
  instagram: "https://instagram.com/gameshala_gaming_lounge?igshid=NTc4MTIwNjQ2YQ==",
  facebook: "https://www.facebook.com/gameshalagaminglounge/",
  whatsapp: "https://wa.me/9779802854558",
  mapsUrl: "https://maps.app.goo.gl/oxyaLYsA8N6HV8Vf7",
};

const SLIDES: Array<{ src?: string; brand?: boolean; tag: string; title: string; sub: string; cta: string; ctaHref: string }> = [
  { brand: true, tag: "POKHARA · MAHENDRAPOOL", title: "GAMESHALA\nGAMING LOUNGE", sub: "Pokhara's most affordable PS5 hub — premium consoles, tournaments & digital store.", cta: "Book a Session", ctaHref: "#booking" },
  { src: "/slides/gaming-gear.png", tag: "PREMIUM SETUP", title: "Top-Tier Gear, Every Session", sub: "Multiple PS5 consoles — play solo or with friends. Starting Rs. 80 / 30 min.", cta: "Book Now", ctaHref: "#booking" },
  { src: "/slides/fc-goal.webp", tag: "FC 26 AVAILABLE", title: "Feel the Thrill of the Pitch", sub: "EA Sports FC 26 and all top titles available on PS5.", cta: "View Games", ctaHref: "#games" },
  { src: "/slides/tournament-prize.png", tag: "TOURNAMENTS", title: "Compete & Win Cash Prizes", sub: "Monthly FC 26 tournaments with real prize pools.", cta: "Join Now", ctaHref: "#tournaments" },
  { src: "/slides/rdra.webp", tag: "ALL GENRES", title: "Every Genre, Every Vibe", sub: "From open-world adventures to sports — we've got it all.", cta: "See Store", ctaHref: "#store" },
];

const GAMES = [
  { name: "EA Sports FC 26", genre: "Football", emoji: "⚽", color: "var(--neon-green)" },
  { name: "NBA 2K Series", genre: "Basketball", emoji: "🏀", color: "var(--neon-red)" },
  { name: "God of War", genre: "Action-Adventure", emoji: "⚔️", color: "var(--neon-purple)" },
  { name: "Call of Duty", genre: "FPS Shooter", emoji: "🔫", color: "var(--neon-blue)" },
  { name: "PUBG", genre: "Battle Royale", emoji: "🪖", color: "#f59e0b" },
  { name: "Cricket 24", genre: "Sports", emoji: "🏏", color: "var(--neon-green)" },
  { name: "UFC / WWE", genre: "Fighting", emoji: "🥊", color: "var(--neon-red)" },
  { name: "Racing Games", genre: "Racing", emoji: "🏎️", color: "var(--neon-blue)" },
];

const PRICING = [
  { label: "30 Min Session", price: "Rs. 80", unit: "/ 30 min", desc: "Quick session — perfect for a fast match or practice round", color: "var(--neon-blue)", popular: false },
  { label: "1 Hour Session", price: "Rs. 160", unit: "/ hour", desc: "Standard session — best for solo adventures or VS battles", color: "var(--neon-purple)", popular: true },
  { label: "Pool Table", price: "Rs. 50", unit: "/ hour", desc: "Dedicated billiards area — great for a break between gaming sessions", color: "var(--neon-green)", popular: false },
  { label: "Tournament Entry", price: "Rs. 500", unit: "per team", desc: "Monthly esports tournaments with real cash prize pools", color: "var(--neon-red)", popular: false },
];

const FAQS = [
  { q: "Where exactly is Gameshala located?", a: "We're on the 2nd floor directly opposite Bishal Bazar on the Palikhe Chowk side, Mahendrapool, Pokhara. Easy to find — look for the gaming signage on the building." },
  { q: "How do I book a session in advance?", a: "You can book via WhatsApp or Instagram — just send us a message with your preferred time and we'll confirm your slot. Walk-ins are also always welcome!" },
  { q: "What games are available on PS4 & PS5?", a: "Our catalog includes EA Sports FC 26, NBA 2K, God of War, Call of Duty, PUBG, Cricket 24, UFC, WWE Wrestling, and various racing titles — all kept updated." },
  { q: "Do you sell digital games?", a: "Yes! We sell PlayStation digital games for both PS4 and PS5, as well as PS Plus subscriptions and other PlayStation accessories including controller stickers." },
  { q: "Do you sell game discs?", a: "Yes, we sell brand-new physical game discs for PS4 and PS5. Please note we do not buy or exchange old/used discs." },
  { q: "Can I rent a PlayStation console?", a: "Yes! We offer PS4 rental at Rs. 1000/day and PS5 rental at Rs. 3000/day. Delivery service is available. Contact us via WhatsApp or call to arrange a rental." },
  { q: "How do tournaments work?", a: "We host monthly competitive tournaments (e.g. FC 26 tournaments). Entry fee is around Rs. 500 with cash prize pools. Follow our Instagram or Facebook for announcements." },
  { q: "What are your operating hours?", a: "We're open every day from 8:00 AM to 9:00 PM, including public holidays." },
];

function useIsOpen() {
  const h = new Date().getHours();
  return h >= 8 && h < 21;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

/* ─── WhatsApp FAB ─────────────────────────────────────────── */
function WhatsAppFAB() {
  return (
    <a
      href={BUSINESS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100,
        width: 56, height: 56, borderRadius: "50%", background: "#25d366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ─── Navbar ───────────────────────────────────────────────── */
function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const isOpen = useIsOpen();

  const navLinks = [
    { label: "Games", href: "#games" },
    { label: "Pricing", href: "#pricing" },
    { label: "Book", href: "#booking" },
    { label: "Rent PS", href: "#rent" },
    { label: "Store", href: "#store" },
    { label: "Tournaments", href: "#tournaments" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(4,4,10,0.97)" : "rgba(4,4,10,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-6">
          {/* Logo + open dot — left */}
          <a href="#hero" className="flex items-center gap-2 shrink-0">
            <Gamepad2 size={20} style={{ color: "var(--neon-blue)" }} className="animate-rgb" />
            <span className="section-title gradient-text-blue" style={{ fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              GAMESHALA
            </span>
            {/* Tiny status dot right after logo */}
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse ml-1"
              title={isOpen ? "Open now" : "Closed"}
              style={{ background: isOpen ? "var(--neon-green)" : "var(--neon-red)" }}
            />
          </a>

          {/* Nav links — left-aligned, flex-1 */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-white/5 whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Action buttons — right */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            {/* Open / Closed badge */}
            <div
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide"
              style={{
                background: isOpen ? "rgba(0,255,136,0.1)" : "rgba(255,45,85,0.1)",
                border: `1px solid ${isOpen ? "rgba(0,255,136,0.3)" : "rgba(255,45,85,0.3)"}`,
                color: isOpen ? "var(--neon-green)" : "var(--neon-red)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: isOpen ? "var(--neon-green)" : "var(--neon-red)" }} />
              {isOpen ? "OPEN" : "CLOSED"}
            </div>

            {/* Location */}
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-neon btn-neon-red text-xs px-3 py-2 flex items-center gap-1">
                <MapPin size={12} /> Location
              </button>
            </a>

            {/* Call */}
            <a href={`tel:${BUSINESS.phone}`}>
              <button className="btn-neon btn-neon-purple text-xs px-3 py-2 flex items-center gap-1">
                <Phone size={12} /> Call
              </button>
            </a>

            {/* Book Now */}
            <a href="#booking">
              <button className="btn-neon text-xs px-4 py-2">Book Now</button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center gap-1.5 text-gray-300 hover:text-white p-1 ml-auto"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="text-xs font-semibold tracking-widest" style={{ color: "var(--neon-blue)" }}>
              {open ? "CLOSE" : "MENU"}
            </span>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden px-4 pb-6 pt-2"
          style={{ background: "rgba(4,4,10,0.98)", borderBottom: "1px solid rgba(0,212,255,0.12)" }}
        >
          <div className="grid grid-cols-2 gap-1 mb-4">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-gray-300 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="border-t border-white/5 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs" style={{ color: isOpen ? "var(--neon-green)" : "var(--neon-red)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: isOpen ? "var(--neon-green)" : "var(--neon-red)" }} />
              {isOpen ? "OPEN NOW" : "CLOSED"}
            </div>
            <div className="flex gap-2">
              <a href={`tel:${BUSINESS.phone}`}>
                <button className="btn-neon btn-neon-purple text-xs px-3 py-2">Call</button>
              </a>
              <a href="#booking" onClick={() => setOpen(false)}>
                <button className="btn-neon text-xs px-3 py-2">Book Now</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Slider ──────────────────────────────────────────── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [displayed, setDisplayed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    const next = dir === "next"
      ? (current + 1) % SLIDES.length
      : (current - 1 + SLIDES.length) % SLIDES.length;
    setCurrent(next);
    setTimeout(() => {
      setDisplayed(next);
      setAnimating(false);
    }, 550);
  }, [animating, current]);

  useEffect(() => {
    timerRef.current = setTimeout(() => go("next"), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [go, current]);

  const slide = SLIDES[current];
  const prev = SLIDES[displayed];

  return (
    <div
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 480, paddingTop: 64 }}
    >
      {/* Previous slide stays visible while animating */}
      <div
        className="absolute inset-0 transition-transform"
        style={{
          transitionDuration: "550ms",
          transitionTimingFunction: "cubic-bezier(0.77,0,0.18,1)",
          transform: animating
            ? direction === "next" ? "translateX(-100%)" : "translateX(100%)"
            : "translateX(0)",
          zIndex: 1,
        }}
      >
        {prev.brand ? (
          <div className="absolute inset-0 rgb-grid" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0,212,255,0.09) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 80% 70%, rgba(180,0,255,0.07) 0%, transparent 60%), #04040a" }} />
        ) : (
          <>
            <img src={prev.src} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,4,10,0.85) 0%, rgba(4,4,10,0.1) 60%, transparent 100%)" }} />
          </>
        )}
      </div>

      {/* Incoming slide */}
      {animating && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            animation: `${direction === "next" ? "slideInFromRight" : "slideInFromLeft"} 550ms cubic-bezier(0.77,0,0.18,1) forwards`,
          }}
        >
          {slide.brand ? (
            <div className="absolute inset-0 rgb-grid" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0,212,255,0.09) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 80% 70%, rgba(180,0,255,0.07) 0%, transparent 60%), #04040a" }} />
          ) : (
            <>
              <img src={slide.src} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,4,10,0.85) 0%, rgba(4,4,10,0.1) 60%, transparent 100%)" }} />
            </>
          )}
        </div>
      )}

      {/* Text content */}
      {slide.brand ? (
        /* ── Brand / title slide ── */
        <div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          key={current}
          style={{ animation: "sliderTextIn 0.5s ease 0.25s both" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Gamepad2 size={36} style={{ color: "var(--neon-blue)" }} className="animate-rgb" />
          </div>
          <h1
            className="section-title gradient-text-blue mb-3"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 1.05, whiteSpace: "pre-line" }}
          >
            {slide.title.split("\n")[0]}
          </h1>
          <p
            className="text-white mb-2 tracking-widest"
            style={{ fontSize: "clamp(0.8rem, 2vw, 1.1rem)", letterSpacing: "0.35em", opacity: 0.7 }}
          >
            {slide.title.split("\n")[1]}
          </p>
          <div className="w-16 h-px my-5" style={{ background: "linear-gradient(90deg, transparent, var(--neon-blue), transparent)" }} />
          <p className="text-gray-400 mb-8 max-w-lg" style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>
            {slide.sub}
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href={slide.ctaHref}>
              <button className="btn-neon text-sm px-8 py-3">{slide.cta}</button>
            </a>
            <a href={`tel:${BUSINESS.phone}`}>
              <button className="btn-neon btn-neon-purple text-sm px-8 py-3">
                <Phone size={14} className="inline mr-1" /> Call Us
              </button>
            </a>
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-neon btn-neon-red text-sm px-8 py-3">
                <MapPin size={14} className="inline mr-1" /> Find Us
              </button>
            </a>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs" style={{ color: "var(--neon-green)", opacity: 0.8 }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--neon-green)" }} />
            Mahendrapool, Pokhara · Daily 8 AM – 9 PM
          </div>
        </div>
      ) : (
        /* ── Photo slides ── */
        <div
          className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-4xl"
          key={current}
          style={{ animation: "sliderTextIn 0.5s ease 0.25s both" }}
        >
          <span
            className="section-title text-xs tracking-widest mb-4 inline-block"
            style={{ color: "var(--neon-blue)" }}
          >
            {slide.tag}
          </span>
          <h1
            className="font-black text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)", lineHeight: 1.1, textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}
          >
            {slide.title}
          </h1>
          <p className="text-gray-300 mb-8 max-w-lg" style={{ fontSize: "clamp(0.9rem, 2vw, 1.15rem)" }}>
            {slide.sub}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href={slide.ctaHref}
              target={slide.ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={slide.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <button className="btn-neon text-sm px-7 py-3">{slide.cta}</button>
            </a>
            <a href="#booking">
              <button className="btn-neon btn-neon-purple text-sm px-7 py-3">Book a Session</button>
            </a>
          </div>
        </div>
      )}

      {/* Arrow buttons */}
      <button
        onClick={() => go("prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
      >
        <ChevronLeft size={20} color="white" />
      </button>
      <button
        onClick={() => go("next")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
      >
        <ChevronRight size={20} color="white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (!animating && i !== current) { setDirection(i > current ? "next" : "prev"); setAnimating(true); setCurrent(i); setTimeout(() => { setDisplayed(i); setAnimating(false); }, 550); } }}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "var(--neon-blue)" : "rgba(255,255,255,0.3)",
              transition: "all 0.35s",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Quick stats bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ background: "rgba(4,4,10,0.85)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap justify-center sm:justify-between gap-4 text-xs">
          {[
            { icon: <Gamepad2 size={13} />, text: "PS4 & PS5 Available", color: "var(--neon-blue)" },
            { icon: <Zap size={13} />, text: "From Rs. 80 / 30 min", color: "var(--neon-green)" },
            { icon: <Trophy size={13} />, text: "Monthly Tournaments", color: "var(--neon-purple)" },
            { icon: <Truck size={13} />, text: "Console Rental + Delivery", color: "var(--neon-red)" },
          ].map(({ icon, text, color }) => (
            <span key={text} className="flex items-center gap-1.5 font-semibold" style={{ color }}>
              {icon} {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        @keyframes sliderTextIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Games ────────────────────────────────────────────────── */
function Games() {
  return (
    <section id="games" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-blue tracking-widest mb-2">GAME CATALOG</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">Top Titles Available</h2>
          <p className="text-gray-400 max-w-lg mx-auto">All titles regularly updated. Ask at the counter for our full catalog.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GAMES.map(({ name, genre, emoji, color }) => (
            <div key={name} className="card-glow rounded-xl p-5 text-center" style={{ background: "var(--bg-card)" }}>
              <div className="text-4xl mb-3">{emoji}</div>
              <div className="font-bold text-white text-sm mb-1">{name}</div>
              <div className="text-xs font-semibold" style={{ color }}>{genre}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="card-glow rounded-xl p-8 flex items-center gap-6" style={{ background: "var(--bg-card)", borderColor: "rgba(0,212,255,0.3)" }}>
            <Gamepad2 size={52} style={{ color: "var(--neon-blue)", flexShrink: 0 }} className="animate-float" />
            <div>
              <div className="section-title text-lg neon-blue mb-1">PlayStation 4 & 5</div>
              <p className="text-gray-400 text-sm">Latest PS5 consoles with premium DualSense controllers and 4K display. PS4 titles also fully supported. Comfortable seating for long sessions.</p>
            </div>
          </div>
          <div className="card-glow rounded-xl p-8 flex items-center gap-6" style={{ background: "var(--bg-card)", borderColor: "rgba(0,255,136,0.3)" }}>
            <span className="text-5xl" style={{ flexShrink: 0 }}>🎱</span>
            <div>
              <div className="section-title text-lg neon-green mb-1">Pool Table</div>
              <p className="text-gray-400 text-sm">Dedicated billiards area at just Rs. 50/hr. Great for a break between gaming sessions or a fun side activity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ──────────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 rgb-grid" style={{ background: "var(--bg-card2)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-purple tracking-widest mb-2">AFFORDABLE RATES</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">Pricing</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Budget-friendly gaming — no hidden fees. All prices confirmed at the counter.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map(({ label, price, unit, desc, color, popular }) => (
            <div key={label} className="card-glow rounded-xl p-6 relative flex flex-col"
              style={{ background: "var(--bg-dark)", borderColor: popular ? color : undefined, boxShadow: popular ? `0 0 30px ${color}22` : undefined }}>
              {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full section-title" style={{ background: color, color: "#04040a" }}>POPULAR</div>
              )}
              <div className="section-title text-xs tracking-widest mb-3" style={{ color }}>{label}</div>
              <div className="flex items-end gap-1 mb-3">
                <span className="section-title text-3xl font-black" style={{ color }}>{price}</span>
                <span className="text-gray-500 text-sm mb-1">{unit}</span>
              </div>
              <p className="text-gray-400 text-sm flex-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Booking ──────────────────────────────────────────────── */
function Booking() {
  const [chosen, setChosen] = useState<"whatsapp" | "instagram" | null>(null);
  return (
    <section id="booking" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-blue tracking-widest mb-2">RESERVE YOUR SPOT</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">Advance Booking &amp; Reservation</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Planning your gaming session at Gameshala is now easier than ever. Secure your console, skip the wait.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <div className="text-9xl animate-float select-none">🎮</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <CalendarCheck size={20} />, title: "Skip the Wait", desc: "Reserve your time slot and walk in directly — no queue.", color: "var(--neon-blue)" },
                { icon: <Users size={20} />, title: "Group Sessions", desc: "Coming with friends? Book multiple consoles together.", color: "var(--neon-purple)" },
                { icon: <Gamepad2 size={20} />, title: "Choose Your Console", desc: "PS4 or PS5 — tell us your preference when booking.", color: "var(--neon-green)" },
                { icon: <Phone size={20} />, title: "Quick Confirmation", desc: "We'll confirm your booking within minutes of your message.", color: "var(--neon-red)" },
              ].map(({ icon, title, desc, color }) => (
                <div key={title} className="card-glow rounded-xl p-5 flex gap-4" style={{ background: "var(--bg-card)" }}>
                  <div className="shrink-0 mt-0.5" style={{ color }}>{icon}</div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-1">{title}</div>
                    <p className="text-gray-500 text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-glow rounded-2xl p-8 sm:p-10" style={{ background: "var(--bg-card)" }}>
            <div className="section-title text-lg neon-blue mb-2">How would you like to book?</div>
            <p className="text-gray-400 text-sm mb-8">Pick your preferred platform — we respond fast on both.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={() => setChosen("whatsapp")}
                className="rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-200 border-2"
                style={{ background: chosen === "whatsapp" ? "rgba(37,211,102,0.12)" : "var(--bg-dark)", borderColor: chosen === "whatsapp" ? "#25d366" : "rgba(255,255,255,0.07)", transform: chosen === "whatsapp" ? "scale(1.03)" : "scale(1)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#25d366" }}>
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div><div className="font-bold text-white text-sm">WhatsApp</div><div className="text-xs text-gray-500">Instant message</div></div>
                {chosen === "whatsapp" && <div className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#25d366", color: "#000" }}>Selected</div>}
              </button>
              <button onClick={() => setChosen("instagram")}
                className="rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-200 border-2"
                style={{ background: chosen === "instagram" ? "rgba(180,0,255,0.1)" : "var(--bg-dark)", borderColor: chosen === "instagram" ? "var(--neon-purple)" : "rgba(255,255,255,0.07)", transform: chosen === "instagram" ? "scale(1.03)" : "scale(1)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
                  <Instagram size={28} color="white" />
                </div>
                <div><div className="font-bold text-white text-sm">Instagram</div><div className="text-xs text-gray-500">DM to book</div></div>
                {chosen === "instagram" && <div className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--neon-purple)", color: "#000" }}>Selected</div>}
              </button>
            </div>
            {chosen === "whatsapp" && (
              <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="block">
                <button className="w-full py-4 rounded-xl font-bold text-black text-base transition-all hover:scale-105" style={{ background: "#25d366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>💬 Open WhatsApp to Book</button>
              </a>
            )}
            {chosen === "instagram" && (
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="block">
                <button className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", boxShadow: "0 4px 20px rgba(180,0,255,0.35)" }}>📸 Open Instagram to DM</button>
              </a>
            )}
            {!chosen && (
              <div className="w-full py-4 rounded-xl text-center text-gray-600 text-sm border border-white/5" style={{ background: "var(--bg-dark)" }}>Select a platform above to continue</div>
            )}
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
              <Phone size={16} style={{ color: "var(--neon-green)", flexShrink: 0 }} />
              <div>
                <div className="text-xs text-gray-500">Prefer to call directly?</div>
                <a href={`tel:${BUSINESS.phone}`} className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "var(--neon-green)" }}>{BUSINESS.phoneFormatted}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Rental ───────────────────────────────────────────────── */
function Rental() {
  return (
    <section id="rent" className="py-24 px-4 sm:px-6 rgb-grid" style={{ background: "var(--bg-card2)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-red tracking-widest mb-2">CONSOLE RENTAL</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-red mb-4">PS5 & PS4 for Rent</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Take the gaming home! Rent a PlayStation console for parties, weekends, or any occasion. Delivery available in Pokhara.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="card-glow rounded-2xl p-8 flex items-center gap-6" style={{ background: "var(--bg-dark)", borderColor: "rgba(0,212,255,0.3)" }}>
            <div className="text-center shrink-0">
              <div className="text-6xl mb-1">🎮</div>
              <div className="section-title text-xs neon-blue tracking-widest">PS4</div>
            </div>
            <div className="flex-1">
              <div className="section-title text-2xl neon-blue mb-1">Rs. 1,000<span className="text-gray-500 text-base font-normal"> / day</span></div>
              <p className="text-gray-400 text-sm">PlayStation 4 — great for classic titles, parties and group play. Full 24-hour rental period.</p>
            </div>
          </div>
          <div className="card-glow rounded-2xl p-8 flex items-center gap-6" style={{ background: "var(--bg-dark)", borderColor: "rgba(180,0,255,0.4)", boxShadow: "0 0 30px rgba(180,0,255,0.12)" }}>
            <div className="text-center shrink-0">
              <div className="text-6xl mb-1">🕹️</div>
              <div className="section-title text-xs tracking-widest" style={{ color: "var(--neon-purple)" }}>PS5</div>
            </div>
            <div className="flex-1">
              <div className="section-title text-2xl mb-1" style={{ color: "var(--neon-purple)" }}>Rs. 3,000<span className="text-gray-500 text-base font-normal"> / day</span></div>
              <p className="text-gray-400 text-sm">Latest PlayStation 5 with DualSense controller. Perfect for premium gaming at home or events.</p>
              <span className="text-xs px-2 py-0.5 rounded-full mt-2 inline-block section-title" style={{ background: "rgba(180,0,255,0.15)", color: "var(--neon-purple)", border: "1px solid rgba(180,0,255,0.3)" }}>PREMIUM</span>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <Truck size={22} />, title: "Delivery Available", desc: "We deliver to your location across Pokhara", color: "var(--neon-green)" },
            { icon: <Clock size={22} />, title: "24-Hour Rental", desc: "Full day rental so you game at your own pace", color: "var(--neon-blue)" },
            { icon: <Users size={22} />, title: "Parties & Events", desc: "Ideal for birthdays, weekends & group gatherings", color: "var(--neon-purple)" },
            { icon: <MessageCircle size={22} />, title: "Easy Booking", desc: "DM us or call — we confirm bookings fast", color: "var(--neon-red)" },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className="card-glow rounded-xl p-5 text-center" style={{ background: "var(--bg-dark)" }}>
              <div className="flex justify-center mb-3" style={{ color }}>{icon}</div>
              <div className="font-bold text-white text-sm mb-1">{title}</div>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
        <div className="card-glow rounded-2xl p-8 text-center" style={{ background: "var(--bg-dark)", borderColor: "rgba(0,212,255,0.2)" }}>
          <div className="section-title text-xl neon-blue mb-2">Ready to Rent?</div>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">Contact us via WhatsApp, Instagram DM, or give us a call. We'll arrange everything — including delivery.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
              <button className="py-3 px-7 rounded-xl font-bold text-black text-sm transition-all hover:scale-105" style={{ background: "#25d366", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }}>💬 WhatsApp to Book</button>
            </a>
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
              <button className="py-3 px-7 rounded-xl font-bold text-white text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}>📸 DM on Instagram</button>
            </a>
            <a href={`tel:${BUSINESS.phone}`}>
              <button className="btn-neon btn-neon-purple text-sm px-7 py-3">📞 Call Now</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Store ────────────────────────────────────────────────── */
function Store() {
  return (
    <section id="store" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-blue tracking-widest mb-2">PLAYSTATION STORE</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">Games &amp; Accessories</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Your one-stop PlayStation shop — digital games, discs, accessories and more.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Gamepad2 size={36} />, title: "Digital Games", desc: "Buy digital PS4 and PS5 games directly. Full library access — just ask at the counter.", color: "var(--neon-blue)", badge: "PS4 & PS5" },
            { icon: <Disc3 size={36} />, title: "Game Discs", desc: "Brand-new physical PS4 & PS5 game discs at fair prices. New discs only.", color: "var(--neon-purple)", badge: "New Only" },
            { icon: <Star size={36} />, title: "PS Plus", desc: "PlayStation Plus — Essential, Extra, or Premium. Unlock online play & monthly games.", color: "var(--neon-green)", badge: "All Tiers" },
            { icon: <Shield size={36} />, title: "Controller Stickers", desc: "Customize your DualSense with premium controller skins and stickers.", color: "#f59e0b", badge: "In Stock" },
            { icon: <ShoppingBag size={36} />, title: "PS Accessories", desc: "Charging docks, headsets, and more PlayStation accessories in store.", color: "var(--neon-red)", badge: "Wide Range" },
            { icon: <span className="text-4xl block text-center">🎮</span>, title: "More In Store", desc: "Visit us or call — we're always happy to help you find the right product.", color: "var(--neon-blue)", badge: "Visit Us" },
          ].map(({ icon, title, desc, color, badge }) => (
            <div key={title} className="card-glow rounded-xl p-7 flex flex-col" style={{ background: "var(--bg-card)" }}>
              <div className="flex items-start justify-between mb-4">
                <div style={{ color }}>{icon}</div>
                <span className="text-xs px-2 py-1 rounded-full section-title" style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>{badge}</span>
              </div>
              <div className="section-title text-base mb-2" style={{ color }}>{title}</div>
              <p className="text-gray-400 text-sm flex-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tournaments ──────────────────────────────────────────── */
function Tournaments() {
  return (
    <section id="tournaments" className="py-24 px-4 sm:px-6" style={{ background: "var(--bg-card2)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs section-title neon-red tracking-widest mb-2">ESPORTS</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-red mb-4">Monthly Tournaments</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Compete for real cash prizes — monthly competitive tournaments featuring EA Sports FC 26.</p>
        </div>
        <div className="card-glow rounded-2xl p-8 sm:p-12 text-center animate-border-glow" style={{ background: "var(--bg-card)" }}>
          <Trophy size={64} style={{ color: "var(--neon-red)", margin: "0 auto 1.5rem" }} className="animate-float" />
          <div className="section-title text-2xl neon-red mb-2">FC 26 TOURNAMENT</div>
          <div className="text-gray-400 mb-6 max-w-sm mx-auto">Monthly competitive EA FC tournaments with real cash prize pools. Follow us on social media for schedules and registration.</div>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div><div className="section-title text-2xl neon-red">Rs. 500</div><div className="text-gray-500 text-sm">Entry Fee</div></div>
            <div><div className="section-title text-2xl" style={{ color: "var(--neon-purple)" }}>Cash</div><div className="text-gray-500 text-sm">Prize Pool</div></div>
            <div><div className="section-title text-2xl neon-blue">Monthly</div><div className="text-gray-500 text-sm">Frequency</div></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
              <button className="btn-neon btn-neon-red text-sm px-8 py-3">Register on Instagram</button>
            </a>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
              <button className="btn-neon btn-neon-purple text-sm px-8 py-3">Follow on Facebook</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ──────────────────────────────────────────────────── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs section-title neon-green tracking-widest mb-2">NEED HELP?</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className="card-glow rounded-xl overflow-hidden" style={{ background: "var(--bg-card)" }}>
              <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className="font-semibold text-white text-sm sm:text-base">{q}</span>
                <ChevronDown size={18} style={{ color: "var(--neon-blue)", flexShrink: 0, transform: openIdx === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
              </button>
              {openIdx === i && <div className="px-6 pb-5 text-gray-400 text-sm border-t border-white/5 pt-4">{a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Get In Touch ─────────────────────────────────────────── */
function GetInTouch() {
  const socials = [
    { name: "Facebook", sub: "Social Network", href: BUSINESS.facebook, bg: "#1877F2", icon: (<svg viewBox="0 0 24 24" width="34" height="34" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>) },
    { name: "Instagram", sub: "Visual Stories", href: BUSINESS.instagram, bg: "linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", icon: <Instagram size={34} color="white" /> },
    { name: "WhatsApp", sub: "Chat & Book", href: BUSINESS.whatsapp, bg: "#25d366", icon: (<svg viewBox="0 0 24 24" width="34" height="34" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>) },
    { name: "Call Us", sub: "Direct Line", href: `tel:${BUSINESS.phone}`, bg: "linear-gradient(135deg,var(--neon-green),var(--neon-blue))", icon: <Phone size={34} color="white" /> },
  ];
  return (
    <section id="connect" className="py-24 px-4 sm:px-6 rgb-grid" style={{ background: "var(--bg-dark)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-xs px-4 py-1.5 rounded-full section-title border" style={{ color: "var(--neon-blue)", borderColor: "rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.06)" }}>Connect &amp; Collaborate</span>
        </div>
        <div className="text-center mb-5 mt-4">
          <h2 className="section-title text-4xl sm:text-5xl text-white mb-4" style={{ letterSpacing: "-0.02em" }}>GET IN TOUCH</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Join our community across platforms and stay connected with the latest updates, tournament announcements, and offers.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {socials.map(({ name, sub, href, bg, icon }) => (
            <a key={name} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group card-glow rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg }}>{icon}</div>
              <div>
                <div className="font-bold text-white text-base mb-0.5">{name}</div>
                <div className="text-gray-500 text-sm">{sub}</div>
              </div>
              <div className="text-sm flex items-center gap-1 mt-auto transition-colors group-hover:text-white" style={{ color: "var(--neon-blue)" }}>
                Connect <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ──────────────────────────────────────────────── */
function Contact() {
  const isOpen = useIsOpen();
  return (
    <section id="contact" className="py-24 px-4 sm:px-6" style={{ background: "var(--bg-card2)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-blue tracking-widest mb-2">FIND US</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">Contact &amp; Location</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-glow rounded-2xl p-8 flex flex-col gap-6" style={{ background: "var(--bg-dark)" }}>
            <span className={`status-open ${!isOpen ? "status-closed" : ""}`}>
              <span className={`status-dot ${!isOpen ? "status-dot-closed" : ""}`} />
              {isOpen ? "OPEN NOW" : "CLOSED NOW"}
            </span>
            <div className="flex gap-4">
              <MapPin size={20} style={{ color: "var(--neon-red)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="text-xs section-title neon-red tracking-widest mb-1">ADDRESS</div>
                <p className="text-gray-300 text-sm">{BUSINESS.address}</p>
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs mt-1 inline-flex items-center gap-1 hover:text-white transition-colors" style={{ color: "var(--neon-red)" }}>
                  <MapPin size={11} /> Open in Google Maps
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock size={20} style={{ color: "var(--neon-blue)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="text-xs section-title neon-blue tracking-widest mb-1">HOURS</div>
                <p className="text-gray-300 text-sm">{BUSINESS.hours.label}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={20} style={{ color: "var(--neon-green)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="text-xs section-title neon-green tracking-widest mb-1">PHONE</div>
                <a href={`tel:${BUSINESS.phone}`} className="text-gray-300 text-sm hover:text-white transition-colors">{BUSINESS.phoneFormatted}</a>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366" }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: "rgba(180,0,255,0.1)", border: "1px solid rgba(180,0,255,0.3)", color: "var(--neon-purple)" }}>
                <Instagram size={16} /> Instagram
              </a>
              <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "var(--neon-blue)" }}>
                <Facebook size={16} /> FB
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#booking"><button className="btn-neon w-full text-sm py-3">Book a Session</button></a>
              <a href={`tel:${BUSINESS.phone}`}><button className="btn-neon btn-neon-purple w-full text-sm py-3">Call {BUSINESS.phoneFormatted}</button></a>
            </div>
          </div>
          <div className="card-glow rounded-2xl overflow-hidden flex flex-col" style={{ minHeight: 420, background: "var(--bg-dark)" }}>
            <iframe
              title="Gameshala Gaming Lounge — Exact Location"
              src="https://maps.google.com/maps?q=Gameshala+Gaming+Lounge+Mahendrapool+Pokhara+Nepal&output=embed&z=17"
              width="100%" height="100%"
              style={{ border: 0, minHeight: 380, filter: "invert(90%) hue-rotate(180deg)", flex: 1 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
              style={{ color: "var(--neon-blue)", borderTop: "1px solid rgba(0,212,255,0.12)" }}>
              <MapPin size={14} /> Open in Google Maps for Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Custom Website CTA ───────────────────────────────────── */
function CustomWebsiteBanner() {
  return (
    <section
      className="py-10 px-4 sm:px-6 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #02020a 0%, #050510 60%, #02020a 100%)", borderTop: "1px solid rgba(0,212,255,0.08)" }}
    >
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.4) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="section-title text-xs tracking-widest mb-2" style={{ color: "var(--neon-blue)", opacity: 0.7 }}>
          BUILT BY A LOCAL DEVELOPER
        </p>
        <h2 className="text-white font-bold mb-3" style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}>
          Want a website like this for your business?
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          Custom websites, landing pages & portfolios — tailored for businesses in Pokhara & Nepal.
        </p>
        <a
          href="tel:9768530353"
          className="inline-flex items-center gap-2 font-bold tracking-wider transition-all hover:scale-105"
          style={{
            fontSize: "clamp(1.1rem, 4vw, 1.6rem)",
            color: "var(--neon-blue)",
            textShadow: "0 0 18px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4)",
            filter: "drop-shadow(0 0 8px rgba(0,212,255,0.5))",
          }}
        >
          <Phone size={20} />
          97&thinsp;685&thinsp;30353
        </a>
        <p className="text-gray-600 text-xs mt-2">Tap to call · WhatsApp available</p>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 px-4 sm:px-6 text-center" style={{ background: "#02020a", borderTop: "1px solid rgba(0,212,255,0.1)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Gamepad2 size={18} style={{ color: "var(--neon-blue)" }} />
          <span className="section-title text-sm gradient-text-blue">GAMESHALA GAMING LOUNGE</span>
        </div>
        <p className="text-gray-600 text-xs mb-4">
          2nd Floor, Opposite Bishal Bazar, Mahendrapool, Pokhara, Nepal &nbsp;|&nbsp;
          <a href={`tel:${BUSINESS.phone}`} className="hover:text-gray-400 transition-colors">{BUSINESS.phoneFormatted}</a>
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-400 transition-colors"><MessageCircle size={18} /></a>
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Instagram size={18} /></a>
          <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Facebook size={18} /></a>
        </div>
        <p className="text-gray-700 text-xs">&copy; {new Date().getFullYear()} Gameshala Gaming Lounge. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── App ──────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <WhatsAppFAB />
      <main>
        <HeroSlider />
        <Games />
        <Pricing />
        <Booking />
        <Rental />
        <Store />
        <Tournaments />
        <FAQ />
        <GetInTouch />
        <Contact />
      </main>
      <CustomWebsiteBanner />
      <Footer />
    </>
  );
}
