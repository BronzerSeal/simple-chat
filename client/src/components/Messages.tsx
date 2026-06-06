const Messages = ({ messages, name }: { messages: any[]; name: string }) => {
  return (
    <div className="flex h-full min-h-[420px] flex-col gap-3 overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] p-3 sm:p-4">
      {messages.map(({ user, message }, index) => {
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();

        return (
          <div
            key={index}
            className={`flex ${itsMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[min(85%,34rem)] rounded-[1.5rem] border px-4 py-3 shadow-lg shadow-black/10 ${
                itsMe
                  ? "border-cyan-400/20 bg-cyan-400/15 text-cyan-50"
                  : "border-white/10 bg-white/5 text-slate-100"
              }`}
            >
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                <span className="font-semibold text-slate-200">{user.name}</span>
                <span className="h-px w-8 bg-white/10" />
                <span>{itsMe ? "you" : "guest"}</span>
              </div>
              <p className="whitespace-pre-wrap break-words text-sm leading-6">
                {message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
