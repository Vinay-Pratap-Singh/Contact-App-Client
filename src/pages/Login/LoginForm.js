import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
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
            <FormLabel htmlFor="userEmail">Email</FormLabel>
            <Input
              p={2}
              fontWeight="medium"
              type="email"
              placeholder="Enter your email"
              variant="unstyled"
              border="1px solid black"
              id="userEmail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Input>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="userPassword">Password</FormLabel>
            <Input
              p={2}
              fontWeight="medium"
              type="text"
              variant="unstyled"
              border="1px solid black"
              id="userPassword"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Input>
          </FormControl>

          <Button
            type="submit"
          >
            Login
          </Button>

          <Text fontWeight="500">
            Create a new account{" "}
            <Link to="/signup" style={{color:"blue"}}>
              Signup
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default LoginForm;
