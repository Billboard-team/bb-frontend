// dashboard.tsx
import React from "react";
import { Box, Button, HStack, Text, Grid, GridItem } from "@chakra-ui/react";
import BillGrid from "@/components/bill-grid";

const sampleBills = [
  {
    id: 1,
    item: {
      code: "HB-123",
      title: "Sample Bill 1",
      sponsor: "John Doe",
      action: "Pending",
    },
  },
  {
    id: 2,
    item: {
      code: "SB-456",
      title: "Sample Bill 2",
      sponsor: "Jane Smith",
      action: "Approved",
    },
  },
];

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
        <BillGrid items={sampleBills} />
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
