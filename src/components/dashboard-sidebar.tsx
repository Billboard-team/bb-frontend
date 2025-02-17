import { VStack, Text } from "@chakra-ui/react";

const categories = ["Technology", "Environment", "Healthcare", "Economy"];

const DashboardSidebar = () => {
  return (
    <VStack align="start" p={4} w="200px" bg="blue.100" h="full">
      <Text fontWeight="bold" mb={2}>
        Categories
      </Text>
      {categories.map((category) => (
        <Text key={category} cursor="pointer" _hover={{ color: "blue.500" }}>
          {category}
        </Text>
      ))}
    </VStack>
  );
};

export default DashboardSidebar;
