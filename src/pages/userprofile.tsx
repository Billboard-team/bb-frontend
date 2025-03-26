import { Box, Flex, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import UserInfo from "@/components/profile/userinfo";
import ActivityInsights from "@/components/profile/activityinsights";
import FriendsList from "@/components/profile/friends";
import FriendRequestsBlocked from "@/components/profile/friendrequest";
import SavedPosts from "@/components/profile/savedpost";

import {
  mockActivity,
  mockFriends,
  mockFriendRequests,
  mockBlockedUsers,
  mockSavedPosts,
} from "@/components/mockData/mockData";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <Box p={10}><Text>Loading profile...</Text></Box>;
  }

  if (error) {
    return <Box p={10}><Text color="red.500">Authentication error: {error.message}</Text></Box>;
  }

  if (!isAuthenticated || !user) {
    return <Box p={10}><Text>Please sign in to view your profile.</Text></Box>;
  }

  // Map Auth0 user to your app's expected user format
  const formattedUser = {
    name: user.name || "Anonymous",
    email: user.email || "no-email@example.com",
    avatar: user.picture || "", // fallback to blank or default avatar
    expertiseTags: [],
  };

  return (
    <Flex
      direction="column"
      h="100vh"
      w="85vw"
      p={10}
      overflow="hidden"
    >
      {/* First Row: User Info + Activity */}
      <Flex justify="space-between" w="100%">
        <Flex flex="1" justify="center">
          <UserInfo user={formattedUser} />
        </Flex>
        <Flex flex="1" justify="right">
          <ActivityInsights activity={mockActivity} />
        </Flex>
      </Flex>

      <Box my={6} />

      {/* Second Row: Friends List + Requests/Blocked */}
      <Flex justify="space-between" w="100%">
        <Flex flex="1" justify="left">
          <FriendsList friends={mockFriends} />
        </Flex>
        <Flex flex="1" justify="right">
          <FriendRequestsBlocked
            friendRequests={mockFriendRequests}
            blockedUsers={mockBlockedUsers}
          />
        </Flex>
      </Flex>

      <Box my={6} />

      {/* Third Row: Saved Posts */}
      <SavedPosts savedPosts={mockSavedPosts} />
    </Flex>
  );
};

export default UserProfile;
