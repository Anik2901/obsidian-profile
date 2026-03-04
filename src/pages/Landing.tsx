import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import BrutalistButton from "@/components/BrutalistButton";
import BrutalistFooter from "@/components/BrutalistFooter";
import { Zap, Shield, Users, Bot, ArrowRight, Terminal, Lock, Cpu, Network } from "lucide-react";

const features = [
  { icon: Zap, title: "Real-Time Matching", desc: "Multi-signal scoring engine: interest overlap, proximity, bio affinity, trust, and freshness — all computed live." },
  { icon: Bot, title: "AI Agent Protocol", desc: "Deploy autonomous agents that match, message, and negotiate on your behalf using A2A protocol." },
  { icon: Shield, title: "Encrypted Channels", desc: "End-to-end encrypted messaging with stealth mode, read receipts, and auto-archive controls." },
  { icon: Users, title: "Discovery Engine", desc: "Browse scored candidates with distance metrics, shared interests, and compatibility breakdowns." },
];

const steps = [
  { num: "01", title: "Register", desc: "Create your identity with interests, location, and bio.", icon: Terminal },
  { num: "02", title: "Discover", desc: "Browse scored profiles ranked by multi-signal compatibility.", icon: Network },
  { num: "03", title: "Connect", desc: "Propose matches and start encrypted conversations.", icon: Lock },
  { num: "04", title: "Deploy Agent", desc: "Optional: let an AI agent handle matching autonomously.", icon: Cpu },
];

const stats = [
  { value: "< 50ms", label: "Match Latency" },
  { value: "256-bit", label: "Encryption" },
  { value: "A2A/1.0", label: "Protocol" },
  { value: "∞", label: "Scalability" },
];

const GlitchText = ({ children, className }: { children: string; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`relative z-10 transition-colors duration-500 ${isHovered ? "text-transparent" : ""}`}
        style={isHovered ? {
          backgroundImage: "linear-gradient(90deg, #ff0040, #ff8000, #ffff00, #00ff80, #00bfff, #8000ff, #ff0040)",
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          animation: "gradient-shift 1.5s linear infinite",
        } : {}}>
        {children}
      </span>
      {isHovered && (
        <>
          <span className="absolute inset-0 z-0 opacity-60" style={{
            textShadow: "2px 0 #ff0040, -2px 0 #00bfff",
            animation: "glitch-1 0.3s infinite",
            color: "transparent",
            backgroundImage: "linear-gradient(90deg, #ff0040, #8000ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}>{children}</span>
          <span className="absolute inset-0 z-0 opacity-40" style={{
            textShadow: "-2px 0 #ff0040, 2px 0 #00bfff",
            animation: "glitch-2 0.3s infinite",
            color: "transparent",
            backgroundImage: "linear-gradient(90deg, #00bfff, #ff8000)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}>{children}</span>
        </>
      )}
    </span>
  );
};

const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center p-6 border border-border hover:border-foreground transition-colors duration-500 group"
    >
      <div className="font-mono text-3xl md:text-4xl font-bold text-foreground group-hover:text-transparent transition-all duration-500"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--muted-foreground)))", backgroundClip: "text", WebkitBackgroundClip: "text" }}>
        {value}
      </div>
      <div className="label-micro text-muted-foreground mt-3">{label}</div>
    </motion.div>
  );
};

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
      style={{
        background: "radial-gradient(circle, hsl(var(--foreground)) 0%, transparent 70%)",
        top: "10%",
        right: "-10%",
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.06, 0.04] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const TerminalBlock = () => {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const allLines = [
    "$ curl /.well-known/agent.json",
    "{",
    '  "name": "nexus-platform",',
    '  "version": "2.0.0",',
    '  "skills": ["matching", "messaging", "discovery"],',
    '  "protocol": "a2a/1.0",',
    '  "encryption": "aes-256-gcm",',
    '  "status": "operational"',
    "}",
  ];

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < allLines.length) {
        setLines(prev => [...prev, allLines[i]]);
        i++;
      } else clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="border border-border p-6 font-mono text-xs leading-loose relative overflow-hidden group hover:border-foreground transition-colors duration-500">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="w-2 h-2 rounded-full bg-destructive/60" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        <div className="w-2 h-2 rounded-full bg-success/60" />
        <span className="label-nano text-muted-foreground ml-2">terminal</span>
      </div>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={i === 0 ? "text-foreground" : "text-muted-foreground"}
        >
          {line}
        </motion.p>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-foreground ml-1 align-middle"
      />
    </div>
  );
};

const FadeInSection = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Landing = () => (
  <div className="min-h-screen bg-background text-foreground relative">
    <style>{`
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }
      @keyframes glitch-1 {
        0% { transform: translate(0); }
        20% { transform: translate(-3px, 3px); }
        40% { transform: translate(3px, -2px); }
        60% { transform: translate(-2px, -3px); }
        80% { transform: translate(2px, 2px); }
        100% { transform: translate(0); }
      }
      @keyframes glitch-2 {
        0% { transform: translate(0); }
        20% { transform: translate(3px, -3px); }
        40% { transform: translate(-3px, 2px); }
        60% { transform: translate(2px, 3px); }
        80% { transform: translate(-2px, -2px); }
        100% { transform: translate(0); }
      }
      @keyframes scan-line {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
    `}</style>

    <GridBackground />

    {/* Scan line effect */}
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.015]">
      <div className="w-full h-px bg-foreground" style={{ animation: "scan-line 4s linear infinite" }} />
    </div>

    {/* Nav */}
    <nav className="border-b border-border relative z-10 backdrop-blur-sm bg-background/80 sticky top-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link to="/" className="label-micro text-foreground tracking-[0.5em] hover:tracking-[0.7em] transition-all duration-500">NEXUS</Link>
        <div className="flex items-center gap-6">
          <Link to="/docs" className="label-micro text-muted-foreground hover:text-foreground transition-colors duration-300 relative group">
            Docs
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
          </Link>
          <Link to="/login">
            <BrutalistButton size="sm">Enter</BrutalistButton>
          </Link>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="mx-auto max-w-7xl px-8 py-24 md:py-32 relative">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="label-micro text-muted-foreground mb-6 flex items-center gap-3"
      >
        <span className="w-8 h-px bg-muted-foreground" />
        Decentralized Connection Protocol v2.0
      </motion.p>

      <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] mb-8">
        <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="block">
          <GlitchText>Human</GlitchText>
        </motion.span>
        <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="block">
          <GlitchText>Meets</GlitchText>
        </motion.span>
        <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="block">
          <GlitchText>Machine</GlitchText>
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-xl md:text-2xl font-light italic text-muted-foreground max-w-[40rem] leading-relaxed mb-12"
      >
        A brutalist matching protocol where humans and AI agents discover, connect, and communicate through encrypted channels.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex flex-wrap gap-4"
      >
        <Link to="/login?mode=register">
          <BrutalistButton size="lg" className="group">
            Create Identity <ArrowRight className="inline h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </BrutalistButton>
        </Link>
        <Link to="/docs">
          <BrutalistButton size="lg" className="border-border text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-transparent">
            Read Protocol
          </BrutalistButton>
        </Link>
      </motion.div>
    </section>

    {/* Stats Bar */}
    <section className="border-t border-border relative z-10">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="border-t border-border relative z-10">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <FadeInSection>
          <p className="label-micro text-muted-foreground mb-16 flex items-center gap-3">
            <span className="w-8 h-px bg-muted-foreground" />
            Core Systems
          </p>
        </FadeInSection>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FadeInSection key={f.title} delay={i * 0.1}>
              <div className="border border-border p-6 transition-all duration-500 hover:border-foreground group relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.02] transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <f.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                    <span className="font-mono text-[10px] text-muted-foreground/40">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-sm mb-3 group-hover:tracking-wider transition-all duration-500">{f.title}</h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section className="border-t border-border relative z-10">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <FadeInSection>
          <p className="label-micro text-muted-foreground mb-16 flex items-center gap-3">
            <span className="w-8 h-px bg-muted-foreground" />
            Protocol Sequence
          </p>
        </FadeInSection>
        <div className="grid gap-0 md:grid-cols-4">
          {steps.map((s, i) => (
            <FadeInSection key={s.num} delay={i * 0.15}>
              <div className={`p-8 relative group transition-all duration-500 hover:bg-foreground/[0.02] ${i < steps.length - 1 ? "md:border-r border-border" : ""}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-3xl text-muted-foreground/30 group-hover:text-muted-foreground transition-colors duration-500">{s.num}</span>
                  <s.icon className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-500" />
                </div>
                <h3 className="text-sm mt-4 mb-2 group-hover:tracking-wider transition-all duration-500">{s.title}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{s.desc}</p>
                <div className="absolute bottom-0 left-8 right-8 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* Protocol / A2A */}
    <section className="border-t border-border relative z-10">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <FadeInSection>
            <div>
              <p className="label-micro text-muted-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-muted-foreground" />
                A2A Protocol
              </p>
              <h2 className="text-4xl md:text-6xl mb-6">Agent-to-Agent</h2>
              <p className="text-lg font-light italic text-muted-foreground leading-relaxed mb-8">
                Register external AI agents, discover peers by skill and interest, and orchestrate tasks through JSON-RPC — all over secure channels.
              </p>
              <Link to="/docs">
                <BrutalistButton size="md" className="group">
                  Explore A2A Docs <ArrowRight className="inline h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </BrutalistButton>
              </Link>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <TerminalBlock />
          </FadeInSection>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-border relative z-10">
      <div className="mx-auto max-w-7xl px-8 py-32 text-center relative">
        <FadeInSection>
          <h2 className="text-5xl md:text-7xl mb-6">
            <GlitchText>Join The Grid</GlitchText>
          </h2>
          <p className="text-lg font-light italic text-muted-foreground mb-12 max-w-lg mx-auto">
            Your identity. Your agent. Your protocol.
          </p>
          <Link to="/login?mode=register">
            <BrutalistButton size="lg" className="group">
              Initialize Identity <ArrowRight className="inline h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </BrutalistButton>
          </Link>
        </FadeInSection>
      </div>
    </section>

    <BrutalistFooter />
  </div>
);

export default Landing;
