import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UniversalContext } from "../../App";
import Layout from "../../Layout/Layout";

const UpdateContact = () => {
  // getting login state from context
  const { isLoggedin } = useContext(UniversalContext);

  // getting the data from the contact card
  const location = useLocation();
  const { contactDetails } = location.state;

  // for redirecting the page
  const navigator = useNavigate();

  // using the toast to display the feedback responses
  const toast = useToast();

  // for handling the loading spinner
  const [loading, setLoading] = useState(false);

  // for displaying the preview of selected image to upload
  const [imageURL, setImageURL] = useState("");

  // stores the original uploaded image
  const [photo, setPhoto] = useState("");

  // for storing the input fields data
  const [data, setData] = useState({
    name: contactDetails.name,
    phone: contactDetails.phone,
    photo: contactDetails.photo,
  });

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setPhoto(uploadedImage);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImageURL(this.result);
      });
    }
  };

  // function for handling the user input
  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // function for updating the contact
  const updateContact = async () => {
    // displaying the loader
    setLoading(true);

    // checking the empty fields
    if (!data.name || !data.phone) {
      toast({
        title: "Failed to update contact",
        description: "Please fill all the required fileds",
        position: "top",
        status: "warning",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    // validating the phone number
    if (!String(data.phone).match(/^\d{10}$/)) {
      toast({
        title: "Invalid Phone Number",
        description: "Enter a valid phone number of 10 digits",
        position: "top",
        status: "warning",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    // axios post request for creating new contact
    try {
      // creating the form data from existing data to send
      const formData = new FormData();
      formData.append("updateId", contactDetails.id);
      formData.append("name", data.name);
      formData.append("phone", data.phone);

      // if photo exist
      if (photo) {
        formData.append("photo", photo);
      }

      // creating the new user account
      const res = await axios({
        method: "patch",
        url: "/updatecontact",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
      });

      // hiding the loader
      setLoading(false);

      // returning the user to the dashboard
      navigator("/");
    } catch (error) {
      toast({
        title: "Failed to create new contact",
        description: error.response.data.message,
        position: "top",
        status: "error",
        duration: 3000,
      });

      // hiding the loader
      setLoading(false);
    }
  };

  // for redirecting to login, if not logged in
  useEffect(() => {
    if (!isLoggedin) navigator("/login");
  }, [isLoggedin]);

  return (
    <Layout>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="green.100"
          color="green.500"
          size="xl"
          pos="absolute"
          left="45%"
          top="45%"
        />
      ) : (
        <VStack
          w="full"
          h="full"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          {/* displaying the symbol to go back to dashboard */}
          <Link to="/">
            <Tooltip hasArrow label="Dashboard">
              <Button pos="absolute" left={4} top={4}>
                <FaArrowLeft fontSize={20} />
              </Button>
            </Tooltip>
          </Link>

          {/* for uploading the image */}
          <Tooltip hasArrow label="optional">
            <FormControl
              w="150px"
              h="150px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="5px solid #D1D5DB"
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
                  w="145px"
                  h="145px"
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
          </Tooltip>

          <FormControl isRequired>
            <FormLabel htmlFor="name">Contact Name</FormLabel>
            <Input
              p={2}
              fontWeight="medium"
              type="text"
              placeholder="Enter your contact name"
              variant="unstyled"
              border="1px solid black"
              id="name"
              name="name"
              value={data.name}
              onChange={handleInput}
            ></Input>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="phone">Contact Number</FormLabel>
            <Input
              p={2}
              fontWeight="medium"
              type="number"
              placeholder="Enter your contact number"
              variant="unstyled"
              border="1px solid black"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleInput}
            ></Input>
          </FormControl>

          <Button w="full" onClick={updateContact}>
            Update Contact
          </Button>
        </VStack>
      )}
    </Layout>
  );
};

export default UpdateContact;
