import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  Image,
  Text,
  Avatar,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userName = user.name;
  return (
    <>
      {children ? (
        <span onClick={onOpen}> {children} </span>
      ) : (
        <IconButton d="flex" icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="34px"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="center"
          >
            {userName.charAt(0).toUpperCase() + userName.slice(1)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar
              borderRadius="full"
              size="2xl"
              //   src= {user.pic}
              name={user.name}
            />

            <Text
              fontSize={{ base: "18px", md: "24px" }}
              fontFamily="Work Sans"
              fontWeight="bold"
              ml={10}
            >
              {" "}
              Name : {user.name}
              <br />
              Email : {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="facebook" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
