
import { Flex, Image, Button, IconButton, Box, Avatar, Group, Input, Badge, Spacer } from "@chakra-ui/react";
import BillboardLogo from "@/assets/Billboard-Logo-Banner.png";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosNotifications } from "react-icons/io";
import { useEffect, useState } from "react";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogoClick = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: { audience: "https://billboard.local" },
        });

        const res = await fetch("http://localhost:8000/api/notifications/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch notifications");

        const data = await res.json();
        const unread = data.notifications?.filter(
          (n: any) => !n.is_read
        ).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };

    if (isAuthenticated) {
      fetchNotificationCount();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const [query, setQuery] = useState<string>("");
  const handleSubmit = () => {
    const param = query.split(" ").join(",");
    navigate("search?q=" + param);
    window.location.reload();
  };


  return (
    <Box position="sticky">
      <Flex justify="space-between" align="center" p={4} shadow="md">
        <Flex align="center" justify="space-between">
          <Image
            src={BillboardLogo}
            bg="white"
            alt="Billboard Logo"
            borderRadius="sm"
            width="120px"
            height="auto"
            p={1}
            cursor="pointer"
            onClick={handleLogoClick}
          />
          <Flex ml={6} gap={4}>
            <Button variant="ghost" fontSize="sm" onClick={() => navigate("/")}>
              Dashboard
            </Button>
            <Button variant="ghost" fontSize="sm" onClick={() => navigate('/following')}>
              Following
            </Button>
            <Button
              variant="ghost"
              fontSize="sm"
              onClick={() => navigate("/reps")}
            >
              Representatives
            </Button>
          </Flex>
        </Flex>

        {/* Search Bar */}
        <Group>
          <Input
            onChange={(e) => setQuery(e.currentTarget.value)}
            width="lg"
            placeholder="Search"
          />
          <IconButton
            variant="surface"
            fontSize="lg"
            onClick={handleSubmit}
            disabled={query === ""}
          >
            <LuSearch />
          </IconButton>
        </Group>

        <Flex ml={6} gap={4} align="center">
          <IconButton
            variant="ghost"
            fontSize="lg"
            onClick={() => navigate("/searchUser")}
            aria-label="Search"
          >
            <LuSearch />
          </IconButton>

          <Box position="relative">
            <IconButton
              variant="ghost"
              fontSize="lg"
              onClick={() => navigate("/notification")}
              aria-label="Notifications"
            >
              <IoIosNotifications />
            </IconButton>
            {unreadCount > 0 && (
              <Badge
                colorScheme="red"
                borderRadius="full"
                fontSize="0.7em"
                position="absolute"
                top="-1"
                right="-1"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Box>
          {/* Avatar on the Right */}
          <Flex ml={6} gap={4}>

            <Button variant="ghost" fontSize="lg" onClick={() => navigate('/profile')}>
              <Avatar.Root>
                <Avatar.Fallback name={user?.name} />
              </Avatar.Root>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
