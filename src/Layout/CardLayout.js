import React from "react";
import { Box, Container } from "@chakra-ui/layout";

const CardLayout = ({ children }) => {
  return (
    <Box
      h="100vh"
      w="100vw"
      bgColor="#D1D5DB"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pos="relative"
      overflow="hidden"
    >
      <Container
        h="90vh"
        w="400px"
        bgColor="#E5E7EB"
        boxShadow="5px 5px 5px gray,-5px -5px 5px white"
        borderRadius="10px"
      >
        <Box className="bubble bubble1" borderRadius="50%" bgColor="gray.300"></Box>
        <Box className="bubble bubble2" borderRadius="50%" bgColor="gray.300"></Box>
        <Box className="bubble bubble3" borderRadius="50%" bgColor="gray.300"></Box>
        <Box className="bubble bubble4" borderRadius="50%" bgColor="gray.300"></Box>
        <Box className="bubble bubble5" borderRadius="50%" bgColor="gray.300"></Box>
        {/* adding the children here */}
        {children}
      </Container>
    </Box>
  );
};

export default CardLayout;
