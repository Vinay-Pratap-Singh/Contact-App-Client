import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Link, Text, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import CardLayout from "../../Layout/CardLayout";
import { BiUpload } from "react-icons/bi";
import { Image, Img } from "@chakra-ui/react";

const SignUpForm = () => {
  const [imageURL, setImageURL] = useState("");
  const [showImage, setShowImage] = useState(false);

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      const fileReader = new FileReader();
      const url = fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImageURL(this.result);
      });
    }
  };

  return (
    <CardLayout>
      <VStack
        alignItems="center"
        justifyContent="center"
        h="full"
        spacing={0}
        color="gray.700"
        gap={4}
      >
        <Heading fontSize="25px">Signup Form</Heading>

        <VStack w="full" gap={4} spacing={0}>
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
            boxShadow="2px 2px 2px gray,-2px -2px 2px white"
            cursor="pointer"
            _hover={{
              backgroundColor: "#D1D5DB",
              color: "rgba(228, 149, 1, 0.97)",
            }}
            transition="all 0.2s ease-in-out"
          >
            <FormLabel htmlFor="chooseImage" cursor="pointer" ml="12px" mt="8px" borderRadius="50%">
              <VStack spacing="0" w="75px" h="75px" display="flex" alignItems="center" justifyContent="center">
                {imageURL ? (
                  <Image src={imageURL} h="100%" w="100%" objectFit="inherit" objectPosition="center"  borderRadius='full' alt="uploaded image"/>
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
