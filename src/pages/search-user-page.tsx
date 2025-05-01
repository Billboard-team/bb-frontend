import {
  Box,
  Container,
  Input,
  Text,
  VStack,
  Spinner,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const SearchUserPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://billboard.local" },
      });

      const res = await fetch(
        `http://localhost:8000/api/search-users/?q=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 1) handleSearch();
    else setResults([]);
  }, [query]);

  return (
    <Container maxW="container.md" py={8}>
      <Input
        placeholder="Search users by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={4}
      />

      {loading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : results.length > 0 ? (
        <VStack align="stretch">
          {results.map((user) => (
            <Flex
              key={user.id}
              justify="space-between"
              align="center"
              p={3}
              borderRadius="md"
              shadow="sm"
              _hover={{ bg: "gray.50" }}
            >
              <Text>{user.name}</Text>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => navigate(`/profile/${user.name}`)}
              >
                View Profile
              </Button>
            </Flex>
          ))}
        </VStack>
      ) : query.length > 1 ? (
        <Text>No users found.</Text>
      ) : null}
    </Container>
  );
};

export default SearchUserPage;
