import { useEffect, useState } from "react";
import { Box, Heading, HStack, Spinner, Text, IconButton } from "@chakra-ui/react";
import BillGrid from "./bill-grid"; // Ensure this is correctly implemented
import { LuRotateCcw } from "react-icons/lu";
import { BillCardProp } from "@/components/type";

const RecommendedBills = () => {
  const [bills, setBills] = useState<BillCardProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendedBills = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8000/api/bills/recommended")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Recommended Bills:", data);

        if (!data.recommended_bills || !Array.isArray(data.recommended_bills)) {
          throw new Error("Invalid response format");
        }

        setBills(data.recommended_bills);
      })
      .catch((err) => {
        console.error("Error fetching recommended bills:", err);
        setError("Failed to load recommended bills.");
      })
      .finally(() => setLoading(false));
  };

  // Fetch data on mount
  useEffect(() => {
    fetchRecommendedBills();
  }, []);


  return (
    <Box>
      <HStack my={2}>
        <Heading>Recommended Bills</Heading>
        <IconButton
          variant="ghost"
          colorScheme="teal"
          size="sm"
          onClick={fetchRecommendedBills}
          aria-label="Refresh Recommended Bills">
          <LuRotateCcw/>
        </IconButton>
      </HStack>

      {loading && <Spinner size="xl" />}
      {error && <Text color="red.500">{error}</Text>}

      {!loading && !error && bills.length > 0 && <BillGrid items={bills} />}
    </Box>
  );
};

export default RecommendedBills;
