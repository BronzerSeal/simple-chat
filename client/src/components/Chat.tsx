import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import EmojiPicker, { Theme } from "emoji-picker-react";
import icon from "../images/Logo_v2.png";
import Messages from "./Messages";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [state, setState] = useState<any[]>([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<Record<string, string>>({
    room: "",
    user: "",
  });
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  const onEmojiClick = ({ emoji }: { emoji: string }) =>
    setMessage(`${message} ${emoji}`);
  console.log(state);
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_right,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,#07101f_0%,#0b1426_46%,#050816_100%)] px-4 py-4 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid  max-w-6xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="sticky top-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            <div className="space-y-3">
              <button
                onClick={leftRoom}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Leave room
              </button>
            </div>
          </div>
        </aside>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Chat
              </p>
              <h1 className="text-2xl font-semibold text-slate-50">
                {params?.room}
              </h1>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {users} users in this room
            </div>
          </header>

          <div className="min-h-0 flex-1 px-3 py-4 sm:px-4">
            <Messages messages={state} name={params.name} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 bg-slate-950/95 p-3 sm:p-4"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                <div className="flex-1 space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-200"
                  >
                    Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="What do you want to say"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                    >
                      <img src={icon} alt="Logo" className="h-6 w-6" />
                    </button>

                    {isOpen && (
                      <div className="absolute bottom-[calc(100%+12px)] right-0 z-20 w-[min(22rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/40">
                        <EmojiPicker
                          onEmojiClick={onEmojiClick}
                          theme={Theme.DARK}
                          width="100%"
                          height={420}
                          lazyLoadEmojis
                        />
                      </div>
                    )}
                  </div>

                  <input
                    type="submit"
                    value="Send a message"
                    className="inline-flex h-12 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 to-sky-400 px-6 font-semibold text-slate-950 shadow-lg shadow-cyan-950/25 transition hover:brightness-110 active:scale-[0.99]"
                  />
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Chat;
