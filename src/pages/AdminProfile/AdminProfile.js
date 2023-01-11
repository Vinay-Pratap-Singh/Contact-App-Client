import {
  Box,
  Button,
  FormControl,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UniversalContext } from "../../App";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import axios from "axios";

const AdminProfile = () => {
  // use context for auth context
  const { isLoggedin, setIsLoggedin, orgData } = useContext(UniversalContext);

  // for handling the change password modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // using toast
  const toast = useToast();

  // usenavigate to redirect user
  const navigator = useNavigate();

  // for handling the profile image
  let profileImage = undefined;
  if (orgData.photo) profileImage = orgData.photo;

  // for handling the change password
  const [newPassword, setNewPassword] = useState("");

  // function for changing the account password
  const changePassword = async () => {
    // user cannot change the test account password
    if (orgData.email === "test@gmail.com") {
      toast({
        title: "Prohibited",
        description: "Cannot change password of test account",
        position: "top",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    // validating the password
    if (!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      toast({
        title: "Invalid Password",
        description:
          "Password must contain number, lowercase, uppercase and at least 6 characters",
        position: "top",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    // changing the password if not a test account
    try {
      const res = await axios.patch("/changepassword", {
        password: newPassword,
      });

      toast({
        title: "Password Updated Successfully",
        description: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
      });

      // changing the login state of user
      setIsLoggedin(false);
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("orgData");
    } catch (error) {
      toast({
        title: "Failed to update password",
        description: error.response.data.message,
        position: "top",
        status: "error",
        duration: 3000,
      });
    }
  };

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

  // for redirecting to login, if not logged in
  useEffect(() => {
    if (!isLoggedin) navigator("/login");
  }, [isLoggedin]);

  return (
    <Layout>
      <VStack
        h="full"
        spacing={5}
        alignItems="center"
        justifyContent="center"
        pos="relative"
      >
        {/* displaying the symbol to go back to dashboard */}
        <Link to="/">
          <Tooltip hasArrow label="Dashboard">
            <Button pos="absolute" left={2} top={4}>
              <FaArrowLeft fontSize={20} />
            </Button>
          </Tooltip>
        </Link>

        {/* adding the color mode switcher for dark and light mode */}
        <ColorModeSwitcher pos="absolute" right={2} top="-5px" />

        {/* displaying the user profile image */}
        <Box
          bg="white"
          border="1.5px solid #D1D5DB"
          borderRadius="50%"
          w={40}
          h={40}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {profileImage ? (
            <Image borderRadius="50%" src={profileImage} />
          ) : (
            <FaUser fontSize={96} color="#D1D5DB" />
          )}
        </Box>

        {/* displaying the user name */}
        <Heading fontSize={20}>{orgData.name.toUpperCase()}</Heading>

        {/* displaying the user's other profile details */}
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>Phone</GridItem>
          <GridItem>{orgData.phone}</GridItem>
          <GridItem>Email</GridItem>
          <GridItem>{orgData.email}</GridItem>
          <GridItem>Total Contacts</GridItem>
          <GridItem>{orgData.contact.length}</GridItem>
        </Grid>

        {/* displaying the buttons for editing the profile and  */}
        <VStack>
          <HStack>
            <Button>Change Picture</Button>
            <Button
              onClick={() => {
                setOverlay(<Overlay />);
                onOpen();
              }}
            >
              Change Password
            </Button>
          </HStack>
          <Button w="full">Delete Account</Button>
        </VStack>
      </VStack>

      {/* for handling the password change */}
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
          <ModalHeader>Change your password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4} pt={0}>
            <FormControl>
              <Input
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter your new password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter w="full" px={2}>
            <Button onClick={changePassword} colorScheme="blue" mr={3} w="full">
              Update
            </Button>
            <Button w="full" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default AdminProfile;
