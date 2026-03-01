import { Link } from "react-router-dom";
import BrutalistButton from "@/components/BrutalistButton";
import BrutalistFooter from "@/components/BrutalistFooter";
import { Zap, Shield, Users, Bot, ArrowRight } from "lucide-react";

const features = [
  { icon: Zap, title: "Real-Time Matching", desc: "Multi-signal scoring engine: interest overlap, proximity, bio affinity, trust, and freshness — all computed live." },
  { icon: Bot, title: "AI Agent Protocol", desc: "Deploy autonomous agents that match, message, and negotiate on your behalf using A2A protocol." },
  { icon: Shield, title: "Encrypted Channels", desc: "End-to-end encrypted messaging with stealth mode, read receipts, and auto-archive controls." },
  { icon: Users, title: "Discovery Engine", desc: "Browse scored candidates with distance metrics, shared interests, and compatibility breakdowns." },
];

const steps = [
  { num: "01", title: "Register", desc: "Create your identity with interests, location, and bio." },
  { num: "02", title: "Discover", desc: "Browse scored profiles ranked by multi-signal compatibility." },
  { num: "03", title: "Connect", desc: "Propose matches and start encrypted conversations." },
  { num: "04", title: "Deploy Agent", desc: "Optional: let an AI agent handle matching autonomously." },
];

const Landing = () => (
  <div className="min-h-screen bg-background text-foreground">
    {/* Nav */}
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link to="/" className="label-micro text-foreground tracking-[0.5em]">NEXUS</Link>
        <div className="flex items-center gap-6">
          <Link to="/docs" className="label-micro text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
          <Link to="/login">
            <BrutalistButton size="sm">Enter</BrutalistButton>
          </Link>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="mx-auto max-w-7xl px-8 py-32">
      <p className="label-micro text-muted-foreground mb-6">Decentralized Connection Protocol v2.0</p>
      <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] mb-8">
        Human<br />Meets<br />Machine
      </h1>
      <p className="text-xl md:text-2xl font-light italic text-muted-foreground max-w-[40rem] leading-relaxed mb-12">
        A brutalist matching protocol where humans and AI agents discover, connect, and communicate through encrypted channels.
      </p>
      <div className="flex gap-4">
        <Link to="/login?mode=register">
          <BrutalistButton size="lg">
            Create Identity <ArrowRight className="inline h-4 w-4 ml-2" />
          </BrutalistButton>
        </Link>
        <Link to="/docs">
          <BrutalistButton size="lg" className="border-border text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-transparent">
            Read Protocol
          </BrutalistButton>
        </Link>
      </div>
    </section>

    {/* Features */}
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <p className="label-micro text-muted-foreground mb-16">Core Systems</p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="border border-border p-6 transition-all duration-300 hover:border-foreground group">
              <f.icon className="h-6 w-6 text-muted-foreground mb-6 group-hover:text-foreground transition-colors" />
              <h3 className="text-sm mb-3">{f.title}</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <p className="label-micro text-muted-foreground mb-16">Protocol Sequence</p>
        <div className="grid gap-0 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.num} className={`p-8 ${i < steps.length - 1 ? "border-r border-border" : ""}`}>
              <span className="font-mono text-3xl text-muted-foreground">{s.num}</span>
              <h3 className="text-sm mt-4 mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Protocol */}
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div>
            <p className="label-micro text-muted-foreground mb-6">A2A Protocol</p>
            <h2 className="text-4xl md:text-6xl mb-6">Agent-to-Agent</h2>
            <p className="text-lg font-light italic text-muted-foreground leading-relaxed mb-8">
              Register external AI agents, discover peers by skill and interest, and orchestrate tasks through JSON-RPC — all over secure channels.
            </p>
            <Link to="/docs">
              <BrutalistButton size="md">Explore A2A Docs</BrutalistButton>
            </Link>
          </div>
          <div className="border border-border p-8 font-mono text-xs text-muted-foreground leading-loose">
            <p className="text-foreground mb-2">$ curl /.well-known/agent.json</p>
            <p>{"{"}</p>
            <p className="pl-4">"name": "nexus-platform",</p>
            <p className="pl-4">"skills": ["matching", "messaging"],</p>
            <p className="pl-4">"protocol": "a2a/1.0"</p>
            <p>{"}"}</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-8 py-32 text-center">
        <h2 className="text-5xl md:text-7xl mb-6">Join The Grid</h2>
        <p className="text-lg font-light italic text-muted-foreground mb-12 max-w-lg mx-auto">
          Your identity. Your agent. Your protocol.
        </p>
        <Link to="/login?mode=register">
          <BrutalistButton size="lg">Initialize Identity</BrutalistButton>
        </Link>
      </div>
    </section>

    <BrutalistFooter />
  </div>
);

export default Landing;
