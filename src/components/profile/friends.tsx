import {
  Box,
  Text,
  Input,
  VStack,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Friend } from "@/components/type";
import { useNavigate } from "react-router-dom";

interface Props {
  friends: Friend[];
}

const FriendsList: React.FC<Props> = ({ friends }) => {
  const navigate = useNavigate();

  const expandFriendList = () => {
    navigate("/profile/friendlist", { state: { friends } });
  };

  return (
    <Box
      p={5}
      shadow="md"
      borderRadius="md"
      width="35vw"
      mr="10%"
      maxH="300px"
      overflowY="auto"
    >
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
          Friends
        </Text>
        <Button size="sm" variant="surface" onClick={expandFriendList}>
          Expand
        </Button>
      </HStack>
      <Input placeholder="Search friends..." mt={2} />
      <VStack mt={3} align="start">
        {friends.map((friend) => (
          <Flex key={friend.id} justify="space-between" w="100%">
            <Text color="bg.inverted">{friend.name}</Text>
            <Button variant="surface" size="sm">
              View
            </Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default FriendsList;
