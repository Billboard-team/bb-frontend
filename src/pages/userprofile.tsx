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
      overflow="hidden" // Prevents unwanted scrolling issues
    >
      {/* First Row: User Info + Activity */}
      <Flex justify="space-between" w="100%">
        <Flex flex="1" justify="center">
          <UserInfo user={mockUser} />
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
