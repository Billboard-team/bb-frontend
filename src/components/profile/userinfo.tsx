import { Box, Avatar, Text, HStack, Tag, Button } from "@chakra-ui/react";
import { User } from "@/components/type";
import { useAuth0 } from "@auth0/auth0-react";
interface Props {
  user: User;
}

const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <Box textAlign="center">
      <Avatar.Root>
        <Avatar.Fallback name={user.name} />
      </Avatar.Root>
      <Text fontSize="2xl" fontWeight="bold" mt={2} color="bg.inverted">
        {user.name}
      </Text>
      <HStack mt={2}>
        {user.expertiseTags.map((tag, idx) => (
          <Tag.Root key={idx}>
            <Tag.Label>{tag}</Tag.Label>
          </Tag.Root>
        ))}
      </HStack>
      <Button variant="ghost" mt={4}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default UserInfo;
