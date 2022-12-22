import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Link, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import CardLayout from "../../Layout/CardLayout";
import { BiUpload } from "react-icons/bi";

const LoginForm = () => {
  return (
    <CardLayout>
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
          <FormControl
            isRequired
            pos="relative"
            boxShadow="inset 2px 2px 2px gray,inset -2px -2px 2px white"
          >
            <Input
              p={2}
              fontWeight="medium"
              type="email"
              variant="unstyled"
              id="userEmail"
            ></Input>
            <FormLabel htmlFor="userEmail" pos="absolute" top={2} left={2}>
              Email
            </FormLabel>
          </FormControl>

          <FormControl
            isRequired
            pos="relative"
            boxShadow="inset 2px 2px 2px gray,inset -2px -2px 2px white"
          >
            <Input
              p={2}
              fontWeight="medium"
              type="text"
              variant="unstyled"
              id="userPassword"
            ></Input>
            <FormLabel htmlFor="userPassword" pos="absolute" top={2} left={2}>
              Password
            </FormLabel>
          </FormControl>

          <Button
            boxShadow="2px 2px 2px gray,-2px -2px 2px white"
            bgColor="transparent"
            _hover={{ backgroundColor: "#D1D5DB" }}
          >
            Login
          </Button>

          <Text fontWeight="500">
            Create a new account{" "}
            <Link href="/login" color="blue">
              Signup
            </Link>
          </Text>
        </VStack>
      </VStack>
    </CardLayout>
  );
};

export default LoginForm;
