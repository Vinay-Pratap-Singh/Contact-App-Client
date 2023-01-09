import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { BiUpload } from "react-icons/bi";
import { Image, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// importing the css
import "./SignUpForm.css";
import { AuthContext } from "../../App";

const SignUpForm = () => {
  // using the toast to display the feedback responses
  const toast = useToast();

  // for displaying the preview of selected image to upload
  const [imageURL, setImageURL] = useState("");

  const [photo, setPhoto] = useState("");

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

      const res=await axios({
        method: "post",
        url: "/signup",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast({
        // error.response.data.message
        title: "Failed to create account",
        description: error.response.data.message,
        position: "top",
        status: "error",
        duration: 3000,
      });
    }
  };

  // use context for auth context
  const Auth = useContext(AuthContext);

  // usenavigate to redirect user
  const navigator = useNavigate();

  // for redirecting to login, if not logged in
  useEffect(() => {
    if (Auth.isLoggedin) navigator("/login");
  }, []);
  return (
    <Layout>
      <VStack
        alignItems="center"
        justifyContent="center"
        h="full"
        spacing={0}
        color="gray.700"
        gap={4}
      >
        <Heading fontSize="25px">Signup Form</Heading>

        <VStack w="full" gap={2}>
          {/* for uploading the image */}
          <FormControl
            w="80px"
            h="80px"
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

          <FormControl isRequired pos="relative" border="1.5px solid black">
            <Input
              p={2}
              fontWeight="medium"
              type="text"
              variant="unstyled"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
            ></Input>
            <FormLabel htmlFor="name" pos="absolute" top={2} left={2}>
              Name
            </FormLabel>
          </FormControl>

          <FormControl isRequired pos="relative" border="1.5px solid black">
            <Input
              p={2}
              fontWeight="medium"
              type="email"
              variant="unstyled"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            ></Input>
            <FormLabel htmlFor="email" pos="absolute" top={2} left={2}>
              Email
            </FormLabel>
          </FormControl>

          <FormControl isRequired pos="relative" border="1.5px solid black">
            <Input
              p={2}
              fontWeight="medium"
              type="number"
              variant="unstyled"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
            ></Input>
            <FormLabel htmlFor="phone" pos="absolute" top={2} left={2}>
              Phone
            </FormLabel>
          </FormControl>

          <FormControl isRequired pos="relative" border="1.5px solid black">
            <Input
              p={2}
              fontWeight="medium"
              type="text"
              variant="unstyled"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            ></Input>
            <FormLabel htmlFor="password" pos="absolute" top={2} left={2}>
              Password
            </FormLabel>
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
    </Layout>
  );
};

export default SignUpForm;
