import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Spinner, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UniversalContext } from "../../App";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import Layout from "../../Layout/Layout";
import AxiosInstance from "../../helper/AxiosInstance";

const LoginForm = () => {
  // using the toast to display the feedback responses
  const toast = useToast();

  // using the navigator to redirect user
  const navigator = useNavigate();

  // for storing the input fields data
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // for handling the loading spinner
  const [loading, setLoading] = useState(false);

  // for showing and hiding the password
  const [show, setShow] = useState(false);

  // getting the auth context
  const { isLoggedin, setIsLoggedin } = useContext(UniversalContext);

  // function to handle the input
  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // function to log in the user
  const login = async () => {
    // displaying the loader
    setLoading(true);

    // checking the empty fields
    if (!data.email || !data.password) {
      toast({
        title: "Failed to create account",
        description: "Please fill all the required fileds",
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

    // axios post request for log in
    try {
      const res = await AxiosInstance.post(
        `/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      // setting the auth to true
      setIsLoggedin(true);
      localStorage.setItem("isLoggedin", true);
      localStorage.setItem("token", res.data.token);

      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
      });

      // hiding the loader
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to login account",
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
    if (isLoggedin) navigator("/");
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
          alignItems="center"
          justifyContent="center"
          h="full"
          p="10px"
          gap={4}
        >
          {/* adding the color mode switcher for dark and light mode */}
          <ColorModeSwitcher pos="absolute" right={2} top="8px" />

          <Heading fontSize="25px">Login Form</Heading>

          <VStack w="full" gap={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                p={2}
                fontWeight="400"
                type="email"
                placeholder="Enter your email"
                variant="unstyled"
                border="1px solid black"
                id="email"
                name="email"
                value={data.email}
                onChange={handleInput}
              ></Input>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  p={2}
                  fontWeight="400"
                  type={show ? "text" : "password"}
                  variant="unstyled"
                  border="1px solid black"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
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

            <HStack w="full">
              <Button
                onClick={() =>
                  setData({ email: "test@gmail.com", password: "Test@123" })
                }
                w="full"
              >
                Use Test Credential
              </Button>
              <Button w="full" type="submit" onClick={login}>
                Login
              </Button>
            </HStack>

            <Text fontWeight="500">
              Create a new account{" "}
              <Link to="/signup" style={{ color: "blue" }}>
                Signup
              </Link>
            </Text>
          </VStack>
        </VStack>
      )}
    </Layout>
  );
};

export default LoginForm;
