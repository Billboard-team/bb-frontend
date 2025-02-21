import { Flex, Image, Spacer, Button, IconButton } from "@chakra-ui/react";
import BillboardLogo from "@/assets/Billboard-Logo.png";
import { useNavigate } from 'react-router-dom';
import { LuMeh, LuSearch } from "react-icons/lu";

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
    <Flex justify="space-between" align="center" p={4} shadow="md">
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
          <Button variant="ghost" fontSize="sm" onClick={() => navigate('/')}>
            Dashboard
          </Button>
          <Button variant="ghost" fontSize="sm" onClick={() => navigate('/messages')}>
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
        <Button variant="ghost" fontSize="lg" onClick={() => navigate('/profile')}>
          <LuMeh/>
        </Button>
      </Flex>
    </Flex>
  );
};

export default DashboardHeader;
