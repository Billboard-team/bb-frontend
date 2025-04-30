import {
  Box,
  Container,
  Text,
  VStack,
  Spinner,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  timestamp: string;
}

const NotificationPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://billboard.local" },
      });

      const res = await fetch("http://localhost:8000/api/notifications/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch notifications");

      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Notification fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://billboard.local" },
      });

      const res = await fetch(
        `http://localhost:8000/api/notifications/${id}/read/`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      } else {
        console.error("Failed to mark as read");
      }
    } catch (err) {
      console.error("Error marking notification as read", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container maxW="container.md" py={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Notifications
      </Text>

      {loading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : notifications.length > 0 ? (
        <VStack gap={4} align="stretch">
          {notifications.map((n) => (
            <Box key={n.id} p={4} borderWidth={1} borderRadius="md">
              <Flex justify="space-between" align="center">
                <Text>{n.message}</Text>
                {!n.is_read && (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => markAsRead(n.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </Flex>
              <Text fontSize="sm" color="gray.500">
                {new Date(n.timestamp).toLocaleString()}
              </Text>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No notifications found.</Text>
      )}
    </Container>
  );
};

export default NotificationPage;
