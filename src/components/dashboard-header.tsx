import { Flex, Image, Spacer, Button, IconButton, Box } from "@chakra-ui/react";
import BillboardLogo from "@/assets/Billboard-Logo-Banner.png";
import { useNavigate } from 'react-router-dom';
import { LuMeh, LuSearch } from "react-icons/lu";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/", { replace: true }); // Navigate to home page
    window.location.reload(); // Force page reload
  };

  return (
    <Box position="sticky">
      <Flex justify="space-between" align="center" p={4} shadow="md">
        {/* Logo + Navigation Buttons */}
        <Flex align="center" justify="space-between">
          <Image
            src={BillboardLogo}
            bg="white"
            alt="Billboard Logo"
            borderRadius="sm"
            width="120px"
            height="auto"
            p={1}
            cursor="pointer" // Make it clickable
            onClick={handleLogoClick} // Attach the click event
          />

          {/* Navigation Buttons */}
          <Flex ml={6} gap={4}>
            <Button variant="ghost" fontSize="sm" onClick={() => navigate('/')}>
              Dashboard
            </Button>
            <Button variant="ghost" fontSize="sm" onClick={() => navigate('/profile/messages')}>
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
    </Box>
  );
};

export default DashboardHeader;
