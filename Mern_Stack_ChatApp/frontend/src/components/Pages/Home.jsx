// import React, { useEffect } from "react";
// import LoginSignup from "../Authentication/LoginSignup.jsx";
// import { useNavigate } from "react-router-dom";
// import img from "../../assets/homePageBg.png";
// import { Box } from "@chakra-ui/layout";
// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     //if user is defined : move him to ''''/chats'''' page.
//     const user = JSON.parse(localStorage.getItem("userInfo"));
//     if (user) {
//       navigate("/chats");
//     }
//   }, [navigate]);

//   return (
//     <Box
//       bgImage={img}
//       bgCover="cover"
//       bgPosition="center"
//       bgRepeat="no-repeat"
//     >
//       <LoginSignup />
//     </Box>
//   );
// };

// export default Home;

import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
// import img from "../../assets/homePageBg.png";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="350%"
          fontFamily="Work sans"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontWeight="bold"
        >
          Chatify
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
