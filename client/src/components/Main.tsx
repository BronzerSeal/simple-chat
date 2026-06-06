import { useState } from "react";
import { Link } from "react-router-dom";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({
    target: { value, name },
  }: {
    target: { value: string; name: string };
  }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const isDisabled = Object.values(values).some((value) => !value);

    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <main className="min-h-screen min-w-full bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,#09111f_0%,#0b1220_48%,#050816_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto flex justify-center min-h-[calc(100vh-3rem)] max-w-6xl items-center gap-8 ">
        <div className="rounded-[2rem] min-w-150 border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Join
            </p>
            <h2 className="text-2xl font-semibold text-slate-50">
              Создать комнату
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Укажи ник и комнату, чтобы сразу перейти в чат.
            </p>
          </div>

          <form className="mt-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-slate-200"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                name="name"
                value={values[NAME]}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="room"
                className="text-sm font-medium text-slate-200"
              >
                Room
              </label>
              <input
                type="text"
                id="room"
                placeholder="room"
                name="room"
                value={values[ROOM]}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <Link
              to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
              onClick={handleClick}
              className="block"
            >
              <button
                type="submit"
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 to-sky-400 px-4 font-semibold text-slate-950 shadow-lg shadow-cyan-950/25 transition hover:brightness-110 active:scale-[0.99]"
              >
                Sign in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Main;
