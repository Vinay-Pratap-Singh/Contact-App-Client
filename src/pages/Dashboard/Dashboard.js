import Layout from "../../Layout/CardLayout";
import { AiOutlineMenu } from "react-icons/ai";
import { HStack, Input, VStack } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import ContactCard from "../../components/ContactCard/ContactCard";

const Dashboard = () => {
  return (
    <Layout>
      <VStack>
        {/* adding the header menu and search bar */}
      <HStack w="full" h="11vh" gap={4} alignItems="center">
        {/* adding the menu icon for user account details */}
        <AiOutlineMenu fontSize="30px" cursor="pointer" color="#3f3f3f" />

        {/* adding the search bar */}
        <HStack
          fontSize="20px"
          border="1.5px solid #3f3f3f"
          w="full"
          borderRadius={20}
          px="10px"
          py="5px"
          alignItems="center"
        >
          <HiMagnifyingGlass />
          <Input fontWeight="600" placeholder="Search" variant="unstyled" />
        </HStack>
      </HStack>

      {/* adding the contact cards */}
      <VStack overflowY="scroll" h="75vh" w="full" py={4} pr={3}>
        <ContactCard/>
        <ContactCard/>
        <ContactCard/>
        <ContactCard/>
        <ContactCard/>
        <ContactCard/>
        <ContactCard/>
        <ContactCard/>
        <ContactCard/>
      </VStack>
      </VStack>
    </Layout>
  );
};

export default Dashboard;
