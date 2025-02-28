import React from "react";
import { useLocation } from "react-router-dom";
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
} from "@chakra-ui/react";

const FriendListPage: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const bgColor = isDark ? "gray.800" : "white";
  const hoverBg = isDark ? "gray.700" : "gray.50";
  const inputBg = isDark ? "gray.700" : "gray.50";
  const inputHoverBg = isDark ? "gray.600" : "gray.100";

  const location = useLocation();
  const friends = location.state?.friends || [];

  return (
    <Box w="100%" minH="100vh">
      <Container maxW="container.md" py={8}>
        <Box bg={bgColor} shadow="sm" borderRadius="md" p={6}>
          <VStack gap={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" color="bg.inverted">
              Friends
            </Text>

            {/* TODO:Search Input */}
            <Input
              placeholder="🔍 Search friends..."
              bg={inputBg}
              _hover={{ bg: inputHoverBg }}
            />

            {/* Friends List */}
            <VStack gap={2} align="stretch">
              {friends.length > 0 ? (
                friends.map((friend: Friend) => (
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
                    >
                      View Profile
                    </Button>
                  </Flex>
                ))
              ) : (
                <Text alignSelf={"center"}>No Friends Yet</Text>
              )}
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default FriendListPage;
