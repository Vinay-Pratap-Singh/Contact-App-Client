import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { BiUpload } from "react-icons/bi";
import { Image, Spinner, Tooltip, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { UniversalContext } from "../../App";

const SignUpForm = () => {
  // for handling the loading spinner
  const [loading, setLoading] = useState(false);

  // using the toast to display the feedback responses
  const toast = useToast();

  // use context for auth context
  const { isLoggedin } = useContext(UniversalContext);

  // usenavigate to redirect user
  const navigator = useNavigate();

  // for displaying the preview of selected image to upload
  const [imageURL, setImageURL] = useState("");

  // stores the original uploaded image
  const [photo, setPhoto] = useState("");

  // for showing and hiding the password
  const [show, setShow] = useState(false);

  // storing the data entered by user
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // function to handle the input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

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

  // function to create a new user
  const createUser = async () => {
    try {
      // displaying the loader
      setLoading(true);

      // checking the empty fields
      if (!data.name || !data.email || !data.phone || !data.password) {
        toast({
          title: "Failed to create account",
          description: "Please fill all the required fileds",
          position: "top",
          status: "warning",
          duration: 3000,
        });
        return;
      }

      // validating the phone number
      if (!data.phone.match(/^\d{10}$/)) {
        toast({
          title: "Invalid Phone Number",
          description: "Enter a valid phone number of 10 digits",
          position: "top",
          status: "warning",
          duration: 3000,
        });
        return;
      }

      // validating the email
      if (!data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        toast({
          title: "Invalid Email",
          description: "Enter a valid email address",
          position: "top",
          status: "warning",
          duration: 3000,
        });
        return;
      }

      // validating the password
      if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
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

      // creating the form data from existing data to send
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);

      // if photo exist
      if (photo) {
        formData.append("photo", photo);
      }

      // creating the new user account
      const res = await axios({
        method: "post",
        url: "/signup",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Login with your credentials",
        position: "top",
        status: "success",
        duration: 3000,
      });

      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
      });

      // sending the user to log in page
      navigator("/login");

      // hiding the loader
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create account",
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
    if (isLoggedin) navigator("/login");
  }, []);

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
          alignItems="center"
          justifyContent="center"
          h="full"
          spacing={0}
          gap={4}
        >
          <Heading fontSize="25px">Signup Form</Heading>

          <VStack w="full">
            {/* for uploading the image */}
            <Tooltip hasArrow label="Optional">
              <FormControl
                w="80px"
                h="80px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px solid #D1D5DB"
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
                    w="75px"
                    h="75px"
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
              <FormLabel htmlFor="name" fontSize="14px">
                Name
              </FormLabel>
              <Input
                px={2}
                py={1}
                fontWeight="400"
                type="text"
                variant="unstyled"
                id="name"
                name="name"
                placeholder="Enter your name"
                border="1px solid black"
                value={data.name}
                onChange={handleChange}
              ></Input>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="email" fontSize="14px">
                Email
              </FormLabel>
              <Input
                px={2}
                py={1}
                fontWeight="400"
                type="email"
                variant="unstyled"
                id="email"
                name="email"
                placeholder="Enter your email"
                border="1px solid black"
                value={data.email}
                onChange={handleChange}
              ></Input>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="phone" fontSize="14px">
                Phone
              </FormLabel>
              <Input
                px={2}
                py={1}
                fontWeight="400"
                type="number"
                variant="unstyled"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                border="1px solid black"
                value={data.phone}
                onChange={handleChange}
              ></Input>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password" fontSize="14px">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  px={2}
                  py={1}
                  fontWeight="400"
                  type={show ? "text" : "password"}
                  variant="unstyled"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  border="1px solid black"
                  value={data.password}
                  onChange={handleChange}
                ></Input>
                <InputRightElement>
                  <Box
                    onClick={() => setShow(!show)}
                    cursor="pointer"
                    fontSize="20px"
                  >
                    {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Box>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              border="1.5px solid black"
              bgColor="transparent"
              _hover={{ backgroundColor: "#D1D5DB" }}
              onClick={createUser}
            >
              Create Account
            </Button>

            <Text fontWeight="500">
              Already have an account{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Login
              </Link>
            </Text>
          </VStack>
        </VStack>
      )}
    </Layout>
  );
};

export default SignUpForm;
