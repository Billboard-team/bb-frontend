import { Flex, Image, Spacer, Button, IconButton } from "@chakra-ui/react";
import BillboardLogo from "@/assets/Billboard-Logo.png";
import { LuMeh, LuSearch } from "react-icons/lu";
const DashboardHeader = () => {
  return (
    <Flex justify="space-between" align="center" p={4}  shadow="md">
      {/* Logo + Navigation Buttons */}
      <Flex align="center" justify="space-between">
        <Image
          src={BillboardLogo}
          bg="white"
          alt="Billboard Logo"
          width="120px"
          height="auto"
        />

        {/* Navigation Buttons */}
        <Flex ml={6} gap={4}>
          <Button variant="ghost" fontSize="sm">
            Dashboard
          </Button>
          <Button variant="ghost" fontSize="sm">
            Messages
          </Button>
        </Flex>
      </Flex>

      <Spacer />

      {/* Avatar on the Right */}
      <Flex ml={6} gap={4}>
        <IconButton variant="ghost" fontSize="lg">
          <LuSearch/>
        </IconButton>
        <Button variant="ghost" fontSize="lg">
          <LuMeh/>
        </Button>
      </Flex>
    </Flex>
  );
};

export default DashboardHeader;
