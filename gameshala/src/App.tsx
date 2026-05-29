import { useEffect, useState, useRef } from "react";
import {
  MapPin, Phone, Clock, Instagram, Facebook,
  Gamepad2, Trophy, Disc3, Billiards,
  ChevronDown, Star, Zap, Shield, Users, Menu, X
} from "lucide-react";

// ─── Business Data ─────────────────────────────────────────────────────────
const BUSINESS = {
  name: "Gameshala Gaming Lounge",
  tagline: "Pokhara's Premier PS5 Gaming Hub",
  phone: "9802854558",
  phoneFormatted: "+977 980-2854558",
  address: "2nd Floor, Opposite Bishal Bazar (Palikhe Chowk side), Mahendrapool, Pokhara, Nepal",
  hours: { open: 8, close: 21, label: "Daily 8:00 AM – 9:00 PM" },
  instagram: "https://instagram.com/gameshala_gaming_lounge?igshid=NTc4MTIwNjQ2YQ==",
  facebook: "https://www.facebook.com/gameshalagaminglounge/",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.2!2d83.9856!3d28.2096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDEyJzM0LjYiTiA4M8KwNTknMDguMiJF!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
};

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
  {
    label: "Solo Session",
    price: "Rs. 80",
    unit: "/ hour",
    desc: "1 player — perfect for solo adventures or practice",
    color: "var(--neon-blue)",
    popular: false,
  },
  {
    label: "Duo Session",
    price: "Rs. 150",
    unit: "/ hour",
    desc: "2 players — best value for VS battles with a friend",
    color: "var(--neon-purple)",
    popular: true,
  },
  {
    label: "Pool Table",
    price: "Hourly",
    unit: "rate",
    desc: "Dedicated billiards area — ask at the counter for rates",
    color: "var(--neon-green)",
    popular: false,
  },
  {
    label: "Tournament Entry",
    price: "Rs. 500",
    unit: "per team",
    desc: "Monthly esports tournaments with cash prize pools",
    color: "var(--neon-red)",
    popular: false,
  },
];

const FAQS = [
  {
    q: "Where exactly is Gameshala located?",
    a: "We're on the 2nd floor directly opposite Bishal Bazar on the Palikhe Chowk side, Mahendrapool, Pokhara. Easy to find — look for the gaming signage on the building.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Walk-ins are welcome! For large groups or tournament participation, messaging us on Instagram beforehand is recommended to ensure availability.",
  },
  {
    q: "What games are available on PS5?",
    a: "Our catalog includes EA Sports FC 26, NBA 2K, God of War, Call of Duty, PUBG, Cricket 24, UFC, WWE Wrestling, and various racing titles — all kept updated.",
  },
  {
    q: "Can I buy or sell game discs here?",
    a: "Yes! We operate a physical counter for buying, selling, and repairing physical game discs. We also sell PlayStation Network (PSN) digital games.",
  },
  {
    q: "How do tournaments work?",
    a: "We host monthly competitive tournaments (e.g. FC 26 tournaments). Entry fee is around Rs. 500 with cash prize pools. Follow our Instagram or Facebook for announcements.",
  },
  {
    q: "What are your operating hours?",
    a: "We're open every day from 8:00 AM to 9:00 PM, including public holidays.",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function useIsOpen() {
  const now = new Date();
  const h = now.getHours();
  return h >= BUSINESS.hours.open && h < BUSINESS.hours.close;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

// ─── Components ────────────────────────────────────────────────────────────
function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const isOpen = useIsOpen();

  const links = [
    ["Games", "#games"],
    ["Pricing", "#pricing"],
    ["Tournaments", "#tournaments"],
    ["Gallery", "#gallery"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(4,4,10,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <Gamepad2 size={22} style={{ color: "var(--neon-blue)" }} className="animate-rgb" />
          <span
            className="section-title text-sm gradient-text-blue"
            style={{ fontSize: "0.8rem" }}
          >
            GAMESHALA
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-gray-400 hover:text-white">
              {label}
            </a>
          ))}
        </div>

        {/* Status + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <span className={`status-open ${!isOpen ? "status-closed" : ""}`}>
            <span className={`status-dot ${!isOpen ? "status-dot-closed" : ""}`} />
            {isOpen ? "OPEN" : "CLOSED"}
          </span>
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
            <button className="btn-neon text-xs px-4 py-2">Book Now</button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden px-4 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(4,4,10,0.98)", borderBottom: "1px solid rgba(0,212,255,0.15)" }}
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-gray-300 hover:text-white text-sm"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <span className={`status-open ${!isOpen ? "status-closed" : ""}`}>
              <span className={`status-dot ${!isOpen ? "status-dot-closed" : ""}`} />
              {isOpen ? "OPEN NOW" : "CLOSED"}
            </span>
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
              <button className="btn-neon text-xs px-4 py-2">Book Now</button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const isOpen = useIsOpen();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center rgb-grid overflow-hidden"
    >
      {/* Background radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(180,0,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 70%, rgba(255,45,85,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
          animation: "scanLine 4s linear infinite",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Status badge */}
        <div className="flex justify-center mb-6">
          <span
            className={`status-open text-sm px-4 py-2 rounded-full ${!isOpen ? "status-closed" : ""}`}
            style={{
              background: isOpen ? "rgba(0,255,136,0.08)" : "rgba(255,45,85,0.08)",
              border: `1px solid ${isOpen ? "rgba(0,255,136,0.3)" : "rgba(255,45,85,0.3)"}`,
            }}
          >
            <span className={`status-dot ${!isOpen ? "status-dot-closed" : ""}`} />
            {isOpen ? "NOW OPEN" : "CURRENTLY CLOSED"} &nbsp;·&nbsp; {BUSINESS.hours.label}
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="section-title mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.1 }}
        >
          <span className="gradient-text-blue">GAMESHALA</span>
          <br />
          <span style={{ color: "#e2e8f0", fontSize: "0.55em", fontWeight: 400, letterSpacing: "0.3em" }}>
            GAMING LOUNGE
          </span>
        </h1>

        <p
          className="text-gray-400 mb-3 max-w-xl mx-auto"
          style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.15rem", letterSpacing: "0.05em" }}
        >
          Pokhara's most affordable PS5 gaming hub — premium consoles, pool table, and
          monthly esports tournaments in the heart of Mahendrapool.
        </p>

        {/* Location pill */}
        <div className="flex justify-center mb-10">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={14} style={{ color: "var(--neon-red)" }} />
            2nd Floor, Opposite Bishal Bazar, Mahendrapool, Pokhara
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
            <button className="btn-neon text-sm px-8 py-3">Book a Session</button>
          </a>
          <a href={`tel:${BUSINESS.phone}`}>
            <button className="btn-neon btn-neon-purple text-sm px-8 py-3">
              Call Us
            </button>
          </a>
          <a href="#games">
            <button className="btn-neon btn-neon-red text-sm px-8 py-3">View Games</button>
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { icon: <Gamepad2 size={18} />, val: "PS5", sub: "Latest Console", color: "var(--neon-blue)" },
            { icon: <Trophy size={18} />, val: "Monthly", sub: "Tournaments", color: "var(--neon-purple)" },
            { icon: <Zap size={18} />, val: "Rs. 80", sub: "Starting Price/hr", color: "var(--neon-green)" },
            { icon: <Disc3 size={18} />, val: "Buy·Sell", sub: "Game Discs", color: "var(--neon-red)" },
          ].map(({ icon, val, sub, color }) => (
            <div
              key={sub}
              className="card-glow rounded-lg p-4 text-center"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="flex justify-center mb-1" style={{ color }}>
                {icon}
              </div>
              <div className="section-title text-sm font-bold" style={{ color }}>
                {val}
              </div>
              <div className="text-gray-500 text-xs mt-1">{sub}</div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-16 animate-float">
          <a href="#games">
            <ChevronDown size={28} style={{ color: "var(--neon-blue)", opacity: 0.6 }} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Games() {
  return (
    <section id="games" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-blue tracking-widest mb-2">GAME CATALOG</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">
            Top Titles Available
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            All titles are regularly updated. Ask at the counter for our full catalog — we add
            new releases as they drop.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GAMES.map(({ name, genre, emoji, color }) => (
            <div
              key={name}
              className="card-glow rounded-xl p-5 text-center cursor-default"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="text-4xl mb-3">{emoji}</div>
              <div className="font-bold text-white text-sm mb-1">{name}</div>
              <div className="text-xs font-semibold" style={{ color }}>
                {genre}
              </div>
            </div>
          ))}
        </div>

        {/* PS5 + Pool highlight */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div
            className="card-glow rounded-xl p-8 flex items-center gap-6"
            style={{ background: "var(--bg-card)", borderColor: "rgba(0,212,255,0.3)" }}
          >
            <Gamepad2 size={52} style={{ color: "var(--neon-blue)", flexShrink: 0 }} className="animate-float" />
            <div>
              <div className="section-title text-lg neon-blue mb-1">PlayStation 5</div>
              <p className="text-gray-400 text-sm">
                Latest PS5 consoles with premium DualSense controllers and 4K display.
                Comfortable professional seating for long sessions.
              </p>
            </div>
          </div>
          <div
            className="card-glow rounded-xl p-8 flex items-center gap-6"
            style={{ background: "var(--bg-card)", borderColor: "rgba(0,255,136,0.3)" }}
          >
            <span className="text-5xl" style={{ flexShrink: 0 }}>🎱</span>
            <div>
              <div className="section-title text-lg neon-green mb-1">Pool Table</div>
              <p className="text-gray-400 text-sm">
                Dedicated billiards area billed at an affordable hourly rate.
                Great for a break between gaming sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-6 rgb-grid"
      style={{ background: "var(--bg-card2)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-purple tracking-widest mb-2">AFFORDABLE RATES</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">
            Pricing
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Budget-friendly gaming — no hidden fees. Prices may vary slightly; confirm exact
            rates at the counter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map(({ label, price, unit, desc, color, popular }) => (
            <div
              key={label}
              className="card-glow rounded-xl p-6 relative flex flex-col"
              style={{
                background: "var(--bg-dark)",
                borderColor: popular ? color : undefined,
                boxShadow: popular ? `0 0 30px ${color}22` : undefined,
              }}
            >
              {popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full section-title"
                  style={{ background: color, color: "#04040a" }}
                >
                  POPULAR
                </div>
              )}
              <div className="section-title text-xs tracking-widest mb-3" style={{ color }}>
                {label}
              </div>
              <div className="flex items-end gap-1 mb-3">
                <span className="section-title text-3xl font-black" style={{ color }}>
                  {price}
                </span>
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

function Tournaments() {
  return (
    <section id="tournaments" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs section-title neon-red tracking-widest mb-2">ESPORTS</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-red mb-4">
            Monthly Tournaments
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Compete for real cash prizes. Monthly competitive tournaments — currently featuring
            EA Sports FC 26.
          </p>
        </div>

        <div
          className="card-glow rounded-2xl p-8 sm:p-12 text-center animate-border-glow"
          style={{ background: "var(--bg-card)" }}
        >
          <Trophy size={64} style={{ color: "var(--neon-red)", margin: "0 auto 1.5rem" }} className="animate-float" />
          <div className="section-title text-2xl neon-red mb-2">FC 26 TOURNAMENT</div>
          <div className="text-gray-400 mb-6 max-w-sm mx-auto">
            Monthly competitive FIFA / EA FC tournaments with real cash prize pools.
            Follow us on social media for schedules and registration.
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div>
              <div className="section-title text-2xl neon-red">Rs. 500</div>
              <div className="text-gray-500 text-sm">Entry Fee</div>
            </div>
            <div>
              <div className="section-title text-2xl" style={{ color: "var(--neon-purple)" }}>Cash</div>
              <div className="text-gray-500 text-sm">Prize Pool</div>
            </div>
            <div>
              <div className="section-title text-2xl neon-blue">Monthly</div>
              <div className="text-gray-500 text-sm">Frequency</div>
            </div>
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

function Discs() {
  return (
    <section
      id="gallery"
      className="py-24 px-4 sm:px-6"
      style={{ background: "var(--bg-card2)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs section-title neon-blue tracking-widest mb-2">DIGITAL STOREFRONT</p>
        <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">
          Buy, Sell &amp; Repair Discs
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-12">
          We operate a physical game disc counter — buy, sell, and repair your PlayStation game
          discs. We also sell PlayStation Network (PSN) digital game codes.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: <Disc3 size={36} />, title: "Buy Discs", desc: "Browse our catalog of physical PS4 & PS5 game discs at fair prices.", color: "var(--neon-blue)" },
            { icon: <span className="text-4xl">💰</span>, title: "Sell Discs", desc: "Get cash for your old game discs. Walk in with your collection.", color: "var(--neon-green)" },
            { icon: <Shield size={36} />, title: "Repair & PSN", desc: "Disc cleaning and repair services. PSN game codes also available.", color: "var(--neon-purple)" },
          ].map(({ icon, title, desc, color }) => (
            <div
              key={title}
              className="card-glow rounded-xl p-7 text-center"
              style={{ background: "var(--bg-dark)" }}
            >
              <div className="flex justify-center mb-4" style={{ color }}>
                {icon}
              </div>
              <div className="section-title text-base mb-2" style={{ color }}>{title}</div>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs section-title neon-green tracking-widest mb-2">NEED HELP?</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="card-glow rounded-xl overflow-hidden"
              style={{ background: "var(--bg-card)" }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm sm:text-base">{q}</span>
                <ChevronDown
                  size={18}
                  style={{
                    color: "var(--neon-blue)",
                    flexShrink: 0,
                    transform: openIdx === i ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm border-t border-white/5 pt-4">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const isOpen = useIsOpen();

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 rgb-grid"
      style={{ background: "var(--bg-card2)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs section-title neon-blue tracking-widest mb-2">FIND US</p>
          <h2 className="section-title text-3xl sm:text-4xl gradient-text-blue mb-4">
            Contact &amp; Location
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info card */}
          <div
            className="card-glow rounded-2xl p-8 flex flex-col gap-6"
            style={{ background: "var(--bg-dark)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`status-open ${!isOpen ? "status-closed" : ""}`}>
                <span className={`status-dot ${!isOpen ? "status-dot-closed" : ""}`} />
                {isOpen ? "OPEN NOW" : "CLOSED NOW"}
              </span>
            </div>

            <div className="flex gap-4">
              <MapPin size={20} style={{ color: "var(--neon-red)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="text-xs section-title neon-red tracking-widest mb-1">ADDRESS</div>
                <p className="text-gray-300 text-sm">{BUSINESS.address}</p>
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
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  {BUSINESS.phoneFormatted}
                </a>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all hover:scale-105"
                style={{
                  background: "rgba(180,0,255,0.1)",
                  border: "1px solid rgba(180,0,255,0.3)",
                  color: "var(--neon-purple)",
                }}
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all hover:scale-105"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  color: "var(--neon-blue)",
                }}
              >
                <Facebook size={16} /> Facebook
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                <button className="btn-neon w-full text-sm py-3">Book on Instagram</button>
              </a>
              <a href={`tel:${BUSINESS.phone}`}>
                <button className="btn-neon btn-neon-green w-full text-sm py-3">
                  Call {BUSINESS.phoneFormatted}
                </button>
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="card-glow rounded-2xl overflow-hidden"
            style={{ minHeight: 380, background: "var(--bg-dark)" }}
          >
            <iframe
              title="Gameshala Gaming Lounge Location — Mahendrapool, Pokhara"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14065.0!2d83.98!3d28.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995938f796b68e1%3A0x5e0a4fd52d53ae0a!2sMahendrapool%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1700000000001!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-10 px-4 sm:px-6 text-center"
      style={{ background: "#02020a", borderTop: "1px solid rgba(0,212,255,0.1)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Gamepad2 size={18} style={{ color: "var(--neon-blue)" }} />
          <span className="section-title text-sm gradient-text-blue">GAMESHALA GAMING LOUNGE</span>
        </div>
        <p className="text-gray-600 text-xs mb-4">
          2nd Floor, Opposite Bishal Bazar, Mahendrapool, Pokhara, Nepal &nbsp;|&nbsp;{" "}
          <a href={`tel:${BUSINESS.phone}`} className="hover:text-gray-400 transition-colors">
            {BUSINESS.phoneFormatted}
          </a>
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href={BUSINESS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white transition-colors"
          >
            <Facebook size={18} />
          </a>
        </div>
        <p className="text-gray-700 text-xs">
          &copy; {new Date().getFullYear()} Gameshala Gaming Lounge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Games />
        <Pricing />
        <Tournaments />
        <Discs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
