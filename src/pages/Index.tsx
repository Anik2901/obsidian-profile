import StatusAvatar from "@/components/StatusAvatar";
import BrutalistButton from "@/components/BrutalistButton";
import DataRow from "@/components/DataRow";
import DataTag from "@/components/DataTag";
import MatchCard from "@/components/MatchCard";
import ConversationItem from "@/components/ConversationItem";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistNav from "@/components/BrutalistNav";
import avatarMain from "@/assets/avatar-main.jpg";
import match1 from "@/assets/match-1.jpg";
import match2 from "@/assets/match-2.jpg";
import match3 from "@/assets/match-3.jpg";
import match4 from "@/assets/match-4.jpg";
import match6 from "@/assets/match-6.jpg";

const interests = ["Architecture", "Systems Design", "Brutalism", "Typography", "Monochrome", "Data Viz", "Minimalism", "Terminal"];

const configData = [
  { label: "Location", value: "Berlin, DE" },
  { label: "Age", value: "28" },
  { label: "Status", value: "Active" },
  { label: "Preference", value: "Verified Only" },
  { label: "Range", value: "50km" },
  { label: "Mode", value: "Stealth" },
];

const matches = [
  { image: match1, name: "Elara Voss", score: "97.2% match" },
  { image: match2, name: "Marcus Chen", score: "94.8% match" },
  { image: match3, name: "Aria Novak", score: "93.1% match" },
  { image: match4, name: "Kai Brennan", score: "91.7% match" },
  { image: match6, name: "Leo Strand", score: "89.3% match" },
  { image: match1, name: "Nina Volkov", score: "87.6% match" },
];

const conversations = [
  { avatar: match1, name: "Elara Voss", message: "I was thinking about that design system you mentioned — have you tried using a 4px base grid?", time: "3m ago" },
  { avatar: match2, name: "Marcus Chen", message: "The new protocol is live. Check the dashboard when you get a chance.", time: "1h ago" },
  { avatar: match3, name: "Aria Novak", message: "Interesting perspective on brutalist interfaces. Let's discuss more.", time: "4h ago" },
  { avatar: match4, name: "Kai Brennan", message: "Sent you the updated configuration files.", time: "1d ago" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      {/* Hero Identity Section */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <StatusAvatar src={avatarMain} alt="Profile" size={200} online />

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block border border-foreground px-3 py-1 label-micro mb-3">
                  Architect
                </span>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  NX-0x7F3A-2E91
                </p>
              </div>
              <BrutalistButton size="sm">Edit</BrutalistButton>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[8rem] leading-[0.85] mb-6">
              Damien<br />Richter
            </h1>

            <p className="text-xl md:text-2xl font-light italic text-muted-foreground max-w-[40rem] leading-relaxed">
              Building systems that feel inevitable. Obsessed with the intersection of data architecture and human intuition.
            </p>
          </div>
        </div>
      </section>

      {/* Profile Configuration Grid */}
      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="grid gap-16 md:grid-cols-3">
          {/* Left Column - Configuration */}
          <div className="md:col-span-1">
            <h2 className="label-micro text-muted-foreground mb-8">Configuration</h2>
            <div>
              {configData.map((row) => (
                <DataRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>

            <h2 className="label-micro text-muted-foreground mt-12 mb-6">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <DataTag key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-2">
            {/* Matches Grid */}
            <h2 className="label-micro text-muted-foreground mb-8">Top Matches</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {matches.map((match) => (
                <MatchCard
                  key={match.name}
                  image={match.image}
                  name={match.name}
                  score={match.score}
                />
              ))}
            </div>

            {/* Conversations */}
            <h2 className="label-micro text-muted-foreground mt-16 mb-8">Recent Conversations</h2>
            <div>
              {conversations.map((conv) => (
                <ConversationItem
                  key={conv.name}
                  avatar={conv.avatar}
                  name={conv.name}
                  message={conv.message}
                  time={conv.time}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Index;
