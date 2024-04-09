import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//here,we are creating the context.
const ChatContext = createContext();

//here,we are providing the context.
const ChatProvider = ({ children }) => {
  // this is our context-API

  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //storing the loggedIn user inside the users array.
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      //i.e. if user is not logged in , move him to ['/'i.e.login page]
      navigate("/");
    }
  }, [navigate]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        setSelectedChat,
        selectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  // all other states are inside this variable->'ChatState'
  //using hook to provide use of ChatProvider to all other components
  return useContext(ChatContext);
};

export default ChatProvider;
