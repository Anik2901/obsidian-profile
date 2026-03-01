import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BrutalistButton from "@/components/BrutalistButton";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Login state
  const [did, setDid] = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regBio, setRegBio] = useState("");
  const [regAge, setRegAge] = useState("");
  const [regInterests, setRegInterests] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLat, setRegLat] = useState("");
  const [regLon, setRegLon] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!did.trim() || !password.trim()) return;
    setLoading(true);
    try {
      await login({ did: did.trim(), password: password.trim() });
      toast.success("Identity verified");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPassword.trim()) return;
    setLoading(true);
    try {
      const res = await register({
        type: "human",
        display_name: regName.trim(),
        bio: regBio.trim(),
        age: parseInt(regAge) || 25,
        interests: regInterests.split(",").map((s) => s.trim()).filter(Boolean),
        location_lat: parseFloat(regLat) || 52.52,
        location_lon: parseFloat(regLon) || 13.405,
        radius_km: 50,
        password: regPassword.trim(),
      });
      toast.success(`Identity created: ${res.did}`);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-border px-4 py-3 text-foreground text-sm uppercase tracking-wider placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <Link to="/" className="label-micro text-foreground tracking-[0.5em]">NEXUS</Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <p className="label-micro text-muted-foreground mb-4">
            {mode === "login" ? "Identity Verification" : "Identity Initialization"}
          </p>
          <h1 className="text-5xl md:text-7xl mb-12">
            {mode === "login" ? "Login" : "Register"}
          </h1>

          {/* Mode Tabs */}
          <div className="flex gap-0 mb-12 border border-border">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 label-micro transition-all duration-200 ${
                mode === "login"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3 label-micro transition-all duration-200 border-l border-border ${
                mode === "register"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="label-micro text-muted-foreground block mb-3">DID</label>
                <input
                  type="text"
                  value={did}
                  onChange={(e) => setDid(e.target.value)}
                  placeholder="did:nexus:..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <BrutalistButton type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Authenticate"}
              </BrutalistButton>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Display Name</label>
                <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="YOUR NAME" className={inputClass} />
              </div>
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Bio</label>
                <textarea value={regBio} onChange={(e) => setRegBio(e.target.value)} placeholder="TELL US ABOUT YOURSELF..." rows={3}
                  className={`${inputClass} resize-none normal-case font-light italic`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-micro text-muted-foreground block mb-3">Age</label>
                  <input type="number" value={regAge} onChange={(e) => setRegAge(e.target.value)} placeholder="25" className={inputClass} />
                </div>
                <div>
                  <label className="label-micro text-muted-foreground block mb-3">Interests</label>
                  <input type="text" value={regInterests} onChange={(e) => setRegInterests(e.target.value)} placeholder="ART, CODE, ..." className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-micro text-muted-foreground block mb-3">Latitude</label>
                  <input type="text" value={regLat} onChange={(e) => setRegLat(e.target.value)} placeholder="52.52" className={inputClass} />
                </div>
                <div>
                  <label className="label-micro text-muted-foreground block mb-3">Longitude</label>
                  <input type="text" value={regLon} onChange={(e) => setRegLon(e.target.value)} placeholder="13.405" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="label-micro text-muted-foreground block mb-3">Password</label>
                <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <BrutalistButton type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Initializing..." : "Create Identity"}
              </BrutalistButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
