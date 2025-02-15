import { Box, Text, Input, VStack, Flex, Button } from "@chakra-ui/react";
import { Activity, Friend } from "@/components/type";

interface Props {
  friends: Friend[];
}

const FriendsList: React.FC<Props> = ({ friends }) => {
  return (
    <Box bg="white" p={5} shadow="md" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" color="black">
        Friends
      </Text>
      <Input placeholder="Search friends..." mt={2} />
      <VStack mt={3} align="start">
        {friends.map((friend) => (
          <Flex key={friend.id} justify="space-between" w="100%" color="black">
            <Text>{friend.name}</Text>
            <Button size="sm" colorScheme="blue" color="white">
              View
            </Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default FriendsList;
