import Layout from "../../Layout/Layout";
import { AiOutlineMenu } from "react-icons/ai";
import { HStack, Input, VStack } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import ContactCard from "../../components/ContactCard/ContactCard";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../App";

const Dashboard = () => {
  // use context for auth context
  const Auth = useContext(AuthContext);

  // usenavigate to redirect user
  const navigator = useNavigate();

  // for redirecting to login, if not logged in
  useEffect(() => {
    if (!Auth.isLoggedin) navigator("/login");
  },[])  

  return (
    <Layout>
      <VStack>
        {/* adding the header menu and search bar */}
        <HStack w="full" h="11vh" gap={4} alignItems="center">
          {/* adding the menu icon for user account details */}
          <Link to="/profile">
          <AiOutlineMenu fontSize="30px" cursor="pointer" color="#3f3f3f" />
          </Link>

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
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
          <ContactCard />
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Dashboard;
