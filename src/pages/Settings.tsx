import { useEffect, useState } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import DataRow from "@/components/DataRow";
import { useAuth } from "@/contexts/AuthContext";
import { participants } from "@/lib/api";
import type { ParticipantSettings, ProfileVisibility, CoordinatePrecision } from "@/types/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Settings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState<ParticipantSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    participants.getSettings()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateSetting = async (key: keyof ParticipantSettings, value: any) => {
    try {
      const updated = await participants.updateSettings({ [key]: value });
      setSettings(updated);
      toast.success("Setting updated");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const toggles = settings ? [
    { label: "Stealth Mode", key: "stealth_mode" as const, value: settings.stealth_mode },
    { label: "Read Receipts", key: "read_receipts" as const, value: settings.read_receipts },
    { label: "Auto-Archive", key: "auto_archive" as const, value: settings.auto_archive },
  ] : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">System Configuration</p>
          <h1 className="text-5xl md:text-7xl">Settings</h1>
        </div>

        {loading ? (
          <p className="label-micro text-muted-foreground animate-pulse">Loading settings...</p>
        ) : (
          <div className="grid gap-16 md:grid-cols-2 max-w-5xl">
            {/* Account */}
            <div>
              <h2 className="label-micro text-muted-foreground mb-8">Account</h2>
              <DataRow label="DID" value={user?.did?.slice(0, 24) + "..." || "—"} />
              <DataRow label="Type" value={user?.type || "—"} />
              <DataRow label="Display Name" value={user?.display_name || "—"} />
            </div>

            {/* Preferences */}
            <div>
              <h2 className="label-micro text-muted-foreground mb-8">Preferences</h2>
              {toggles.map((t) => (
                <div key={t.label} className="flex items-center justify-between py-3 brutalist-separator">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.label}</span>
                  <button
                    onClick={() => updateSetting(t.key, !t.value)}
                    className={`label-micro px-3 py-1 border transition-all duration-200 ${
                      t.value ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {t.value ? "ON" : "OFF"}
                  </button>
                </div>
              ))}
            </div>

            {/* Visibility */}
            <div>
              <h2 className="label-micro text-muted-foreground mb-8">Privacy</h2>
              {settings && (
                <>
                  <div className="mb-6">
                    <p className="label-micro text-muted-foreground mb-3">Profile Visibility</p>
                    <div className="flex gap-0 border border-border">
                      {(["public", "matches_only"] as ProfileVisibility[]).map((v) => (
                        <button
                          key={v}
                          onClick={() => updateSetting("profile_visibility", v)}
                          className={`flex-1 py-3 label-micro transition-all duration-200 border-r border-border last:border-r-0 ${
                            settings.profile_visibility === v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {v.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="label-micro text-muted-foreground mb-3">Coordinate Precision</p>
                    <div className="flex gap-0 border border-border">
                      {(["city", "exact", "hidden"] as CoordinatePrecision[]).map((v) => (
                        <button
                          key={v}
                          onClick={() => updateSetting("coordinate_precision", v)}
                          className={`flex-1 py-3 label-micro transition-all duration-200 border-r border-border last:border-r-0 ${
                            settings.coordinate_precision === v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Danger Zone */}
            <div>
              <h2 className="label-micro text-destructive mb-8">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                These actions are irreversible. Proceed with caution.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/blocked">
                  <BrutalistButton size="sm">Blocked Users</BrutalistButton>
                </Link>
                <BrutalistButton
                  size="sm"
                  onClick={() => { logout(); toast.success("Logged out"); }}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-foreground"
                >
                  Logout
                </BrutalistButton>
              </div>
            </div>
          </div>
        )}
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Settings;
