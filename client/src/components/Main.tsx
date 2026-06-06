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
    <div>
      <div>
        <h1>Join</h1>

        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              name="name"
              value={values[NAME]}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="room">Room:</label>
            <input
              type="text"
              id="room"
              placeholder="room"
              name="room"
              value={values[ROOM]}
              onChange={handleChange}
              required
            />
          </div>

          <Link
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
            onClick={handleClick}
          >
            <button type="submit">Sign in</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
