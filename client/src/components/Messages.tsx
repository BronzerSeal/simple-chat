import React from "react";

const Messages = ({ messages, name }: { messages: any[]; name: string }) => {
  return (
    <div className="border border-gray-300 rounded-md p-2">
      {messages.map(({ user, message }, index) => {
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();

        return (
          <div
            key={index}
            className={itsMe ? "text-blue-500" : "text-gray-500"}
          >
            {user.name}: {message}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
