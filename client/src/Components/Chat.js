import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({username, room, socket}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (newMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: newMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessages((list) => [...list, messageData]);
      setNewMessage("");
    }
  };

    useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
      console.log(data)
    })
  }, [socket]);

  return (
    <div className="chat-window">
        <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages.map((messageContent) => {
            return (
              <div
                key={messageContent.time}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={newMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setNewMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat