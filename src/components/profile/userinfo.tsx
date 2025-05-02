import { Box, Avatar, Text, HStack, Tag, Button } from "@chakra-ui/react";
import { User } from "@/components/type";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
interface Props {
  user: User;
  expertise_tags: string[];
}

const UserInfo: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
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
      <Button variant="ghost" mt={4} onClick={() => navigate("/update")}>

      <Text fontSize="1xl" fontWeight="bold" mt={2} color="bg.inverted">
        Expertise Tag: {user.expertise_tags?.[0] || "None"}
      </Text>

      
      <Button variant="ghost" mt={4}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default UserInfo;
