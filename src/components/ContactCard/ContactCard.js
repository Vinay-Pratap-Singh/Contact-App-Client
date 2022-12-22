import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaUser } from 'react-icons/fa'

const ContactCard = () => {
  return (
      <HStack w="full" gap={2} border="1.5px solid #3f3f3f" p={2} borderRadius={10}>
          {/* displaying the user profile image */}
        <Box
          bg="white"         
          border="5px solid #D1D5DB"
          borderRadius="50%"
          w={16}
          h={16}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="1px 1px 1px gray, -1px -1px 1px white"
        >
          {/* if user image has no profile image */}
          <FaUser fontSize={32} color="#D1D5DB" />

          {/* if user has profile image */}

          {/* profile image */}
          </Box>
          
          <VStack spacing={0} justifyContent="center" alignItems="flex-start" >
              <Heading fontSize={22} fontWeight="700">Harvi</Heading>
              <Text fontWeight="600">1234567890</Text>
          </VStack>
    </HStack>
  )
}

export default ContactCard