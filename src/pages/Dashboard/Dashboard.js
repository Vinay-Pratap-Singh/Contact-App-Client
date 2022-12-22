import Layout from "../../Layout/CardLayout"
import { AiOutlineMenu } from "react-icons/ai"
import { HStack, Input } from "@chakra-ui/react"
import {HiMagnifyingGlass} from "react-icons/hi2"

const dashboard = () => {
  return (
      <Layout>
          {/* adding the header menu and search bar */}
          <HStack w="full" gap={4}  py={4} alignItems="center">
              {/* adding the menu icon */}
              <AiOutlineMenu fontSize="30px" cursor="pointer" color="#3f3f3f"/>

              {/* adding the search bar */}
              <HStack fontSize="20px" border="1.5px solid #3f3f3f" w="full" borderRadius={20} px="10px" py="5px" alignItems="center">
                  <HiMagnifyingGlass />
                  <Input fontWeight="600" placeholder="Search" variant="unstyled"/>
              </HStack>
          </HStack>
    </Layout>
  )
}

export default dashboard