import {
  Box,
  Image,
  HStack,
  Text,
} from "@chakra-ui/react";
import RefreshButton from "../assets/refresh.png"
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

// Refresh Handler
const handleRefresh = () => {
  console.log("Refreshed");
};

const RecommendedBills = () => {
  return (
    <Box>
      <HStack>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Recommended Bills
        </Text>
        <Image
          src={RefreshButton} 
          alt="Refresh"
          boxSize="24px"                         
          cursor="pointer"                       
          onClick={handleRefresh}                
          _hover={{ opacity: 0.8 }}              
        />
      </HStack>
      <BillGrid items={sampleBills} />
    </Box>
  );
};

export default RecommendedBills;
