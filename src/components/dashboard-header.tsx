import { Flex, Image, Button, IconButton, Box, Avatar, Group, Input } from "@chakra-ui/react";
import BillboardLogo from "@/assets/Billboard-Logo-Banner.png";
import { useNavigate } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
const DashboardHeader = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/", { replace: true }); // Navigate to home page
    window.location.reload(); // Force page reload
  };

  const [ query, setQuery ] = useState<string>('');
  const handleSubmit = () => {
    const param = query.split(' ').join(',')
    navigate('search?q=' + param)
    window.location.reload()
  }

  const { user } = useAuth0(); 
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
            <Button variant="ghost" fontSize="sm" onClick={() => navigate('/reps')}>
              Representatives
            </Button>
          </Flex>
        </Flex>

        {/* Search Bar */}
        <Group>
          <Input onChange={(e) => setQuery(e.currentTarget.value)} width="lg" placeholder="Search"/>
          <IconButton variant="surface" fontSize="lg" onClick={handleSubmit} disabled={query === ''}>
            <LuSearch/>
          </IconButton>
        </Group>


        {/* Avatar on the Right */}
        <Flex ml={6} gap={4}>
          <Button variant="ghost" fontSize="lg" onClick={() => navigate('/profile')}>
            <Avatar.Root>
              <Avatar.Fallback name={user?.name} />   {/* use actual user name for avatar */}
            </Avatar.Root>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
