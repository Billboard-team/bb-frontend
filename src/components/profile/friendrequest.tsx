import { Box, Text, Flex, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { FriendRequest, BlockedUser } from "@/components/type";

interface Props {
  friendRequests: FriendRequest[];
  blockedUsers: BlockedUser[];
}

const FriendRequestsBlocked: React.FC<Props> = ({
  friendRequests,
  blockedUsers,
}) => {
  return (
    <SimpleGrid columns={2} gap={5}>
      <VStack>
        <Box bg="white" p={5} shadow="md" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" color="black">
            Friend Requests
          </Text>
          {friendRequests.map((request) => (
            <Flex key={request.id} justify="space-between" mt={3} color="black">
              <Text>{request.name}</Text>
              <Button size="sm" colorScheme="blue" color="white">
                Accept
              </Button>
            </Flex>
          ))}
        </Box>
        <Box bg="white" p={5} shadow="md" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" color="black">
            Blocked Users
          </Text>
          {blockedUsers.map((user) => (
            <Flex key={user.id} justify="space-between" mt={3} color="black">
              <Text>{user.name}</Text>
              <Button size="sm" colorScheme="blue" color="white">
                Unblock
              </Button>
            </Flex>
          ))}
        </Box>
      </VStack>
    </SimpleGrid>
  );
};

export default FriendRequestsBlocked;
