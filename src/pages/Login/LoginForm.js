import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Layout from "../../Layout/Layout";

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

  // getting the auth context
  const Auth = useContext(AuthContext);

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
      const res = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });

      // setting the auth to true
      Auth.setIsLoggedin(true);
      localStorage.setItem("isLoggedin", true);

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
    if (Auth.isLoggedin) navigator("/");
  }, [Auth.isLoggedin]);

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
          color="gray.700"
          gap={4}
        >
          <Heading fontSize="25px">Login Form</Heading>

          <VStack w="full" gap={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                p={2}
                fontWeight="medium"
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
              <Input
                p={2}
                fontWeight="medium"
                type="text"
                variant="unstyled"
                border="1px solid black"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={data.password}
                onChange={handleInput}
              ></Input>
            </FormControl>

            <Button type="submit" onClick={login}>
              Login
            </Button>

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
