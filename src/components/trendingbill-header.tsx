import { Box, Button, HStack, Text } from "@chakra-ui/react";
import BillGrid from "./bill-grid";
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

const TrendingBills = () => {
  return (
    <Box>
      <HStack>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Trending Bills
        </Text>
      </HStack>
      <BillGrid items={sampleBills} />
    </Box>
  );
};

export default TrendingBills;
