import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UniversalContext } from "../../App";

const ContactCard = (props) => {
  let { name, phone, photo, bgColor, id } = props;
  // for sendind data to update page
  let contactDetails = { name, phone, photo, bgColor, id };
  let letter;
  // for handling contact image
  if (!photo) {
    letter = name[0].toUpperCase();
  } else {
    bgColor = "";
  }

  // for showing and hiding the button box
  const [showBtn, setShowBtn] = useState(false);

  // for toggling the loader
  const [loading, setLoading] = useState();

  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // function for bluring the model background
  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  // state for handling the blury effect
  const [overlay, setOverlay] = React.useState(<Overlay />);

  // for handling misclick on modal
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  // using toast
  const toast = useToast();

  const { setIsModified, isModified } = useContext(UniversalContext);

  // function for deleting the contact
  const deleteContact = async () => {
    // if button already clicked
    if (isBtnClicked) {
      toast({
        title: "Prohibited",
        description: "Wait for operation to complete",
        position: "top",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setIsBtnClicked(true);

    // displaying the loader
    setLoading(true);
    try {
      const res = await axios.post("/deletecontact", { deleteId: id });

      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
      });

      // hiding the loader
      setLoading(false);
      setIsBtnClicked(false);
      setIsModified(!isModified);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete contact",
        description: error.response.data.message,
        position: "top",
        status: "error",
        duration: 3000,
      });
      setLoading(false);
      setIsBtnClicked(false);
    }
  };

  return (
    <VStack w="full" border="1.5px solid #3f3f3f" borderRadius={4}>
      <HStack
        w="full"
        cursor="pointer"
        gap={2}
        p={2}
        onClick={() => setShowBtn(!showBtn)}
      >
        {/* displaying the user profile image */}
        <Box
          bg="white"
          border="1.5px solid #D1D5DB"
          borderRadius="50%"
          w={14}
          h={14}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgColor={bgColor}
        >
          {photo ? (
            <Image borderRadius="50%" src={photo} />
          ) : (
            <Text fontSize="25px" fontWeight="500" color="white">
              {letter}
            </Text>
          )}
        </Box>

        <VStack spacing={0} justifyContent="center" alignItems="flex-start">
          <Heading fontSize="20px" fontWeight="500">
            {name}
          </Heading>
          <Text fontSize="14px" fontWeight="600">
            {phone}
          </Text>
        </VStack>
      </HStack>

      {/* button for update and delete contact */}
      {showBtn && (
        <HStack w="full" px={1} pb={1}>
          <Box w="50%">
            <Link to="/updatecontact" state={{ contactDetails }}>
              <Button w="100%">Update</Button>
            </Link>
          </Box>
          <Button w="50%" onClick={onOpen}>
            Delete
          </Button>
        </HStack>
      )}

      {/* modal for asking user to delete account */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
      >
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete contact?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter w="full" px={2}>
            <Button onClick={deleteContact} colorScheme="red" mr={3} w="full">
              Delete Account
            </Button>
            <Button w="full" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>

          {loading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="green.100"
              color="green.500"
              size="xl"
              pos="absolute"
              left="45%"
              top="35%"
            />
          )}
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ContactCard;
