

export default function NotificationsTicker({ notifications }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="w-full bg-kits-gold text-kits-black py-2 overflow-hidden border-b border-kits-gold/20 flex items-center z-50 relative">
      <div className="bg-kits-black text-kits-gold px-4 py-1 text-xs font-bold uppercase tracking-widest absolute left-0 z-10 h-full flex items-center">
        Updates
      </div>
      
      <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] ml-24">
        {/* Render twice for infinite loop effect */}
        {[...notifications, ...notifications].map((note, idx) => (
          <span key={idx} className="mx-8 font-satoshi text-sm font-medium">
            <span className="mr-2 opacity-50">•</span>
            {note.link ? (
              <a href={note.link} className="hover:underline">{note.title}</a>
            ) : (
              note.title
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
