import { Box, Avatar, Text, HStack, Tag, Button } from "@chakra-ui/react";
import { User } from "@/components/type";

interface Props {
  user: User;
}

const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <Box textAlign="center">
      <Avatar.Root>
        <Avatar.Fallback name={user.name} />
      </Avatar.Root>
      <Text fontSize="2xl" fontWeight="bold" mt={2}>
        {user.name}
      </Text>
      <HStack mt={2}>
        {user.expertiseTags.map((tag, idx) => (
          <Tag.Root>
            <Tag.Label>{tag}</Tag.Label>
          </Tag.Root>
        ))}
      </HStack>
      <Button mt={4} colorScheme="blue">
        Edit Profile
      </Button>
    </Box>
  );
};

export default UserInfo;
