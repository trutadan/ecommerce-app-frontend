import "./Home.css";
import { NavigationBar } from "../user/NavigationBar";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton } from "@mui/material";

export const Home = () => {
  const handleChatRedirect = () => {
    window.location.href = "/chat";
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <h1>Welcome to GymDiction!</h1>
        <p>
          Whether you're looking to bulk up, slim down, or just maintain a
          healthy lifestyle, we have everything you need to reach your fitness
          goals.
        </p>
        <div className="annotation">
          <p>If you want to communicate with other users, use the chat.</p>
          <IconButton
            aria-label="Chat"
            onClick={handleChatRedirect}
            className="chat-icon"
          >
            <ChatIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
