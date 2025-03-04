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
        <Box p={5} shadow="md" borderRadius="md" width="34vw" ml="137%">
          <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
            Friend Requests
          </Text>
          {friendRequests.map((request) => (
            <Flex key={request.id} justify="space-between" mt={3}>
              <Text color="bg.inverted">{request.name}</Text>
              <Button variant="surface" size="sm" colorPalette="green">
                Accept
              </Button>
            </Flex>
          ))}
        </Box>
        <Box p={5} shadow="md" borderRadius="md" width="34vw" ml="137%">
          <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
            Blocked Users
          </Text>
          {blockedUsers.map((user) => (
            <Flex key={user.id} justify="space-between" mt={3}>
              <Text color="bg.inverted">{user.name}</Text>
              <Button variant="surface" size="sm" colorPalette="red">
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
