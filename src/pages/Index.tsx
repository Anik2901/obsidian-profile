import StatusAvatar from "@/components/StatusAvatar";
import BrutalistButton from "@/components/BrutalistButton";
import DataRow from "@/components/DataRow";
import DataTag from "@/components/DataTag";
import MatchCard from "@/components/MatchCard";
import ConversationItem from "@/components/ConversationItem";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistNav from "@/components/BrutalistNav";
import avatarMain from "@/assets/avatar-main.jpg";
import { matchProfiles, conversationThreads } from "@/data/profiles";
import { Link } from "react-router-dom";

const interests = ["Architecture", "Systems Design", "Brutalism", "Typography", "Monochrome", "Data Viz", "Minimalism", "Terminal"];

const configData = [
  { label: "Location", value: "Berlin, DE" },
  { label: "Age", value: "28" },
  { label: "Status", value: "Active" },
  { label: "Preference", value: "Verified Only" },
  { label: "Range", value: "50km" },
  { label: "Mode", value: "Stealth" },
];

const Index = () => {
  const topMatches = matchProfiles.slice(0, 6);
  const recentConvos = conversationThreads.slice(0, 4);

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
              <Link to="/edit-profile">
                <BrutalistButton size="sm">Edit</BrutalistButton>
              </Link>
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="label-micro text-muted-foreground">Top Matches</h2>
              <Link to="/matches" className="label-micro text-muted-foreground hover:text-foreground transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {topMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  id={match.id}
                  image={match.image}
                  name={match.name}
                  score={`${match.score} match`}
                />
              ))}
            </div>

            {/* Conversations */}
            <div className="flex items-center justify-between mt-16 mb-8">
              <h2 className="label-micro text-muted-foreground">Recent Conversations</h2>
              <Link to="/messages" className="label-micro text-muted-foreground hover:text-foreground transition-colors">
                View All →
              </Link>
            </div>
            <div>
              {recentConvos.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  id={conv.id}
                  avatar={conv.avatar}
                  name={conv.name}
                  message={conv.lastMessage}
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
