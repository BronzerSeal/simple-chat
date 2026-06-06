import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import icon from "../images/Logo_v2.png";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [state, setState] = useState<any[]>([]);
  const { search } = useLocation();
  const [params, setParams] = useState<Record<string, string>>({
    room: "",
    user: "",
  });
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const leftRoom = () => {};
  const handleChange = () => {};
  const handleSubmit = () => {};
  const onEmojiClick = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div>
        <div>{params?.room}</div>
        <div>0 users in this room</div>
        <button onClick={leftRoom}>leftRoom</button>
      </div>

      <div>
        {state.map(({ message }, index) => (
          <span key={index}>{message}</span>
        ))}
      </div>

      <form>
        <div>
          <label htmlFor="room">Room:</label>
          <input
            type="text"
            id="message"
            placeholder="What do you want to say"
            name="message"
            value={message}
            onChange={handleChange}
            required
          />
        </div>

        <div onClick={onEmojiClick}>
          <img src={icon} alt="Logo" />

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
