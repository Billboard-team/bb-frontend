import { Flex, Text, Image, Spacer, Button } from "@chakra-ui/react";
import BillboardLogo from "@/assets/Billboard-Logo.png";
const DashboardHeader = () => {
  return (
    <Flex justify="space-between" align="center" p={4} bg="white" shadow="md">
      {/* Logo + Navigation Buttons */}
      <Flex align="center">
        <Image
          src={BillboardLogo}
          alt="Billboard Logo"
          width="120px"
          height="auto"
        />

        {/* Navigation Buttons */}
        <Flex ml={6} gap={4}>
          <Button variant="ghost" fontSize="lg">
            Dashboard
          </Button>
          <Button variant="ghost" fontSize="lg">
            Messages
          </Button>
        </Flex>
      </Flex>

      <Spacer />

      {/* Avatar on the Right */}
    </Flex>
  );
};

export default DashboardHeader;
