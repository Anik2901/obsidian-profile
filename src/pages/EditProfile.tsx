import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import StatusAvatar from "@/components/StatusAvatar";
import DataTag from "@/components/DataTag";
import avatarMain from "@/assets/avatar-main.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultInterests = ["Architecture", "Systems Design", "Brutalism", "Typography", "Monochrome", "Data Viz", "Minimalism", "Terminal"];

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Damien Richter");
  const [bio, setBio] = useState("Building systems that feel inevitable. Obsessed with the intersection of data architecture and human intuition.");
  const [role, setRole] = useState("Architect");
  const [location, setLocation] = useState("Berlin, DE");
  const [interests, setInterests] = useState(defaultInterests);
  const [newInterest, setNewInterest] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const handleSave = () => {
    toast.success("Profile saved successfully");
    navigate("/");
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">Identity Configuration</p>
          <h1 className="text-5xl md:text-7xl">Edit Profile</h1>
        </div>

        <div className="grid gap-16 md:grid-cols-3 max-w-5xl">
          {/* Avatar Column */}
          <div className="md:col-span-1">
            <h2 className="label-micro text-muted-foreground mb-8">Avatar</h2>
            <StatusAvatar src={avatarMain} alt="Profile" size={180} online={false} />
            <div className="mt-6">
              <BrutalistButton size="sm" onClick={() => toast.info("Upload functionality coming soon")}>
                Upload New
              </BrutalistButton>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <label className="label-micro text-muted-foreground block mb-3">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-lg font-bold uppercase tracking-tight focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="label-micro text-muted-foreground block mb-3">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm uppercase tracking-wider focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="label-micro text-muted-foreground block mb-3">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="label-micro text-muted-foreground block mb-3">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm font-light italic leading-relaxed focus:border-foreground focus:outline-none transition-colors resize-none"
              />
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
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddInterest()}
                      placeholder="NEW TAG"
                      autoFocus
                      className="border border-border bg-transparent px-3 py-1 text-[10px] font-extrabold uppercase text-foreground tracking-wider focus:border-foreground focus:outline-none w-24"
                    />
                    <button
                      onClick={handleAddInterest}
                      className="border border-foreground px-2 py-1 text-[10px] font-extrabold uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddInput(true)}
                    className="border border-dashed border-border px-3 py-1 text-[10px] font-extrabold uppercase text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-8 border-t border-border">
              <BrutalistButton onClick={handleSave}>Save Changes</BrutalistButton>
              <BrutalistButton
                onClick={() => navigate("/")}
                className="border-border text-muted-foreground hover:border-foreground hover:bg-transparent hover:text-foreground"
              >
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
