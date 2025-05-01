import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { Friend } from "@/components/type";
import {
  Box,
  Text,
  Input,
  VStack,
  Flex,
  Button,
  Container,
  Spinner,
} from "@chakra-ui/react";

const FriendListPage: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const isDark = resolvedTheme === "dark";

  const bgColor = isDark ? "gray.800" : "white";
  const hoverBg = isDark ? "gray.700" : "gray.50";
  const inputBg = isDark ? "gray.700" : "gray.50";
  const inputHoverBg = isDark ? "gray.600" : "gray.100";

  const navigate = useNavigate();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: { audience: "https://billboard.local" },
        });

        const res = await fetch("http://localhost:8000/api/me/following/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch friends");

        const data = await res.json();
        setFriends(data.following || []); // assuming backend sends { following: [ { id, name }, ... ] }
      } catch (err) {
        console.error("Failed to fetch following list", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchFriends();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box w="100%" minH="100vh">
      <Container maxW="container.md" py={8}>
        <Box bg={bgColor} shadow="sm" borderRadius="md" p={6}>
          <VStack gap={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" color="bg.inverted">
              Friends
            </Text>

            {/* Search Input */}
            <Input
              placeholder="🔍 Search friends..."
              bg={inputBg}
              _hover={{ bg: inputHoverBg }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Friends List */}
            {loading ? (
              <Flex justify="center" align="center" p={5}>
                <Spinner />
              </Flex>
            ) : (
              <VStack gap={2} align="stretch">
                {filteredFriends.length > 0 ? (
                  filteredFriends.map((friend) => (
                    <Flex
                      key={friend.id}
                      justify="space-between"
                      align="center"
                      p={3}
                      borderRadius="md"
                      _hover={{ bg: hoverBg }}
                    >
                      <Text color="bg.inverted">{friend.name}</Text>
                      <Button
                        bg="black"
                        color="white"
                        _hover={{ bg: "gray.800" }}
                        size="sm"
                        borderRadius="full"
                        onClick={() => navigate(`/profile/${friend.name}`)}
                      >
                        View Profile
                      </Button>
                    </Flex>
                  ))
                ) : (
                  <Text alignSelf="center">No friends found.</Text>
                )}
              </VStack>
            )}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default FriendListPage;
