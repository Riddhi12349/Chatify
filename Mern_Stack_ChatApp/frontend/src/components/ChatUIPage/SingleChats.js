import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { getSender, getSenderFull } from "./config/ChatLogics";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import img from "./myChatbg.jpg";
import {
  Button,
  Spinner,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChats";
import io from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "./animations/typing.json";

const ENDPOINT = "http://localhost:8000"; // "https://chatify.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const toast = useToast();

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT , {
      transports: ['websocket']
    });

    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    //listener function--socket.on()
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //give notification (when user selected-chatId does not matches with newMessageReceived chatId)
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);

    //simply here we are finding the time difference when user has started typing and when user has stopped typing, mtlb ki mssg type ho chuka hai,now it has to be sent to receiver of mssg.
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            display="flex"
            h="100%"
            w="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={3}
            bgImage={img}
            bgSize="226px"
            bgPosition="center"
            bgRepeat="repeat"
            borderRadius="lg"
            boxShadow="inset 0 0 0 1000px rgba(255, 255, 255, 0.6)"
            overflowY="hidden"
          >
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pt={2}
              pb={2}
              px={2}
              w="100%"
              fontFamily="Work sans"
              display="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
              bg="#D3E0EA"
            >
              <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              {messages &&
                (!selectedChat.isGroupChat ? (
                  <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModal
                      user={getSenderFull(user, selectedChat.users)}
                    />
                  </>
                ) : (
                  <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </>
                ))}
            </Text>

            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              )}
              {istyping ? (
                <div style={{ width: "20%", marginBottom: "0px" }}>
                  <Lottie loop={true} animationData={animationData} />
                  {/* Loading... */}
                </div>
              ) : (
                <></>
              )}
              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={1}
                bg="#E8E8E8"
              >
                <Input
                  variant="filled"
                  // bg="#E0E0E0"
                  bg="#D3E0EA"
                  color="black"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
              </FormControl>
            </Box>
          </Box>{" "}
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          bg="#E8E8E8"
          borderRadius="lg"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans" ml="30px">
            Click on a user for chatting...
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
