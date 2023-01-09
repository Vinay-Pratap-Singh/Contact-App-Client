import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ContactCard = (props) => {
  let { name, phone, photo,bgColor } = props;
  // photo="http://res.cloudinary.com/dkcoopzw6/image/upload/v1673285433/ovpmxc3owkeh1hysnwrk.jpg"
  let letter;
  if (!photo) {
    letter = name[0].toUpperCase();
  }
  else {
    bgColor = "";
  }

  return (
    <HStack
      w="full"
      gap={2}
      border="1.5px solid #3f3f3f"
      p={2}
      borderRadius={10}
    >
      {/* displaying the user profile image */}
      <Box
        bg="white"
        border="1.5px solid #D1D5DB"
        borderRadius="50%"
        w={16}
        h={16}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgColor={bgColor}
      >
        {photo ? <Image borderRadius="50%"  src={photo} /> : <Text fontSize="25px" fontWeight="500" color="white" >{letter}</Text>}
      </Box>

      <VStack spacing={0} justifyContent="center" alignItems="flex-start">
        <Heading fontSize={22} fontWeight="700">
          {name}
        </Heading>
        <Text fontWeight="600">{phone}</Text>
      </VStack>
    </HStack>
  );
};

export default ContactCard;
