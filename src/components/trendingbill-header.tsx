import { useEffect, useState } from "react";
import { Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import BillGrid from "./bill-grid"; // Ensure this is correctly implemented

// Define the structure expected by BillCardProp
interface BillCardProp {
  title: string;
  code: string;
  sponsor?: string;
  action: string;
  description?: string;
}

// Define the structure expected by BillGrid
interface BillItemProp {
  id: number;
  item: BillCardProp;
}

const TrendingBills = () => {
  const [bills, setBills] = useState<BillItemProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/bills/trending")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Trending Bills:", data);

        if (!data.trending_bills || !Array.isArray(data.trending_bills)) {
          throw new Error("Invalid response format");
        }

        // Transform API response to match BillItemProp[]
        const formattedBills: BillItemProp[] = data.trending_bills.map((bill: {
          bill_id: any; title:
            any; sponsor: any; action: any; description: any;
        }) => ({
          id: bill.bill_id, // Ensure this is used for navigation
          item: {
            title: bill.title,
            code: `Bill-${bill.bill_id}`, // Change to match frontend expectations
            sponsor: bill.sponsor || "Unknown Sponsor",
            action: bill.action,
            description: bill.description || "No description available",
          },
        }));

        setBills(formattedBills);
      })
      .catch((err) => {
        console.error("Error fetching trending bills:", err);
        setError("Failed to load trending bills.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <HStack my={2}>
        <Heading>Trending Bills</Heading>
      </HStack>

      {loading && <Spinner size="xl" />}
      {error && <Text color="red.500">{error}</Text>}

      {!loading && !error && bills.length > 0 && <BillGrid items={bills} />}
    </Box>
  );
};

export default TrendingBills;
