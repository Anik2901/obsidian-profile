import { useEffect, useState } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";
import { agent } from "@/lib/api";
import type { Activity } from "@/types/api";

const activityLabels: Record<string, string> = {
  match_proposed: "Match Proposed",
  match_accepted: "Match Accepted",
  match_rejected: "Match Rejected",
  message_sent: "Message Sent",
  report_filed: "Report Filed",
  block_created: "User Blocked",
};

const AgentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async (off = 0) => {
    setLoading(true);
    try {
      const data = await agent.activity(50, off);
      setActivities(off === 0 ? data.activities : [...activities, ...data.activities]);
      setTotal(data.total);
      setOffset(off + 50);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">Agent Operations Log</p>
          <h1 className="text-5xl md:text-7xl">Activity</h1>
        </div>

        <div className="max-w-3xl">
          {activities.length === 0 && !loading ? (
            <div className="border border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">No agent activity yet.</p>
            </div>
          ) : (
            <div className="border-l border-border pl-8 space-y-0">
              {activities.map((a) => (
                <div key={a.id} className="relative pb-8">
                  {/* Timeline dot */}
                  <div className="absolute -left-[2.55rem] top-1 h-3 w-3 border border-foreground bg-background" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="label-micro text-foreground mb-1">
                        {activityLabels[a.activity_type] || a.activity_type}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {new Date(a.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {a.activity_metadata && Object.keys(a.activity_metadata).length > 0 && (
                    <div className="mt-2 font-mono text-[10px] text-muted-foreground border border-border p-3">
                      {JSON.stringify(a.activity_metadata, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activities.length < total && (
            <div className="mt-8 flex justify-center">
              <BrutalistButton onClick={() => fetchActivities(offset)} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </BrutalistButton>
            </div>
          )}
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default AgentActivity;
