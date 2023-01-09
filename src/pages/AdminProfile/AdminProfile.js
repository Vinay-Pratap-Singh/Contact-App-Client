import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UniversalContext } from "../../App";

const AdminProfile = () => {
  // use context for auth context
  const {isLoggedin} = useContext(UniversalContext);

  // usenavigate to redirect user
  const navigator = useNavigate();

  // for redirecting to login, if not logged in
  useEffect(() => {
    if (!isLoggedin) navigator("/login");
  }, [isLoggedin]);

  return (
    <Layout>
      <VStack
        color="#606060"
        h="full"
        spacing={5}
        alignItems="center"
        justifyContent="center"
        pos="relative"
      >
        {/* displaying the symbol to go back to dashboard */}
        <Link to="/">
          <Button pos="absolute" left={2} top={4}>
            <FaArrowLeft fontSize={20} />
          </Button>
        </Link>

        {/* displaying the user profile image */}
        <Box
          bg="white"
          border="10px solid #D1D5DB"
          borderRadius="50%"
          w={40}
          h={40}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="2px 2px 2px gray, -2px -2px 2px white"
        >
          {/* if user image has no profile image */}
          <FaUser fontSize={96} color="#D1D5DB" />

          {/* if user has profile image */}

          {/* profile image */}
        </Box>

        {/* displaying the user name */}
        <Heading fontSize={20}>Harvi</Heading>

        {/* displaying the user's other profile details */}
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>Phone</GridItem>
          <GridItem>1234567890</GridItem>
          <GridItem>Email</GridItem>
          <GridItem>vinay@ineuron.ai</GridItem>
          <GridItem>Total Contacts</GridItem>
          <GridItem>100</GridItem>
        </Grid>

        {/* displaying the buttons for editing the profile and  */}
        <VStack>
          <HStack>
            <Button>Change Picture</Button>
            <Button>Change Password</Button>
          </HStack>
          <Button w="full">Delete Account</Button>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default AdminProfile;
