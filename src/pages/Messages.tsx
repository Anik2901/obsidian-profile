import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import ConversationItem from "@/components/ConversationItem";
import { conversationThreads } from "@/data/profiles";

const Messages = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrutalistNav />

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16">
          <p className="label-micro text-muted-foreground mb-4">Communication Log</p>
          <h1 className="text-5xl md:text-7xl">Messages</h1>
        </div>

        <div className="max-w-3xl">
          {conversationThreads.map((conv) => (
            <ConversationItem
              key={conv.id}
              id={conv.id}
              avatar={conv.avatar}
              name={conv.name}
              message={conv.lastMessage}
              time={conv.time}
            />
          ))}
        </div>
      </section>

      <BrutalistFooter />
    </div>
  );
};

export default Messages;
