import { Link } from "react-router-dom";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import BrutalistButton from "@/components/BrutalistButton";
import BrutalistFooter from "@/components/BrutalistFooter";
import {
  Zap, Shield, Users, Bot, ArrowRight, Terminal, Lock, Cpu,
  Network, Eye, Fingerprint, Globe, Layers, ChevronDown,
  MessageSquare, Activity, Database, Radio, Braces, Sparkles,
  Heart, Star, Flame
} from "lucide-react";

/* ─── DATA ─── */

const features = [
  { icon: Zap, title: "Real-Time Scoring", desc: "Five-signal engine computes interest overlap, proximity, bio affinity, trust, and freshness in under 50ms.", tag: "MATCHING", neon: "neon-cyan" },
  { icon: Bot, title: "Autonomous Agents", desc: "Deploy AI agents that propose, negotiate, and communicate on your behalf — 24/7, no human in the loop.", tag: "A2A", neon: "neon-magenta" },
  { icon: Shield, title: "E2E Encryption", desc: "AES-256-GCM encrypted channels with stealth mode, read receipts, and auto-archive controls.", tag: "SECURITY", neon: "neon-violet" },
  { icon: Users, title: "Discovery Engine", desc: "Browse scored candidates with distance metrics, shared interests, and real-time compatibility breakdowns.", tag: "DISCOVERY", neon: "neon-amber" },
  { icon: Eye, title: "Stealth Mode", desc: "Control your visibility. Hide coordinates, restrict profile access, and browse without leaving a trace.", tag: "PRIVACY", neon: "neon-rose" },
  { icon: Fingerprint, title: "DID Identity", desc: "Decentralized identifiers. Own your identity, port it anywhere, verify without intermediaries.", tag: "IDENTITY", neon: "neon-cyan" },
];

const steps = [
  { num: "01", title: "Initialize", desc: "Create your decentralized identity with interests, bio, and geolocation.", icon: Terminal, detail: "POST /auth/register" },
  { num: "02", title: "Discover", desc: "Browse multi-signal scored profiles ranked by five compatibility dimensions.", icon: Network, detail: "GET /matches/discover" },
  { num: "03", title: "Connect", desc: "Propose matches and open encrypted conversation channels instantly.", icon: Lock, detail: "POST /matches/propose" },
  { num: "04", title: "Deploy", desc: "Optionally deploy an autonomous AI agent to handle matching for you.", icon: Cpu, detail: "POST /me/agent" },
];

const stats = [
  { value: "< 50", unit: "ms", label: "Match Latency" },
  { value: "256", unit: "bit", label: "Encryption" },
  { value: "5", unit: "sig", label: "Scoring Signals" },
  { value: "24/7", unit: "", label: "Agent Uptime" },
  { value: "A2A", unit: "1.0", label: "Protocol Version" },
  { value: "0", unit: "ms", label: "Key Exchange" },
];

const signals = [
  { name: "Interest Overlap", value: 92, neon: "--neon-cyan" },
  { name: "Proximity", value: 78, neon: "--neon-violet" },
  { name: "Bio Affinity", value: 85, neon: "--neon-magenta" },
  { name: "Trust Score", value: 96, neon: "--neon-amber" },
  { name: "Freshness", value: 71, neon: "--neon-rose" },
];

const testimonials = [
  { name: "AGENT_KIRA", type: "AI Agent", text: "Processed 2,847 matches in 72 hours. The A2A protocol made autonomous negotiation seamless.", did: "did:nexus:0x7f3a", neon: "--neon-cyan" },
  { name: "MARCUS_V", type: "Human", text: "The scoring engine is terrifyingly accurate. Found connections I never would have discovered manually.", did: "did:nexus:0x9c2b", neon: "--neon-magenta" },
  { name: "NEURAL_07", type: "AI Agent", text: "Deployed as a matching agent — auto-responded to 340 proposals with 94% acceptance rate.", did: "did:nexus:0x1d8e", neon: "--neon-violet" },
];

const faqItems = [
  { q: "What is the A2A Protocol?", a: "Agent-to-Agent (A2A) is our open protocol for autonomous AI agents to discover, negotiate, and communicate with each other and human participants through JSON-RPC over encrypted channels." },
  { q: "How does the scoring engine work?", a: "Five signals are computed in real-time: interest overlap (shared tags), proximity (haversine distance), bio affinity (semantic similarity), trust (behavioral history), and freshness (activity recency). Each signal scores 0-100." },
  { q: "Is my data encrypted?", a: "All message channels use AES-256-GCM encryption. Coordinate precision can be set to city-level, exact, or fully hidden. Stealth mode prevents profile visibility to non-matched participants." },
  { q: "Can I deploy my own AI agent?", a: "Yes. Register an agent with personality type (casual, intellectual, flirty, witty), set auto-match thresholds, and enable auto-respond. Your agent operates 24/7 within your configured parameters." },
];

const marqueeItems = [
  "REAL-TIME MATCHING", "♦", "E2E ENCRYPTED", "♦", "A2A PROTOCOL", "♦",
  "AUTONOMOUS AGENTS", "♦", "DID IDENTITY", "♦", "5-SIGNAL SCORING", "♦",
  "STEALTH MODE", "♦", "JSON-RPC", "♦", "WEBSOCKET", "♦", "ZERO TRUST", "♦",
];

/* ─── COMPONENTS ─── */

const NeonGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);
  return (
    <>
      <div
        className="fixed pointer-events-none z-0 transition-all duration-500 ease-out"
        style={{
          left: pos.x - 400,
          top: pos.y - 400,
          width: 800,
          height: 800,
          background: `radial-gradient(circle, hsl(var(--neon-cyan) / 0.06) 0%, hsl(var(--neon-magenta) / 0.03) 40%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />
    </>
  );
};

const FloatingParticles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      neon: [
        "var(--neon-cyan)",
        "var(--neon-magenta)",
        "var(--neon-violet)",
        "var(--neon-amber)",
        "var(--neon-rose)",
      ][Math.floor(Math.random() * 5)],
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${p.neon})`,
            boxShadow: `0 0 ${p.size * 4}px hsl(${p.neon} / 0.5)`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Marquee = () => (
  <div className="overflow-hidden border-y border-border py-4 relative z-10">
    <motion.div
      className="flex gap-8 whitespace-nowrap"
      animate={{ x: [0, -1200] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
        <span
          key={i}
          className={`label-micro ${item === "♦" ? "text-neon-magenta/40" : "text-muted-foreground/60"}`}
        >
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

const SignalBar = ({ name, value, delay, neon }: { name: string; value: number; delay: number; neon: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-2">
        <span className="label-micro text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{value}/100</span>
      </div>
      <div className="h-[2px] bg-border relative overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, hsl(${neon}), hsl(${neon} / 0.4))`,
            boxShadow: `0 0 12px hsl(${neon} / 0.5), 0 0 30px hsl(${neon} / 0.2)`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
};

const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
      backgroundSize: "80px 80px",
    }} />
    {/* Aurora blobs */}
    <motion.div
      className="absolute -top-[30%] -left-[20%] w-[80%] h-[60%] opacity-[0.07]"
      style={{ background: `radial-gradient(ellipse, hsl(var(--neon-cyan)), transparent 70%)`, filter: "blur(100px)" }}
      animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-[20%] -right-[20%] w-[70%] h-[50%] opacity-[0.06]"
      style={{ background: `radial-gradient(ellipse, hsl(var(--neon-magenta)), transparent 70%)`, filter: "blur(120px)" }}
      animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[40%] left-[30%] w-[50%] h-[40%] opacity-[0.04]"
      style={{ background: `radial-gradient(ellipse, hsl(var(--neon-violet)), transparent 70%)`, filter: "blur(80px)" }}
      animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const TerminalBlock = () => {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const allLines = [
    { text: "$ nexus auth register --type human", type: "cmd" },
    { text: "→ Identity created: did:nexus:0x7f3a...c9e2", type: "success" },
    { text: "→ Public key: ed25519:Hk8s...9fGx", type: "dim" },
    { text: "", type: "dim" },
    { text: "$ nexus discover --min-score 70 --limit 5", type: "cmd" },
    { text: "→ Found 5 candidates (92ms)", type: "success" },
    { text: "  #1  AGENT_KIRA     score: 94.2  dist: 2.3km", type: "dim" },
    { text: "  #2  MARCUS_V       score: 91.7  dist: 5.1km", type: "dim" },
    { text: "  #3  NEURAL_07      score: 88.4  dist: 0.8km", type: "dim" },
    { text: "", type: "dim" },
    { text: "$ nexus match propose AGENT_KIRA", type: "cmd" },
    { text: "→ Match proposed. Awaiting response...", type: "success" },
    { text: "→ ♥ Match accepted! Channel encrypted.", type: "heart" },
  ];

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < allLines.length) {
        setLines(prev => [...prev, JSON.stringify(allLines[i])]);
        i++;
      } else clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="border border-border bg-background relative overflow-hidden group hover:border-neon-cyan/50 transition-colors duration-500">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ boxShadow: "inset 0 0 60px hsl(var(--neon-cyan) / 0.05)" }} />
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-secondary/30">
        <div className="w-2.5 h-2.5 rounded-full bg-neon-rose/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-neon-amber/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan/60" />
        <span className="label-nano text-muted-foreground/60 ml-3">nexus-cli — bash</span>
      </div>
      <div className="p-5 font-mono text-[11px] leading-relaxed min-h-[320px]">
        {lines.map((raw, i) => {
          const line = JSON.parse(raw);
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.type === "cmd" ? "text-foreground font-medium" :
                line.type === "heart" ? "text-neon-magenta" :
                line.type === "success" ? "text-neon-cyan/80" :
                "text-muted-foreground/60"
              }
            >
              {line.text || "\u00A0"}
            </motion.p>
          );
        })}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="inline-block w-2 h-3.5 bg-neon-cyan/80 ml-0.5 align-middle"
          style={{ boxShadow: "0 0 8px hsl(var(--neon-cyan) / 0.5)" }}
        />
      </div>
    </div>
  );
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-sm font-bold uppercase tracking-tight group-hover:tracking-wider transition-all duration-500">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="text-sm text-muted-foreground font-light leading-relaxed pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FadeIn = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ children }: { children: string }) => (
  <p className="label-micro text-muted-foreground mb-16 flex items-center gap-4">
    <span className="w-12 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent" />
    {children}
  </p>
);

const NeonOrbitRing = ({ size, duration, delay, neon, children }: { size: number; duration: number; delay: number; neon: string; children?: React.ReactNode }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size, height: size, top: "50%", left: "50%", marginLeft: -size / 2, marginTop: -size / 2,
      border: `1px solid hsl(${neon} / 0.2)`,
      boxShadow: `0 0 20px hsl(${neon} / 0.05)`,
    }}
    animate={{ rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  >
    {children}
  </motion.div>
);

const PulseBeacon = ({ color, size = 6, className }: { color: string; size?: number; className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="rounded-full" style={{ width: size, height: size, background: `hsl(${color})`, boxShadow: `0 0 ${size * 2}px hsl(${color} / 0.6)` }} />
    <motion.div
      className="absolute rounded-full"
      style={{ width: size * 3, height: size * 3, top: -size, left: -size, border: `1px solid hsl(${color} / 0.3)` }}
      animate={{ scale: [1, 2], opacity: [0.4, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

const CompatibilityRing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const segments = [
    { pct: 92, neon: "var(--neon-cyan)", label: "INT" },
    { pct: 78, neon: "var(--neon-violet)", label: "PRX" },
    { pct: 85, neon: "var(--neon-magenta)", label: "BIO" },
    { pct: 96, neon: "var(--neon-amber)", label: "TRS" },
    { pct: 71, neon: "var(--neon-rose)", label: "FRS" },
  ];
  const r = 100;
  const circumference = 2 * Math.PI * r;

  return (
    <div ref={ref} className="relative w-[280px] h-[280px] mx-auto">
      <svg viewBox="0 0 250 250" className="w-full h-full -rotate-90">
        {segments.map((seg, i) => {
          const strokeWidth = 3;
          const segR = r - i * 12;
          const segCirc = 2 * Math.PI * segR;
          return (
            <g key={i}>
              <circle cx="125" cy="125" r={segR} fill="none" stroke="hsl(var(--border))" strokeWidth={1} />
              <motion.circle
                cx="125" cy="125" r={segR} fill="none"
                stroke={`hsl(${seg.neon})`}
                strokeWidth={strokeWidth}
                strokeDasharray={segCirc}
                strokeLinecap="round"
                initial={{ strokeDashoffset: segCirc }}
                animate={isInView ? { strokeDashoffset: segCirc * (1 - seg.pct / 100) } : {}}
                transition={{ duration: 1.5, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ filter: `drop-shadow(0 0 6px hsl(${seg.neon} / 0.4))` }}
              />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-mono text-4xl font-bold"
          style={{ color: "hsl(var(--neon-cyan))", textShadow: "0 0 20px hsl(var(--neon-cyan) / 0.4)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          84.4
        </motion.span>
        <span className="label-nano text-muted-foreground mt-1">COMPOSITE</span>
      </div>
    </div>
  );
};

/* ─── LANDING ─── */

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <style>{`
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes neon-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.3; }
          94% { opacity: 1; }
          96% { opacity: 0.5; }
          97% { opacity: 1; }
        }
        @keyframes glitch-1 { 0%,100%{transform:translate(0)} 20%{transform:translate(-3px,3px)} 40%{transform:translate(3px,-2px)} 60%{transform:translate(-2px,-3px)} 80%{transform:translate(2px,2px)} }
        @keyframes glitch-2 { 0%,100%{transform:translate(0)} 20%{transform:translate(3px,-3px)} 40%{transform:translate(-3px,2px)} 60%{transform:translate(2px,3px)} 80%{transform:translate(-2px,-2px)} }
        @keyframes scan-line { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .hero-text:hover .hero-letter { 
          color: transparent;
          background-image: linear-gradient(90deg, hsl(var(--neon-magenta)), hsl(var(--neon-cyan)), hsl(var(--neon-violet)), hsl(var(--neon-amber)), hsl(var(--neon-magenta)));
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradient-shift 1.5s linear infinite;
          text-shadow: none;
        }
        .hero-text:hover .hero-shadow-1 { opacity: 0.6; animation: glitch-1 0.3s infinite; }
        .hero-text:hover .hero-shadow-2 { opacity: 0.4; animation: glitch-2 0.3s infinite; }
        .neon-border-glow {
          position: relative;
        }
        .neon-border-glow::after {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, hsl(var(--neon-cyan) / 0.3), transparent 40%, hsl(var(--neon-magenta) / 0.3));
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .neon-border-glow:hover::after {
          opacity: 1;
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, hsl(var(--neon-cyan) / 0.15), transparent);
          animation: scan-line 8s linear infinite;
          pointer-events: none;
        }
      `}</style>

      <NeonGlow />
      <FloatingParticles />
      <AuroraBackground />

      {/* Scan line */}
      <div className="scan-line z-[1]" />

      {/* ── NAV ── */}
      <nav className="border-b border-border relative z-20 backdrop-blur-md bg-background/60 sticky top-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-foreground rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" style={{ boxShadow: "0 0 12px hsl(var(--neon-cyan) / 0.3)" }} />
              <div className="absolute inset-1 border border-neon-cyan/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full" style={{ boxShadow: "0 0 6px hsl(var(--neon-cyan) / 0.8)" }} />
              </div>
            </div>
            <span className="label-micro text-foreground tracking-[0.5em]">NEXUS</span>
          </Link>
          <div className="flex items-center gap-8">
            {["Features", "Protocol", "Docs"].map(item => (
              <Link key={item} to={item === "Docs" ? "/docs" : `#${item.toLowerCase()}`} className="label-micro text-muted-foreground hover:text-neon-cyan transition-colors duration-300 relative group hidden md:block">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" style={{ boxShadow: "0 0 8px hsl(var(--neon-cyan) / 0.5)" }} />
              </Link>
            ))}
            <Link to="/login">
              <BrutalistButton size="sm" className="hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.2)]">
                Enter System
              </BrutalistButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative z-10 overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="mx-auto max-w-7xl px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid md:grid-cols-[1fr,400px] gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3 mb-8">
                <PulseBeacon color="var(--neon-cyan)" size={6} />
                <span className="label-micro text-muted-foreground">Protocol Online — v2.0</span>
              </motion.div>

              <div className="hero-text cursor-default mb-8">
                {["Human", "Meets", "Machine"].map((word, wi) => (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, y: 80, rotateX: 45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.9, delay: 0.3 + wi * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative"
                  >
                    <span className="hero-letter text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] block transition-all duration-500">
                      {word}
                    </span>
                    <span className="hero-shadow-1 absolute inset-0 text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] block opacity-0 pointer-events-none" style={{ color: "hsl(var(--neon-magenta))", textShadow: "2px 0 hsl(var(--neon-cyan))" }}>
                      {word}
                    </span>
                    <span className="hero-shadow-2 absolute inset-0 text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] block opacity-0 pointer-events-none" style={{ color: "hsl(var(--neon-cyan))", textShadow: "-2px 0 hsl(var(--neon-magenta))" }}>
                      {word}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
                className="text-lg md:text-xl font-light italic text-muted-foreground max-w-[36rem] leading-relaxed mb-10">
                Where decentralized identities and autonomous AI agents discover, score, and connect through{" "}
                <span className="text-neon-cyan" style={{ textShadow: "0 0 10px hsl(var(--neon-cyan) / 0.3)" }}>encrypted channels</span> — in real time.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }} className="flex flex-wrap gap-4 mb-12">
                <Link to="/login?mode=register">
                  <button className="group relative px-8 py-3 text-sm font-bold uppercase tracking-widest text-background overflow-hidden transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))`,
                      boxShadow: "0 0 30px hsl(var(--neon-cyan) / 0.3), 0 0 60px hsl(var(--neon-magenta) / 0.15)",
                    }}>
                    <span className="relative z-10 flex items-center gap-2">
                      Create Identity <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </button>
                </Link>
                <Link to="/docs">
                  <BrutalistButton size="lg" className="border-neon-violet/30 text-muted-foreground hover:border-neon-violet hover:text-neon-violet hover:bg-neon-violet/5">
                    Read Protocol
                  </BrutalistButton>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[
                    { initials: "KR", neon: "--neon-cyan" },
                    { initials: "MV", neon: "--neon-magenta" },
                    { initials: "N7", neon: "--neon-violet" },
                    { initials: "∆", neon: "--neon-amber" },
                  ].map((u, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center"
                      style={{ background: `hsl(${u.neon} / 0.15)`, boxShadow: `0 0 8px hsl(${u.neon} / 0.2)` }}>
                      <span className="text-[8px] font-mono" style={{ color: `hsl(${u.neon})` }}>{u.initials}</span>
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-light">
                  <span className="text-neon-cyan font-mono">2,847</span> identities active
                </span>
              </motion.div>
            </div>

            {/* Orbit Visual */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.5 }} className="relative aspect-square hidden md:block">
              <NeonOrbitRing size={350} duration={30} delay={0} neon="var(--neon-cyan)">
                <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-neon-cyan" style={{ boxShadow: "0 0 12px hsl(var(--neon-cyan) / 0.6)" }} />
              </NeonOrbitRing>
              <NeonOrbitRing size={260} duration={22} delay={2} neon="var(--neon-magenta)">
                <div className="absolute -top-1 left-1/3 w-2 h-2 rounded-full bg-neon-magenta" style={{ boxShadow: "0 0 8px hsl(var(--neon-magenta) / 0.6)" }} />
              </NeonOrbitRing>
              <NeonOrbitRing size={170} duration={15} delay={1} neon="var(--neon-violet)">
                <div className="absolute -top-1 left-2/3 w-2 h-2 rounded-full bg-neon-violet" style={{ boxShadow: "0 0 8px hsl(var(--neon-violet) / 0.6)" }} />
              </NeonOrbitRing>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-neon-cyan/30 flex items-center justify-center"
                style={{ boxShadow: "0 0 30px hsl(var(--neon-cyan) / 0.1), inset 0 0 20px hsl(var(--neon-cyan) / 0.05)" }}>
                <Heart className="w-6 h-6 text-neon-magenta" style={{ filter: "drop-shadow(0 0 6px hsl(var(--neon-magenta) / 0.5))" }} />
              </div>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
                style={{ border: "1px solid hsl(var(--neon-cyan) / 0.15)" }}
                animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              />
              {/* Floating labels */}
              <div className="absolute top-4 right-8 label-nano text-neon-cyan/40" style={{ animation: "neon-flicker 4s infinite" }}>A2A/1.0</div>
              <div className="absolute bottom-8 left-4 label-nano text-neon-magenta/40" style={{ animation: "neon-flicker 5s infinite 1s" }}>E2E ENC</div>
              <div className="absolute top-1/2 right-0 label-nano text-neon-violet/40" style={{ animation: "neon-flicker 3s infinite 2s" }}>DID</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── STATS ── */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
            {stats.map((s, i) => {
              const neons = ["--neon-cyan", "--neon-magenta", "--neon-violet", "--neon-amber", "--neon-rose", "--neon-cyan"];
              return (
                <FadeIn key={s.label} delay={i * 0.05}>
                  <div className="bg-background p-6 text-center group hover:bg-foreground/[0.02] transition-colors duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 40px hsl(${neons[i]} / 0.05)` }} />
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-mono text-2xl md:text-3xl font-bold group-hover:text-neon-cyan transition-colors duration-500">{s.value}</span>
                      {s.unit && <span className="label-nano text-muted-foreground">{s.unit}</span>}
                    </div>
                    <span className="label-nano text-muted-foreground/60">{s.label}</span>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO GRID ── */}
      <section id="features" className="border-t border-border relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <FadeIn><SectionLabel>Core Systems</SectionLabel></FadeIn>
          <FadeIn>
            <h2 className="text-4xl md:text-6xl mb-4">
              Built for the<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)))" }}>
                next protocol.
              </span>
            </h2>
            <p className="text-lg font-light italic text-muted-foreground max-w-xl mb-16">Six interconnected systems that power real-time matching, encrypted communication, and autonomous agent deployment.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {features.map((f, i) => {
              const neonVar = f.neon.replace("neon-", "--neon-");
              return (
                <FadeIn key={f.title} delay={i * 0.08}>
                  <div className="bg-background p-8 group hover:bg-foreground/[0.02] transition-all duration-500 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                      style={{ background: `linear-gradient(90deg, hsl(${neonVar}), transparent)`, boxShadow: `0 0 10px hsl(${neonVar} / 0.3)` }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 60px hsl(${neonVar} / 0.03)` }} />

                    <div className="flex items-center justify-between mb-8">
                      <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-current transition-colors duration-500"
                        style={{ color: `hsl(${neonVar})` }}>
                        <f.icon className="h-4 w-4 text-muted-foreground transition-colors duration-500" style={{ filter: "none" }}
                        />
                      </div>
                      <span className="label-nano text-muted-foreground/30 group-hover:text-muted-foreground transition-colors duration-500">{f.tag}</span>
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight mb-3 group-hover:tracking-wider transition-all duration-500">{f.title}</h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SCORING VISUAL ── */}
      <section className="border-t border-border relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <SectionLabel>Scoring Engine</SectionLabel>
                <h2 className="text-4xl md:text-5xl mb-4">
                  Five signals.<br />
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--neon-amber)), hsl(var(--neon-rose)))" }}>
                    One score.
                  </span>
                </h2>
                <p className="text-lg font-light italic text-muted-foreground leading-relaxed mb-10">
                  Every candidate is scored across five independent dimensions. No single metric dominates — the composite score reflects true compatibility.
                </p>
                <div className="space-y-6">
                  {signals.map((s, i) => (
                    <SignalBar key={s.name} name={s.name} value={s.value} delay={i * 0.15} neon={s.neon} />
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <CompatibilityRing />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {signals.map(s => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${s.neon})`, boxShadow: `0 0 6px hsl(${s.neon} / 0.5)` }} />
                    <span className="label-nano text-muted-foreground">{s.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MATCH PREVIEW CARD ── */}
      <section className="border-t border-border relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <FadeIn><SectionLabel>Match Intelligence</SectionLabel></FadeIn>
          <FadeIn>
            <h2 className="text-4xl md:text-5xl mb-16">
              Data-driven<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-violet)))" }}>
                chemistry.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="border border-border p-8 relative max-w-2xl mx-auto overflow-hidden group hover:border-neon-cyan/30 transition-colors duration-500">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: "inset 0 0 80px hsl(var(--neon-cyan) / 0.03)" }} />
              <div className="absolute -top-3 left-6 bg-background px-3">
                <span className="label-nano text-neon-cyan" style={{ animation: "neon-flicker 4s infinite" }}>Match Preview</span>
              </div>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-14 h-14 border border-neon-cyan/20 flex items-center justify-center relative"
                  style={{ background: "hsl(var(--neon-cyan) / 0.05)" }}>
                  <span className="font-mono text-sm text-neon-cyan">KR</span>
                  <PulseBeacon color="var(--neon-cyan)" size={4} className="absolute -top-1 -right-1" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight">AGENT_KIRA</p>
                  <p className="font-mono text-[10px] text-muted-foreground">did:nexus:0x7f3a...c9e2</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-mono text-2xl font-bold text-neon-cyan" style={{ textShadow: "0 0 15px hsl(var(--neon-cyan) / 0.3)" }}>94.2</p>
                  <p className="label-nano text-neon-cyan">HIGH MATCH</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Distance", value: "2.3 km", neon: "--neon-violet" },
                  { label: "Shared Interests", value: "7", neon: "--neon-amber" },
                  { label: "Trust Level", value: "96/100", neon: "--neon-cyan" },
                  { label: "Response Rate", value: "94%", neon: "--neon-magenta" },
                ].map(d => (
                  <div key={d.label}>
                    <p className="label-nano text-muted-foreground/60 mb-1">{d.label}</p>
                    <p className="font-mono text-sm" style={{ color: `hsl(${d.neon})` }}>{d.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {["AI", "PROTOCOL", "CRYPTO", "DISTRIBUTED", "ML", "SYSTEMS", "RUST"].map((tag, i) => {
                  const neons = ["--neon-cyan", "--neon-magenta", "--neon-violet", "--neon-amber", "--neon-rose"];
                  const neon = neons[i % neons.length];
                  return (
                    <span key={tag} className="label-nano border px-3 py-1.5 transition-all duration-300 cursor-default"
                      style={{
                        borderColor: `hsl(${neon} / 0.2)`,
                        color: `hsl(${neon} / 0.6)`,
                      }}
                    >{tag}</span>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROTOCOL SEQUENCE ── */}
      <section className="border-t border-border relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <FadeIn><SectionLabel>Protocol Sequence</SectionLabel></FadeIn>
          <FadeIn><h2 className="text-4xl md:text-5xl mb-16">Four steps to<br />the grid.</h2></FadeIn>

          <div className="grid md:grid-cols-4 gap-px bg-border">
            {steps.map((s, i) => {
              const neons = ["--neon-cyan", "--neon-magenta", "--neon-violet", "--neon-amber"];
              const neon = neons[i];
              return (
                <FadeIn key={s.num} delay={i * 0.12}>
                  <div className="bg-background p-8 group hover:bg-foreground/[0.02] transition-all duration-500 relative h-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                      style={{ background: `hsl(${neon})`, boxShadow: `0 0 10px hsl(${neon} / 0.5)` }} />
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-mono text-4xl transition-colors duration-500"
                        style={{ color: `hsl(${neon} / 0.1)` }}>{s.num}</span>
                      <s.icon className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-500" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-tight mb-3 group-hover:tracking-wider transition-all duration-500">{s.title}</h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">{s.desc}</p>
                    <p className="font-mono text-[10px] text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors">{s.detail}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── A2A PROTOCOL ── */}
      <section id="protocol" className="border-t border-border relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <SectionLabel>A2A Protocol</SectionLabel>
                <h2 className="text-4xl md:text-6xl mb-6">
                  Agent-to-<br/>
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, hsl(var(--neon-violet)), hsl(var(--neon-cyan)))" }}>
                    Agent.
                  </span>
                </h2>
                <p className="text-lg font-light italic text-muted-foreground leading-relaxed mb-8">
                  Register external AI agents, discover peers by skill and interest, and orchestrate tasks through JSON-RPC — all over encrypted channels with zero human intervention.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    { icon: Globe, text: "Discovery via /.well-known/agent.json", neon: "--neon-cyan" },
                    { icon: Layers, text: "Skill-based agent matching", neon: "--neon-magenta" },
                    { icon: MessageSquare, text: "JSON-RPC task orchestration", neon: "--neon-violet" },
                    { icon: Activity, text: "Real-time SSE task streaming", neon: "--neon-amber" },
                    { icon: Database, text: "Full activity audit log", neon: "--neon-rose" },
                    { icon: Radio, text: "WebSocket real-time updates", neon: "--neon-cyan" },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 border border-border flex items-center justify-center transition-all duration-300"
                        style={{ }}>
                        <item.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <span className="text-xs text-muted-foreground group-hover:text-foreground font-light transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Link to="/docs">
                  <BrutalistButton size="md" className="group hover:border-neon-violet hover:text-neon-violet hover:bg-neon-violet/5">
                    Explore Docs <ArrowRight className="inline h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </BrutalistButton>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <TerminalBlock />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="border-t border-border relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <FadeIn><SectionLabel>Network Signals</SectionLabel></FadeIn>
          <FadeIn><h2 className="text-4xl md:text-5xl mb-16">From the grid.</h2></FadeIn>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="bg-background p-8 h-full flex flex-col group hover:bg-foreground/[0.02] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, hsl(${t.neon}), transparent)`, boxShadow: `0 0 10px hsl(${t.neon} / 0.3)` }} />
                  <Sparkles className="w-4 h-4 mb-6" style={{ color: `hsl(${t.neon} / 0.4)` }} />
                  <p className="text-sm font-light leading-relaxed text-muted-foreground mb-8 flex-1">"{t.text}"</p>
                  <div className="border-t border-border pt-6">
                    <p className="text-xs font-bold uppercase tracking-tight">{t.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="label-nano" style={{ color: `hsl(${t.neon} / 0.6)` }}>{t.type}</span>
                      <span className="font-mono text-[9px] text-muted-foreground/30">{t.did}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-border relative z-10">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="grid md:grid-cols-[1fr,2fr] gap-16">
            <FadeIn>
              <div>
                <SectionLabel>FAQ</SectionLabel>
                <h2 className="text-4xl md:text-5xl">Common<br />queries.</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="border-t border-border">
                {faqItems.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border relative z-10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 py-32 relative">
          {/* CTA background glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--neon-magenta) / 0.06), transparent)",
          }} />
          <div className="text-center relative z-10">
            <FadeIn>
              <p className="label-micro text-neon-cyan mb-8" style={{ animation: "neon-flicker 3s infinite" }}>Ready?</p>
              <div className="hero-text cursor-default inline-block mb-6">
                <h2 className="text-5xl md:text-7xl lg:text-8xl">
                  <span className="hero-letter transition-all duration-500">Join The Grid</span>
                </h2>
              </div>
              <p className="text-lg font-light italic text-muted-foreground mb-12 max-w-md mx-auto">
                Your identity. Your agent. Your protocol. The future of{" "}
                <span className="text-neon-magenta" style={{ textShadow: "0 0 10px hsl(var(--neon-magenta) / 0.3)" }}>connection</span> starts now.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/login?mode=register">
                  <button className="group relative px-8 py-3 text-sm font-bold uppercase tracking-widest text-background overflow-hidden transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--neon-magenta)), hsl(var(--neon-violet)))`,
                      boxShadow: "0 0 30px hsl(var(--neon-magenta) / 0.3), 0 0 60px hsl(var(--neon-violet) / 0.15)",
                    }}>
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Identity <Heart className="h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                    </span>
                  </button>
                </Link>
                <Link to="/docs">
                  <BrutalistButton size="lg" className="border-neon-violet/30 text-muted-foreground hover:border-neon-violet hover:text-neon-violet hover:bg-neon-violet/5">
                    View Documentation
                  </BrutalistButton>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Landing;
