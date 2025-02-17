import {
  Box,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import BillGrid from "./bill-grid";
import { LuRotateCcw } from "react-icons/lu";

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

const RecommendedBills = () => {
  return (
    <Box>
      <HStack my={2}>
        <Heading>
          Recommended Bills
        </Heading>
        <IconButton variant="ghost" colorScheme="teal" size="sm">
          <LuRotateCcw/>
        </IconButton>
      </HStack>
      <BillGrid items={sampleBills} />
    </Box>
  );
};

export default RecommendedBills;
