import Layout from "../../Layout/Layout";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import {
  Button,
  HStack,
  Input,
  Spinner,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import ContactCard from "../../components/ContactCard/ContactCard";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import axios from "axios";

const Dashboard = () => {
  // for handling the loading spinner
  const [loading, setLoading] = useState(false);

  // use context for auth context
  const { isLoggedin, setIsLoggedin } = useContext(AuthContext);

  // useNavigate to redirect user
  const navigator = useNavigate();

  // using the toast to display the feedback responses
  const toast = useToast();

  // function to logout the user account
  const logout = async () => {
    // displaying the loader
    setLoading(true);

    try {
      await axios.get("/logout");
      toast({
        title: "Logout Successful",
        position: "top",
        status: "success",
        duration: 3000,
      });

      // changing the login state of user
      setIsLoggedin(false);
      localStorage.removeItem("isLoggedin");

      // hiding the loader
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to logout",
        description: error.response.data.message,
        position: "top",
        status: "error",
        duration: 3000,
      });

      // hiding the loader
      setLoading(false);
    }
  };

  // for redirecting to login, if not logged in
  useEffect(() => {
    if (!isLoggedin) navigator("/login");
  }, [isLoggedin]);

  return (
    <Layout>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="green.100"
          color="green.500"
          size="xl"
          pos="absolute"
          left="45%"
          top="45%"
        />
      ) : (
        <VStack>
          {/* adding the header menu and search bar */}
          <HStack w="full" h="11vh" gap={4} alignItems="center">
            {/* adding the menu icon for user account details */}
            <Tooltip hasArrow label="User Profile">
              <Button>
                <Link to="/profile">
                  <AiOutlineMenu
                    fontSize="25px"
                    cursor="pointer"
                    color="#3f3f3f"
                  />
                </Link>
              </Button>
            </Tooltip>

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

            {/* adding the logout button */}
            <Tooltip hasArrow label="Logout">
              <Button
                fontSize="35px"
                cursor="pointer"
                color="#3f3f3f"
                fontWeight="extrabold"
                onClick={logout}
              >
                <AiOutlineLogout />
              </Button>
            </Tooltip>
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
      )}
    </Layout>
  );
};

export default Dashboard;
