// dashboard.tsx
import React from "react";
import { Box, Button, HStack, Text, Grid, GridItem } from "@chakra-ui/react";

const Dashboard: React.FC = () => {
  return (
    <>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">
          BillBoard Dashboard
        </Text>
        <HStack gap={4}>
          <Button variant="ghost" colorScheme="teal" size="sm">
            Dashboard
          </Button>
          <Button variant="ghost" colorScheme="teal" size="sm">
            Messages
          </Button>
          <Button variant="ghost" colorScheme="teal" size="sm">
            Profile
          </Button>
        </HStack>
      </HStack>

      {/* Bills Section */}
      <Box mb={6}>
        <HStack>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Recommended Bills
          </Text>
          <Button variant="ghost" colorScheme="teal" size="sm">
            Refresh
          </Button>
        </HStack>

        <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
          <GridItem bg="gray.700" p={6} borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold">Climate Action Bill</Text>
            <Text mt={2} fontSize="sm">
              This bill proposes new regulations to reduce carbon emissions by
              30% over the next decade.
            </Text>
            <Button variant="ghost" mt={4} colorScheme="teal" size="sm">
              Save
            </Button>
          </GridItem>

          <GridItem bg="gray.700" p={6} borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold">AI Ethics Act</Text>
            <Text mt={2} fontSize="sm">
              This bill aims to establish ethical guidelines for the development
              and implementation of AI technologies.
            </Text>
            <Button variant="ghost" mt={4} colorScheme="teal" size="sm">
              Save
            </Button>
          </GridItem>
        </Grid>
      </Box>

      {/* Trending Bills Section */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Trending Bills
        </Text>
        <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
          <GridItem bg="gray.700" p={6} borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold">Healthcare Reform Act</Text>
            <Text mt={2} fontSize="sm">
              This bill is currently the most debated with extensive discussions
              around its potential impact on national healthcare.
            </Text>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
