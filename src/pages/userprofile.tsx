import { Box, Flex } from "@chakra-ui/react";
import UserInfo from "@/components/profile/userinfo";
import ActivityInsights from "@/components/profile/activityinsights";
import FriendsList from "@/components/profile/friends";
import FriendRequestsBlocked from "@/components/profile/friendrequest";
import SavedPosts from "@/components/profile/savedpost";
import {
  mockUser,
  mockActivity,
  mockFriends,
  mockFriendRequests,
  mockBlockedUsers,
  mockSavedPosts,
} from "@/components/mockData/mockData";

const UserProfile = () => {
  return (
    <Flex
      direction="column"
      h="100vh"
      w="85vw"
      p={10}
      bg="gray.500"
      color="white"
      overflow="hidden" // Prevents unwanted scrolling issues
    >
      {/* First Row: User Info + Activity */}
      <Flex w="100%" justify="space-between">
        <UserInfo user={mockUser} />
        <ActivityInsights activity={mockActivity} />
      </Flex>

      <Box my={6} />

      {/* Second Row: Friends List + Requests/Blocked */}
      <Flex w="100%" justify="space-between">
        <FriendsList friends={mockFriends} />
        <FriendRequestsBlocked
          friendRequests={mockFriendRequests}
          blockedUsers={mockBlockedUsers}
        />
      </Flex>

      <Box my={6} />

      {/* Third Row: Saved Posts */}
      <SavedPosts savedPosts={mockSavedPosts} />
    </Flex>
  );
};

export default UserProfile;
