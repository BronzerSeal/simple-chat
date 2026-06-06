import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
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
    <div>
      <div>
        <div>{params?.room}</div>
        <div>{users} users in this room</div>
        <button onClick={leftRoom}>leftRoom</button>
      </div>

      <Messages messages={state} name={params.name} />

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
        <div>
          <label htmlFor="room">Room:</label>
          <input
            type="text"
            id="message"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="What do you want to say"
            name="message"
            value={message}
            onChange={handleChange}
            required
          />
        </div>

        <div onClick={() => onEmojiClick}>
          <img src={icon} alt="Logo" onClick={() => setIsOpen(!isOpen)} />

          {isOpen && (
            <div>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div>
          <input type="submit" value="Send a message" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Chat;
