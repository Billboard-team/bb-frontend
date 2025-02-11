// layout.tsx
import React from "react";
import {
  Box,
  Button,
  Image,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import BillboardLogo from "../assets/Billboard-Logo.png";

const Layout: React.FC = () => {
  const sidebarWidth = useBreakpointValue({ base: "100%", md: "250px" });

  return (
    <Box display="flex" w="100%" h="100%" bg="white" color="black">
      {/* Sidebar */}
      <Box
        width={sidebarWidth}
        bg="gray.800"
        p={6}
        display="flex"
        flexDirection="column"
        alignItems="start"
        boxShadow="lg"
        position="sticky"
        top="0"
        height="100vh"
      >
        <Image src={BillboardLogo} alt="Billboard Logo" boxSize="50px" mb={6} />
        <Text fontWeight="bold" mb={4} mt={8} color="white">
          Categories
        </Text>
        <VStack gap={4} align="start">
          <Button variant="ghost" colorScheme="teal" width="100%">
            Technology
          </Button>
          <Button variant="ghost" colorScheme="teal" width="100%">
            Environment
          </Button>
          <Button variant="ghost" colorScheme="teal" width="100%">
            Healthcare
          </Button>
          <Button variant="ghost" colorScheme="teal" width="100%">
            Economy
          </Button>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box flex="1" p={6} width="100%" maxWidth="100%">
        {/* <Outlet /> is where child routes (e.g., Dashboard) will render */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
