import { Box } from "@chakra-ui/layout";
import SingleChats from "./SingleChats";
import { ChatState } from "../Context/ChatProvider";
import img from "./myChatbg.jpg";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      w={{ base: "100%", md: "68%" }}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      p={3}
    >
      <SingleChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
