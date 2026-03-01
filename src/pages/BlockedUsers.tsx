import { useEffect, useState } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import { participants } from "@/lib/api";
import { toast } from "sonner";

const BlockedUsers = () => {
  const [blocked, setBlocked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    participants.getBlocked()
      .then((data) => setBlocked(data.blocked))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleUnblock = async (id: string) => {
    try {
      await participants.unblock(id);
      setBlocked((prev) => prev.filter((b) => b !== id));
      toast.success("User unblocked");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">Access Control</p>
          <h1 className="text-5xl md:text-7xl">Blocked</h1>
        </div>

        <div className="max-w-3xl">
          {loading ? (
            <p className="label-micro text-muted-foreground animate-pulse">Loading...</p>
          ) : blocked.length === 0 ? (
            <div className="border border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">No blocked users.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {blocked.map((userId) => (
                <div key={userId} className="flex items-center justify-between py-4 brutalist-separator">
                  <div>
                    <p className="font-mono text-xs text-foreground">{userId}</p>
                  </div>
                  <BrutalistButton size="sm" onClick={() => handleUnblock(userId)}>
                    Unblock
                  </BrutalistButton>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default BlockedUsers;
