import { useEffect, useState } from "react";
import { Box, Heading, HStack, Spinner, Text, IconButton } from "@chakra-ui/react";
import BillGrid from "./bill-grid"; // Ensure this is correctly implemented
import Refresh from "../assets/refresh.png"
import { LuRotateCcw } from "react-icons/lu";

// Define the structure expected by BillCardProp
export interface BillCardProp {
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

const RecommendedBills = () => {
  const [bills, setBills] = useState<BillItemProp[]>([]);
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

        // Transform API response to match BillItemProp[]
        const formattedBills: BillItemProp[] = data.recommended_bills.map((bill: {
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
