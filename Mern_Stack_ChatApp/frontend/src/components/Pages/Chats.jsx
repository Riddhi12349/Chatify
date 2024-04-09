import { useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../ChatUIPage/SideDrawer";
import MyChats from "../ChatUIPage/MyChats";
import ChatBox from "../ChatUIPage/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: " 6%" }}>
        {user && <SideDrawer />}
      </div>
      <Box
        bg="tomato"
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="94vh"
        p="10px"
      >
        {/* left part of chats page */}
        {user && <MyChats fetchAgain={fetchAgain} />}

        {/* right part of chats page */}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
