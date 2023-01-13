import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
  Spinner,
  Text,
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
import { BiUpload } from "react-icons/bi";

const AdminProfile = () => {
  // use context for auth context
  const { isLoggedin, setIsLoggedin, orgData, isModified, setIsModified } =
    useContext(UniversalContext);

  // for handling the change password, change photo and delete account modal
  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onClose: onPasswordClose,
  } = useDisclosure();

  const {
    isOpen: isPhotoOpen,
    onOpen: onPhotoOpen,
    onClose: onPhotoClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // for handling misclick on modal
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  // using toast
  const toast = useToast();

  // usenavigate to redirect user
  const navigator = useNavigate();

  // for handling the profile image
  let profileImage = undefined;
  if (orgData.photo) profileImage = orgData.photo;

  // for handling the change password
  const [newPassword, setNewPassword] = useState("");

  // for handling the loading spinner
  const [loading, setLoading] = useState({
    password: false,
    profilePhoto: false,
    deleteAccount: false,
  });

  // for storing the uploaded image
  const [uploadedPhoto, setUploadedPhoto] = useState("");
  const [imageURL, setImageURL] = useState("");

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const image = event.target.files[0];

    // if image exists then getting the url link of it
    if (image) {
      setUploadedPhoto(image);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.addEventListener("load", function () {
        setImageURL(this.result);
      });
    }
  };

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
    setLoading({
      password: true,
      profilePhoto: false,
      deleteAccount: false,
    });

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
      // hiding the loader
      setLoading({
        password: true,
        profilePhoto: false,
        deleteAccount: false,
      });
      setIsBtnClicked(false);
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

      // hiding the loader
      setLoading({
        password: true,
        profilePhoto: false,
        deleteAccount: false,
      });
      setIsBtnClicked(false);
    } catch (error) {
      toast({
        title: "Failed to update password",
        description: error.response.data.message,
        position: "top",
        status: "error",
        duration: 3000,
      });
      setIsBtnClicked(false);
    }
  };

  const updateProfileImage = async () => {
    // profile image can not be changed for demo account
    if (orgData.email === "test@gmail.com") {
      toast({
        title: "Prohibited",
        description: "Cannot change profile image of demo account",
        position: "top",
        status: "warning",
        duration: 3000,
      });
      return;
    }

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
    setLoading({
      password: false,
      profilePhoto: true,
      deleteAccount: false,
    });

    try {
      // creating the form data from existing data to send
      const formData = new FormData();

      // if photo exist
      if (uploadedPhoto) {
        formData.append("photo", uploadedPhoto);
        // creating the new user account
        const res = await axios({
          method: "patch",
          url: "/changeuserimage",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast({
          title: "Profile picture updated successfully",
          position: "top",
          status: "success",
          duration: 3000,
        });

        // for fetching the original data again
        setIsModified(!isModified);

        // deleting image preview and uploaded image
        setUploadedPhoto("");
        setImageURL("");
      } else {
        toast({
          title: "Select a picture first",
          position: "top",
          status: "warning",
          duration: 3000,
        });
      }

      setLoading({
        password: false,
        profilePhoto: false,
        deleteAccount: false,
      });

      setIsBtnClicked(false);
    } catch (error) {
      toast({
        title: "Failed to update profile picture",
        position: "top",
        status: "error",
        duration: 3000,
      });

      setLoading({
        password: false,
        profilePhoto: false,
        deleteAccount: false,
      });

      setIsBtnClicked(false);
    }
  };

  const deleteAccount = async() => {
    // user cannot change the test account password
    if (orgData.email === "test@gmail.com") {
      toast({
        title: "Prohibited",
        description: "Cannot delete demo account",
        position: "top",
        status: "warning",
        duration: 3000,
      });
      return;
    }

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
    setLoading({
      password: false,
      profilePhoto: false,
      deleteAccount: true,
    });

    try {
      const res = await axios.delete("/deleteuser");

      toast({
        title: "Account Deleted Successfully",
        position: "top",
        status: "success",
        duration: 3000,
      });

      // changing the login state of user
      setIsLoggedin(false);
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("orgData");

      // hiding the loader
      setLoading({
        password: false,
        profilePhoto: false,
        deleteAccount: false,
      });
      setIsBtnClicked(false);
    } catch (error) {
      toast({
        title: "Failed to delete account",
        description: error.response.data.message,
        position: "top",
        status: "error",
        duration: 3000,
      });
      setIsBtnClicked(false);
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
            <Image w={40} h={40} borderRadius="50%" src={profileImage} />
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

        {/* displaying the buttons for editing the profile details */}
        <VStack>
          <HStack>
            <Button
              onClick={() => {
                setOverlay(<Overlay />);
                onPhotoOpen();
              }}
            >
              Change Picture
            </Button>
            <Button
              onClick={() => {
                setOverlay(<Overlay />);
                onPasswordOpen();
              }}
            >
              Change Password
            </Button>
          </HStack>
          <Button
            onClick={() => {
              setOverlay(<Overlay />);
              onDeleteOpen();
            }}
            w="full"
          >
            Delete Account
          </Button>
        </VStack>
      </VStack>

      {/* modal for changing the password */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isPasswordOpen}
        onClose={onPasswordClose}
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
            <Button w="full" onClick={onPasswordClose}>
              Cancel
            </Button>
          </ModalFooter>

          {loading.password && (
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

      {/* modal for changing the profile image */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isPhotoOpen}
        onClose={onPhotoClose}
        size="sm"
      >
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your profile photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} w="150px" m="auto">
            <FormControl
              w="150px"
              h="150px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="4px solid #D1D5DB"
              borderRadius="50%"
              spacing={0}
              cursor="pointer"
              _hover={{
                backgroundColor: "#D1D5DB",
                color: "rgba(228, 149, 1, 0.97)",
              }}
              transition="all 0.2s ease-in-out"
            >
              <FormLabel
                htmlFor="chooseImage"
                cursor="pointer"
                ml="12px"
                mt="8px"
                borderRadius="50%"
              >
                <VStack
                  spacing="0"
                  w="150px"
                  h="150px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {imageURL ? (
                    <Image
                      src={imageURL}
                      h="100%"
                      w="100%"
                      objectFit="inherit"
                      objectPosition="center"
                      borderRadius="full"
                      alt="uploaded image"
                    />
                  ) : (
                    <VStack spacing={0}>
                      <BiUpload fontSize="24px" />
                      <Text fontSize="13px" fontWeight="700">
                        Upload
                      </Text>
                    </VStack>
                  )}
                </VStack>
              </FormLabel>
              <Input
                type="file"
                variant="unstyled"
                accept=".jpg, .jpeg, .png"
                capture="user"
                id="chooseImage"
                onChange={getImage}
                display="none"
              ></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter w="full" px={2}>
            <Button
              onClick={updateProfileImage}
              colorScheme="blue"
              mr={3}
              w="full"
            >
              Update
            </Button>
            <Button w="full" onClick={onPhotoClose}>
              Cancel
            </Button>
          </ModalFooter>

          {loading.profilePhoto && (
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

      {/* modal for asking user to delete account */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        size="sm"
      >
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete account?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter w="full" px={2}>
            <Button onClick={deleteAccount} colorScheme="red" mr={3} w="full">
              Delete Account
            </Button>
            <Button w="full" onClick={onDeleteClose}>
              Cancel
            </Button>
          </ModalFooter>

          {loading.deleteAccount && (
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
    </Layout>
  );
};

export default AdminProfile;
