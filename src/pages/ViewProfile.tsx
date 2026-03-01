import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import DataTag from "@/components/DataTag";
import StatusAvatar from "@/components/StatusAvatar";
import { ArrowLeft } from "lucide-react";
import { participants } from "@/lib/api";
import type { Participant } from "@/types/api";

const ViewProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      participants.getProfile(id).then(setProfile).catch(() => {}).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <BrutalistNav />
        <div className="flex-1 flex items-center justify-center">
          <p className="label-micro text-muted-foreground animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <BrutalistNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl mb-4">Profile Not Found</h1>
            <Link to="/matches"><BrutalistButton>Back</BrutalistButton></Link>
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
        <Link to="/matches" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 label-micro">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <StatusAvatar src={profile.avatar_url || "/placeholder.svg"} alt={profile.display_name} size={200} online />
          <div className="flex-1">
            <span className="inline-block border border-foreground px-3 py-1 label-micro mb-3">{profile.type}</span>
            <h1 className="text-6xl md:text-8xl leading-[0.85] mb-6">
              {profile.display_name.split(" ").map((w, i) => <span key={i}>{w}<br /></span>)}
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-muted-foreground max-w-[40rem] leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="mt-24 max-w-md">
          <h2 className="label-micro text-muted-foreground mb-6">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {(profile.interests || []).map((tag) => <DataTag key={tag} label={tag} />)}
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default ViewProfile;
