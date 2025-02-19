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
        <Box p={5} shadow="md" borderRadius="md" width="35vw" ml="100%">
          <Text fontSize="xl" fontWeight="bold">
            Friend Requests
          </Text>
          {friendRequests.map((request) => (
            <Flex key={request.id} justify="space-between" mt={3}>
              <Text>{request.name}</Text>
              <Button size="sm" colorScheme="blue">
                Accept
              </Button>
            </Flex>
          ))}
        </Box>
        <Box p={5} shadow="md" borderRadius="md" width="35vw" ml="100%">
          <Text fontSize="xl" fontWeight="bold">
            Blocked Users
          </Text>
          {blockedUsers.map((user) => (
            <Flex key={user.id} justify="space-between" mt={3}>
              <Text>{user.name}</Text>
              <Button size="sm" colorScheme="blue">
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
