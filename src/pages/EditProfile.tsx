import { useEffect, useState } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import StatusAvatar from "@/components/StatusAvatar";
import DataTag from "@/components/DataTag";
import { useAuth } from "@/contexts/AuthContext";
import { participants } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditProfile = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.display_name);
      setBio(user.bio || "");
      setInterests(user.interests || []);
      setAvatarUrl(user.avatar_url || "");
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await participants.updateMe({
        display_name: name,
        bio,
        interests,
        avatar_url: avatarUrl || undefined,
      } as any);
      await refreshUser();
      toast.success("Profile saved");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests((prev) => [...prev, newInterest.trim()]);
      setNewInterest("");
      setShowAddInput(false);
    }
  };

  const removeInterest = (tag: string) => {
    setInterests((prev) => prev.filter((t) => t !== tag));
  };

  const inputClass =
    "w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:border-foreground focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">Identity Configuration</p>
          <h1 className="text-5xl md:text-7xl">Edit Profile</h1>
        </div>

        <div className="grid gap-16 md:grid-cols-3 max-w-5xl">
          <div className="md:col-span-1">
            <h2 className="label-micro text-muted-foreground mb-8">Avatar</h2>
            <StatusAvatar src={avatarUrl || "/placeholder.svg"} alt={name} size={180} online={false} />
            <div className="mt-6">
              <label className="label-micro text-muted-foreground block mb-3">Avatar URL</label>
              <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." className={inputClass} />
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div>
              <label className="label-micro text-muted-foreground block mb-3">Display Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`${inputClass} text-lg font-bold uppercase tracking-tight`} />
            </div>
            <div>
              <label className="label-micro text-muted-foreground block mb-3">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className={`${inputClass} font-light italic leading-relaxed resize-none`} />
            </div>
            <div>
              <label className="label-micro text-muted-foreground block mb-4">Interests</label>
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <button key={tag} onClick={() => removeInterest(tag)} title="Click to remove">
                    <DataTag label={tag} />
                  </button>
                ))}
                {showAddInput ? (
                  <div className="flex gap-2">
                    <input
                      type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddInterest()}
                      placeholder="NEW TAG" autoFocus
                      className="border border-border bg-transparent px-3 py-1 text-[10px] font-extrabold uppercase text-foreground tracking-wider focus:border-foreground focus:outline-none w-24"
                    />
                    <button onClick={handleAddInterest} className="border border-foreground px-2 py-1 text-[10px] font-extrabold uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-200">✓</button>
                  </div>
                ) : (
                  <button onClick={() => setShowAddInput(true)} className="border border-dashed border-border px-3 py-1 text-[10px] font-extrabold uppercase text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground">+ Add</button>
                )}
              </div>
            </div>
            <div className="flex gap-3 pt-8 border-t border-border">
              <BrutalistButton onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </BrutalistButton>
              <BrutalistButton onClick={() => navigate("/dashboard")} className="border-border text-muted-foreground hover:border-foreground hover:bg-transparent hover:text-foreground">
                Cancel
              </BrutalistButton>
            </div>
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default EditProfile;
