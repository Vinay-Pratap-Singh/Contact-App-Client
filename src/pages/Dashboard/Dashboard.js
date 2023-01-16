import Layout from "../../Layout/Layout";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import {
  Box,
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
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UniversalContext } from "../../App";
import axios from "axios";
import AddContact from "../../components/AddContact/AddContact";
import { BASEURL } from "../../config";

const Dashboard = () => {
  // for handling the loading spinner
  const [loading, setLoading] = useState(false);

  // getting items from context
  const { isLoggedin, setIsLoggedin, orgData, setOrgData, isModified } =
    useContext(UniversalContext);

  // state for storing the user contact

  const [contact, setContact] = useState(orgData.contact || []);

  // for storing the searched text
  const [searchText, setSearchText] = useState("");

  // useNavigate to redirect user
  const navigator = useNavigate();

  // using the toast to display the feedback responses
  const toast = useToast();

  // function to logout the user account
  const logout = async () => {
    // displaying the loader
    setLoading(true);

    try {
      await axios.get(`${BASEURL}/logout`);
      toast({
        title: "Logout Successful",
        position: "top",
        status: "success",
        duration: 3000,
      });

      // changing the login state of user
      setIsLoggedin(false);
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("orgData");

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

  // for implementing the search functionality
  useEffect(() => {
    const searchContact = () => {
      if (!searchText) {
        setContact(orgData.contact);
        return;
      }
      const searchedContacts = orgData.contact.filter((element) => {
        return element.name.includes(searchText);
      });

      // setting the new contacts in state
      setContact(searchedContacts);
    };
    searchContact();
  }, [searchText]);

  // for getting the data
  useEffect(() => {
    // function for getting the data
    const fetchData = async () => {
      if (!isLoggedin) {
        navigator("/login");
        return;
      }

      try {
        const res = await axios.get(`${BASEURL}/dashboard`, {
          withCredentials: true,
        });
        // if success is false
        if (!res.data.success) {
          navigator("/login");
          return;
        }
        // setting the original data
        setOrgData(res.data.data);
        setContact(res.data.data.contact);
        localStorage.setItem("orgData", JSON.stringify(res.data.data));
      } catch (error) {
        toast({
          title: "Failed to load contact",
          description: "Refresh page or login again after logout",
          position: "top",
          status: "error",
          duration: 3000,
        });

        setIsLoggedin(false);
        localStorage.removeItem(isLoggedin);
        localStorage.removeItem(orgData);
      }
    };
    fetchData();
  }, [isModified]);

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
                  <AiOutlineMenu fontSize="25px" cursor="pointer" />
                </Link>
              </Button>
            </Tooltip>

            {/* adding the search bar */}
            <HStack
              fontSize="20px"
              border="1.5px solid"
              w="full"
              borderRadius={20}
              px="10px"
              py="5px"
              alignItems="center"
            >
              <HiMagnifyingGlass />
              <Input
                fontWeight="600"
                placeholder="Search"
                variant="unstyled"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </HStack>

            {/* adding the logout button */}
            <Tooltip hasArrow label="Logout">
              <Button
                fontSize="35px"
                cursor="pointer"
                fontWeight="extrabold"
                onClick={logout}
              >
                <AiOutlineLogout />
              </Button>
            </Tooltip>
          </HStack>

          {/* adding the contact cards */}
          <VStack overflowY="scroll" h="75vh" w="full" py={4} pr={3}>
            {contact &&
              contact.map((element) => {
                return (
                  <ContactCard
                    name={element.name}
                    phone={element.phone}
                    photo={element.photo}
                    bgColor={element.bgColor}
                    id={element._id}
                    key={element._id}
                  />
                );
              })}
          </VStack>

          <Box pos="absolute" right={8} bottom={6}>
            <AddContact />
          </Box>
        </VStack>
      )}
    </Layout>
  );
};

export default Dashboard;
