import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Link, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import CardLayout from "../../Layout/CardLayout";
import { BiUpload } from "react-icons/bi";

const SignUpForm = () => {
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
        <Heading fontSize="25px">Signup Form</Heading>

        <VStack w="full" gap={4}>
          {/* for uploading the image */}
          <FormControl
            w={20}
            h={20}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="4px solid #D1D5DB"
            borderRadius="50%"
            boxShadow="2px 2px 2px gray,-2px -2px 2px white"
            cursor="pointer"
            _hover={{
              backgroundColor: "#D1D5DB",
              color: "rgba(228, 149, 1, 0.97)",
            }}
            transition="all 0.2s ease-in-out"
          >
            <FormLabel htmlFor="uploadImage" ml="10px" cursor="pointer">
              <VStack spacing="0" alignItems="center">
                <BiUpload fontSize="24px" />
                <Text fontSize="13px" fontWeight="700">
                  Upload
                </Text>
              </VStack>
            </FormLabel>
            <Input
              type="file"
              variant="unstyled"
              accept=".jpg, .jpeg, .png"
              capture="user"
              id="uploadImage"
              display="none"
            ></Input>
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
              id="userName"
            ></Input>
            <FormLabel htmlFor="userName" pos="absolute" top={2} left={2}>
              Name
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
              type="number"
              variant="unstyled"
              id="userNumber"
            ></Input>
            <FormLabel htmlFor="userNumber" pos="absolute" top={2} left={2}>
              Phone
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
            Create Account
          </Button>

          <Text fontWeight="500">
            Already have an account{" "}
            <Link href="/login" color="blue">
              Login
            </Link>
          </Text>
        </VStack>
      </VStack>
    </CardLayout>
  );
};

export default SignUpForm;
