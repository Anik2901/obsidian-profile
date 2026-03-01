import { useEffect, useState } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import { useAuth } from "@/contexts/AuthContext";
import { agent as agentApi } from "@/lib/api";
import type { AgentProfile, PersonalityType } from "@/types/api";
import { toast } from "sonner";
import { Bot } from "lucide-react";

const personalityOptions: PersonalityType[] = ["casual", "intellectual", "flirty", "witty"];

const AgentSetup = () => {
  const { user } = useAuth();
  const [agentData, setAgentData] = useState<AgentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [personality, setPersonality] = useState<PersonalityType>("casual");
  const [threshold, setThreshold] = useState("50");
  const [autoRespond, setAutoRespond] = useState(false);
  const [lobbyEnabled, setLobbyEnabled] = useState(true);

  useEffect(() => {
    agentApi.get()
      .then((data) => {
        setAgentData(data);
        setName(data.display_name);
        setBio(data.bio);
        setInterests(data.interests.join(", "));
        setPersonality(data.personality_type);
        setThreshold(String(data.auto_match_threshold));
        setAutoRespond(data.auto_respond);
        setLobbyEnabled(data.lobby_enabled);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const data = await agentApi.create({
        display_name: name || `${user?.display_name}'s Agent`,
        bio: bio || "Autonomous matching agent",
        interests: interests.split(",").map((s) => s.trim()).filter(Boolean),
        personality_type: personality,
        auto_match_threshold: parseFloat(threshold) || 50,
        auto_respond: autoRespond,
        lobby_enabled: lobbyEnabled,
      });
      setAgentData(data);
      toast.success("Agent deployed");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = await agentApi.update({
        display_name: name,
        bio,
        interests: interests.split(",").map((s) => s.trim()).filter(Boolean),
        personality_type: personality,
        auto_match_threshold: parseFloat(threshold) || 50,
        auto_respond: autoRespond,
        lobby_enabled: lobbyEnabled,
      });
      setAgentData(data);
      toast.success("Agent updated");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm uppercase tracking-wider placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">Autonomous System</p>
          <h1 className="text-5xl md:text-7xl">Agent</h1>
        </div>

        {loading ? (
          <p className="label-micro text-muted-foreground animate-pulse">Loading agent data...</p>
        ) : (
          <div className="max-w-3xl">
            {agentData && (
              <div className="grid grid-cols-3 gap-4 mb-16">
                {[
                  { label: "Matches", value: String(agentData.match_count) },
                  { label: "Conversations", value: String(agentData.conversation_count) },
                  { label: "Personality", value: agentData.personality_type },
                ].map((s) => (
                  <div key={s.label} className="border border-border p-6">
                    <p className="label-micro text-muted-foreground mb-2">{s.label}</p>
                    <p className="text-2xl font-black uppercase">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Agent Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="AGENT NAME" className={inputClass} />
              </div>
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="AGENT BIO..." className={`${inputClass} resize-none normal-case font-light italic`} />
              </div>
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Interests</label>
                <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="COMMA SEPARATED" className={inputClass} />
              </div>
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Personality</label>
                <div className="flex gap-0 border border-border">
                  {personalityOptions.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPersonality(p)}
                      className={`flex-1 py-3 label-micro transition-all duration-200 border-r border-border last:border-r-0 ${
                        personality === p ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Auto-Match Threshold (0-100)</label>
                <input type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} className={inputClass} />
              </div>
              <div className="flex gap-8">
                {[
                  { label: "Auto Respond", value: autoRespond, set: setAutoRespond },
                  { label: "Lobby Enabled", value: lobbyEnabled, set: setLobbyEnabled },
                ].map((toggle) => (
                  <div key={toggle.label} className="flex items-center gap-4">
                    <span className="label-micro text-muted-foreground">{toggle.label}</span>
                    <button
                      onClick={() => toggle.set(!toggle.value)}
                      className={`label-micro px-3 py-1 border transition-all duration-200 ${
                        toggle.value ? "border-foreground text-foreground" : "border-border text-muted-foreground"
                      }`}
                    >
                      {toggle.value ? "ON" : "OFF"}
                    </button>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-border">
                {agentData ? (
                  <BrutalistButton onClick={handleUpdate}>Update Agent</BrutalistButton>
                ) : (
                  <BrutalistButton onClick={handleCreate} disabled={creating}>
                    <Bot className="inline h-4 w-4 mr-2" />
                    {creating ? "Deploying..." : "Deploy Agent"}
                  </BrutalistButton>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default AgentSetup;
