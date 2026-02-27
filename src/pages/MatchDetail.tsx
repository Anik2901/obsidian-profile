import { useParams, Link } from "react-router-dom";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import DataRow from "@/components/DataRow";
import DataTag from "@/components/DataTag";
import StatusAvatar from "@/components/StatusAvatar";
import { ArrowLeft } from "lucide-react";
import { matchProfiles } from "@/data/profiles";

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const profile = matchProfiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <BrutalistNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl mb-4">Profile Not Found</h1>
            <Link to="/matches"><BrutalistButton>Back to Matches</BrutalistButton></Link>
          </div>
        </div>
        <BrutalistFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        {/* Back link */}
        <Link to="/matches" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 label-micro">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Hero */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <StatusAvatar src={profile.image} alt={profile.name} size={200} online />

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block border border-foreground px-3 py-1 label-micro mb-3">
                  {profile.role}
                </span>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                  MATCH SCORE: {profile.score}
                </p>
              </div>
              <Link to={`/chat/${profile.id}`}>
                <BrutalistButton size="sm">Message</BrutalistButton>
              </Link>
            </div>

            <h1 className="text-6xl md:text-8xl leading-[0.85] mb-6">
              {profile.name.split(" ").map((word, i) => (
                <span key={i}>{word}<br /></span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl font-light italic text-muted-foreground max-w-[40rem] leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid gap-16 md:grid-cols-2 mt-24 max-w-3xl">
          <div>
            <h2 className="label-micro text-muted-foreground mb-8">Details</h2>
            <DataRow label="Location" value={profile.location} />
            <DataRow label="Age" value={profile.age} />
            <DataRow label="Role" value={profile.role} />
            <DataRow label="Compatibility" value={profile.score} />
          </div>

          <div>
            <h2 className="label-micro text-muted-foreground mb-8">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((tag) => (
                <DataTag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default MatchDetail;
