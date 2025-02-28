import { useEffect, useState } from "react";
import { Box, Heading, HStack, IconButton, Spinner, Text } from "@chakra-ui/react";
import BillGrid from "./bill-grid"; // Ensure this is correctly implemented
import { LuRotateCcw } from "react-icons/lu";
import { BillCardProp } from "@/components/type";

const TrendingBills = () => {
  const [bills, setBills] = useState<BillCardProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendedBills = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8000/api/bills/trending/education")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Trending Bills:", data);

        // commenting this out for now as to not kill requests for categorized bills
        if (!data.trending_bills || !Array.isArray(data.trending_bills)) {
          throw new Error("Invalid response format");
        }
        
        setBills(data.trending_bills);
      })
      .catch((err) => {
        console.error("Error fetching trending bills:", err);
        setError("Failed to load trending bills.");
      })
      .finally(() => setLoading(false));
  }; 
  
  // Fetch data on mount
  useEffect(() => {
    fetchTrendedBills();
  }, []);
  

  return (
    <Box>
      <HStack my={2}>
        <Heading color="var(--chakra-colors-gray-900)" _dark={{ color: "white" }}>
          Trending Bills
        </Heading>

        <IconButton
          variant="ghost"
          colorScheme="teal"
          size="sm"
          onClick={TrendingBills}
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

export default TrendingBills;
