import { useState, useEffect, useRef } from "react";
import { NavigationBar } from "../user/NavigationBar";
import "./Chat.css";

interface ChatMessage {
  message: string;
  username: string;
  timestamp: string;
}

export const Chat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("chat_username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const input = prompt("Enter your username:");
      if (input) {
        setUsername(input);
        localStorage.setItem("chat_username", input);
      }
    }

    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/`);
    setSocket(newSocket);

    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");

    return () => {
      newSocket.close();
    };
  }, [username]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);

        // Scroll to the bottom of the chat container
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      };
    }
  }, [socket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
        username: username,
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="chat-container">
        <div className="chat-header">Chat</div>
        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.username === username ? "own-message" : ""
              }`}
            >
              <div className="message-username">{message.username}:</div>
              <div className="message-content">{message.message}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
          <div ref={chatContainerRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};
