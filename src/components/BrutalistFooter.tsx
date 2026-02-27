const BrutalistFooter = () => (
  <footer className="border-t border-zinc-800 px-8 py-6">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
      <span className="label-nano text-zinc-700">SYS v2.4.1</span>
      <span className="label-nano text-zinc-700">Last Synchronized: 2026-02-27T14:32:00Z</span>
      <div className="flex gap-8">
        <a href="#" className="label-nano text-zinc-700 transition-colors hover:text-foreground">Terms</a>
        <a href="#" className="label-nano text-zinc-700 transition-colors hover:text-foreground">Privacy</a>
        <a href="#" className="label-nano text-zinc-700 transition-colors hover:text-foreground">Status</a>
      </div>
    </div>
  </footer>
);

export default BrutalistFooter;
