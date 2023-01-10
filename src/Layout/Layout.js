import React from "react";
import { Box, Container } from "@chakra-ui/layout";

const Layout = ({ children }) => {
  return (
    <Box
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      pos="relative"
    >
      <Container
        h="90vh"
        w="400px"
        border="1px solid"
        boxShadow="2px 2px 5px,-2px -2px 5px"
        borderRadius="10px"
        pos="relative"
      >
      
        {/* adding the children here */}
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
