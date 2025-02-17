import React from 'react';
import { useTheme } from 'next-themes'
import {
  Box,
  Text,
  Input,
  VStack,
  Flex,
  Button,
  Container,
} from "@chakra-ui/react";

interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
}

// Mock data with random values - username is what will be displayed
// And remaining data will be used when opening up the friend's profile (modal)
const friends: User[] = [
  {
    user_id: "u1",
    username: "Jessica Smith",
    email: "jessica@example.com",
    password: "***"
  },
  {
    user_id: "u2",
    username: "Michael Brown",
    email: "michael@example.com",
    password: "***"
  },
  {
    user_id: "u3",
    username: "Emily Davis",
    email: "emily@example.com",
    password: "***"
  }
];

const FriendListPage: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const bgColor = isDark ? 'gray.800' : 'white'
  const hoverBg = isDark ? 'gray.700' : 'gray.50'
  const inputBg = isDark ? 'gray.700' : 'gray.50'
  const inputHoverBg = isDark ? 'gray.600' : 'gray.100'

  return (
    <Box w="100%" minH="100vh">

      <Container maxW="container.md" py={8}>
        <Box bg={bgColor} shadow="sm" borderRadius="md" p={6}>
          <VStack gap={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">Friends</Text>

            {/* TODO:Search Input */}
            <Input 
              placeholder="🔍 Search friends..." 
              bg={inputBg}
              _hover={{ bg: inputHoverBg }}
            />

            {/* Friends List */}
            <VStack gap={2} align="stretch">
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <Flex 
                    key={friend.user_id}
                    justify="space-between"
                    align="center"
                    p={3}
                    borderRadius="md"
                    _hover={{ bg: hoverBg }}
                  >
                    <Text>{friend.username}</Text>
                    <Button 
                      bg="black"
                      color="white"
                      _hover={{ bg: 'gray.800' }}
                      size="sm"
                      borderRadius="full"
                    >
                      View Profile
                    </Button>
                  </Flex>
                ))
              ) : (
                  <Text alignSelf={'center'}>No Friends Yet</Text>
                )}
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default FriendListPage;
