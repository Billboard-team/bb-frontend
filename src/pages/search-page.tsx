import { useEffect, useState } from "react";
import { Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import BillGrid from "@/components/bill-grid";
import { BillCardProp } from "@/components/type";

const SearchPage = () => {

  const [bills, setBills] = useState<BillCardProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchTrendedBills = () => {
    setLoading(true);
    setError(null);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = "http://localhost:8000/api/bills/trending?categories=" + urlParams.get('q')


    fetch(url)
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
          Search Bills
        </Heading>

      </HStack>

      {loading && <Spinner size="xl" />}
      {error && <Text color="red.500">{error}</Text>}

      {!loading && !error && bills.length > 0 && <BillGrid items={bills} />}
    </Box>
  );
  
}

export default SearchPage
