import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import DataRow from "@/components/DataRow";
import { Switch } from "@/components/ui/switch";

const accountSettings = [
  { label: "Email", value: "damien@nexus.io" },
  { label: "Phone", value: "+49 *** *** 4291" },
  { label: "Plan", value: "Nexus Pro" },
  { label: "Member Since", value: "2024-08-14" },
];

const Settings = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">System Configuration</p>
          <h1 className="text-5xl md:text-7xl">Settings</h1>
        </div>

        <div className="grid gap-16 md:grid-cols-2 max-w-5xl">
          {/* Account */}
          <div>
            <h2 className="label-micro text-muted-foreground mb-8">Account</h2>
            {accountSettings.map((row) => (
              <DataRow key={row.label} label={row.label} value={row.value} />
            ))}
            <div className="mt-8">
              <BrutalistButton size="sm">Change Password</BrutalistButton>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="label-micro text-muted-foreground mb-8">Preferences</h2>

            <div className="space-y-0">
              {[
                { label: "Push Notifications", enabled: true },
                { label: "Email Digest", enabled: false },
                { label: "Stealth Mode", enabled: true },
                { label: "Read Receipts", enabled: false },
                { label: "Auto-Archive", enabled: true },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between py-3 brutalist-separator">
                  <span className="text-xs uppercase tracking-wider text-zinc-600">{pref.label}</span>
                  <Switch defaultChecked={pref.enabled} />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="label-micro text-muted-foreground mb-8">Privacy</h2>
            <div className="space-y-0">
              {[
                { label: "Profile Visibility", value: "Verified Only" },
                { label: "Search Indexing", value: "Disabled" },
                { label: "Data Retention", value: "90 Days" },
                { label: "Two-Factor Auth", value: "Enabled" },
              ].map((row) => (
                <DataRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h2 className="label-micro text-destructive mb-8">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              These actions are irreversible. Proceed with caution.
            </p>
            <div className="flex gap-3">
              <BrutalistButton size="sm">Export Data</BrutalistButton>
              <BrutalistButton size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-foreground">
                Delete Account
              </BrutalistButton>
            </div>
          </div>
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Settings;
