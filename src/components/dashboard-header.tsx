import { Flex, Text, Image, Spacer, Button } from "@chakra-ui/react";
import BillboardLogo from "@/assets/Billboard-Logo.png";
import { useNavigate } from 'react-router-dom';
const DashboardHeader = () => {
  const navigate = useNavigate();
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
          <Button variant="ghost" fontSize="lg" onClick={() => navigate('/')}>
            Dashboard
          </Button>
          <Button variant="ghost" fontSize="lg" onClick={() => navigate('/messages')}>
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
