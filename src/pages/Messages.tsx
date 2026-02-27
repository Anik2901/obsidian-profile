import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import ConversationItem from "@/components/ConversationItem";
import match1 from "@/assets/match-1.jpg";
import match2 from "@/assets/match-2.jpg";
import match3 from "@/assets/match-3.jpg";
import match4 from "@/assets/match-4.jpg";
import match6 from "@/assets/match-6.jpg";

const conversations = [
  { avatar: match1, name: "Elara Voss", message: "I was thinking about that design system you mentioned — have you tried using a 4px base grid?", time: "3m ago" },
  { avatar: match2, name: "Marcus Chen", message: "The new protocol is live. Check the dashboard when you get a chance.", time: "1h ago" },
  { avatar: match3, name: "Aria Novak", message: "Interesting perspective on brutalist interfaces. Let's discuss more over coffee sometime.", time: "4h ago" },
  { avatar: match4, name: "Kai Brennan", message: "Sent you the updated configuration files. Let me know if the schema looks right.", time: "1d ago" },
  { avatar: match6, name: "Leo Strand", message: "Have you seen the latest update to the rendering engine? Incredible performance gains.", time: "2d ago" },
  { avatar: match1, name: "Nina Volkov", message: "Your last article on data normalization was spot on. Would love to collaborate.", time: "3d ago" },
  { avatar: match3, name: "Sable Morin", message: "The monochrome palette you suggested works perfectly. Shipped it today.", time: "5d ago" },
];

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
          {conversations.map((conv, i) => (
            <ConversationItem
              key={`${conv.name}-${i}`}
              avatar={conv.avatar}
              name={conv.name}
              message={conv.message}
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
