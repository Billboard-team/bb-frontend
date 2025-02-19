import { Box, Text, Input, VStack, Flex, Button } from "@chakra-ui/react";
import { Activity, Friend } from "@/components/type";

interface Props {
  friends: Friend[];
}

const FriendsList: React.FC<Props> = ({ friends }) => {
  return (
    <Box p={5} shadow="md" borderRadius="md" width="35vw" mr="10%">
      <Text fontSize="xl" fontWeight="bold">
        Friends
      </Text>
      <Input placeholder="Search friends..." mt={2} />
      <VStack mt={3} align="start">
        {friends.map((friend) => (
          <Flex key={friend.id} justify="space-between" w="100%">
            <Text>{friend.name}</Text>
            <Button size="sm" colorScheme="blue">
              View
            </Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default FriendsList;
